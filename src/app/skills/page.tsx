"use client";

import React from "react";
import { Zap, Layers } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { TechIcon } from "@/components/ui/TechIcon";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";

interface CoreSkill {
  name: string;
  category: string;
  description: string;
  colSpan: string;
}

const coreSkills: CoreSkill[] = [
  {
    name: "React.js",
    category: "Frontend",
    description: "Building dynamic, interactive user interfaces with modern React.",
    colSpan: "md:col-span-2 lg:col-span-2",
  },
  {
    name: "Next.js",
    category: "Frontend",
    description: "React framework for production-grade SSR applications.",
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    name: "Node.js",
    category: "Backend",
    description: "Scalable server-side logic and RESTful APIs.",
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    name: "React Native",
    category: "Mobile",
    description: "Framework for building cross-platform mobile apps.",
    colSpan: "md:col-span-2 lg:col-span-1",
  },
  {
    name: "MongoDB",
    category: "Database",
    description: "NoSQL document database for modern applications.",
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    name: "Git & GitHub",
    category: "Tooling",
    description: "Version control system and collaboration platform.",
    colSpan: "md:col-span-1 lg:col-span-2",
  },
];

interface LandscapeSkill {
  name: string;
  category: string;
}

const landscapeSkills: LandscapeSkill[] = [
  { name: "JavaScript", category: "Language" },
  { name: "TypeScript", category: "Language" },
  { name: "Python", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Java", category: "Language" },
  { name: "Angular", category: "Frontend" },
  { name: "Express.js", category: "Backend" },
  { name: ".NET / C#", category: "Backend" },
  { name: "Entity Framework", category: "Backend" },
  { name: "Django / Flask", category: "Backend" },
  { name: "MySQL", category: "Database" },
  { name: "HTML / CSS", category: "Frontend" },
  { name: "Jupyter", category: "Tooling" },
];

export default function SkillsPage() {
  const bentoReveal = useScrollReveal({ threshold: 0.1 });
  const marqueeReveal = useScrollReveal({ threshold: 0.1 });

  const row1 = landscapeSkills.slice(0, 7);
  const row2 = landscapeSkills.slice(7);

  return (
    <div className="bg-background pt-16">
      <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden transition-colors duration-300 scroll-mt-20">
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.08] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px]" />

        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px] opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[150px] opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeader title="My Technical Arsenal" />

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
                <GlassCard
                  key={index}
                  className={`${skill.colSpan} scroll-reveal stagger-${Math.min(index + 1, 10)} ${
                    bentoReveal.isVisible ? "revealed" : ""
                  } flex flex-col justify-between`}
                  padding="p-6 sm:p-8"
                  interactive={true}
                  accentBar={true}
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex justify-center items-center w-14 h-14 bg-surface-elevated/80 backdrop-blur-xl rounded-2xl border border-border/60 transition-all duration-500 shadow-sm group-hover:border-primary/45 group-hover:bg-surface-elevated">
                      <TechIcon
                        name={skill.name}
                        sizeClassName="w-7 h-7"
                        className="transform transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-surface-elevated text-text-secondary border border-border font-medium group-hover:border-primary/30 group-hover:text-primary transition-colors duration-300">
                      {skill.category}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-2xl font-extrabold text-text mb-2 tracking-tight group-hover:text-primary transition-colors duration-300">
                      {skill.name}
                    </h4>
                    <p className="text-text-secondary leading-relaxed text-sm font-medium">
                      {skill.description}
                    </p>
                  </div>
                </GlassCard>
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
                      <TechIcon name={skill.name} sizeClassName="w-5 h-5" />
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
                      <TechIcon name={skill.name} sizeClassName="w-5 h-5" />
                      <span className="font-semibold text-text whitespace-nowrap">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
