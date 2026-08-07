import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    const roleMap: Record<string, string> = {
      "/student": "student",
      "/faculty": "faculty",
      "/coordinator": "coordinator",
      "/admin": "admin",
    };

    for (const prefix in roleMap) {
      if (path.startsWith(prefix) && token?.role !== roleMap[prefix]) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }
    return NextResponse.next();
  },
  { callbacks: { authorized: ({ token }) => !!token } }
);

export const config = {
  matcher: ["/student/:path*", "/faculty/:path*", "/coordinator/:path*", "/admin/:path*"],
};