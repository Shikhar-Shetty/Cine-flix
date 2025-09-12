import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // remove cookieName entirely
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl.clone();

  console.log("Middleware token:", token);

  if ((url.pathname === "/home" || url.pathname.startsWith("/home/") || url.pathname === "/bookings") && !token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if ((url.pathname === "/" || url.pathname === "/sign-in" || url.pathname === "/sign-up") && token) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/home/:path*", "/sign-in", "/sign-up", "/", "/bookings"],
};
