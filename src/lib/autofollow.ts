// Server-side helpers for the Auto Follow extension: Google sign-in, sessions, and
// Creem one-time purchase checks. No database: Creem is the source of truth.
// Uses only Node built-ins and fetch. Never import this from a client component.
import { createHmac, timingSafeEqual } from "node:crypto";

function env(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable ${name}`);
  return v;
}

const CREEM_BASE = () =>
  process.env.CREEM_ENV === "production" ? "https://api.creem.io" : "https://test-api.creem.io";

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

// ---------- Creem ----------

async function creem(path: string, init?: { method?: string; body?: unknown }) {
  const res = await fetch(CREEM_BASE() + path, {
    method: init?.method || "GET",
    headers: { "x-api-key": env("CREEM_API_KEY"), "Content-Type": "application/json" },
    body: init?.body ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, json };
}

/** The Creem customer id for this email, or null if they have never checked out. */
async function customerId(email: string): Promise<string | null> {
  const r = await creem("/v1/customers?email=" + encodeURIComponent(email));
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`Creem customer lookup failed (${r.status})`);
  return typeof r.json.id === "string" ? r.json.id : null;
}

type CreemOrder = { id: string; product?: string | { id?: string }; status?: string };
type CreemTx = { order?: string | null; status?: string };

// A payment that still stands. Refunded and charged back payments are left out;
// a partial refund (tax, goodwill) keeps Pro.
const STANDING = new Set(["paid", "partialRefund"]);

/** True if this email has a paid, not refunded order for the Pro product. */
export async function hasPro(email: string): Promise<boolean> {
  const productId = env("CREEM_PRODUCT_ID");
  const id = await customerId(email);
  if (!id) return false;

  const orders = await creem(`/v1/customers/${id}/orders?page_size=50`);
  if (!orders.ok) throw new Error(`Creem orders lookup failed (${orders.status})`);
  const proOrders = new Set(
    ((orders.json.items || []) as CreemOrder[])
      .filter((o) => (typeof o.product === "string" ? o.product : o.product?.id) === productId)
      .map((o) => o.id),
  );
  if (proOrders.size === 0) return false;

  const txs = await creem(`/v1/transactions/search?customer_id=${id}&page_size=50`);
  if (!txs.ok) throw new Error(`Creem transactions lookup failed (${txs.status})`);
  return ((txs.json.items || []) as CreemTx[]).some(
    (t) => !!t.order && proOrders.has(t.order) && STANDING.has(t.status || ""),
  );
}

/** Creates a Creem checkout for this email and returns its hosted checkout URL. */
export async function createCheckoutUrl(email: string): Promise<string> {
  const r = await creem("/v1/checkouts", {
    method: "POST",
    body: {
      product_id: env("CREEM_PRODUCT_ID"),
      customer: { email },
      success_url: process.env.AUTOFOLLOW_SUCCESS_URL || "https://nihaln.com/x-autofollow/success",
      metadata: { email },
    },
  });
  const url = r.json?.checkout_url;
  if (!r.ok || typeof url !== "string") throw new Error(`Creem checkout create failed (${r.status})`);
  return url;
}

// ---------- Rate limiting ----------

// Fixed window, kept in memory. Good enough for one container; it resets on restart and
// would need a shared store if the app ever runs as several instances.
const hits = new Map<string, { count: number; resetAt: number }>();

/** Returns true if this caller is over `max` requests per minute for `bucket`. */
export function rateLimited(request: Request, bucket: string, max: number): boolean {
  const now = Date.now();
  // The site sits behind Cloudflare, which sets cf-connecting-ip itself, so a caller cannot fake it.
  const h = request.headers;
  const ip =
    h.get("cf-connecting-ip") ||
    h.get("x-real-ip") ||
    (h.get("x-forwarded-for") || "").split(",")[0].trim() ||
    "unknown";
  const key = `${bucket}:${ip}`;
  if (hits.size > 10000) {
    hits.forEach((v, k) => {
      if (v.resetAt <= now) hits.delete(k);
    });
  }
  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  entry.count += 1;
  return entry.count > max;
}
