import { verifyToken } from "@/libs/auth";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname !== "/admin" && !pathname.startsWith("/admin/")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("next", pathname);

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    const payload = await verifyToken(token);

    if (payload.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
