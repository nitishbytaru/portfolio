import type { Metadata } from "next";
import Link from "next/link";
import Tile from "@/components/board/Tile";
import Wordmark from "@/components/board/Wordmark";
import ProjectPeekList from "@/components/board/ProjectPeekList";
import SiteFrame from "@/components/board/SiteFrame";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = { title: "Page not found" };

// Unmatched URLs render outside the (site) group, so this page brings its own frame.
export default function NotFound() {
  const projects = getProjects().map(({ slug, title, thumbnail }) => ({ slug, title, thumbnail }));
  return (
    <SiteFrame>
    <div>
      <Wordmark className="mb-6">Not found</Wordmark>
      <div className="enter-lost stagger grid gap-4 lg:grid-cols-3 lg:gap-5">
        <Tile tone="amber" className="flex flex-col justify-between gap-8 p-6">
          <p className="wide text-2xl font-extrabold leading-tight">This page doesn&apos;t exist. The link may be old or mistyped.</p>
          <Link href="/" className="inline-flex min-h-11 items-center self-start rounded-full bg-ink px-6 font-semibold text-white">
            Go to home page
          </Link>
        </Tile>
        <Tile tone="mint" className="p-6 lg:col-span-2">
          <h2 className="wide mb-3 text-2xl font-extrabold">These projects are all still here</h2>
          <ProjectPeekList projects={projects} />
        </Tile>
      </div>
    </div>
    </SiteFrame>
  );
}
