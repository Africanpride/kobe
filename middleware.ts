import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Fallback Session type to avoid dependency on "@/lib/auth".
// Adjust this shape to match your real session type if/when that module is available.
type Session = {
  user?: {
    emailVerified?: boolean;
    [key: string]: unknown;
  } | null;
  [key: string]: unknown;
};
// 1. Specify protected and public routes
const protectedRoutes = ["/admin", "/profile"];
const publicRoutes = [
  "/auth/login",
  "/auth/signup",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/emailVerification",
  "/auth/verify-email",
  "/auth/logout",
];
const publicButProtected = ["/auth/emailVerification"];

export async function middleware(request: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const isPublicButProtected = publicButProtected.includes(path);

  const cookies = getSessionCookie(request);

if (isProtectedRoute && !cookies) {
  const callbackUrl = encodeURIComponent(request.nextUrl.pathname);
  return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${callbackUrl}`, request.url));
}

  
  // if (isPublicButProtected && !cookies) {
  //   return NextResponse.redirect(new URL("/auth/login", request.url));
  // }

  // if (request.nextUrl.pathname.startsWith('/sign-in')) {
  //   return NextResponse.rewrite(new URL('/auth/sign-in', request.url))
  // }
  

  // const { data: session } = await betterFetch<Session>(
  //   "/api/auth/get-session",
  //   {
  //     baseURL: request.nextUrl.origin,
  //     headers: {
  //       cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
  //     },
  //   }
  // );
  // if (session && session.user) {
  //   console.log("SESSION DATA: ", session.user.emailVerified);
  // } else {
  //   console.log("No session data available.");
  // }
  return NextResponse.next();
}