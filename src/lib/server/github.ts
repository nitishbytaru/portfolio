import "server-only";
import { createHash } from "node:crypto";
import { contentEnv } from "./env";

// Content storage is this GitHub repo. Every save is one commit, made with a fine-grained token
// that can only read and write this repo's contents.

export class GitHubError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

/** Someone (or another tab) saved after this editor loaded. */
export class ConflictError extends Error {
  constructor() {
    super("This content changed since you opened it. Reload to get the latest version, then make your edit again.");
  }
}

const friendly = (status: number, fallback: string) => {
  if (status === 401) return "GitHub rejected the content token. It may have expired: create a new one and update GITHUB_CONTENT_TOKEN.";
  if (status === 403) return "The content token isn't allowed to do this. It needs Contents: read and write on this repo.";
  if (status === 404) return "GitHub couldn't find the repo or branch. Check GITHUB_REPO and CONTENT_BRANCH.";
  if (status >= 500) return "GitHub is having trouble right now. Your change wasn't saved; try again in a minute.";
  return fallback;
};

async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { token, repo } = contentEnv();
  const response = await fetch(`https://api.github.com/repos/${repo}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
    },
    cache: "no-store",
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { message?: string };
    throw new GitHubError(friendly(response.status, body.message ?? `GitHub error ${response.status}`), response.status);
  }
  return response.json() as Promise<T>;
}

const encodePath = (path: string) => path.split("/").map(encodeURIComponent).join("/");

/** The blob sha of a file at a ref, or null if it doesn't exist. */
async function blobShaAt(path: string, ref: string): Promise<string | null> {
  try {
    const file = await api<{ sha: string }>(`/contents/${encodePath(path)}?ref=${encodeURIComponent(ref)}`);
    return file.sha;
  } catch (error) {
    if (error instanceof GitHubError && error.status === 404) return null;
    throw error;
  }
}

/** The latest committed copy of a file on the content branch. Admin always reads this, not the build. */
export async function readFile(path: string): Promise<{ text: string; sha: string }> {
  const { branch } = contentEnv();
  const file = await api<{ content: string; encoding: string; sha: string }>(
    `/contents/${encodePath(path)}?ref=${encodeURIComponent(branch)}`
  );
  return { text: Buffer.from(file.content, "base64").toString("utf8"), sha: file.sha };
}

/** Stores an uploaded image as a git blob. It joins the repo when a save commits it. */
export async function createBlob(bytes: Buffer): Promise<string> {
  const blob = await api<{ sha: string }>("/git/blobs", {
    method: "POST",
    body: JSON.stringify({ content: bytes.toString("base64"), encoding: "base64" }),
  });
  return blob.sha;
}

export type CommitEntry = { path: string; content: string } | { path: string; sha: string };

/**
 * One commit for one save, however many files it touches. `expected` maps paths to the blob sha
 * the editor started from; if any differ on the branch, nothing is written.
 */
export async function commitFiles(entries: CommitEntry[], message: string, expected: Record<string, string>) {
  const { branch } = contentEnv();
  const ref = await api<{ object: { sha: string } }>(`/git/ref/heads/${encodePath(branch)}`);
  const head = ref.object.sha;

  for (const [path, sha] of Object.entries(expected)) {
    if ((await blobShaAt(path, head)) !== sha) throw new ConflictError();
  }

  const parent = await api<{ tree: { sha: string } }>(`/git/commits/${head}`);
  const tree = await api<{ sha: string }>("/git/trees", {
    method: "POST",
    body: JSON.stringify({
      base_tree: parent.tree.sha,
      tree: entries.map((entry) => ({ path: entry.path, mode: "100644", type: "blob", ...("sha" in entry ? { sha: entry.sha } : { content: entry.content }) })),
    }),
  });
  const commit = await api<{ sha: string; html_url: string }>("/git/commits", {
    method: "POST",
    body: JSON.stringify({ message, tree: tree.sha, parents: [head] }),
  });

  try {
    // Not forced: if the branch moved since we read it, GitHub refuses and nothing is lost.
    await api(`/git/refs/heads/${encodePath(branch)}`, { method: "PATCH", body: JSON.stringify({ sha: commit.sha, force: false }) });
  } catch (error) {
    if (error instanceof GitHubError && (error.status === 409 || error.status === 422)) throw new ConflictError();
    throw error;
  }

  const shas: Record<string, string> = {};
  for (const entry of entries) if ("content" in entry) shas[entry.path] = gitBlobSha(entry.content);
  return { commitSha: commit.sha, url: commit.html_url, shas };
}

/** The sha git gives a file with this text, so the editor can keep going after a save. */
export const gitBlobSha = (text: string) => {
  const bytes = Buffer.from(text, "utf8");
  return createHash("sha1").update(`blob ${bytes.length}\0`).update(bytes).digest("hex");
};

export interface RecentChange {
  sha: string;
  message: string;
  date: string;
  url: string;
}

export async function recentContentChanges(limit = 8): Promise<RecentChange[]> {
  const { branch } = contentEnv();
  const commits = await api<{ sha: string; html_url: string; commit: { message: string; author: { date: string } } }[]>(
    `/commits?sha=${encodeURIComponent(branch)}&path=content&per_page=${limit}`
  );
  return commits.map((commit) => ({
    sha: commit.sha.slice(0, 7),
    message: commit.commit.message.split("\n")[0],
    date: commit.commit.author.date,
    url: commit.html_url,
  }));
}

/** Where admin can preview an image committed but not yet deployed. The repo is public. */
export const rawBase = () => {
  const { repo, branch } = contentEnv();
  return `https://raw.githubusercontent.com/${repo}/${branch}/public`;
};
