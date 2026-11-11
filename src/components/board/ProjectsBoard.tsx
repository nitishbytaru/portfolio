"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Tile, { TileTone } from "@/components/board/Tile";
import { TechIcon } from "@/components/ui/TechIcon";
import ProjectPeekList from "@/components/board/ProjectPeekList";
import type { Project } from "@/lib/schema";

const TONES: TileTone[] = ["mint", "amber", "pink", "periwinkle", "violet"];
const MOTION = "motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]";

const canTilt = () =>
  window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches;

const applyTilt = (root: HTMLElement, x: number, y: number) => {
  root.querySelectorAll<HTMLElement>("[data-depth]").forEach((card) => {
    const depth = Number(card.dataset.depth);
    const rotate = Number(card.dataset.rotate);
    card.style.transform = `perspective(1200px) translate3d(${x * depth * 3}px, ${y * depth * 3}px, 0) rotateY(${x * depth * 1.2}deg) rotateX(${-y * depth * 1.2}deg) rotate(${rotate}deg)`;
  });
};

interface ProjectsBoardProps {
  /** Rich expanding panels: featured projects first, then the rest in order, capped. */
  panels: Project[];
  /** Everything that didn't get a panel. */
  more: Project[];
}

export default function ProjectsBoard({ panels, more }: ProjectsBoardProps) {
  const [active, setActive] = useState(0);
  const panelLinks = useRef<(HTMLAnchorElement | null)[]>([]);

  const handleMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (!canTilt()) return;
    const box = event.currentTarget.getBoundingClientRect();
    applyTilt(
      event.currentTarget,
      (event.clientX - box.left) / box.width - 0.5,
      (event.clientY - box.top) / box.height - 0.5
    );
  };

  const expand = (event: React.MouseEvent, index: number) => {
    event.preventDefault();
    setActive(index);
    requestAnimationFrame(() => panelLinks.current[index]?.focus({ preventScroll: true }));
  };

  if (panels.length === 0) {
    return (
      <Tile tone="mint" className="p-6">
        <p className="wide text-xl font-extrabold">Projects are on their way.</p>
      </Tile>
    );
  }

  return (
    <div className="flex flex-col gap-4">
    <ul className="enter-strips stagger flex flex-col gap-3 xl:h-[calc(100vh-18.5rem)] xl:min-h-[540px] xl:flex-row">
      {panels.map((project, index) => {
        const isActive = active === index;
        const extraScreen = project.images?.find((src) => src !== project.thumbnail);
        const reveal = (step: number) => ({
          className: `${MOTION} ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`,
          style: { transitionDelay: isActive ? `${200 + step * 70}ms` : "0ms" },
        });

        return (
          <li
            key={project.slug}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setActive(index);
            }}
            className={`min-w-0 motion-safe:transition-[flex-grow] motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] xl:basis-24 ${
              isActive ? "xl:grow" : "xl:grow-0"
            }`}
          >
            <Tile tone={TONES[index % TONES.length]} className="h-full">
              {/* Closed strip */}
              {!isActive && (
                <Link
                  href={`/projects/${project.slug}`}
                  onClick={(event) => expand(event, index)}
                  className="flex h-20 w-full items-center gap-4 px-5 xl:h-full xl:flex-col xl:justify-between xl:px-0 xl:py-6"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-frame">
                    <TechIcon name={project.techStack[0] ?? project.title} sizeClassName="w-6 h-6" />
                  </span>
                  <h2 className="wide text-xl font-extrabold xl:rotate-180 xl:whitespace-nowrap xl:[writing-mode:vertical-rl]">
                    {project.title}
                  </h2>
                </Link>
              )}

              {/* Open panel */}
              {isActive && (
                <Link
                  ref={(node) => { panelLinks.current[index] = node; }}
                  href={`/projects/${project.slug}`}
                  onPointerMove={handleMove}
                  onPointerLeave={(event) => applyTilt(event.currentTarget, 0, 0)}
                  className="group relative flex h-full flex-col overflow-hidden p-6 focus-inset md:grid md:grid-cols-2 md:items-center md:gap-6 xl:flex xl:items-stretch xl:p-8"
                >
                  <div className="relative z-10 flex flex-col xl:h-full xl:w-[40%]">
                    <h2 className={`wide text-4xl font-extrabold leading-[1.05] ${reveal(0).className}`} style={reveal(0).style}>
                      {project.title}
                    </h2>
                    <p className={`mt-3 text-lg leading-snug ${reveal(1).className}`} style={reveal(1).style}>
                      {project.shortDescription}
                    </p>
                    <ul aria-label="Tech stack" className="mt-5 flex flex-wrap gap-2">
                      {project.techStack.slice(0, 7).map((tech, step) => (
                        <li
                          key={tech}
                          title={tech}
                          className={`flex h-11 w-11 items-center justify-center rounded-full bg-frame ${reveal(2 + step).className}`}
                          style={reveal(2 + step).style}
                        >
                          <TechIcon name={tech} sizeClassName="w-6 h-6" />
                          <span className="sr-only">{tech}</span>
                        </li>
                      ))}
                      {project.techStack.length > 7 && (
                        <li className={`flex h-11 w-11 items-center justify-center rounded-full bg-ink text-sm font-bold text-white ${reveal(9).className}`} style={reveal(9).style}>
                          +{project.techStack.length - 7}
                        </li>
                      )}
                    </ul>
                    <span className={`mt-6 inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-ink px-5 font-semibold text-white xl:mt-auto ${reveal(5).className}`} style={reveal(5).style}>
                      Open project
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>

                  {/* Stacked screens that lean toward the cursor */}
                  <div className={`relative mt-6 aspect-[16/10] md:mt-0 xl:absolute xl:-bottom-[5%] xl:-right-[4%] xl:mt-0 xl:w-[64%] ${reveal(3).className}`} style={reveal(3).style}>
                    {extraScreen && (
                      <div
                        data-depth="26"
                        data-rotate="6"
                        className="absolute inset-0 hidden -translate-y-8 overflow-hidden rounded-xl bg-ink shadow-xl motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out xl:block"
                        style={{ transform: "perspective(1200px) rotate(6deg)" }}
                      >
                        <Image src={extraScreen} alt="" fill sizes="40vw" className="object-cover object-left-top opacity-80" />
                      </div>
                    )}
                    <div
                      data-depth="12"
                      data-rotate="-3"
                      className="absolute inset-0 overflow-hidden rounded-xl bg-ink shadow-[0_24px_40px_-14px_rgb(0_0_0/0.55)] motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out"
                      style={{ transform: "perspective(1200px) rotate(-3deg)" }}
                    >
                      <Image
                        src={project.thumbnail}
                        alt={`${project.title} preview`}
                        fill
                        priority={index === 0}
                        sizes="(min-width: 1280px) 40vw, 100vw"
                        className="object-cover object-left-top"
                      />
                    </div>
                  </div>
                </Link>
              )}
            </Tile>
          </li>
        );
      })}
    </ul>

    {more.length > 0 && (
      <Tile as="section" tone="white" aria-labelledby="more-projects" className="p-6 max-md:p-4">
        <h2 id="more-projects" className="wide mb-3 text-2xl font-extrabold max-md:text-lg">All projects</h2>
        <ProjectPeekList projects={more} />
      </Tile>
    )}
    </div>
  );
}
