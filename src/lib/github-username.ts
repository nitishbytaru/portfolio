import profile from "../../content/profile.json";

// The analytics page fetches from GitHub in the browser, so the username is bundled. The profile has
// no hidden fields; the build still validates the whole file through src/lib/content.ts.
export const GITHUB_USERNAME: string = profile.githubUsername;
