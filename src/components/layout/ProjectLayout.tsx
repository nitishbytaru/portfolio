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
import ProjectLaunchpad from "../board/ProjectLaunchpad";

interface ProjectLayoutProps {
  project: Project;
}

const HERO_TONES: TileTone[] = ["mint", "pink", "periwinkle", "violet", "mint"];

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="wide mb-5 text-2xl font-extrabold">{children}</h2>
);

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

  

  return (
    <div>
      <Wordmark className="mb-6 !text-[clamp(2.25rem,6.6vw,5.75rem)]">{project.title}</Wordmark>
      

      <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
        {/* Screens */}
        <Tile as="section" id="screens" aria-label={`${project.title} screenshots`} tone={heroTone} className="p-3 sm:p-4 lg:col-span-8">
          <ScreenDeck title={project.title} images={images} />
        </Tile>

        {/* Actions */}
        <ProjectLaunchpad
          project={project}
          images={images}
          featureIcons={Array.from(new Set(project.features.map(featureIcon)))}
          heroTone={heroTone}
        />

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
          <Tile id="stack" tone="plain" className="p-6 lg:col-span-7">
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

        <Tile id="features" tone="pink" className="p-6 lg:col-span-12">
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
