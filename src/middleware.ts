import { NextResponse } from "next/server";

export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*", "/elearn/dashboard/:path*"],
};
