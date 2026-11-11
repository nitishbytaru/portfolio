import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/server/session-token";

// Page gate for /admin. Server actions and the upload route check the session again themselves.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return noindex(NextResponse.next());

  const session = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);
  if (session) return noindex(NextResponse.next());

  const login = new URL("/admin/login", request.url);
  return noindex(NextResponse.redirect(login));
}

const noindex = (response: NextResponse) => {
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("Cache-Control", "no-store");
  return response;
};

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
