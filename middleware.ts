import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET, 
  });

  const url = request.nextUrl.clone();
  console.log("Middleware Token:", token);

  if (url.pathname === "/home" && !token) {
    return NextResponse.redirect(new URL("/sign-up", request.url));
  }

  if ((url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up")) && token) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/sign-in", "/sign-up"],
};
