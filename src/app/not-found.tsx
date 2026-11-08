import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projectsData } from "@/data/ProjectData";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-4 pb-20 pt-36 sm:px-6">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-text md:text-5xl">
        This page doesn&apos;t exist
      </h1>
      <p className="mb-10 text-lg leading-relaxed text-text-secondary">
        The link may be old or mistyped. These projects are all still here:
      </p>

      <ul className="mb-10 divide-y divide-border border-y border-border">
        {projectsData.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className="group flex items-center justify-between py-4 font-semibold text-text transition-colors hover:text-primary"
            >
              {project.title}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/"
        className="self-start rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
      >
        Go to home page
      </Link>
    </section>
  );
}
