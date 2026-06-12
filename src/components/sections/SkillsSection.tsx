"use client";

import React from "react";
import {
  FileCode2,
  FileJson,
  Server,
  Atom,
  TerminalSquare,
  DatabaseZap,
  Database,
  Leaf,
  FileSignature,
  Globe2,
  GitBranch,
  Coffee,
  Smartphone,
  Layout,
  Cpu,
  Layers,
  Wind,
  BookOpen,
  Sparkles,
  Zap,
} from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

interface CoreSkill {
  name: string;
  path: React.ReactElement;
  category: string;
  description: string;
  colSpan: string;
}

const coreSkills: CoreSkill[] = [
  {
    name: "React.js",
    path: <Atom />,
    category: "Frontend",
    description: "Building dynamic, interactive user interfaces with modern React.",
    colSpan: "md:col-span-2 lg:col-span-2",
  },
  {
    name: "Next.js",
    path: <Globe2 />,
    category: "Frontend",
    description: "React framework for production-grade SSR applications.",
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    name: "Node.js",
    path: <Server />,
    category: "Backend",
    description: "Scalable server-side logic and RESTful APIs.",
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    name: "React Native",
    path: <Smartphone />,
    category: "Mobile",
    description: "Framework for building cross-platform mobile apps.",
    colSpan: "md:col-span-2 lg:col-span-1",
  },
  {
    name: "MongoDB",
    path: <Leaf />,
    category: "Database",
    description: "NoSQL document database for modern applications.",
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    name: "Git & GitHub",
    path: <GitBranch />,
    category: "Tooling",
    description: "Version control system and collaboration platform.",
    colSpan: "md:col-span-1 lg:col-span-2",
  },
];

interface LandscapeSkill {
  name: string;
  path: React.ReactElement;
  category: string;
}

const landscapeSkills: LandscapeSkill[] = [
  { name: "JavaScript", path: <FileJson />, category: "Language" },
  { name: "TypeScript", path: <FileSignature />, category: "Language" },
  { name: "Python", path: <TerminalSquare />, category: "Language" },
  { name: "Tailwind CSS", path: <Wind />, category: "Styling" },
  { name: "Java", path: <Coffee />, category: "Language" },
  { name: "Angular", path: <Layout />, category: "Frontend" },
  { name: "Express.js", path: <Server />, category: "Backend" },
  { name: ".NET / C#", path: <Cpu />, category: "Backend" },
  { name: "Entity Framework", path: <Layers />, category: "Backend" },
  { name: "Django / Flask", path: <DatabaseZap />, category: "Backend" },
  { name: "MySQL", path: <Database />, category: "Database" },
  { name: "HTML / CSS", path: <FileCode2 />, category: "Frontend" },
  { name: "Jupyter", path: <BookOpen />, category: "Tooling" },
];

export default function SkillsSection() {
  const titleReveal = useScrollReveal({ threshold: 0.2 });
  const bentoReveal = useScrollReveal({ threshold: 0.1 });
  const marqueeReveal = useScrollReveal({ threshold: 0.1 });

  const row1 = landscapeSkills.slice(0, 7);
  const row2 = landscapeSkills.slice(7);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.08] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px] opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[150px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          ref={titleReveal.ref}
          className={`scroll-reveal ${
            titleReveal.isVisible ? "revealed" : ""
          } mb-16 text-center`}
        >
          <div className="mb-4">
            <span className="inline-flex items-center px-4 py-1.5 text-sm font-medium text-text bg-surface/70 backdrop-blur-2xl rounded-full border border-border shadow-sm shimmer-badge">
              <Sparkles className="w-4 h-4 mr-2 text-primary" />
              Technical Expertise
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-4">
            My Technical Arsenal
          </h2>

          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            A comprehensive overview of the technologies, frameworks, and tools I use to build robust and scalable applications.
          </p>
        </div>

        {/* CORE ARSENAL - BENTO GRID */}
        <div className="mb-24">
          <div className="flex items-center gap-2 mb-8 pl-2">
            <Zap className="w-5 h-5 text-primary" />
            <h3 className="text-2xl font-bold text-text">Core Arsenal</h3>
          </div>
          
          <div
            ref={bentoReveal.ref}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {coreSkills.map((skill, index) => (
              <div
                key={index}
                className={`scroll-reveal stagger-${Math.min(index + 1, 10)} ${
                  bentoReveal.isVisible ? "revealed" : ""
                } ${skill.colSpan} group relative flex flex-col justify-between border border-border rounded-3xl p-6 sm:p-8 bg-surface/70 backdrop-blur-2xl overflow-hidden transition-all duration-500 hover:bg-surface/90 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5 pointer-events-none" />
                
                <div className="relative z-10 flex justify-between items-start mb-8">
                  <div className="flex justify-center items-center w-14 h-14 bg-surface-elevated/80 backdrop-blur-xl rounded-2xl border border-border/60 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-500 text-text shadow-sm">
                    {React.cloneElement(skill.path, {
                      className:
                        "w-7 h-7 transform transition-transform duration-500 group-hover:scale-110",
                    } as any)}
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-surface-elevated text-text-secondary border border-border font-medium group-hover:border-primary/30 group-hover:text-primary transition-colors duration-300">
                    {skill.category}
                  </span>
                </div>

                <div className="relative z-10">
                  <h4 className="text-2xl font-extrabold text-text mb-2 tracking-tight group-hover:text-primary transition-colors duration-300">
                    {skill.name}
                  </h4>
                  <p className="text-text-secondary leading-relaxed text-sm font-medium">
                    {skill.description}
                  </p>
                </div>
                
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary transition-transform duration-500 origin-left group-hover:scale-x-100 scale-x-0 w-full z-20" />
              </div>
            ))}
          </div>
        </div>

        {/* TECH LANDSCAPE - INFINITE MARQUEE */}
        <div ref={marqueeReveal.ref} className={`scroll-reveal stagger-2 ${marqueeReveal.isVisible ? "revealed" : ""}`}>
          <div className="flex items-center gap-2 mb-8 pl-2">
            <Layers className="w-5 h-5 text-secondary" />
            <h3 className="text-2xl font-bold text-text">Tech Landscape</h3>
          </div>

          <div className="relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-border/50 bg-surface/30 backdrop-blur-sm py-10 shadow-inner">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10" />

            {/* Row 1 - Moves left */}
            <div className="flex w-[200%] md:w-max">
              <div className="flex w-1/2 md:w-max justify-around gap-4 px-4 animate-marquee">
                {[...row1, ...row1].map((skill, index) => (
                  <div
                    key={`r1-${index}`}
                    className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-surface border border-border/80 hover:border-primary/50 hover:bg-surface-elevated transition-colors duration-300 shadow-sm cursor-default"
                  >
                    {React.cloneElement(skill.path, { className: "w-5 h-5 text-primary/80" } as any)}
                    <span className="font-semibold text-text whitespace-nowrap">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 - Moves right */}
            <div className="flex w-[200%] md:w-max">
              <div className="flex w-1/2 md:w-max justify-around gap-4 px-4 animate-marquee-reverse">
                {[...row2, ...row2].map((skill, index) => (
                  <div
                    key={`r2-${index}`}
                    className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-surface border border-border/80 hover:border-secondary/50 hover:bg-surface-elevated transition-colors duration-300 shadow-sm cursor-default"
                  >
                    {React.cloneElement(skill.path, { className: "w-5 h-5 text-secondary/80" } as any)}
                    <span className="font-semibold text-text whitespace-nowrap">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
