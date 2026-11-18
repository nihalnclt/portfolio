// Server-side helpers for the Auto Follow extension: Google sign-in, sessions, and
// Paddle one-time purchase checks. No database: Paddle is the source of truth.
// Uses only Node built-ins and fetch. Never import this from a client component.
import { createHmac, timingSafeEqual } from "node:crypto";

function env(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable ${name}`);
  return v;
}

const PADDLE_BASE = () =>
  process.env.PADDLE_ENV === "production" ? "https://api.paddle.com" : "https://sandbox-api.paddle.com";

// ---------- Sessions (signed, stateless) ----------

const b64 = (s: string) => Buffer.from(s).toString("base64url");
const sign = (data: string) => createHmac("sha256", env("AUTOFOLLOW_SESSION_SECRET")).update(data).digest("base64url");

export function createSession(email: string): string {
  const payload = b64(JSON.stringify({ email, exp: Date.now() + 365 * 24 * 60 * 60 * 1000 }));
  return `${payload}.${sign(payload)}`;
}

/** Returns the signed-in email, or null if the token is missing, forged or expired. */
export function readSession(request: Request): string | null {
  const header = request.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const { email, exp } = JSON.parse(Buffer.from(payload, "base64url").toString());
    return typeof email === "string" && typeof exp === "number" && exp > Date.now() ? email : null;
  } catch {
    return null;
  }
}

// ---------- Google ----------

/** Verifies a Google ID token with Google and returns the verified email, or null. */
export async function verifyGoogleIdToken(idToken: string, nonce: string): Promise<string | null> {
  const res = await fetch("https://oauth2.googleapis.com/tokeninfo?id_token=" + encodeURIComponent(idToken), {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const t = await res.json();
  const issuerOk = t.iss === "https://accounts.google.com" || t.iss === "accounts.google.com";
  const fresh = Number(t.exp) * 1000 > Date.now();
  const verified = t.email_verified === "true" || t.email_verified === true;
  if (t.aud !== env("AUTOFOLLOW_GOOGLE_CLIENT_ID") || !issuerOk || !fresh || !verified || t.nonce !== nonce) return null;
  return typeof t.email === "string" ? t.email.toLowerCase() : null;
}

// ---------- Paddle ----------

async function paddle(path: string, init?: { method?: string; body?: unknown }) {
  const res = await fetch(PADDLE_BASE() + path, {
    method: init?.method || "GET",
    headers: { Authorization: `Bearer ${env("PADDLE_API_KEY")}`, "Content-Type": "application/json" },
    body: init?.body ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, json };
}

async function customerIds(email: string): Promise<string[]> {
  const r = await paddle("/customers?email=" + encodeURIComponent(email));
  if (!r.ok) throw new Error(`Paddle customers lookup failed (${r.status})`);
  return (r.json.data || []).map((c: { id: string }) => c.id);
}

/** True if any Paddle customer with this email has a paid transaction for the Pro product. */
export async function hasPro(email: string): Promise<boolean> {
  const productId = env("PADDLE_PRODUCT_ID");
  for (const id of await customerIds(email)) {
    const r = await paddle(`/transactions?customer_id=${id}&status=completed,paid&per_page=30`);
    if (!r.ok) throw new Error(`Paddle transactions lookup failed (${r.status})`);
    for (const tx of r.json.data || []) {
      for (const item of tx.items || []) {
        if (item.price?.product_id === productId) return true;
      }
    }
  }
  return false;
}

/** Creates a Paddle transaction for this email and returns its checkout URL. */
export async function createCheckoutUrl(email: string): Promise<string> {
  let [customerId] = await customerIds(email);
  if (!customerId) {
    const created = await paddle("/customers", { method: "POST", body: { email } });
    if (!created.ok) throw new Error(`Paddle customer create failed (${created.status})`);
    customerId = created.json.data.id;
  }
  const tx = await paddle("/transactions", {
    method: "POST",
    body: {
      items: [{ price_id: env("PADDLE_PRICE_ID"), quantity: 1 }],
      customer_id: customerId,
      // Per-transaction checkout page. This overrides the account's default payment link,
      // which is shared with other products on the same Paddle account and must not change.
      checkout: { url: env("AUTOFOLLOW_CHECKOUT_URL") },
    },
  });
  const url = tx.json?.data?.checkout?.url;
  if (!tx.ok || !url) throw new Error(`Paddle transaction create failed (${tx.status})`);
  return url;
}
