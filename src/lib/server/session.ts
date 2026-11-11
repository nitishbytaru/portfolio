import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, SESSION_TTL_SECONDS, signSession, verifySession, type AdminSession } from "./session-token";

/** One-time OAuth `state`, scoped to the auth routes. */
export const STATE_COOKIE = "admin_oauth_state";

export class NotSignedInError extends Error {
  constructor() {
    super("You're signed out. Sign in again and retry.");
  }
}

export const cookieOptions = (maxAge: number, path = "/") => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path,
  maxAge,
});

export async function getAdmin(): Promise<AdminSession | null> {
  const store = await cookies();
  return verifySession(store.get(SESSION_COOKIE)?.value);
}

/** For server actions and route handlers: every write checks the session itself. */
export async function assertAdmin(): Promise<AdminSession> {
  const admin = await getAdmin();
  if (!admin) throw new NotSignedInError();
  return admin;
}

/** For admin pages. */
export async function requireAdminPage(): Promise<AdminSession> {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

export async function startSession(session: AdminSession) {
  const store = await cookies();
  store.set(SESSION_COOKIE, await signSession(session), cookieOptions(SESSION_TTL_SECONDS));
}

export async function endSession() {
  const store = await cookies();
  store.delete({ name: SESSION_COOKIE, path: "/", secure: process.env.NODE_ENV === "production" });
}
