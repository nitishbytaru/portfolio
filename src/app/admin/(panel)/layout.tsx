import Link from "next/link";
import { ArrowUpRight, LogOut } from "lucide-react";
import { signOut } from "@/app/admin/actions";
import AdminNav from "@/components/admin/AdminNav";
import { missingEnv } from "@/lib/server/env";
import { requireAdminPage } from "@/lib/server/session";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdminPage();
  const missing = missingEnv();

  return (
    <div className="mx-auto max-w-5xl px-3 pt-3 sm:px-6 sm:pt-6">
      <header className="flex items-center justify-between gap-2">
        <Link href="/admin" className="wide inline-flex min-h-11 items-center gap-2.5 text-lg font-extrabold text-night-text">
          <BoardMark />
          Portfolio admin
        </Link>
        <div className="flex items-center gap-1 text-sm">
          <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 font-semibold text-night-muted transition-colors duration-150 hover:bg-white/5 hover:text-night-text">
            <span className="max-sm:sr-only">View site</span> <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <form action={signOut} className="flex items-center">
            <button type="submit" title={admin.login ? `Signed in as ${admin.login}` : undefined} className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 font-semibold text-night-muted transition-colors duration-150 hover:bg-white/5 hover:text-night-text">
              <LogOut className="h-4 w-4" aria-hidden="true" /> <span className="max-sm:sr-only">Sign out</span>
            </button>
          </form>
        </div>
      </header>
      <div className="mt-3 border-b border-night-line pb-3"><AdminNav /></div>
      {missing.length > 0 && (
        <p role="alert" className="mt-4 rounded-xl border border-amber/30 bg-amber/10 p-3 text-sm font-semibold text-amber">
          Saving won&apos;t work until these are set on the server: {missing.join(", ")}.
        </p>
      )}
      <main className="mt-8 pb-6">{children}</main>
    </div>
  );
}

/** Four tone discs: the board in miniature. */
function BoardMark() {
  return (
    <span aria-hidden="true" className="grid grid-cols-2 gap-0.5">
      <span className="h-2.5 w-2.5 rounded-full bg-periwinkle" />
      <span className="h-2.5 w-2.5 rounded-full bg-pink" />
      <span className="h-2.5 w-2.5 rounded-full bg-mint" />
      <span className="h-2.5 w-2.5 rounded-full bg-amber" />
    </span>
  );
}
