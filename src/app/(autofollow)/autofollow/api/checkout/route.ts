import { NextResponse } from "next/server";
import { createCheckoutUrl, hasPro, rateLimited, readSession } from "@/lib/autofollow";

export const dynamic = "force-dynamic";

// POST with Authorization: Bearer <session> -> {url}
export async function POST(request: Request) {
  if (rateLimited(request, "checkout", 5)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }
  const email = readSession(request);
  if (!email) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    if (await hasPro(email)) return NextResponse.json({ error: "already_pro" }, { status: 409 });
    return NextResponse.json({ url: await createCheckoutUrl(email) });
  } catch (e) {
    console.error("[autofollow] checkout failed", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
