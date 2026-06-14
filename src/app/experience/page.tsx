"use client";

import React from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Building2,
  Code2,
  Database,
  Layers,
  Activity,
  LucideIcon,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionShell from "@/components/ui/SectionShell";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import { TechIcon } from "@/components/ui/TechIcon";

interface Metric {
  label: string;
  value: string;
  icon: LucideIcon;
}

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  date: string;
  type: string;
  summaryLabel: string;
  certificate: string;
  points: string[];
  skills: string[];
  metrics: Metric[];
}

const experiences: ExperienceItem[] = [
  {
    role: "System Engineer Intern",
    company: "Infosys",
    location: "Mysore",
    date: "Dec 2025 - May 2026",
    type: "Enterprise Training",
    summaryLabel: "Enterprise Stack",
    certificate:
      "https://drive.google.com/file/d/1aLeH6dHQzZo0sbtxbiw7Z4B6qrq_IPTw/view?usp=drive_link",
    points: [
      "Completed intensive Java Generic Training covering OOP principles — inheritance, polymorphism, abstraction, encapsulation, exception handling, and collections.",
      "Acquired hands-on knowledge of DBMS and MySQL: relational design, normalization, SQL queries, joins, and database management.",
      "Completed Stream Training in the Microsoft stack: TypeScript, C#, Angular, .NET, and Entity Framework Core for enterprise-grade full-stack development.",
    ],
    skills: [
      "Java",
      "OOP",
      "DBMS",
      "MySQL",
      "TypeScript",
      "C#",
      "Angular",
      ".NET",
      "Entity Framework Core",
    ],
    metrics: [
      { label: "Focus Area", value: "Full Stack & DB", icon: Database },
      { label: "Stream Track", value: "Microsoft C# / .NET", icon: Code2 },
      { label: "Engineering Scope", value: "Enterprise Architecture", icon: Layers },
      { label: "Work Model", value: "Intensive Academy", icon: Activity },
    ]
  },
  {
    role: "Frontend Intern",
    company: "Evaluate Health",
    location: "Vizag",
    date: "Jul 2025 - Nov 2025",
    type: "Frontend Engineering",
    summaryLabel: "Mobile Frontend",
    certificate:
      "https://drive.google.com/file/d/1hiiyhRLeDxyIRnXKSnl4iDoFrAVErm6g/view?usp=drive_link",
    points: [
      "Developed production-level mobile applications using React Native, TypeScript, Redux, and Redux-Saga.",
      "Built reusable card components, reducing unnecessary re-renders and measurably improving rendering performance of the application.",
      "Coordinated with the backend team to integrate REST APIs for data storage and retrieval within an Agile frontend workflow.",
    ],
    skills: [
      "React Native",
      "TypeScript",
      "Redux",
      "Redux-Saga",
      "REST APIs",
      "Agile",
    ],
    metrics: [
      { label: "Focus Area", value: "Mobile Native UI", icon: Layers },
      { label: "State Engine", value: "Redux & Saga", icon: Activity },
      { label: "API Integration", value: "RESTful Endpoints", icon: Code2 },
      { label: "Workflow Mode", value: "Agile Scrum", icon: Briefcase },
    ]
  },
];

