import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get('token');
  const isAuthorized = !!token;

  console.log(token)

  if (req.nextUrl.pathname.startsWith("/login") && isAuthorized) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return isAuthorized || req.nextUrl.pathname.startsWith("/login")
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|/api|api/api).*)",
  ],
};