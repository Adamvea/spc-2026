import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "change-this-secret-in-production-min-32-chars"
);

const COOKIE_NAME = "spc_admin_token";
const TOKEN_TTL_SECONDS = 60 * 60 * 24; // 24 hours

export async function signAdminToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_TTL_SECONDS}s`)
    .sign(SECRET_KEY);
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function getAdminTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const token = await getAdminTokenFromCookies();
  if (!token) return false;
  return verifyAdminToken(token);
}

export async function isAdminAuthenticatedFromRequest(
  req: NextRequest
): Promise<boolean> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyAdminToken(token);
}

export function verifyAdminPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    console.error("ADMIN_PASSWORD environment variable is not set.");
    return false;
  }
  return input === expected;
}

export { COOKIE_NAME, TOKEN_TTL_SECONDS };