export default function ExperiencePage() {
  const cardsReveal = useScrollReveal({ threshold: 0.1 });

  const highlightKeywords = (text: string) => {
    const keywords = [
      "Java",
      "OOP",
      "DBMS",
      "MySQL",
      "TypeScript",
      "C#",
      "Angular",
      ".NET",
      "Entity Framework Core",
      "React Native",
      "Redux",
      "Redux-Saga",
      "REST APIs",
      "Agile",
    ];

    const regex = new RegExp(
      `(${keywords
        .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("|")})`,
      "g"
    );

    return text.split(regex).map((chunk, i) => {
      if (keywords.includes(chunk)) {
        return (
          <span
            key={i}
            className="inline-flex items-center gap-1 font-semibold text-text bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20 transition-all duration-300 hover:bg-primary/20"
          >
            <TechIcon name={chunk} sizeClassName="w-3.5 h-3.5" />
            {chunk}
          </span>
        );
      }
      return chunk;
    });
  };

  return (
    <div className="bg-background pt-16">
      <SectionShell id="experience" orbs="both" withGradient>
        <SectionHeader
          title="Where I've Worked"
        />

        <div className="relative max-w-6xl mx-auto pl-4 sm:pl-10 md:pl-16 mt-16">
          {/* Advanced timeline stem */}
          <div className="absolute left-8 sm:left-14 md:left-20 top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary via-secondary to-border opacity-70" />

          <div ref={cardsReveal.ref} className="flex flex-col gap-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`scroll-reveal stagger-${(index + 1) * 2} ${
                  cardsReveal.isVisible ? "revealed" : ""
                } group relative flex flex-col md:flex-row items-stretch`}
              >
                {/* Timeline icon node */}
                <div className="absolute left-8 sm:left-14 md:left-20 -translate-x-1/2 w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-primary shadow-lg z-20 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <Briefcase className="w-5 h-5 transition-transform duration-500 group-hover:rotate-12" />
                  <span className="absolute -inset-1 rounded-full bg-primary/10 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Glassmorphism Card */}
                <GlassCard
                  padding="p-6 md:p-8"
                  className="flex-1 ml-6 sm:ml-12 md:ml-20"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left columns - Details */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                          <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                          {exp.type}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-surface-elevated text-text-secondary text-xs font-semibold border border-border">
                          Internship
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/15 text-text text-xs font-mono font-bold border border-secondary/20">
                          {exp.summaryLabel}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-text mb-2 group-hover:text-primary transition-colors duration-300">
                          {exp.role}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 text-sm text-text-secondary">
                          <div className="flex items-center font-semibold text-text">
                            <Building2 className="w-4 h-4 mr-2 text-primary" />
                            {exp.company}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-primary/70" />
                            {exp.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-primary/70" />
                            {exp.date}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {exp.points.map((point, i) => (
                          <div
                            key={i}
                            className="group/point flex items-start p-3.5 rounded-2xl border border-transparent hover:border-border/40 hover:bg-surface-elevated/50 hover:translate-x-2 hover:shadow-sm transition-all duration-300"
                          >
                            <div className="shrink-0 mt-1 mr-4">
                              <CheckCircle2 className="w-4.5 h-4.5 text-text-secondary/60 group-hover/point:text-primary transition-colors duration-300" />
                            </div>
                            <p className="text-[15px] text-text-secondary leading-relaxed group-hover/point:text-text transition-colors duration-300">
                              {highlightKeywords(point)}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Key Metrics / Highlights Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-border/60">
                        {exp.metrics.map((metric, mIdx) => {
                          const Icon = metric.icon;
                          return (
                            <div
                              key={mIdx}
                              className="group/metric flex flex-col p-3 rounded-2xl bg-surface-elevated/40 border border-border/50 transition-all duration-300 hover:border-primary/30 hover:bg-surface-elevated hover:-translate-y-1 hover:shadow-md"
                            >
                              <div className="flex items-center gap-2 mb-1.5">
                                <div className="p-1.5 rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover/metric:bg-primary group-hover/metric:text-white">
                                  <Icon className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary/70">
                                  {metric.label}
                                </span>
                              </div>
                              <div className="text-xs font-bold text-text truncate">
                                {metric.value}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right column - Certificate Preview & Skills Panel */}
                    <div className="space-y-6 lg:border-l lg:border-border lg:pl-8 flex flex-col justify-between">
                      <div className="space-y-6 flex-grow flex flex-col">
                        
                        {/* Certificate Preview Frame */}
                        {exp.certificate !== "#" ? (
                          <div className="relative group/preview rounded-2xl border border-border/60 bg-surface-elevated/40 p-2 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-glow-primary overflow-hidden flex flex-col">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover/preview:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            <div className="relative w-full overflow-hidden rounded-xl bg-surface/50 border border-border/30">
                              {(() => {
                                const match = exp.certificate.match(/\/d\/(.*?)\//);
                                const fileId = match ? match[1] : null;
                                const thumbUrl = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w800` : null;
                                
                                return thumbUrl ? (
                                  <img
                                    src={thumbUrl}
                                    alt={`${exp.company} Certificate`}
                                    className="w-full h-auto max-h-[300px] object-contain mx-auto transition-transform duration-700 group-hover/preview:scale-105"
                                    loading="lazy"
                                  />
                                ) : (
                                  <iframe
                                    src={exp.certificate.replace("/view?usp=drive_link", "/preview").replace("/view", "/preview")}
                                    className="w-full h-64 sm:h-72 lg:h-[260px] border-0 pointer-events-none transition-transform duration-700 group-hover/preview:scale-105"
                                    title={`${exp.company} Certificate`}
                                    allow="autoplay"
                                  />
                                );
                              })()}
                            </div>
                          </div>
                        ) : (
                          <div className="flex-grow flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-surface/30 p-6 text-text-secondary/50 min-h-[160px]">
                            <ExternalLink className="w-8 h-8 mb-2 opacity-50" />
                            <span className="text-sm font-medium">Document Unavailable</span>
                          </div>
                        )}

                        {/* Skill chips (Moved from left column to fill vertical space) */}
                        <div className="pt-5 border-t border-border/60">
                          <div className="text-xs font-bold uppercase tracking-wider text-text-secondary/70 mb-3 flex items-center gap-1.5">
                            <Code2 className="w-3.5 h-3.5 text-primary" />
                            Skills Applied
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-text bg-surface-elevated border border-border rounded-xl transition-all duration-300 hover:border-primary/45 hover:scale-105 hover:bg-surface hover:shadow-md hover:shadow-primary/5 cursor-default"
                              >
                                <TechIcon name={skill} sizeClassName="w-3.5 h-3.5" />
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Certificate Action */}
                      <div className="pt-2">
                        {exp.certificate !== "#" ? (
                          <a
                            href={exp.certificate}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-ripple w-full inline-flex items-center justify-center px-4 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl border border-primary transition-all duration-300 text-sm font-semibold hover:shadow-glow-primary group/btn"
                          >
                            <span>View Full Certificate</span>
                            <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                          </a>
                        ) : (
                          <span className="w-full inline-flex items-center justify-center px-4 py-3 bg-border text-text-secondary/40 rounded-xl border border-border text-sm font-semibold cursor-not-allowed">
                            Certificate Pending
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
