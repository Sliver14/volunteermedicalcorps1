import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isPortalPage = req.nextUrl.pathname.startsWith("/portal");
    const isElearnDashboard = req.nextUrl.pathname.startsWith("/elearn/dashboard");
    const isAdminPage = req.nextUrl.pathname.startsWith("/envmc/dashboard");

    if (isPortalPage || isElearnDashboard) {
      if (!isAuth) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    if (isAdminPage) {
      if (!isAuth) {
        return NextResponse.redirect(new URL("/envmc", req.url));
      }
      if (token.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => true, // Let the middleware function handle the logic
    },
  }
);

export const config = {
  matcher: ["/envmc/dashboard/:path*", "/portal/:path*", "/elearn/dashboard/:path*"],
};
