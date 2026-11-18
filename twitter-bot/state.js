// Shared by popup.html and dashboard.html.
const DEFAULTS = { minMin: 8, maxMin: 14, dailyCap: 80, batchSize: 6, cooldownMin: 10, errorPauseMin: 30 };

const send = (type) => chrome.runtime.sendMessage({ type });

// Read state straight from storage so pages never depend on the
// background worker being awake or up to date.
async function loadState() {
  const s = await chrome.storage.local.get(null);
  const settings = { ...DEFAULTS };
  for (const k in DEFAULTS) if (Number.isFinite(s.settings?.[k])) settings[k] = s.settings[k];
  // Only what the pages need: never hand the session token to page code.
  const account = s.account ? { email: s.account.email, pro: !!s.account.pro } : null;
  return {
    account,
    cap: effectiveCap(settings, account),
    mode: s.mode === 'unfollow' ? 'unfollow' : 'follow',
    target: s.target || '',
    targets: Array.isArray(s.targets) && s.targets.length ? s.targets : s.target ? [s.target] : [],
    keywords: Array.isArray(s.keywords) ? s.keywords : [],
    sources:
      Array.isArray(s.sources) && s.sources.length
        ? s.sources
        : s.target
          ? [{ kind: 'list', handle: s.target, list: s.listType === 'following' ? 'following' : 'followers' }]
          : [],
    sourceIndex: Number.isInteger(s.sourceIndex) ? s.sourceIndex : 0,
    listType: s.listType === 'following' ? 'following' : 'followers',
    onlyNonFollowers: s.onlyNonFollowers !== false,
    filters: { verifiedOnly: false, skipProtected: false, requireBio: false, requireAvatar: false, activeDays: 0, ...s.filters },
    myHandle: s.myHandle || '',
    profile: s.profile || null,
    settings,
    running: !!s.running,
    dayCount: s.dayCount || 0,
    log: s.log || [],
    nextAt: s.nextAt || 0,
  };
}

// Focus the dashboard tab if it is already open, otherwise open it.
async function openDashboard() {
  const url = chrome.runtime.getURL('dashboard.html');
  const [existing] = await chrome.tabs.query({ url });
  if (existing) {
    await chrome.tabs.update(existing.id, { active: true });
    await chrome.windows.update(existing.windowId, { focused: true });
  } else {
    await chrome.tabs.create({ url });
  }
}
