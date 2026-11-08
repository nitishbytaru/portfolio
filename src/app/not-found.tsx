import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Tile from "@/components/board/Tile";
import Wordmark from "@/components/board/Wordmark";
import { projectsData } from "@/data/ProjectData";

export default function NotFound() {
  return (
    <div>
      <Wordmark className="mb-6">Not found</Wordmark>
      <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
        <Tile tone="amber" className="flex flex-col justify-between gap-8 p-6">
          <p className="wide text-2xl font-extrabold leading-tight">This page doesn&apos;t exist. The link may be old or mistyped.</p>
          <Link href="/" className="inline-flex min-h-11 items-center self-start rounded-full bg-ink px-6 font-semibold text-white">
            Go to home page
          </Link>
        </Tile>
        <Tile tone="mint" className="p-6 lg:col-span-2">
          <h2 className="wide mb-3 text-2xl font-extrabold">These projects are all still here</h2>
          <ul className="divide-y divide-ink/20">
            {projectsData.map((project) => (
              <li key={project.slug}>
                <Link href={`/projects/${project.slug}`} className="group flex items-center justify-between py-3 font-semibold">
                  {project.title}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Tile>
      </div>
    </div>
  );
}
