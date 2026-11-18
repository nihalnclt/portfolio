// Shared by background.js (importScripts) and by popup.html / dashboard.html.
// Nothing in this file is secret. The Paddle API key lives only on the server.
const CONFIG = {
  // Your server, no trailing slash. Routes live in the portfolio Next.js app.
  // It implements:
  //   POST /auth/google   body {id_token, nonce}        -> {session, email, pro}
  //   GET  /license       Authorization: Bearer session -> {email, pro}
  //   POST /checkout      Authorization: Bearer session -> {url}  (Paddle checkout URL for this account)
  API_BASE: 'https://nihaln.com/autofollow/api',

  // Google OAuth client id (type "Web application") whose authorised redirect URI is
  // https://<extension-id>.chromiumapp.org/
  GOOGLE_CLIENT_ID: '1024728485798-5sd4ckok1oaq9gcf7r515hoq3fpeaf8b.apps.googleusercontent.com',

  // Paddle sandbox catalogue, for reference by the server and checkout page.
  PADDLE_PRODUCT_ID: 'pro_01m7q06c4anxqmchzaa1tfj5re',
  PADDLE_PRICE_ID: 'pri_01m7q07x3z0x0zprtyr9zhbrjx',

  FREE_DAILY: 10, // follows + unfollows per day on the Free plan
  PRO_DAILY: 400,
  PRICE_LABEL: '$9.99',
};

// The daily limit actually applied: the user's own setting, capped by their plan.
function effectiveCap(settings, account) {
  return Math.min(settings.dailyCap, account && account.pro ? CONFIG.PRO_DAILY : CONFIG.FREE_DAILY);
}
