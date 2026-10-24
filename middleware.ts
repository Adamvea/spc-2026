import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "change-this-secret-in-production-min-32-chars"
);

const COOKIE_NAME = "spc_admin_token";

// Routes that require admin auth (server-side protection)
const PROTECTED_PREFIXES = ["/admin/dashboard", "/api/admin/registrations", "/api/admin/export"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin?next=" + encodeURIComponent(pathname), req.url));
  }

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    if (payload.role !== "admin") throw new Error("Not admin");
    return NextResponse.next();
  } catch {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const res = NextResponse.redirect(new URL("/admin", req.url));
    res.cookies.delete(COOKIE_NAME);
    return res;
  }
}

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/api/admin/registrations/:path*",
    "/api/admin/export/:path*",
  ],
};
