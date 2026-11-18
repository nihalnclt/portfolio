import { NextResponse } from "next/server";
import { createSession, hasPro, verifyGoogleIdToken } from "@/lib/autofollow";

export const dynamic = "force-dynamic";

// POST {id_token, nonce} -> {session, email, pro}
export async function POST(request: Request) {
  try {
    const { id_token, nonce } = await request.json();
    if (typeof id_token !== "string" || typeof nonce !== "string") {
      return NextResponse.json({ error: "bad_request" }, { status: 400 });
    }
    const email = await verifyGoogleIdToken(id_token, nonce);
    if (!email) return NextResponse.json({ error: "invalid_token" }, { status: 401 });
    return NextResponse.json({ session: createSession(email), email, pro: await hasPro(email) });
  } catch (e) {
    console.error("[autofollow] auth failed", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
