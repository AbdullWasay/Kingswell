import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import {
  AdminSession,
  defaultSession,
  sessionOptions,
} from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute =
    pathname.startsWith("/kingswell-admin") ||
    pathname.startsWith("/api/admin");

  if (!isAdminRoute) return NextResponse.next();

  const isLoginPage = pathname === "/kingswell-admin";
  const isLoginApi = pathname === "/api/admin/auth/login";

  if (isLoginApi) return NextResponse.next();

  const response = NextResponse.next();
  const session = await getIronSession<AdminSession>(
    request,
    response,
    sessionOptions
  );

  if (!session.isLoggedIn) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!isLoginPage) {
      return NextResponse.redirect(new URL("/kingswell-admin", request.url));
    }
    return response;
  }

  if (isLoginPage) {
    return NextResponse.redirect(
      new URL("/kingswell-admin/dashboard", request.url)
    );
  }

  return response;
}

export const config = {
  matcher: ["/kingswell-admin", "/kingswell-admin/:path*", "/api/admin/:path*"],
};
