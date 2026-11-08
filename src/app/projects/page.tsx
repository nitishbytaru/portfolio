import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Tile, { TileTone } from "@/components/board/Tile";
import Wordmark from "@/components/board/Wordmark";
import { TechIcon } from "@/components/ui/TechIcon";
import { projectsData } from "@/data/ProjectData";

const TONES: TileTone[] = ["mint", "amber", "pink", "periwinkle", "violet"];

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <div>
      <Wordmark className="mb-6">Projects</Wordmark>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
        {projectsData.map((project, i) => (
          <Tile
            key={project.slug}
            as={Link}
            href={`/projects/${project.slug}`}
            tone={TONES[i % TONES.length]}
            interactive
            className={`group flex flex-col ${i < 2 ? "lg:col-span-3" : "lg:col-span-2"} ${i === 4 ? "md:col-span-2 lg:col-span-2" : ""}`}
          >
            <div className="relative aspect-[16/10] w-full bg-ink">
              <Image
                src={project.thumbnail}
                alt={`${project.title} preview`}
                fill
                priority={i < 2}
                sizes="(min-width: 1024px) 45vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover object-left-top"
              />
              <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5 lg:p-6">
              <h2 className="wide text-2xl font-extrabold">{project.title}</h2>
              <p className="mb-5 mt-2 max-w-[60ch] leading-relaxed">{project.shortDescription}</p>
              <ul className="mt-auto flex flex-wrap gap-2" aria-label="Tech stack">
                {project.techStack.map((tech) => (
                  <li
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-full bg-frame px-3 py-1.5 text-sm font-medium text-ink"
                  >
                    <TechIcon name={tech} sizeClassName="w-4 h-4" />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </Tile>
        ))}
      </div>
    </div>
  );
}
