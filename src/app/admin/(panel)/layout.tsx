import Link from "next/link";
import { signOut } from "@/app/admin/actions";
import AdminNav from "@/components/admin/AdminNav";
import { missingEnv } from "@/lib/server/env";
import { requireAdminPage } from "@/lib/server/session";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdminPage();
  const missing = missingEnv();

  return (
    <div className="mx-auto max-w-5xl px-3 pt-3 sm:px-6 sm:pt-6">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <Link href="/" className="wide inline-flex min-h-11 items-center text-lg font-extrabold">Portfolio admin</Link>
        <form action={signOut} className="flex items-center gap-2 text-sm">
          <span className="text-graphite max-sm:hidden">Signed in as {admin.login}</span>
          <button type="submit" className="inline-flex min-h-11 items-center rounded-full px-3 font-semibold underline underline-offset-4">Sign out</button>
        </form>
      </header>
      <div className="mt-2"><AdminNav /></div>
      {missing.length > 0 && (
        <p role="alert" className="mt-3 rounded-xl bg-amber p-3 text-sm font-semibold">
          Saving won&apos;t work until these are set on the server: {missing.join(", ")}.
        </p>
      )}
      <main className="mt-4 pb-6">{children}</main>
    </div>
  );
}
