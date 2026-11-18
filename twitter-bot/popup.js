const $ = (id) => document.getElementById(id);
const BAD = /^(error|clicked_unconfirmed|no_users|paused_|own_handle_not_found|stopped_not_logged_in)/;
// [id, min, max]
const FIELDS = [
  ['minMin', 2, 20],
  ['maxMin', 2, 20],
  ['dailyCap', 1, 400],
  ['batchSize', 1, 100],
  ['cooldownMin', 0, 240],
  ['errorPauseMin', 5, 720],
];

// DEFAULTS, send, loadState and openDashboard come from state.js.
const FILTERS = ['verifiedOnly', 'requireAvatar', 'requireBio', 'skipProtected'];

const cleanHandle = (v) =>
  v.trim().replace(/^https?:\/\/(www\.)?(x|twitter)\.com\//i, '').replace(/^@/, '').split(/[/?#]/)[0];

function showPane(name) {
  for (const b of document.querySelectorAll('.tabs button')) b.classList.toggle('on', b.dataset.pane === name);
  for (const p of document.querySelectorAll('.pane')) p.classList.toggle('on', p.id === 'pane-' + name);
}

function readSettings(current) {
  const out = {};
  for (const [id, lo, hi] of FIELDS) {
    const n = Math.round(Number($(id).value));
    out[id] = Number.isFinite(n) && $(id).value !== '' ? Math.min(hi, Math.max(lo, n)) : current[id];
  }
  if (out.maxMin < out.minMin) out.maxMin = out.minMin;
  return out;
}

async function saveSettings() {
  const current = await loadState();
  await chrome.storage.local.set({ settings: readSettings(current.settings) });
}

// Keep the two slider handles from crossing, and draw the filled part between them.
function syncRange(changedId) {
  const lo = $('minMin');
  const hi = $('maxMin');
  if (Number(lo.value) > Number(hi.value)) {
    if (changedId === 'maxMin') hi.value = lo.value;
    else lo.value = hi.value;
  }
  const min = Number(lo.min);
  const span = Number(lo.max) - min;
  const a = Number(lo.value);
  const b = Number(hi.value);
  $('rangeFill').style.left = ((a - min) / span) * 100 + '%';
  $('rangeFill').style.width = ((b - a) / span) * 100 + '%';
  $('rangeVal').textContent = a === b ? `${a} min` : `${a} to ${b} min`;
  // When both handles sit at the top end, keep the lower one grabbable.
  lo.style.zIndex = a === b && b === Number(lo.max) ? 2 : 1;
  hi.style.zIndex = 1;
}

function render(state, fillInputs) {
  if (fillInputs) {
    $('target').value = state.target;
    document.querySelector(`input[name=list][value=${state.listType}]`).checked = true;
    document.querySelector(`input[name=unfollowWho][value="${state.onlyNonFollowers ? 1 : 0}"]`).checked = true;
    for (const id of FILTERS) $(id).checked = !!state.filters[id];
    $('activeDays').value = state.filters.activeDays || 0;
    // A saved value that is not one of the presets leaves no segment selected but is kept.
    for (const r of document.querySelectorAll('input[name=active]')) r.checked = r.value === $('activeDays').value;
    for (const [id] of FIELDS) $(id).value = state.settings[id];
    syncRange();
  }
  document.body.classList.toggle('running', state.running);
  const what = state.mode === 'unfollow' ? 'Unfollowing' : 'Following';
  $('status').textContent =
    `${state.running ? what : 'Stopped'} · ${state.dayCount}/${state.cap} today`;
  $('next').textContent =
    state.running && state.nextAt
      ? `Next action around ${new Date(state.nextAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      : '';
  // Plan and account (Pro tab)
  const acct = state.account;
  $('acctOut').hidden = !!acct;
  $('acctIn').hidden = !acct;
  $('proBadge').hidden = !acct?.pro;
  if (acct) {
    $('acctEmail').textContent = acct.email;
    $('isFree').hidden = acct.pro;
    $('isPro').hidden = !acct.pro;
  }
  const limited = !acct?.pro && state.settings.dailyCap > CONFIG.FREE_DAILY;
  $('capNote').hidden = !limited;
  $('capNote').textContent = `Free plan: capped at ${CONFIG.FREE_DAILY} per day. Upgrade in the Pro tab to use your full limit.`;

  // Stop only makes sense while a run is active.
  $('stop').hidden = !state.running;

  // Recent activity: latest entry on the closed summary line, last 30 inside.
  const timeOf = (e) => new Date(e.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const textOf = (e) => e.status.replace(/_/g, ' ');
  $('logbox').hidden = state.log.length === 0;
  const latest = state.log[0];
  if (latest) {
    $('last').textContent = `${latest.handle ? '@' + latest.handle + ' ' : ''}${textOf(latest)}`;
    $('last').className = BAD.test(latest.status) ? 'bad' : '';
  }
  $('log').replaceChildren(
    ...state.log.slice(0, 30).map((e) => {
      const div = document.createElement('div');
      if (BAD.test(e.status)) div.className = 'bad';
      for (const [cls, text] of [['t', timeOf(e)], ['w', e.handle ? '@' + e.handle : ''], ['s', textOf(e)]]) {
        const span = document.createElement('span');
        span.className = cls;
        span.textContent = text;
        div.append(span);
      }
      return div;
    })
  );
}

for (const b of document.querySelectorAll('.tabs button')) {
  b.addEventListener('click', () => showPane(b.dataset.pane));
}

for (const [id] of FIELDS) $(id).addEventListener('change', saveSettings);
for (const id of ['minMin', 'maxMin']) $(id).addEventListener('input', () => syncRange(id));

// Up / down buttons on the number boxes.
for (const btn of document.querySelectorAll('.stepper .arrows button')) {
  btn.addEventListener('click', () => {
    const input = $(btn.dataset.for);
    const current = input.value === '' ? Number(input.min) : Number(input.value);
    const next = Math.min(Number(input.max), Math.max(Number(input.min), current + Number(btn.dataset.dir)));
    input.value = next;
    input.dispatchEvent(new Event('change'));
  });
}

$('startFollow').addEventListener('click', async () => {
  const target = cleanHandle($('target').value);
  if (!/^[A-Za-z0-9_]{1,15}$/.test(target)) {
    $('status').textContent = 'Enter a valid username.';
    return;
  }
  await saveSettings();
  await chrome.storage.local.set({
    mode: 'follow',
    target,
    listType: document.querySelector('input[name=list]:checked').value,
    filters: {
      ...Object.fromEntries(FILTERS.map((id) => [id, $(id).checked])),
      activeDays: Math.min(365, Math.max(0, Math.round(Number($('activeDays').value)) || 0)),
    },
  });
  await send('start');
  render(await loadState(), true);
  await openDashboard();
});

$('startUnfollow').addEventListener('click', async () => {
  await saveSettings();
  await chrome.storage.local.set({ mode: 'unfollow', onlyNonFollowers: document.querySelector('input[name=unfollowWho]:checked').value === '1' });
  await send('start');
  render(await loadState(), true);
  await openDashboard();
});

$('stop').addEventListener('click', async () => {
  await send('stop');
  render(await loadState(), false);
});

for (const r of document.querySelectorAll('input[name=active]')) {
  r.addEventListener('change', () => ($('activeDays').value = r.value));
}

$('dash').addEventListener('click', openDashboard);

// ---------- Pro tab ----------
const ERRORS = {
  not_configured: 'Purchases are not set up yet.',
  not_signed_in: 'Sign in with Google first.',
  google_sign_in_failed: 'Google sign-in did not complete.',
  server_401: 'Your session expired. Sign in again.',
  server_409: 'This account already has Pro. Press "I have already paid, check again".',
  server_429: 'Too many requests. Wait a minute and try again.',
};
$('price').textContent = CONFIG.PRICE_LABEL;
$('buy').textContent = `Get Pro for ${CONFIG.PRICE_LABEL}`;
for (const n of document.querySelectorAll('.plan-row .free')) n.textContent = `${CONFIG.FREE_DAILY} / day`;
for (const n of document.querySelectorAll('.plan-row .pro')) n.textContent = `${CONFIG.PRO_DAILY} / day`;

async function account(type, btn) {
  $('acctMsg').textContent = '';
  btn.disabled = true;
  try {
    const res = await send(type);
    if (res?.error) $('acctMsg').textContent = ERRORS[res.error] || `Something went wrong (${res.error}).`;
    else if (type === 'refresh' && !res.account?.pro) $('acctMsg').textContent = 'No Pro purchase found for this account yet.';
  } finally {
    btn.disabled = false;
    render(await loadState(), false);
  }
}
for (const [id, type] of [['signin', 'signin'], ['signout', 'signout'], ['buy', 'buy'], ['refresh', 'refresh']]) {
  $(id).addEventListener('click', () => account(type, $(id)));
}

$('ver').textContent = 'version: ' + chrome.runtime.getManifest().version;
$('year').textContent = new Date().getFullYear();

chrome.storage.onChanged.addListener(async () => render(await loadState(), false));

loadState().then((s) => {
  render(s, true);
  // Signed in but not Pro: quietly re-check, in case a purchase just completed.
  if (s.account && !s.account.pro && CONFIG.API_BASE) send('refresh').then(async () => render(await loadState(), false));
  if (s.mode === 'unfollow') showPane('unfollow');
});
