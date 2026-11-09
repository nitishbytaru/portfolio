"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Bell, Camera, ChartColumn, Check, Cloud, Cpu, Database, Github, Globe, Heart,
  Layers, LayoutGrid, Leaf, Lock, LucideIcon, MessageCircle, Monitor, Search, Server, Shield, Smartphone, Upload, User, Wallet, Zap,
} from "lucide-react";
import { projectsData, Project } from "../../data/ProjectData";
import { TechIcon, hasTechIcon } from "../ui/TechIcon";
import Tile, { TileTone } from "../board/Tile";
import Wordmark from "../board/Wordmark";
import ScreenDeck from "../board/ScreenDeck";

interface ProjectLayoutProps {
  project: Project;
}

const HERO_TONES: TileTone[] = ["mint", "pink", "periwinkle", "violet", "mint"];

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="wide mb-5 text-2xl font-extrabold">{children}</h2>
);

const hostOf = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

const repoPathOf = (url: string) => {
  try {
    const parsed = new URL(url);
    return parsed.hostname.endsWith("github.com") ? parsed.pathname.replace(/^\//, "") : "View repository";
  } catch {
    return "View repository";
  }
};

// Splits "A, B (C, D), E" on commas that are outside parentheses.
const splitSpec = (value: string) => value.split(/,(?![^(]*\))/).map((item) => item.trim());

const techName = (item: string) => item.replace(/\s*\(.*\)/, "").trim();

// A logo when one exists, otherwise the name; the full text stays available as a tooltip.
const TechMark = ({ item }: { item: string }) => {
  const name = techName(item);
  return hasTechIcon(name) ? (
    <span title={item} className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
      <TechIcon name={name} sizeClassName="w-6 h-6" />
      <span className="sr-only">{item}</span>
    </span>
  ) : (
    <span title={item} className="inline-flex h-10 items-center rounded-full bg-white px-3 text-sm font-semibold">
      {name}
    </span>
  );
};

const LAYER_ICONS: [RegExp, LucideIcon][] = [
  [/front|ui|mobile/i, Monitor],
  [/back|api|server/i, Server],
  [/data|storage/i, Database],
  [/machine|ml|model/i, Cpu],
  [/real|socket/i, Zap],
];

const layerIcon = (key: string) => LAYER_ICONS.find(([pattern]) => pattern.test(key))?.[1] ?? Layers;

const FEATURE_ICONS: [RegExp, LucideIcon][] = [
  [/messag|chat|discussion|comment/i, MessageCircle],
  [/notif|alert/i, Bell],
  [/privacy|anonym|block|secure|protect/i, Shield],
  [/login|auth|jwt|session|registration/i, Lock],
  [/upload|image load|cloudinary/i, Upload],
  [/photo|camera|disease|image/i, Camera],
  [/budget|expense|income|finance|market/i, Wallet],
  [/chart|statistic|predict|analy|yield/i, ChartColumn],
  [/profile|user|friend/i, User],
  [/search|browse|discover/i, Search],
  [/multiling|language|cross-platform/i, Globe],
  [/crop|soil|plant|farm|agri/i, Leaf],
  [/mobile|react native|navigation|flexbox|responsive/i, Smartphone],
  [/like|favou?rite|feed|stor(y|ies)|reel/i, Heart],
  [/real-?time|fast|state|cach/i, Zap],
];

const featureIcon = (feature: string) => FEATURE_ICONS.find(([pattern]) => pattern.test(feature))?.[1] ?? Check;

const FACT_STYLE = "wide block text-3xl font-extrabold";

const ProjectLayout: React.FC<ProjectLayoutProps> = ({ project }) => {
  const images = project.images?.length ? project.images : [project.thumbnail];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project]);

  const currentIndex = projectsData.findIndex((item) => item.slug === project.slug);
  const previousProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;
  const isLinkedIn = project.liveLink?.includes("linkedin.com");
  const architecture = project.technologiesUsed ?? {};
  const deployment = project.deployment ?? {};
  const heroTone = HERO_TONES[Math.max(currentIndex, 0) % HERO_TONES.length];
  const layers = Object.entries(architecture);
  const [lead, ...restIntro] = project.detailedDescription?.intro ?? [];

  const facts = [
    { value: project.features.length, label: "Features" },
    { value: project.techStack.length, label: "Tools" },
    { value: images.length, label: "Screens" },
  ];

  return (
    <div>
      <Wordmark className="!text-[clamp(2.25rem,6.6vw,5.75rem)]">{project.title}</Wordmark>
      <p className="mb-6 mt-3 max-w-[65ch] text-lg leading-relaxed text-graphite">{project.shortDescription}</p>

      <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
        {/* Screens */}
        <Tile as="section" aria-label={`${project.title} screenshots`} tone={heroTone} className="p-3 sm:p-4 lg:col-span-8">
          <ScreenDeck title={project.title} images={images} />
        </Tile>

        {/* Actions */}
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:col-span-4 lg:flex lg:gap-5">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex min-h-40 flex-[1.5] flex-col lg:min-h-56 justify-between overflow-hidden rounded-[20px] bg-amber p-6 text-ink"
          >
            <span aria-hidden="true" className="absolute right-6 top-6 h-14 w-14 rounded-full bg-ink transition-transform duration-500 ease-out motion-safe:group-hover:scale-[16]" />
            <span className="relative z-10 flex items-start justify-between">
              <span className="break-all pr-20 text-sm font-semibold transition-colors duration-300 motion-safe:group-hover:text-white">{hostOf(project.liveLink)}</span>
              <span aria-hidden="true" className="flex h-14 w-14 shrink-0 items-center justify-center text-white">
                <ArrowUpRight className="h-7 w-7 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </span>
            <span className="wide relative z-10 block text-4xl font-extrabold leading-[1.05] transition-colors duration-300 motion-safe:group-hover:text-white">
              {isLinkedIn ? "LinkedIn Post" : "Live Demo"}
            </span>
          </a>

          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex min-h-32 flex-1 flex-col lg:min-h-36 justify-between overflow-hidden rounded-[20px] bg-graphite p-6 text-white"
          >
            <Github aria-hidden="true" className="absolute -bottom-8 -right-6 h-44 w-44 text-white/15 transition-transform duration-500 ease-out group-hover:-rotate-12 group-hover:scale-110" />
            <span className="relative z-10 break-all text-sm font-semibold">{repoPathOf(project.githubLink)}</span>
            <span className="wide relative z-10 mt-6 block text-3xl font-extrabold leading-[1.05]">Source Code</span>
          </a>

          <dl className="grid grid-cols-3 divide-x divide-ink/10 rounded-[20px] bg-white md:col-span-2">
            {facts.map((fact) => (
              <div key={fact.label} className="flex flex-col-reverse p-4">
                <dt className="wide text-xs font-semibold">{fact.label}</dt>
                <dd className={FACT_STYLE}>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Story */}
        <Tile tone="periwinkle" className="p-6 lg:col-span-5">
          <SectionTitle>About Project</SectionTitle>
          {lead && <p className="text-lg font-semibold leading-snug">{lead}</p>}
          {(restIntro.length > 0 || project.detailedDescription?.note) && (
            <details className="mt-3">
              <summary className="inline-flex min-h-11 cursor-pointer items-center font-semibold underline underline-offset-4">Read more</summary>
              <div className="mt-2 space-y-2 leading-relaxed">
                {restIntro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {project.detailedDescription?.note && <p>{project.detailedDescription.note}</p>}
              </div>
            </details>
          )}
        </Tile>

        {project.techStack?.length > 0 && (
          <Tile tone="plain" className="p-6 lg:col-span-7">
            <SectionTitle>Core Stack</SectionTitle>
            <ul className="flex flex-wrap gap-x-5 gap-y-4">
              {project.techStack.map((tech) => (
                <li key={tech} className="flex w-[4.5rem] flex-col items-center gap-2 text-center text-xs font-semibold">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
                    <TechIcon name={tech} sizeClassName="w-7 h-7" />
                  </span>
                  {tech}
                </li>
              ))}
            </ul>
          </Tile>
        )}

        {/* How it fits together */}
        {layers.length > 0 && (
          <Tile tone="amber" className="p-6 lg:col-span-12">
            <SectionTitle>How It&apos;s Built</SectionTitle>
            <ol className="flex flex-col items-stretch gap-1.5 md:flex-row md:items-center md:gap-2">
              {layers.map(([key, value], index) => {
                const Icon = layerIcon(key);
                return (
                  <React.Fragment key={key}>
                    {index > 0 && (
                      <li aria-hidden="true" className="flex justify-center">
                        <ArrowRight className="h-5 w-5 rotate-90 md:rotate-0" />
                      </li>
                    )}
                    <li className="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-2xl bg-frame p-3 md:block md:p-4">
                      <div className="flex items-center gap-2 md:mb-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="wide text-sm font-bold md:text-xs lg:text-sm">{key.replace(/_/g, " ")}</span>
                      </div>
                      <div className="flex flex-wrap justify-end gap-2 md:justify-start">
                        {splitSpec(value).map((item) => <TechMark key={item} item={item} />)}
                      </div>
                    </li>
                  </React.Fragment>
                );
              })}
            </ol>
            {Object.keys(deployment).length > 0 && (
              <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ink/20 pt-4 text-sm font-medium">
                <li aria-hidden="true"><Cloud className="h-5 w-5" /></li>
                {Object.entries(deployment).map(([key, value]) => (
                  <li key={key}><span className="font-bold">{key.replace(/_/g, " ")}:</span> {value}</li>
                ))}
              </ul>
            )}
          </Tile>
        )}

        <Tile tone="pink" className="p-6 lg:col-span-12">
          <SectionTitle>Key Features</SectionTitle>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {project.features.map((feature) => {
              const Icon = featureIcon(feature);
              return (
                <li key={feature} className="flex items-center gap-3 rounded-2xl bg-frame p-3 text-sm font-medium leading-snug">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  {feature}
                </li>
              );
            })}
          </ul>
        </Tile>

        {/* Close */}
        <nav aria-label="Other projects" className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 sm:grid-cols-[1fr_auto_2fr] lg:col-span-12 lg:gap-5">
          {previousProject ? (
            <Tile as={Link} href={`/projects/${previousProject.slug}`} tone="white" interactive className="wide col-span-2 flex min-h-11 items-center gap-3 p-5 font-semibold sm:col-span-1">
              <ArrowLeft className="h-5 w-5 shrink-0" aria-hidden="true" />
              {previousProject.title}
            </Tile>
          ) : <span className="hidden sm:block" />}
          <Tile as={Link} href="/projects" tone="black" interactive aria-label="Back to all projects" className="flex min-h-14 w-14 items-center justify-center sm:w-16">
            <LayoutGrid className="h-5 w-5" aria-hidden="true" />
          </Tile>
          {nextProject ? (
            <Tile as={Link} href={`/projects/${nextProject.slug}`} tone="black" interactive className="group flex min-h-28 items-stretch justify-between">
              <span className="wide flex items-center gap-4 p-5 text-2xl font-extrabold leading-tight sm:p-6">
                Next: {nextProject.title}
                <ArrowRight className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </span>
              <span className="relative hidden w-56 shrink-0 md:block">
                <Image src={nextProject.thumbnail} alt="" fill sizes="224px" className="object-cover object-left-top" />
              </span>
            </Tile>
          ) : <span className="hidden sm:block" />}
        </nav>
      </div>
    </div>
  );
};

export default ProjectLayout;
