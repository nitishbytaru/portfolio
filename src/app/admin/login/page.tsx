import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Github } from "lucide-react";
import { getAdmin } from "@/lib/server/session";

export const metadata: Metadata = { title: "Sign in" };

const ERRORS: Record<string, string> = {
  denied: "That GitHub account isn't allowed to edit this site.",
  state: "The sign-in link expired or didn't match. Try again.",
  github: "GitHub didn't complete the sign-in. Try again.",
  config: "Sign-in isn't set up yet. Add the GitHub OAuth settings to the server environment.",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await getAdmin()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <span aria-hidden="true" className="mb-6 grid w-max grid-cols-2 gap-1">
          <span className="h-5 w-5 rounded-full bg-periwinkle" />
          <span className="h-5 w-5 rounded-full bg-pink" />
          <span className="h-5 w-5 rounded-full bg-mint" />
          <span className="h-5 w-5 rounded-full bg-amber" />
        </span>
        <h1 className="wide text-4xl font-extrabold leading-none text-night-text">Edit the portfolio</h1>
        <p className="mt-3 text-night-muted">Only the site owner can sign in.</p>
        {error && ERRORS[error] && (
          <p role="alert" className="mt-5 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm font-semibold text-red-200">{ERRORS[error]}</p>
        )}
        <a
          href="/api/auth/github"
          className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-periwinkle px-5 font-semibold text-ink transition-colors duration-150 hover:bg-periwinkle-light"
        >
          <Github className="h-5 w-5" aria-hidden="true" />
          Sign in with GitHub
        </a>
        <a href="/" className="mt-3 inline-flex min-h-11 w-full items-center justify-center text-sm font-semibold text-night-muted hover:text-night-text">
          Back to the site
        </a>
      </div>
    </main>
  );
}
