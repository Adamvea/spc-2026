export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { signAdminToken, verifyAdminPassword, COOKIE_NAME, TOKEN_TTL_SECONDS } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Password is required." }, { status: 400 });
    }

    if (!verifyAdminPassword(password)) {
      // Artificial delay to slow brute-force
      await new Promise((r) => setTimeout(r, 800));
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }

    const token = await signAdminToken();

    const res = NextResponse.json({ success: true });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: TOKEN_TTL_SECONDS,
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
