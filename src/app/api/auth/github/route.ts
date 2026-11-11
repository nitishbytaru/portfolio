import { randomBytes } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { authEnv, ConfigError } from "@/lib/server/env";
import { cookieOptions, STATE_COOKIE } from "@/lib/server/session";

export const dynamic = "force-dynamic";

// Step 1 of sign-in: send the browser to GitHub with a one-time `state` tied to this browser.
export async function GET(request: NextRequest) {
  let clientId: string;
  try {
    clientId = authEnv().clientId;
  } catch (error) {
    if (error instanceof ConfigError) return NextResponse.redirect(new URL("/admin/login?error=config", request.url));
    throw error;
  }

  const state = randomBytes(32).toString("base64url");
  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", clientId);
  authorize.searchParams.set("redirect_uri", new URL("/api/auth/callback", request.url).toString());
  authorize.searchParams.set("state", state);
  authorize.searchParams.set("allow_signup", "false");
  // No scope: reading the public profile is enough to learn the user id.

  const response = NextResponse.redirect(authorize);
  response.cookies.set(STATE_COOKIE, state, cookieOptions(10 * 60, "/api/auth"));
  return response;
}
