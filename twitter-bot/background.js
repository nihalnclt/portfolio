importScripts('config.js');

const ALARM = 'follow-tick';
const DEFAULTS = {
  minMin: 8, // random interval lower bound, minutes
  maxMin: 14, // random interval upper bound, minutes
  dailyCap: 80, // follows + unfollows per day
  batchSize: 6, // after this many actions...
  cooldownMin: 10, // ...add this many minutes
  errorPauseMin: 30,
};
const MAX_LOG = 200;
const MAX_ATTEMPTED = 3000;
const OK = new Set(['followed', 'requested', 'unfollowed']);
let busy = false;

const today = () => new Date().toLocaleDateString('en-CA'); // local YYYY-MM-DD
const set = (obj) => chrome.storage.local.set(obj);

async function getState() {
  const s = await chrome.storage.local.get(null);
  const settings = { ...DEFAULTS };
  for (const k in DEFAULTS) if (Number.isFinite(s.settings?.[k])) settings[k] = s.settings[k];
  return {
    mode: s.mode === 'unfollow' ? 'unfollow' : 'follow',
    target: s.target || '',
    listType: s.listType === 'following' ? 'following' : 'followers',
    onlyNonFollowers: s.onlyNonFollowers !== false,
    filters: { verifiedOnly: false, skipProtected: false, requireBio: false, requireAvatar: false, activeDays: 0, ...s.filters },
    myHandle: s.myHandle || '',
    profile: s.profile || null,
    account: s.account || null,
    settings,
    running: !!s.running,
    day: s.day || '',
    dayCount: s.dayCount || 0,
    sinceCooldown: s.sinceCooldown || 0,
    tabId: s.tabId ?? null,
    attempted: s.attempted || [],
    attemptedUnfollow: s.attemptedUnfollow || [],
    log: s.log || [],
    nextAt: s.nextAt || 0,
  };
}

async function addLog(handle, status) {
  const { log } = await getState();
  log.unshift({ handle, status, at: Date.now() });
  await set({ log: log.slice(0, MAX_LOG) });
}

async function schedule(minutes) {
  const m = Math.max(0.5, minutes);
  await chrome.alarms.create(ALARM, { delayInMinutes: m });
  await set({ nextAt: Date.now() + m * 60000 });
}

async function stop(reason) {
  const { tabId } = await getState();
  await chrome.alarms.clear(ALARM);
  await set({ running: false, nextAt: 0, tabId: null });
  if (tabId !== null) chrome.tabs.remove(tabId).catch(() => {});
  if (reason) await addLog('', reason);
}

async function start() {
  // Re-detect the logged-in account on every start in case it changed.
  await set({ running: true, sinceCooldown: 0, myHandle: '', profile: null });
  await schedule(0.5);
}

function waitForLoad(tabId, timeoutMs = 30000) {
  return new Promise((resolve) => {
    const done = (ok) => {
      clearTimeout(timer);
      chrome.tabs.onUpdated.removeListener(listener);
      resolve(ok);
    };
    const listener = (id, info) => {
      if (id === tabId && info.status === 'complete') done(true);
    };
    const timer = setTimeout(() => done(false), timeoutMs);
    chrome.tabs.onUpdated.addListener(listener);
    chrome.tabs.get(tabId).then((t) => t.status === 'complete' && done(true)).catch(() => done(false));
  });
}

