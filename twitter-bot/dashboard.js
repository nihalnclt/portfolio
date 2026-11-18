// DEFAULTS, send and loadState come from state.js.
const $ = (id) => document.getElementById(id);
const BAD = /^(error|clicked_unconfirmed|no_users|paused_|own_handle_not_found|stopped_not_logged_in)/;
const OK = /^(followed|requested|unfollowed)$/;
const PAGE_SIZE = 20;
let state = null;
let page = 0;

const pageCount = () => Math.max(1, Math.ceil(state.log.length / PAGE_SIZE));
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
};
const words = (status) => {
  const s = status.replace(/_/g, ' ');
  return s.charAt(0).toUpperCase() + s.slice(1);
};
const when = (at) =>
  new Date(at).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

function renderStatus() {
  if (!state) return;
  let label = 'Stopped';
  let timer = '--:--';
  if (state.running && state.nextAt > Date.now()) {
    const sec = Math.round((state.nextAt - Date.now()) / 1000);
    const two = (n) => String(n).padStart(2, '0');
    const h = Math.floor(sec / 3600);
    label = 'Next action in';
    timer = (h ? h + ':' : '') + two(Math.floor((sec % 3600) / 60)) + ':' + two(sec % 60);
  } else if (state.running) {
    label = 'Working';
    timer = '...';
  }
  $('runstat').classList.toggle('running', state.running);
  $('state').textContent = label;
  $('timer').textContent = timer;
}

function filterText() {
  const parts = Object.entries({
    verifiedOnly: 'verified',
    requireAvatar: 'with a picture',
    requireBio: 'with a bio',
    skipProtected: 'not protected',
  })
    .filter(([k]) => state.filters[k])
    .map(([, v]) => v);
  if (state.filters.activeDays > 0) parts.push(`posted in the last ${state.filters.activeDays} days`);
  return parts.length ? ` Only accounts: ${parts.join(', ')}.` : '';
}

function activityRow(e) {
  if (!e.handle) {
    const row = el('div', 'cell note' + (BAD.test(e.status) ? ' bad' : ''));
    row.append(el('span', '', words(e.status)), el('span', 'time', when(e.at)));
    return row;
  }
  const row = el('div', 'cell');
  const main = el('div', 'main');
  const name = el('a', 'name', '@' + e.handle);
  name.href = `https://x.com/${encodeURIComponent(e.handle)}`;
  name.target = '_blank';
  name.rel = 'noreferrer';
  main.append(name, el('div', 'time', when(e.at)));
  const kind = OK.test(e.status) ? ' ok' : BAD.test(e.status) ? ' bad' : ' skip';
  row.append(el('div', 'pic', e.handle.charAt(0)), main, el('span', 'pill' + kind, words(e.status)));
  return row;
}

function render() {
  const unfollow = state.mode === 'unfollow';
  const handle = unfollow ? state.myHandle : state.target;
  const prof = state.profile && handle && state.profile.handle === handle.toLowerCase() ? state.profile : null;

  $('who').textContent = prof?.name || (handle ? '@' + handle : unfollow ? 'Your account' : 'No target set');
  $('handle').textContent = prof?.name && handle ? '@' + handle : '';
  $('initial').textContent = handle ? handle.charAt(0) : '';
  if (prof?.avatar && /^https:\/\/[a-z0-9-]+\.twimg\.com\//.test(prof.avatar)) {
    if ($('avatar').src !== prof.avatar) $('avatar').src = prof.avatar;
    $('initial').textContent = '';
  } else {
    $('avatar').removeAttribute('src');
  }

  $('counts').replaceChildren();
  if (prof?.followers || prof?.following) {
    for (const [n, label] of [[prof.following, 'Following'], [prof.followers, 'Followers']]) {
      const span = el('span');
      span.append(el('b', '', n || '?'), ' ' + label);
      $('counts').append(span);
    }
  }

  $('what').textContent = unfollow
    ? `Unfollowing from your Following list${state.onlyNonFollowers ? ', only accounts that do not follow back' : ''}.`
    : `Following this account's ${state.listType}.${filterText()}`;

  renderStatus();
  $('sub').textContent = `${state.dayCount} of ${state.cap} actions today`;
  $('count').textContent = state.dayCount;
  $('cap').textContent = `/ ${state.cap}`;
  $('prog').style.width = Math.min(100, (state.dayCount / state.cap) * 100) + '%';
  $('toggle').textContent = state.running ? 'Pause' : 'Resume';
  $('toggle').className = state.running ? 'btn' : 'btn primary';

  page = Math.min(page, pageCount() - 1);
  $('rows').replaceChildren(...state.log.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE).map(activityRow));
  $('empty').style.display = state.log.length ? 'none' : 'block';

  $('page').textContent = `${page + 1} / ${pageCount()}`;
  $('first').disabled = $('prev').disabled = page === 0;
  $('next').disabled = $('last').disabled = page >= pageCount() - 1;
}

async function refresh() {
  state = await loadState();
  render();
}

const go = (p) => {
  page = Math.max(0, Math.min(pageCount() - 1, p));
  render();
};
$('first').addEventListener('click', () => go(0));
$('prev').addEventListener('click', () => go(page - 1));
$('next').addEventListener('click', () => go(page + 1));
$('last').addEventListener('click', () => go(pageCount() - 1));

$('toggle').addEventListener('click', async () => {
  await send(state.running ? 'stop' : 'start');
  await refresh();
});

chrome.storage.onChanged.addListener(refresh);
setInterval(renderStatus, 1000);
refresh();
