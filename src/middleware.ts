import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function myMiddleware(request: NextRequest) {
  const protectedPaths = [
    "/accounts",
    "/register/username",
    "/dashboard",
    "/settings",
    "/character",
    "/register/account-ingame",
    "/servers",
  ];

  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  if (isProtectedPath) {
    const cookie = request.cookies.get("token");

    if (!cookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}
