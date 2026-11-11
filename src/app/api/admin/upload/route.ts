import { NextResponse, type NextRequest } from "next/server";
import { getAdmin } from "@/lib/server/session";
import { createBlob, GitHubError } from "@/lib/server/github";
import { MAX_UPLOAD_BYTES, newUploadPath, sniffImage } from "@/lib/server/uploads";
import { ConfigError } from "@/lib/server/env";

export const dynamic = "force-dynamic";

const error = (message: string, status: number) => NextResponse.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } });

// One image per request. The image is stored as a git blob; it only becomes part of the repo when
// a save that references it is committed.
export async function POST(request: NextRequest) {
  if (!(await getAdmin())) return error("You're signed out. Sign in again and retry.", 401);

  // Same-origin only. The session cookie is SameSite=Lax as well.
  const origin = request.headers.get("origin");
  if (!origin || origin !== request.nextUrl.origin) return error("Upload refused.", 403);

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_UPLOAD_BYTES + 64 * 1024) return error("That image is too large. Keep uploads under 4 MB.", 413);

  let file: FormDataEntryValue | null;
  try {
    file = (await request.formData()).get("file");
  } catch {
    return error("Couldn't read the upload.", 400);
  }
  if (!(file instanceof File)) return error("No image was sent.", 400);
  if (file.size === 0 || file.size > MAX_UPLOAD_BYTES) return error("That image is too large. Keep uploads under 4 MB.", 413);

  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = sniffImage(bytes, file.type);
  if (!ext) return error("Only PNG, JPEG and WebP images can be uploaded.", 415);

  try {
    const path = newUploadPath(ext);
    const sha = await createBlob(bytes);
    return NextResponse.json({ path, sha, src: path.replace(/^public/, "") }, { headers: { "Cache-Control": "no-store" } });
  } catch (cause) {
    if (cause instanceof GitHubError || cause instanceof ConfigError) return error(cause.message, 502);
    console.error("upload failed", cause);
    return error("The upload failed. Try again.", 500);
  }
}
