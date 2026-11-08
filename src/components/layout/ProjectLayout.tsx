"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Github, LayoutGrid } from "lucide-react";
import { projectsData, Project } from "../../data/ProjectData";
import { TechIcon } from "../ui/TechIcon";
import Tile from "../board/Tile";
import Wordmark from "../board/Wordmark";

interface ProjectLayoutProps {
  project: Project;
  onLiveLinkClick: () => void;
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="wide mb-4 text-2xl font-extrabold">{children}</h2>
);

const SpecList = ({ entries }: { entries: Record<string, string> }) => (
  <dl className="space-y-4">
    {Object.entries(entries).map(([key, value]) => (
      <div key={key}>
        <dt className="text-sm font-bold">{key.replace(/_/g, " ")}</dt>
        <dd className="break-words">{value}</dd>
      </div>
    ))}
  </dl>
);

const ProjectLayout: React.FC<ProjectLayoutProps> = ({ project, onLiveLinkClick }) => {
  const images = project.images ?? [];
  const [activeImage, setActiveImage] = useState(images[0] ?? project.thumbnail);
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(project.images?.[0] ?? project.thumbnail);
  }, [project]);

  const currentIndex = projectsData.findIndex((item) => item.slug === project.slug);
  const previousProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;
  const isLinkedIn = project.liveLink?.includes("linkedin.com");
  const architecture = project.technologiesUsed ?? {};
  const deployment = project.deployment ?? {};

  return (
    <div>
      <Wordmark className="!text-[clamp(2.25rem,6.6vw,5.75rem)]">{project.title}</Wordmark>
      <p className="mb-6 mt-3 max-w-[65ch] text-lg leading-relaxed text-graphite">{project.shortDescription}</p>

      <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
        <div ref={viewerRef} className="scroll-mt-6 lg:col-span-8">
          <Tile tone="black" className="aspect-[16/10]">
            <img
              src={activeImage}
              alt={`${project.title} screenshot`}
              className="h-full w-full object-contain"
            />
          </Tile>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-4 lg:gap-5">
          <div className="grid grid-cols-2 gap-4 lg:gap-5">
            <Tile
              as="button"
              type="button"
              onClick={onLiveLinkClick}
              tone="amber"
              interactive
              corner
              className="min-h-32 p-5 text-left"
            >
              <ArrowRight className="mb-3 h-6 w-6" aria-hidden="true" />
              <span className="wide block text-lg font-extrabold leading-tight">
                {isLinkedIn ? "View LinkedIn Post" : "View Live Demo"}
              </span>
            </Tile>
            <Tile
              as="a"
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              tone="graphite"
              interactive
              corner
              className="min-h-32 p-5"
            >
              <Github className="mb-3 h-6 w-6" aria-hidden="true" />
              <span className="wide block text-lg font-extrabold leading-tight">Source Code</span>
            </Tile>
          </div>

          {project.techStack?.length > 0 && (
            <Tile tone="mint" className="flex-1 p-6">
              <SectionTitle>Core Stack</SectionTitle>
              <ul className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <li
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-full bg-frame px-3 py-1.5 text-sm font-medium"
                  >
                    <TechIcon name={tech} sizeClassName="w-4 h-4" />
                    {tech}
                  </li>
                ))}
              </ul>
            </Tile>
          )}
        </div>

        <Tile tone="periwinkle" className="p-6 lg:col-span-7">
          <SectionTitle>About Project</SectionTitle>
          <div className="max-w-[68ch] space-y-3 text-lg leading-relaxed">
            {project.detailedDescription?.intro?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {project.detailedDescription?.note && <p className="text-base">{project.detailedDescription.note}</p>}
          </div>
        </Tile>

        <Tile tone="pink" className="p-6 lg:col-span-5">
          <SectionTitle>Key Features</SectionTitle>
          <ul className="list-disc space-y-2 pl-5 leading-relaxed">
            {project.features.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
        </Tile>

        {Object.keys(architecture).length > 0 && (
          <Tile tone="amber" className={`p-6 ${Object.keys(deployment).length ? "lg:col-span-7" : "lg:col-span-12"}`}>
            <SectionTitle>Architecture</SectionTitle>
            <SpecList entries={architecture} />
          </Tile>
        )}

        {Object.keys(deployment).length > 0 && (
          <Tile tone="violet" className={`p-6 ${Object.keys(architecture).length ? "lg:col-span-5" : "lg:col-span-12"}`}>
            <SectionTitle>Infrastructure</SectionTitle>
            <SpecList entries={deployment} />
          </Tile>
        )}

        {images.length > 1 && (
          <Tile tone="plain" className="p-6 lg:col-span-12">
            <SectionTitle>Project Gallery</SectionTitle>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {images.map((src, idx) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`Show screenshot ${idx + 1}`}
                  aria-pressed={activeImage === src}
                  onClick={() => {
                    setActiveImage(src);
                    viewerRef.current?.scrollIntoView();
                  }}
                  className={`overflow-hidden rounded-xl border-2 bg-ink ${
                    activeImage === src ? "border-ink" : "border-transparent"
                  }`}
                >
                  <img src={src} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
                </button>
              ))}
            </div>
          </Tile>
        )}

        <nav aria-label="Other projects" className="grid grid-cols-[1fr_auto_1fr] gap-4 lg:col-span-12 lg:gap-5">
          {previousProject ? (
            <Tile as={Link} href={`/projects/${previousProject.slug}`} tone="white" interactive className="flex min-h-11 items-center gap-3 p-4 font-semibold">
              <ArrowLeft className="h-5 w-5 shrink-0" aria-hidden="true" />
              {previousProject.title}
            </Tile>
          ) : <span />}
          <Tile as={Link} href="/projects" tone="black" interactive aria-label="Back to all projects" className="flex h-full min-h-11 w-14 items-center justify-center">
            <LayoutGrid className="h-5 w-5" aria-hidden="true" />
          </Tile>
          {nextProject ? (
            <Tile as={Link} href={`/projects/${nextProject.slug}`} tone="white" interactive className="flex min-h-11 items-center justify-end gap-3 p-4 text-right font-semibold">
              {nextProject.title}
              <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
            </Tile>
          ) : <span />}
        </nav>
      </div>
    </div>
  );
};

export default ProjectLayout;