// Reuse the worker tab so the list keeps its scroll position between actions.
async function openTab(url, exact = false) {
  const { tabId } = await getState();
  if (tabId !== null) {
    try {
      const t = await chrome.tabs.get(tabId);
      const have = (t.url || '').toLowerCase().replace(/[?#].*$/, '').replace(/\/$/, '');
      const want = url.toLowerCase();
      if (exact ? have === want : have.startsWith(want)) return t.id;
      await chrome.tabs.update(t.id, { url });
      await waitForLoad(t.id);
      return t.id;
    } catch {
      /* tab is gone, open a new one */
    }
  }
  const tab = await chrome.tabs.create({ url, active: false });
  await chrome.tabs.update(tab.id, { autoDiscardable: false }).catch(() => {});
  await set({ tabId: tab.id });
  await waitForLoad(tab.id);
  return tab.id;
}

// Runs inside x.com: reads the logged-in account's handle from the nav bar.
async function readMyHandle() {
  for (let i = 0; i < 30; i++) {
    if (/\/(login|i\/flow)/.test(location.pathname)) return { status: 'not_logged_in' };
    const href = document.querySelector('a[data-testid="AppTabBar_Profile_Link"]')?.getAttribute('href') || '';
    const m = href.match(/^\/([A-Za-z0-9_]{1,15})$/);
    if (m) return { status: 'ok', handle: m[1] };
    await new Promise((r) => setTimeout(r, 500));
  }
  return { status: 'own_handle_not_found' };
}

// Runs inside an x.com profile page: reads name, avatar and counts for the dashboard.
async function readProfile(handle) {
  const h = handle.toLowerCase();
  const first = (el) => (el?.innerText || '').trim().split(/\s+/)[0] || '';
  // The avatar can be an <img> or a CSS background, and often renders after the counts.
  const avatarOf = () => {
    const photoLinks = [...document.querySelectorAll('a[href]')].filter(
      (a) => (a.getAttribute('href') || '').toLowerCase() === `/${h}/photo`
    );
    const boxes = [...document.querySelectorAll('[data-testid^="UserAvatar-Container-"]')].filter(
      (el) => el.getAttribute('data-testid').toLowerCase() === 'useravatar-container-' + h
    );
    for (const el of [...photoLinks, ...boxes]) {
      const img = el.querySelector('img[src*="twimg.com"]');
      if (img) return img.src;
      for (const d of el.querySelectorAll('div')) {
        const m = getComputedStyle(d).backgroundImage.match(/url\("?(https:\/\/[^")]*twimg\.com[^")]*)"?\)/);
        if (m) return m[1];
      }
    }
    return '';
  };
  for (let i = 0; i < 30; i++) {
    if (/\/(login|i\/flow)/.test(location.pathname)) return null;
    const links = [...document.querySelectorAll('a[href]')];
    const by = (re) => links.find((a) => re.test((a.getAttribute('href') || '').toLowerCase()));
    const followers = by(new RegExp(`^/${h}/(verified_)?followers$`));
    const following = by(new RegExp(`^/${h}/following$`));
    if (followers && following) {
      let avatar = '';
      for (let j = 0; j < 10 && !(avatar = avatarOf()); j++) await new Promise((r) => setTimeout(r, 500));
      return {
        handle: h,
        name: (document.querySelector('[data-testid="UserName"] span')?.innerText || '').trim(),
        avatar,
        followers: first(followers),
        following: first(following),
      };
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  return null;
}

// Runs inside an x.com followers / following page.
// mode 'follow': follows the first listed user that has a Follow button.
// mode 'unfollow': unfollows the first listed user that has a Following button.
async function actNext(mode, attempted, onlyNonFollowers, filters, pickOnly) {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const skip = new Set(attempted);
  const from = mode === 'unfollow' ? '-unfollow' : '-follow';
  const to = mode === 'unfollow' ? '-follow' : '-unfollow';
  const handleOf = (btn) => ((btn.getAttribute('aria-label') || '').match(/@([A-Za-z0-9_]{1,15})/) || [])[1]?.toLowerCase();
  const btnFor = (handle, suffix) =>
    [...document.querySelectorAll(`button[data-testid$="${suffix}"]`)].find((b) => handleOf(b) === handle);

  // Follow-mode filters, judged only from what the list row shows.
  const passes = (cell, btn) => {
    if (filters.verifiedOnly && !cell.querySelector('[data-testid="icon-verified"]')) return false;
    if (filters.skipProtected && cell.querySelector('[data-testid="icon-lock"]')) return false;
    if (filters.requireAvatar) {
      const img = cell.querySelector('img[src*="twimg.com"]');
      if (!img || img.src.includes('default_profile')) return false;
    }
    if (filters.requireBio) {
      // Bio = any text in the row besides name, @handle, badge and button label.
      const badge = (cell.querySelector('[data-testid="userFollowIndicator"]')?.innerText || '').trim();
      const label = (btn.innerText || '').trim();
      const lines = cell.innerText.split('\n').map((l) => l.trim()).filter(Boolean);
      const extra = lines.slice(1).filter((l) => !l.startsWith('@') && l !== badge && l !== label);
      if (extra.length === 0) return false;
    }
    return true;
  };

  let sawCells = false;
  let stuck = 0;
  for (let i = 0; i < 40; i++) {
    if (/\/(login|i\/flow)/.test(location.pathname)) return { status: 'not_logged_in' };

    const cells = document.querySelectorAll('[data-testid="UserCell"]');
    if (cells.length) sawCells = true;
    for (const cell of cells) {
      const btn = cell.querySelector(`button[data-testid$="${from}"]`);
      const handle = btn && handleOf(btn);
      if (!handle || skip.has(handle)) continue;
      // "Follows you" badge: keep mutuals when asked to.
      if (mode === 'unfollow' && onlyNonFollowers && cell.querySelector('[data-testid="userFollowIndicator"]')) continue;
      if (mode === 'follow' && !passes(cell, btn)) continue;
      // Activity filter: hand the candidate back so its profile can be checked first.
      if (pickOnly) return { status: 'candidate', handle };

      btn.scrollIntoView({ block: 'center' });
      await sleep(600);
      btn.click();

      if (mode === 'unfollow') {
        // X asks for confirmation before unfollowing.
        for (let j = 0; j < 10; j++) {
          await sleep(300);
          const confirm = document.querySelector('[data-testid="confirmationSheetConfirm"]');
          if (confirm) {
            confirm.click();
            break;
          }
          if (btnFor(handle, to)) break;
        }
      }

      for (let j = 0; j < 10; j++) {
        await sleep(500);
        if (btnFor(handle, to)) return { status: mode === 'unfollow' ? 'unfollowed' : 'followed', handle };
        if (mode === 'follow' && btnFor(handle, '-cancel')) return { status: 'requested', handle }; // protected account
      }
      return { status: 'clicked_unconfirmed', handle };
    }

    const before = window.scrollY;
    window.scrollBy(0, window.innerHeight * 0.8);
    await sleep(1500);
    stuck = window.scrollY === before ? stuck + 1 : 0;
    if (stuck >= 5) return { status: sawCells ? 'list_end' : 'no_users_found' };
  }
  // Scrolled a long way without a match; the tab keeps its position for the next run.
  return { status: sawCells ? 'no_match_yet' : 'no_users_found' };
}

// Runs inside a candidate's x.com profile page (activity filter).
// Follows only if the newest visible post is within `days` days.
async function checkActiveAndFollow(handle, days) {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const re = new RegExp('@' + handle.toLowerCase() + '(?![a-z0-9_])');
  const find = (suffix) =>
    [...document.querySelectorAll(`button[data-testid$="${suffix}"]`)].find((b) =>
      re.test((b.getAttribute('aria-label') || '').toLowerCase())
    );
  const postTimes = () =>
    [...document.querySelectorAll('article time[datetime]')]
      .map((t) => Date.parse(t.getAttribute('datetime')))
      .filter(Number.isFinite);

  let newest = 0;
  for (let i = 0; i < 30; i++) {
    if (/\/(login|i\/flow)/.test(location.pathname)) return { status: 'not_logged_in' };
    if (postTimes().length) {
      await sleep(1500); // let the rest of the first batch render (a pinned post can be old)
      newest = Math.max(...postTimes());
      break;
    }
    if (document.querySelector('[data-testid="emptyState"]')) break;
    await sleep(500);
  }
  if (!newest || Date.now() - newest > days * 86400000) return { status: 'inactive' };

  if (find('-unfollow')) return { status: 'already_following' };
  const btn = find('-follow');
  if (!btn) return { status: 'no_follow_button' };
  btn.click();
  for (let j = 0; j < 10; j++) {
    await sleep(500);
    if (find('-unfollow')) return { status: 'followed' };
    if (find('-cancel')) return { status: 'requested' };
  }
  return { status: 'clicked_unconfirmed' };
}

// Opens the candidate's profile in a temporary tab so the list tab keeps its place.
async function checkCandidate(handle, days) {
  const tab = await chrome.tabs.create({ url: `https://x.com/${handle}`, active: false });
  try {
    await waitForLoad(tab.id);
    const [out] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: checkActiveAndFollow,
      args: [handle, days],
    });
    return out?.result || { status: 'error' };
  } finally {
    chrome.tabs.remove(tab.id).catch(() => {});
  }
}

const MAX_CHECKS_PER_RUN = 5;
const SKIP = { inactive: 'skipped_inactive', already_following: 'skipped_already_following', no_follow_button: 'skipped_no_follow_button' };

async function runAction(state) {
  let owner = state.target;
  // X has a dedicated verified followers list; use it when filtering for verified.
  const list = state.listType === 'followers' && state.filters.verifiedOnly ? 'verified_followers' : state.listType;
  let url = `https://x.com/${state.target}/${list}`;
  if (state.mode === 'unfollow') {
    let me = state.myHandle;
    if (!me) {
      const homeTab = await openTab('https://x.com/home');
      const [out] = await chrome.scripting.executeScript({ target: { tabId: homeTab }, func: readMyHandle });
      if (out?.result?.status !== 'ok') return { status: out?.result?.status || 'error' };
      me = out.result.handle;
      await set({ myHandle: me });
    }
    owner = me;
    url = `https://x.com/${me}/following`;
  }

  // Once per start: load the profile page to show avatar and counts on the dashboard.
  if (state.profile?.handle !== owner.toLowerCase()) {
    let profile = null;
    try {
      const profTab = await openTab(`https://x.com/${owner}`, true);
      const [out] = await chrome.scripting.executeScript({ target: { tabId: profTab }, func: readProfile, args: [owner] });
      profile = out?.result || null;
    } catch {
      /* dashboard falls back to the handle only */
    }
    await set({ profile: profile || { handle: owner.toLowerCase() } });
  }

  const tabId = await openTab(url);
  const days = state.mode === 'follow' ? Number(state.filters.activeDays) || 0 : 0;
  const attempted = [...(state.mode === 'unfollow' ? state.attemptedUnfollow : state.attempted)];
  const next = async () => {
    const [out] = await chrome.scripting.executeScript({
      target: { tabId },
      func: actNext,
      args: [state.mode, attempted, state.onlyNonFollowers, state.filters, days > 0],
    });
    return out?.result || { status: 'error' };
  };
  if (days <= 0) return next();

  // Activity filter: pick a candidate from the list, check its profile, follow there.
  for (let k = 0; k < MAX_CHECKS_PER_RUN; k++) {
    const pick = await next();
    if (pick.status !== 'candidate') return pick;
    const res = await checkCandidate(pick.handle, days);
    if (!SKIP[res.status]) return { status: res.status, handle: pick.handle };
    attempted.push(pick.handle);
    await set({ attempted: attempted.slice(-MAX_ATTEMPTED) });
    await addLog(pick.handle, SKIP[res.status]);
  }
  return { status: 'no_match_yet' };
}

async function tick() {
  if (busy) return;
  busy = true;
  try {
    const state = await getState();
    if (!state.running) return;
    const cfg = state.settings;

    // Safety net: if the worker dies mid-run, this alarm restarts the loop.
    await schedule(cfg.errorPauseMin);

    let { dayCount, sinceCooldown } = state;
    if (state.day !== today()) {
      dayCount = 0;
      await set({ day: today(), dayCount });
    }
    const cap = effectiveCap(cfg, state.account);
    if (dayCount >= cap) {
      const midnight = new Date();
      midnight.setHours(24, 5, 0, 0);
      const onFree = !state.account?.pro && cap === CONFIG.FREE_DAILY;
      await addLog('', onFree ? 'free_plan_limit_reached' : 'daily_limit_reached');
      await schedule((midnight - Date.now()) / 60000);
      return;
    }

    let res;
    try {
      res = await runAction(state);
    } catch (e) {
      res = { status: 'error: ' + (e?.message || e) };
    }

    if (res.status === 'not_logged_in') return void (await stop('stopped_not_logged_in'));
    if (res.status === 'list_end') return void (await stop('list_finished'));
    if (res.status === 'no_match_yet') {
      await addLog('', 'no_match_yet_scrolling_on');
      await schedule(1);
      return;
    }

    if (res.handle) {
      const key = state.mode === 'unfollow' ? 'attemptedUnfollow' : 'attempted';
      const fresh = await getState(); // runAction may have added skipped handles
      await set({ [key]: [...fresh[key], res.handle].slice(-MAX_ATTEMPTED) });
    }
    await addLog(res.handle || '', res.status);

    if (OK.has(res.status)) {
      dayCount += 1;
      sinceCooldown += 1;
      let delay = cfg.minMin + Math.random() * (cfg.maxMin - cfg.minMin);
      if (sinceCooldown >= cfg.batchSize) {
        delay += cfg.cooldownMin;
        sinceCooldown = 0;
        await addLog('', `cooldown_${cfg.cooldownMin}min`);
      }
      await set({ dayCount, sinceCooldown });
      await schedule(delay);
    } else {
      // Click did not stick (often X refusing the action) or the page failed.
      await addLog('', `paused_${cfg.errorPauseMin}min`);
      await schedule(cfg.errorPauseMin);
    }
  } finally {
    busy = false;
  }
}

chrome.alarms.onAlarm.addListener((a) => {
  if (a.name === ALARM) tick();
});

// ---------- Account and Pro licence ----------

async function api(path, { method = 'GET', session, body } = {}) {
  const res = await fetch(CONFIG.API_BASE + path, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(session ? { Authorization: 'Bearer ' + session } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error('server_' + res.status);
  return res.json();
}

function requireConfig() {
  if (!CONFIG.API_BASE || !CONFIG.GOOGLE_CLIENT_ID) throw new Error('not_configured');
}

// Google sign-in. Runs here, not in the popup, because the popup closes when the Google window opens.
async function signIn() {
  requireConfig();
  const nonce = crypto.randomUUID();
  const url =
    'https://accounts.google.com/o/oauth2/v2/auth?' +
    new URLSearchParams({
      client_id: CONFIG.GOOGLE_CLIENT_ID,
      response_type: 'id_token',
      redirect_uri: chrome.identity.getRedirectURL(),
      scope: 'openid email',
      nonce,
      prompt: 'select_account',
    });
  const redirect = await chrome.identity.launchWebAuthFlow({ url, interactive: true });
  const idToken = new URLSearchParams(new URL(redirect).hash.slice(1)).get('id_token');
  if (!idToken) throw new Error('google_sign_in_failed');
  // The server verifies the token with Google; the extension never trusts it by itself.
  const d = await api('/auth/google', { method: 'POST', body: { id_token: idToken, nonce } });
  await set({ account: { email: d.email, session: d.session, pro: !!d.pro, checkedAt: Date.now() } });
}

async function refreshLicence() {
  requireConfig();
  const { account } = await getState();
  if (!account?.session) throw new Error('not_signed_in');
  try {
    const d = await api('/license', { session: account.session });
    await set({ account: { ...account, email: d.email || account.email, pro: !!d.pro, checkedAt: Date.now() } });
  } catch (e) {
    if (e.message === 'server_401') await set({ account: null }); // session expired: sign in again
    throw e;
  }
}

async function buy() {
  requireConfig();
  const { account } = await getState();
  if (!account?.session) throw new Error('not_signed_in');
  const d = await api('/checkout', { method: 'POST', session: account.session });
  if (!/^https:\/\//.test(d.url || '')) throw new Error('bad_checkout_url');
  await chrome.tabs.create({ url: d.url });
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  (async () => {
    let error = null;
    try {
      if (msg.type === 'start') await start();
      if (msg.type === 'stop') await stop('stopped_by_user');
      if (msg.type === 'signin') await signIn();
      if (msg.type === 'signout') await set({ account: null });
      if (msg.type === 'refresh') await refreshLicence();
      if (msg.type === 'buy') await buy();
    } catch (e) {
      error = e?.message || String(e);
    }
    sendResponse({ ...(await getState()), error });
  })();
  return true;
});
