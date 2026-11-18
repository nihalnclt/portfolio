# Auto Follow server (for the portfolio Next.js app)

The server code lives in the portfolio app: `src/lib/autofollow.ts` and
`src/app/(autofollow)/`. Progress and remaining steps are in `HANDOFF.md` next to this file.

## What it adds

| Path on nihaln.com | Purpose |
| --- | --- |
| `POST /autofollow/api/auth/google` | Verifies a Google ID token, returns `{session, email, pro}` |
| `GET /autofollow/api/license` | Returns `{email, pro}` for a session |
| `POST /autofollow/api/checkout` | Creates a Paddle transaction, returns `{url}` |
| `/autofollow/checkout` | Page that opens the Paddle checkout (set as Paddle's default payment link) |

No database. "Is this account Pro?" is answered by asking Paddle for paid transactions
on customers with that email. No new npm dependencies.

## Environment variables (server only, never commit)

| Name | Value |
| --- | --- |
| `PADDLE_ENV` | `sandbox` or `production` |
| `PADDLE_API_KEY` | Secret API key from Paddle > Developer tools > Authentication |
| `PADDLE_CLIENT_TOKEN` | Client-side token from the same page (public) |
| `PADDLE_PRODUCT_ID` | `pro_01m7q06c4anxqmchzaa1tfj5re` (sandbox) |
| `PADDLE_PRICE_ID` | `pri_01m7q07x3z0x0zprtyr9zhbrjx` (sandbox) |
| `AUTOFOLLOW_GOOGLE_CLIENT_ID` | `1024728485798-5sd4ckok1oaq9gcf7r515hoq3fpeaf8b.apps.googleusercontent.com` (public, same as the extension's `config.js`) |
| `AUTOFOLLOW_CHECKOUT_URL` | `https://nihaln.com/autofollow/checkout` |
| `AUTOFOLLOW_SESSION_SECRET` | Long random string, e.g. `openssl rand -base64 48` |

The portfolio `docker-compose.yml` loads `.env.autofollow` (git-ignored). Copy
`.env.autofollow.example`, fill it in, and create the same file on the deploy server.

## Paddle dashboard

- Do NOT change Checkout settings > Default payment link. It is currently
  `https://localhost:3041/settings/billing`, used by another product on this account.
  Auto Follow passes its own checkout URL on each transaction (`AUTOFOLLOW_CHECKOUT_URL`).
- Live mode also needs nihaln.com approved under Checkout > Website approval.

## Not verified yet

- Paddle request and response shapes were written from memory of the Billing API
  (`/customers?email=`, `/transactions?customer_id=&status=`, `items[].price.product_id`,
  `data.checkout.url`, and the `checkout.url` override on transaction create).
  Test each endpoint against the sandbox before trusting it.
- Refunds are not handled: a refunded purchase still counts as Pro.
- There is no rate limiting on these endpoints.
