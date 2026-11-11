import { jwtVerify, SignJWT } from "jose";

// Pure token logic, shared by proxy.ts and the server code. No next/headers here.

const ISSUER = "portfolio-admin";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

/** `__Host-` pins the cookie to this exact host over HTTPS. Plain HTTP dev can't use the prefix. */
export const SESSION_COOKIE = process.env.NODE_ENV === "production" ? "__Host-admin_session" : "admin_session";

export interface AdminSession {
  /** Numeric GitHub user id, as a string. */
  id: string;
  login: string;
}

const secretKey = () => {
  const secret = process.env.SESSION_SECRET ?? "";
  if (secret.length < 32) throw new Error("SESSION_SECRET must be at least 32 characters");
  return new TextEncoder().encode(secret);
};

export const signSession = (session: AdminSession) =>
  new SignJWT({ login: session.login })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.id)
    .setIssuer(ISSUER)
    .setAudience(ISSUER)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(secretKey());

/** The session, only if the token is genuine, unexpired and belongs to ADMIN_GITHUB_ID. */
export async function verifySession(token: string | undefined): Promise<AdminSession | null> {
  const adminId = process.env.ADMIN_GITHUB_ID?.trim();
  if (!token || !adminId) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: ["HS256"], issuer: ISSUER, audience: ISSUER });
    if (payload.sub !== adminId) return null;
    return { id: payload.sub, login: typeof payload.login === "string" ? payload.login : "" };
  } catch {
    return null;
  }
}
