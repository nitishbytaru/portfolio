// src/components/sections/Projects.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Layers,
  Github,
  ExternalLink,
  Code2,
} from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

import SectionShell from "../ui/SectionShell";
import SectionHeader from "../ui/SectionHeader";
import GlassCard from "../ui/GlassCard";
import Pill from "../ui/Pill";

import { projectsData } from "../../data/ProjectData";

/* ---------------------------------------------------------------------- */
/* Card                                                                   */
/* ---------------------------------------------------------------------- */

const ProjectCardMedia = ({ project }) => (
  <div className="relative h-72 w-full shrink-0 overflow-hidden border-b border-border sm:h-80">
    {/* Tech chips */}
    <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-2">
      {project.techStack.slice(0, 3).map((tech) => (
        <Pill key={tech} tone="solid" size="sm">
          {tech}
        </Pill>
      ))}
      {project.techStack.length > 3 && (
        <Pill tone="default" size="sm">
          +{project.techStack.length - 3}
        </Pill>
      )}
    </div>

    {/* Link indicators */}
    <div className="absolute right-4 top-4 z-20 flex gap-2">
      {project.githubLink && (
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface/80 text-text backdrop-blur-2xl">
          <Github className="h-4 w-4" />
        </span>
      )}
      {project.liveLink && (
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface/80 text-text backdrop-blur-2xl">
          <ExternalLink className="h-4 w-4" />
        </span>
      )}
    </div>

    {/* Image scrim */}
    <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />

    <img
      src={project.thumbnail}
      alt={`${project.title} preview`}
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
  </div>
);

const ProjectCardBody = ({ project }) => (
  <div className="relative z-20 flex flex-grow flex-col p-8">
    <div className="mb-4 flex items-start justify-between gap-4">
      <div>
        <div className="mb-3 flex items-center gap-2">
          <Pill icon={Code2} tone="primary" size="sm">
            {project.techStack[0]}
          </Pill>
        </div>
        <h3 className="text-2xl font-bold text-text transition-colors group-hover:text-primary">
          {project.title}
        </h3>
      </div>

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-border/70 text-text backdrop-blur-xl transition-all duration-300 group-hover:-rotate-45 group-hover:bg-primary group-hover:text-primary-foreground">
        <ArrowRight className="h-5 w-5" />
      </div>
    </div>

    <p className="mb-6 line-clamp-3 flex-grow leading-relaxed text-text-secondary">
      {project.shortDescription}
    </p>

    <ul className="mb-6 space-y-3">
      {project.features.slice(0, 2).map((feature, i) => (
        <li
          key={i}
          className="flex items-start gap-2 text-sm text-text-secondary"
        >
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>

    <div className="mt-auto flex items-center justify-between border-t border-border pt-5">
      <span className="text-sm text-text-secondary">
        {project.techStack.length} Technologies
      </span>
      <span className="inline-flex items-center text-sm font-semibold text-text transition-colors group-hover:text-primary">
        Explore
        <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </div>
  </div>
);

const ProjectCard = ({ project, index, isVisible }) => (
  <GlassCard
    as={Link}
    to={`/projects/${project.slug}`}
    padding="p-0"
    className={[
      "flex flex-col",
      project.span ?? "",
      "scroll-reveal",
      `stagger-${Math.min(index + 1, 10)}`,
      isVisible ? "revealed" : "",
    ].join(" ")}
  >
    {/* Soft hover wash sits above accent bar but below content */}
    <span className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    <ProjectCardMedia project={project} />
    <ProjectCardBody project={project} />
  </GlassCard>
);

/* ---------------------------------------------------------------------- */
/* Section                                                                */
/* ---------------------------------------------------------------------- */

const Projects = () => {
  const gridReveal = useScrollReveal({ threshold: 0.05 });

  return (
    <SectionShell id="projects">
      <SectionHeader
        eyebrow="Selected Works"
        eyebrowIcon={Sparkles}
        title="Featured Projects"
        lead="A collection of polished, scalable, and practical digital products built across web, mobile, backend, and machine learning."
        aside={
          <Pill icon={Layers} tone="solid">
            {projectsData.length} Projects
          </Pill>
        }
      />

      <div
        ref={gridReveal.ref}
        className="grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        {projectsData.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            isVisible={gridReveal.isVisible}
          />
        ))}
      </div>
    </SectionShell>
  );
};

export default Projects;
