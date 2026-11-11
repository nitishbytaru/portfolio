import "server-only";
import { randomBytes } from "node:crypto";

/** Vercel caps a request at about 4.5 MB; the browser resizes images well under this first. */
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

/** Every upload lands here, under a name the server picks. */
export const UPLOAD_PATH = /^public\/uploads\/\d{4}\/[a-f0-9]{16}\.(webp|png|jpg)$/;

const TYPES = {
  "image/webp": "webp",
  "image/png": "png",
  "image/jpeg": "jpg",
} as const;

/** Checks the bytes, not just the declared type. SVG and everything else is refused. */
export function sniffImage(bytes: Buffer, declared: string): (typeof TYPES)[keyof typeof TYPES] | null {
  const ext = TYPES[declared as keyof typeof TYPES];
  if (!ext) return null;
  const isPng = bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const isWebp = bytes.subarray(0, 4).toString("ascii") === "RIFF" && bytes.subarray(8, 12).toString("ascii") === "WEBP";
  if ((ext === "png" && isPng) || (ext === "jpg" && isJpeg) || (ext === "webp" && isWebp)) return ext;
  return null;
}

export const newUploadPath = (ext: string) =>
  `public/uploads/${new Date().getUTCFullYear()}/${randomBytes(8).toString("hex")}.${ext}`;
