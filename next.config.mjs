import { readFileSync } from "node:fs";
import path from "node:path";

/** The active resume's Drive link. The build's schema check (src/lib/content.ts) validates the file. */
function activeResumeUrl() {
  const file = path.resolve(process.env.CONTENT_DIR || "content", "resume.json");
  const resume = JSON.parse(readFileSync(file, "utf8"));
  const active = resume.versions?.find((version) => version.id === resume.activeId);
  if (!active?.url?.startsWith("https://drive.google.com/")) throw new Error("content/resume.json has no valid active version");
  return active.url;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // `/resume` is the stable link to share; it always opens the active version after a redeploy.
  async redirects() {
    return [{ source: "/resume", destination: activeResumeUrl(), permanent: false }];
  },
  async headers() {
    return [{ source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
