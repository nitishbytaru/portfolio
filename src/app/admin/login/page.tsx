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
      <div className="w-full max-w-sm rounded-[20px] bg-periwinkle p-6">
        <h1 className="wide text-3xl font-extrabold text-white">Edit the portfolio</h1>
        <p className="mt-2 text-ink">Only the site owner can sign in.</p>
        {error && ERRORS[error] && (
          <p role="alert" className="mt-4 rounded-xl bg-white p-3 text-sm font-semibold text-red-800">{ERRORS[error]}</p>
        )}
        <a href="/api/auth/github" className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-ink px-5 font-semibold text-white">
          <Github className="h-5 w-5" aria-hidden="true" />
          Sign in with GitHub
        </a>
      </div>
    </main>
  );
}
