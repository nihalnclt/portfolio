# Handoff: Auto Follow extension + Pro purchase server

Written 2026-11-18 from a Claude Code session opened in `Mine/playground`.
Two folders are being moved into `Mine/portfolio`: `twitter-bot/` (the Chrome extension)
and `twitter-bot-server/` (server code staged for the portfolio Next.js app, plus this file).

## What this is

A Chrome MV3 extension that follows or unfollows X accounts from the user's own
logged-in session, on a random interval with a daily limit. It is being turned into a
paid product: Free = 10 actions per day, Pro = 400 per day, Pro is a one-time $9.99
purchase through Paddle, tied to a Google sign-in.

## State of the extension (`twitter-bot/`)

- Works as a UI and passes `node --check` on every script. It has had only brief real
  runs against X (an early version logged two successful follows). Everything added since
  (filters, activity check, unfollow, Pro tab, sign-in, purchase) is untested in Chrome.
- X page selectors (`UserCell`, `-follow` / `-unfollow` buttons, `userFollowIndicator`,
  `confirmationSheetConfirm`, `icon-verified`, `icon-lock`, profile avatar and counts)
  were written from memory. Expect to fix some once it runs.
- Files: `manifest.json` (v0.3.0), `background.js` (worker: scheduling, follow/unfollow,
  sign-in, licence), `popup.html/js` (tabs: Follow, Unfollow, Settings, Pro),
  `dashboard.html/js` (full-page status), `state.js` and `config.js` (shared),
  `ui.css` (X-style dark theme), `icons/`, `make-icons.py` (rebuilds icons from a logo).
- `config.js` holds all IDs and limits. `API_BASE` is `https://nihaln.com/autofollow/api`.
- Until the server is live nobody can be Pro, so the owner is capped at 10 per day too.
  Raise `FREE_DAILY` in `config.js` while testing.
- The Pro limit is enforced client-side and can be bypassed by editing the extension.

## State of the server (`twitter-bot-server/`)

In the portfolio app and building. Never run against Paddle. See Progress below.

- `src/` mirrors the portfolio layout (Next.js 14 app router, `@/` = `src/`, standalone
  Docker build). Copy it into the portfolio `src/`.
- Adds `POST /autofollow/api/auth/google`, `GET /autofollow/api/license`,
  `POST /autofollow/api/checkout`, and the page `/autofollow/checkout`.
- No database and no new npm packages. Pro status is answered by asking Paddle for paid
  transactions on customers with the signed-in email.
- Environment variables and Paddle notes are in `SERVER.md` next to this file.
- The portfolio `docker-compose.yml` has no environment section; add an env file and keep
  it out of git.

## External setup already done

- Paddle sandbox: product "Auto Follow Pro" `pro_01m7q06c4anxqmchzaa1tfj5re`, price
  $9.99 USD one-time `pri_01m7q07x3z0x0zprtyr9zhbrjx`.
- Paddle default payment link was deliberately left alone. It is
  `https://localhost:3041/settings/billing`, used by another product on the account.
  The server passes its own checkout URL per transaction instead.
- Google Cloud: project "Auto Follow" (`auto-follow-515109`), sign-in screen "Auto Follow",
  External audience, still in Testing mode. OAuth client "Auto Follow extension"
  (Web application), client ID
  `1024728485798-5sd4ckok1oaq9gcf7r515hoq3fpeaf8b.apps.googleusercontent.com`.

## Progress, 2026-11-18 (session opened in `Mine/portfolio`)

Done:

- Step 1. `twitter-bot-server/src` copied into the portfolio `src`. `pnpm build` passes with
  no type errors. The staged copy in `twitter-bot-server/` was deleted on 2026-11-18;
  the live code is `src/lib/autofollow.ts` and `src/app/(autofollow)/`.
- Env wiring. `docker-compose.yml` loads `.env.autofollow` (git-ignored, docker-ignored).
  The local file exists with everything filled in except `PADDLE_API_KEY` and
  `PADDLE_CLIENT_TOKEN`. `.env.autofollow.example` is the committed template. The file
  must also be created on the deploy server or `docker compose up` fails.
