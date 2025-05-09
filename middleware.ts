import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl.clone();

  console.log("TOKEN:", token);

  if (url.pathname === "/home") {
    if (!token) {
      return NextResponse.redirect(new URL("/sign-up", request.url));
    }
  }

  if (url.pathname.startsWith("/sign-up") || url.pathname.startsWith("/sign-in")) {
    if (token) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  if (url.pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/sign-in", "/sign-up", "/"],
};
