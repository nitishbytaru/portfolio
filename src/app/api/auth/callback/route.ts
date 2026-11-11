import { timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { authEnv } from "@/lib/server/env";
import { cookieOptions, startSession, STATE_COOKIE } from "@/lib/server/session";

export const dynamic = "force-dynamic";

const sameState = (a: string, b: string) => {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
};

// Step 2 of sign-in: GitHub sends the browser back with a code. Access is granted only to
// ADMIN_GITHUB_ID; the GitHub access token is used once and never stored.
export async function GET(request: NextRequest) {
  const fail = (reason: string) => {
    const response = NextResponse.redirect(new URL(`/admin/login?error=${reason}`, request.url));
    response.cookies.set(STATE_COOKIE, "", cookieOptions(0, "/api/auth"));
    return response;
  };

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const expected = request.cookies.get(STATE_COOKIE)?.value;
  if (!code || !state || !expected || !sameState(state, expected)) return fail("state");

  let env: ReturnType<typeof authEnv>;
  try {
    env = authEnv();
  } catch {
    return fail("config");
  }

  try {
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: env.clientId,
        client_secret: env.clientSecret,
        code,
        redirect_uri: new URL("/api/auth/callback", request.url).toString(),
      }),
      cache: "no-store",
    });
    const { access_token: accessToken } = (await tokenResponse.json()) as { access_token?: string };
    if (!accessToken) return fail("github");

    const userResponse = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/vnd.github+json" },
      cache: "no-store",
    });
    if (!userResponse.ok) return fail("github");
    const user = (await userResponse.json()) as { id?: number; login?: string };

    // The numeric id, not the username: usernames can change hands.
    if (String(user.id) !== env.adminId) return fail("denied");

    await startSession({ id: String(user.id), login: user.login ?? "" });
  } catch {
    return fail("github");
  }

  const response = NextResponse.redirect(new URL("/admin", request.url));
  response.cookies.set(STATE_COOKIE, "", cookieOptions(0, "/api/auth"));
  return response;
}
