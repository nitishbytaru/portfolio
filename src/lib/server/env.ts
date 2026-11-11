import "server-only";

// Server-only configuration. None of these may ever be NEXT_PUBLIC_.

export class ConfigError extends Error {}

const read = (name: string) => {
  const value = process.env[name]?.trim();
  if (!value) throw new ConfigError(`${name} is not set`);
  return value;
};

export const authEnv = () => {
  const adminId = read("ADMIN_GITHUB_ID");
  if (!/^\d+$/.test(adminId)) throw new ConfigError("ADMIN_GITHUB_ID must be your numeric GitHub user id");
  return {
    clientId: read("GITHUB_CLIENT_ID"),
    clientSecret: read("GITHUB_CLIENT_SECRET"),
    adminId,
  };
};

export const contentEnv = () => {
  const repo = read("GITHUB_REPO");
  if (!/^[\w.-]+\/[\w.-]+$/.test(repo)) throw new ConfigError("GITHUB_REPO must look like owner/name");
  const branch = process.env.CONTENT_BRANCH?.trim() || "main";
  if (!/^[\w./-]+$/.test(branch) || branch.includes("..")) throw new ConfigError("CONTENT_BRANCH is not a valid branch name");
  return { token: read("GITHUB_CONTENT_TOKEN"), repo, branch };
};

/** Which settings are missing, for the admin's setup notice. Names only, never values. */
export const missingEnv = () =>
  ["GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET", "GITHUB_CONTENT_TOKEN", "GITHUB_REPO", "ADMIN_GITHUB_ID", "SESSION_SECRET"].filter(
    (name) => !process.env[name]?.trim()
  );
