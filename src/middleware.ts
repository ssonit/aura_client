import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { decodeJWT } from "./utils/helpers";
import authApiRequest from "./actions/auth";

const privatePaths = ["/home"];
const authPaths = ["/login", "/register"];

const detailRegex = [/^\/pin\/[a-zA-Z0-9-]+$/, /^\/profile\/[a-zA-Z0-9-]+$/];

const pinDetailRegex = /^\/pin\/[a-zA-Z0-9-]+$/;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const access_token = getCookie("access_token", { cookies });

  if (access_token) {
    const expAccessToken = decodeJWT(access_token).exp * 1000;
    const now = new Date().getTime();

    if (expAccessToken <= now) {
      await authApiRequest.logout();
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Chưa đăng nhập thì không cho vào private paths
  if (privatePaths.some((path) => pathname.startsWith(path)) && !access_token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Đăng nhập rồi thì không cho vào login/register nữa
  if (authPaths.some((path) => pathname.startsWith(path)) && access_token) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (detailRegex.some((path) => pathname.match(path)) && !access_token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/register", "/home", "/profile/:path*", "/pin/:path*"],
};
