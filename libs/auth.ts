import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtVerify, SignJWT, type JWTPayload } from "jose";

const getSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }
  return new TextEncoder().encode(process.env.JWT_SECRET);
};

export const createToken = async (payload: JWTPayload) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
};

export const verifyToken = async (token: string): Promise<JWTPayload> => {
  const { payload } = await jwtVerify(token, getSecret());
  return payload;
};

export const unauthorizedResponse = () =>
  NextResponse.json({ error: "Bạn cần đăng nhập để tiếp tục" }, { status: 401 });

export const forbiddenResponse = () =>
  NextResponse.json({ error: "Bạn không có quyền thực hiện thao tác này" }, { status: 403 });

export async function getCurrentUserFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    return await verifyToken(token);
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const user = await getCurrentUserFromCookie();
  if (!user) return { user: null, response: unauthorizedResponse() };
  if (user.role !== "admin") return { user, response: forbiddenResponse() };
  return { user, response: null };
}
