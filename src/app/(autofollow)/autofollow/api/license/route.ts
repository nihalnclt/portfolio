import { NextResponse } from "next/server";
import { hasPro, rateLimited, readSession } from "@/lib/autofollow";

export const dynamic = "force-dynamic";

// GET with Authorization: Bearer <session> -> {email, pro}
export async function GET(request: Request) {
  if (rateLimited(request, "license", 30)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }
  const email = readSession(request);
  if (!email) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    return NextResponse.json({ email, pro: await hasPro(email) });
  } catch (e) {
    console.error("[autofollow] license check failed", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
