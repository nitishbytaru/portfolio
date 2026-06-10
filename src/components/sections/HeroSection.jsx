// src/components/sections/HeroSection.jsx
import React from "react";
import SocialLinks from "../ui/SocialLinks";
import {
  ArrowRight,
  Download,
  Code2,
  Database,
  Layers,
  Activity,
  Sparkles,
  Briefcase,
  GraduationCap,
  Cpu,
} from "lucide-react";
import { useScrollReveal, useCountUp } from "../../hooks/useScrollReveal";

import Pill from "../ui/Pill";
import GlassCard from "../ui/GlassCard";
import SkillBar from "../ui/SkillBar";
import MiniInfoCard from "../ui/MiniInfoCard";
import FloatingBadge from "../ui/FloatingBadge";

/* --------------------------------- data --------------------------------- */

const STATS = [
  {
    value: 4,
    suffix: "+",
    label: "Major Projects",
    description: "Full-stack, mobile, and ML-based applications",
    icon: Layers,
  },
  {
    value: 10,
    suffix: "+",
    label: "Technologies",
    description: "React, RN, Node, Flask, .NET, Angular and more",
    icon: Code2,
  },
  {
    value: 3,
    suffix: "",
    label: "Databases",
    description: "MongoDB, MySQL, and PostgreSQL exposure",
    icon: Database,
  },
  {
    display: "Full Stack",
    label: "Specialization",
    description: "Frontend, backend, APIs, and database workflows",
    icon: Cpu,
  },
];

const TECH_STACK = [
  "React",
  "React Native",
  "Next.js",
  "Node.js",
  "Flask",
  ".NET",
  "Angular",
  "MySQL",
  "MongoDB",
];

const MINI_CARDS = [
  { icon: Briefcase, title: "Internship", value: "Infosys + Evaluate Health" },
  { icon: GraduationCap, title: "Education", value: "B.Tech CSE" },
  { icon: Activity, title: "Focus", value: "Scalable Apps" },
];

const HERO_SKILLS = [
  { label: "Frontend", value: "92%" },
  { label: "Backend", value: "84%" },
  { label: "Database", value: "76%" },
];

const FLOATING_TECH = [
  { label: "React", className: "-left-8 top-10" },
  { label: "Node.js", className: "-right-8 top-24" },
  { label: "MongoDB", className: "-left-6 bottom-24" },
  { label: "TypeScript", className: "right-0 bottom-8" },
];

const RESUME_URL =
  "https://drive.google.com/file/d/1z7Y0If8Jc4Zd7apdLeXtFzNK12eQ80gi/view?usp=drive_link";

/* ----------------------------- subcomponents ---------------------------- */

const Reveal = ({ delay = 0, children, className = "" }) => (
  <div
    className={`motion-safe:animate-fade-in-up ${className}`}
    style={{ animationFillMode: "both", animationDelay: `${delay}s` }}
  >
    {children}
  </div>
);

const HeroAvatar = () => (
  <div className="relative motion-safe:animate-float">
    {/* Orbiting rings */}
    <div className="absolute -inset-4 rounded-full border border-border motion-safe:animate-spin-slow" />
    <div
      className="absolute -inset-8 rounded-full border border-border/50 motion-safe:animate-spin-slow"
      style={{ animationDirection: "reverse", animationDuration: "15s" }}
    />

    <div className="glow-border rounded-full">
      <img
        src="/NitishPIC.jpg"
        alt="Nitish Bytaru — Full Stack Developer"
        loading="lazy"
        className="relative h-72 w-72 rounded-full border-4 border-surface object-cover shadow-2xl transition-transform duration-500 motion-safe:animate-glow-pulse hover:scale-105 md:h-[430px] md:w-[430px]"
      />
    </div>
  </div>
);


const StatCard = ({ stat, index, isVisible }) => {
  const Icon = stat.icon;
  const count = useCountUp(stat.value ?? 0, 1200, isVisible);

  return (
    <GlassCard
      padding="p-6"
      className={`scroll-reveal stagger-${index + 1} ${isVisible ? "revealed" : ""}`}
    >
      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
            <Icon className="h-6 w-6" />
          </div>
        </div>

        <div className="mb-4 font-mono text-5xl font-bold tracking-tight text-text">
          {stat.value != null ? (
            <>
              {count}
              {stat.suffix}
            </>
          ) : (
            stat.display
          )}
        </div>

        <div className="mb-2 text-xl font-semibold text-text">{stat.label}</div>
        <p className="mb-5 text-sm leading-relaxed text-text-secondary">
          {stat.description}
        </p>

        <div className="h-2 overflow-hidden rounded-full bg-border/50">
          <div
            className="h-full rounded-full bg-primary motion-safe:transition-all motion-safe:duration-1000"
            style={{ width: isVisible ? stat.progress : "0%" }}
          />
        </div>
      </div>
    </GlassCard>
  );
};

/* -------------------------------- section ------------------------------- */

const HeroSection = () => {
  const statsReveal = useScrollReveal({ threshold: 0.2 });

  const scrollToProjects = () =>
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative overflow-hidden bg-background pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.08] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40 transition-opacity duration-500 dark:opacity-20"
        style={{ backgroundImage: "var(--gradient-soft)" }}
      />
      <div className="pointer-events-none absolute left-10 top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl motion-safe:animate-float" />
      <div className="pointer-events-none absolute bottom-20 right-10 h-80 w-80 rounded-full bg-secondary/10 blur-3xl motion-safe:animate-float-delayed" />

      {/* Optional particles (kept as you had them) */}
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div key={n} className={`particle particle-${n}`} aria-hidden="true" />
      ))}

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* ───── Left column ───── */}
          <div className="order-2 lg:order-1">
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
              <Pill
                icon={Sparkles}
                tone="solid"
                size="lg"
                uppercase
                className="mb-6"
              >
                Full Stack Web Developer
              </Pill>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mb-8 grid gap-4 sm:grid-cols-3">
                {MINI_CARDS.map((c) => (
                  <MiniInfoCard key={c.title} {...c} />
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.5} className="mb-10">
              <SocialLinks />
            </Reveal>

            <Reveal delay={0.6}>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={scrollToProjects}
                  className="btn-ripple group flex items-center rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary-hover hover:shadow-glow-primary focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <span>View My Projects</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ripple group flex items-center rounded-xl border border-border bg-surface/90 px-8 py-4 font-semibold text-text shadow-sm backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-surface-elevated focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <span>Download Resume</span>
                  <Download className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* ───── Right column ───── */}
          <div
            className="order-1 flex justify-center motion-safe:animate-fade-in lg:order-2"
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

        {/* Tech strip */}
        <Reveal delay={0.7} className="mt-28 mb-10">
          <div className="flex flex-wrap justify-center gap-3">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-surface/80 px-4 py-2 text-sm font-medium text-text-secondary backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:bg-surface-elevated hover:text-text"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Stats */}
        <div
          ref={statsReveal.ref}
          className="mt-10 grid gap-6 md:grid-cols-4"
        >
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={i}
              isVisible={statsReveal.isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