- Extension ID pinned. `twitter-bot/manifest.json` has a `key`, so the ID is
  `kdpebggapciepcpndkmemefbnbbfcndh` from any folder. The matching private key is
  `autofollow-extension-key.pem` in the portfolio root (git-ignored, only needed to pack a
  .crx). The ID was calculated, not yet read off `chrome://extensions`.
- Paddle calls checked against the API reference (not yet against the sandbox):
  `/customers?email=`, `/transactions?customer_id=&status=completed,paid`,
  `items[].price.product_id`, request `checkout.url` and response `data.checkout.url` all
  exist as written. Fixed: `per_page=50` was over the maximum of 30.
- Checkout page no longer races paddle.js loading.
- Ran the built server locally. Missing, forged and expired sessions give 401, a bad body
  gives 400, a junk Google token gives 401, a valid session without a Paddle key gives 500.

Found, not fixed:

- Paddle docs say `checkout.url` must be on an approved domain. Whether the sandbox
  enforces this for nihaln.com is unknown until the first real call.
- `/customers?email=` returns only active customers. An archived customer with the same
  email would make customer creation fail.
- `hasPro` reads only the first 30 transactions per customer.

## Sandbox test results, 2026-11-18

- Paddle sandbox API key `autofollow-server` created (Customers and Transactions, read and
  write only; expires 2027-02-16) and a client-side token. Both are in `.env.autofollow`.
- nihaln.com added under Website approval in the sandbox. Before that, transaction create
  failed with `transaction_checkout_url_domain_is_not_approved`.
- Server run locally against the sandbox with hand-signed sessions (Google sign-in skipped):
  `/license` gives `pro: false` before purchase, `/checkout` returns a
  `https://nihaln.com/autofollow/checkout?_ptxn=...` URL, the checkout page opens Paddle
  checkout, a test-card payment completes, `/license` then gives `pro: true`, a second
  `/checkout` gives 409 `already_pro`, and a different email stays `pro: false`.
- Sandbox now holds a test customer `autofollow-test@example.com` with one completed purchase.
- The price is tax-exclusive: an Indian buyer was charged $11.79 ($9.99 + $1.80 GST) while
  the extension says $9.99.

## Next steps, in order

1. Done 2026-11-18: redirect URI
   `https://kdpebggapciepcpndkmemefbnbbfcndh.chromiumapp.org/` added to the Google OAuth
   client (the old one was kept) and the owner's Google account added as a test user.
   Still to do: load `twitter-bot/` unpacked and confirm the ID on its card.
2. Deploy (create `.env.autofollow` on the server first), then run the whole flow from the
   extension: sign in, buy with a Paddle test card, press "I have already paid, check
   again", confirm the limit rises to 400. `/auth/google` has not been tested with a real
   Google token yet.
3. Before going live: publish the Google app, get nihaln.com approved in live Paddle,
   switch `PADDLE_ENV` to production with live IDs and keys, decide on tax-inclusive
   pricing, add refund handling and rate limiting.

## Deployed and hardened, 2026-11-18

- Commit `5ded7bc` is live on nihaln.com (server `suneer@10.199.100.132`,
  `/home/suneer/apps/portfolio`, `docker compose up -d --build`), running with Paddle
  sandbox credentials. The full flow passed from the extension: Google sign-in, test-card
  purchase, licence reports Pro.
- Written after that deploy, not yet deployed: refund handling (a purchase whose refunds plus
  chargebacks cover the full amount paid no longer counts as Pro; partial refunds keep Pro)
  and per-IP rate limits (licence 30, sign-in 10, checkout 5 per minute, answered with 429).
  The refund rule reads `adjustments_totals.breakdown` and has not been tried against a real
  refund; whether Paddle counts pending refunds there is unknown.
- The 400 per day Pro limit cannot be enforced by the server: follows happen in the buyer's
  own browser and the server never sees them.

## Open risks the owner has been told about

- Selling a follow-automation tool breaks X's automation rules; buyers' accounts can be locked.
- The logo contains X's trademark.
- Paddle reviews products before live selling and may decline this one. Not checked.
