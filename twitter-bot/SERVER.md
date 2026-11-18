# Auto Follow server (in the portfolio Next.js app)

The server code lives in the portfolio app: `src/lib/autofollow.ts` and
`src/app/(autofollow)/`. Progress and history are in `HANDOFF.md` next to this file.

## What it adds

| Path on nihaln.com | Purpose |
| --- | --- |
| `/x-autofollow` | Product page with pricing |
| `/x-autofollow/terms`, `/x-autofollow/privacy` | Terms of service and privacy notice |
| `POST /x-autofollow/api/auth/google` | Verifies a Google ID token, returns `{session, email, pro}` |
| `GET /x-autofollow/api/license` | Returns `{email, pro}` for a session |
| `POST /x-autofollow/api/checkout` | Creates a Creem checkout, returns `{url}` (hosted by Creem) |
| `/x-autofollow/success` | Where Creem sends the buyer after payment |

Old `/autofollow/...` paths redirect to `/x-autofollow/...`.

No database. "Is this account Pro?" is answered by asking Creem: the customer with that
email, their orders for the Pro product, and whether the payment still stands (a refunded
or charged back payment does not count). No new npm dependencies.

## Environment variables (server only, never commit)

| Name | Value |
| --- | --- |
| `CREEM_ENV` | `test` or `production` |
| `CREEM_API_KEY` | From Creem > Settings > API keys. Needs Checkouts read and write, Products read, Customers read, Transactions read |
| `CREEM_PRODUCT_ID` | The "Auto Follow Pro" product id (`prod_...`); test and live ids differ |
| `AUTOFOLLOW_GOOGLE_CLIENT_ID` | Same as the extension's `config.js` (public) |
| `AUTOFOLLOW_SUCCESS_URL` | `https://nihaln.com/x-autofollow/success` |
| `AUTOFOLLOW_SESSION_SECRET` | Long random string, e.g. `openssl rand -base64 48` |

`docker-compose.yml` loads `.env.autofollow` (git-ignored). Copy `.env.autofollow.example`,
fill it in, and create the same file on the deploy server.

## Not verified yet

- Refund handling relies on Creem's transaction `status` (`refunded`, `chargedBack`); no
  refund has been tried in Creem test mode.
- Only the first 50 orders and transactions per customer are read.
- Creem's rules prohibit "online traffic and engagement services"; the store's identity
  check and product review were still pending when this was written.
