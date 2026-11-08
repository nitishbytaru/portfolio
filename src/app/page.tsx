"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import SocialLinks from "@/components/ui/SocialLinks";
import {
  ArrowRight,
  ExternalLink,
  Activity,
  Sparkles,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import Pill from "@/components/ui/Pill";
import MiniInfoCard from "@/components/ui/MiniInfoCard";
import FloatingBadge from "@/components/ui/FloatingBadge";
import { TechIcon } from "@/components/ui/TechIcon";
import { projectsData } from "@/data/ProjectData";

const FEATURED_SLUGS = ["echorealm", "agroguide"];

const MINI_CARDS = [
  { icon: Briefcase, title: "Internship", value: "Infosys + Evaluate Health" },
  { icon: GraduationCap, title: "Education", value: "B.Tech CSE" },
  { icon: Activity, title: "Focus", value: "Scalable Apps" },
];

const FLOATING_TECH = [
  { label: "React", className: "-left-8 top-10" },
  { label: "Node.js", className: "-right-8 top-24" },
  { label: "MongoDB", className: "-left-6 bottom-24" },
  { label: "TypeScript", className: "right-0 bottom-8" },
];

const RESUME_URL =
  "https://drive.google.com/file/d/1z7Y0If8Jc4Zd7apdLeXtFzNK12eQ80gi/view?usp=drive_link";

const Reveal: React.FC<{ delay?: number; children: React.ReactNode; className?: string }> = ({
  delay = 0,
  children,
  className = "",
}) => (
  <div
    className={`motion-safe:animate-fade-in-up ${className}`}
    style={{ animationFillMode: "both", animationDelay: `${delay}s` }}
  >
    {children}
  </div>
);

const HeroAvatar: React.FC = () => (
  <div className="relative motion-safe:animate-float">
    {/* Orbiting rings */}
    <div className="absolute -inset-4 rounded-full border border-border motion-safe:animate-spin-slow" />
    <div
      className="absolute -inset-8 rounded-full border border-border/50 motion-safe:animate-spin-slow"
      style={{ animationDirection: "reverse", animationDuration: "15s" }}
    />

    <div className="glow-border rounded-full">
      <Image
        src="/NitishPIC.jpg"
        alt="Nitish Durga Bytaru"
        width={860}
        height={860}
        priority
        sizes="(min-width: 768px) 430px, 288px"
        className="relative h-72 w-72 rounded-full border-4 border-surface object-cover shadow-2xl transition-transform duration-500 motion-safe:animate-glow-pulse hover:scale-105 md:h-[430px] md:w-[430px]"
      />
    </div>
  </div>
);

const FeaturedProjects: React.FC = () => {
  const reveal = useScrollReveal({ threshold: 0.1 });
  const featured = FEATURED_SLUGS.flatMap((slug) => {
    const project = projectsData.find((p) => p.slug === slug);
    return project ? [project] : [];
  });

  return (
    <section className="relative bg-background pb-24" aria-labelledby="work-heading">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 id="work-heading" className="text-3xl font-extrabold tracking-tight text-text md:text-5xl">
            Selected work
          </h2>
          <Link
            href="/projects"
            className="group inline-flex items-center py-2 font-semibold text-primary transition-colors hover:text-secondary"
          >
            All {projectsData.length} projects
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div ref={reveal.ref} className="grid gap-10 lg:grid-cols-2">
          {featured.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={`scroll-reveal stagger-${i + 1} ${reveal.isVisible ? "revealed" : ""} group block`}
            >
              <div className="mb-6 aspect-[16/10] overflow-hidden rounded-3xl border border-border bg-surface transition-colors duration-300 group-hover:border-primary">
                <img
                  src={project.thumbnail}
                  alt={`${project.title} home screen`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>

              <h3 className="mb-2 text-2xl font-bold text-text transition-colors group-hover:text-primary">
                {project.title}
              </h3>
              <p className="mb-4 max-w-[60ch] leading-relaxed text-text-secondary">
                {project.shortDescription}
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-text-secondary">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span key={tech} className="inline-flex items-center gap-1.5">
                    <TechIcon name={tech} sizeClassName="w-4 h-4" />
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden bg-background pt-32 pb-16 md:pt-40 md:pb-24">
        {/* Background layers */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-20"
          style={{ backgroundImage: "var(--gradient-soft)" }}
        />
        <div className="pointer-events-none absolute left-10 top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl motion-safe:animate-float" />
        <div className="pointer-events-none absolute bottom-20 right-10 h-80 w-80 rounded-full bg-secondary/10 blur-3xl motion-safe:animate-float-delayed" />

        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className={`particle particle-${n}`} aria-hidden="true" />
        ))}

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <Reveal>
                <Pill dot tone="default" className="mb-6">
                  Available for Full Stack Opportunities
                </Pill>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="mb-6 text-5xl font-black tracking-tight text-text md:text-7xl">
                  <span className="gradient-text">Nitish Durga</span>{" "}
                  <span className="text-text/45">Bytaru</span>
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <Pill icon={Sparkles} tone="solid" size="lg" uppercase className="mb-6">
                  Full Stack Web Developer
                </Pill>
              </Reveal>

              <Reveal delay={0.3}>
                <p className="mb-8 max-w-[56ch] text-lg leading-relaxed text-text-secondary md:text-xl">
                  I build full stack web apps, from real-time messaging with
                  Socket.io to machine learning tools that help farmers make
                  data-driven decisions.
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="mb-10 flex flex-wrap gap-4">
                  <Link
                    href="/projects"
                    className="btn-ripple group flex items-center rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary-hover hover:shadow-glow-primary"
                  >
                    <span>View My Projects</span>
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ripple group flex items-center rounded-xl border border-border bg-surface/90 px-8 py-4 font-semibold text-text shadow-sm backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-surface-elevated"
                  >
                    <span>View Resume</span>
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.5}>
                <div className="mb-8 grid gap-4 sm:grid-cols-3">
                  {MINI_CARDS.map((c) => (
                    <MiniInfoCard key={c.title} {...c} />
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.6}>
                <SocialLinks />
              </Reveal>
            </div>

            <div
              className="flex justify-center motion-safe:animate-fade-in"
              style={{ animationFillMode: "both", animationDelay: "0.4s" }}
            >
              <div className="relative pb-24 md:pb-16">
                {FLOATING_TECH.map((b) => (
                  <FloatingBadge key={b.label} {...b} />
                ))}
                <HeroAvatar />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedProjects />
    </div>
  );
}
