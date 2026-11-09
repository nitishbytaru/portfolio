"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Bell, Camera, ChartColumn, Check, Globe, Heart, LayoutGrid, Leaf, Lock, LucideIcon, MessageCircle, Search, Shield, Smartphone, Upload, User, Wallet, Zap } from "lucide-react";
import { projectsData, Project } from "../../data/ProjectData";
import Tile, { TileTone } from "../board/Tile";
import Wordmark from "../board/Wordmark";
import ScreenDeck from "../board/ScreenDeck";
import ProjectLaunchpad from "../board/ProjectLaunchpad";
import { AboutTile, BuiltTile, FeaturesTile, StackTile } from "../board/ProjectStory";

interface ProjectLayoutProps {
  project: Project;
}

const HERO_TONES: TileTone[] = ["mint", "pink", "periwinkle", "violet", "mint"];

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="wide mb-5 text-2xl font-extrabold">{children}</h2>
);

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
  const heroTone = HERO_TONES[Math.max(currentIndex, 0) % HERO_TONES.length];

  

  return (
    <div>
      <Wordmark className="mb-6 !text-[clamp(2.25rem,6.6vw,5.75rem)]">{project.title}</Wordmark>
      

      <div className="enter-detail grid gap-4 lg:grid-cols-12 lg:gap-5">
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
        <AboutTile project={project} />
        {project.techStack?.length > 0 && <StackTile techStack={project.techStack} />}
        <BuiltTile project={project} />

        <FeaturesTile features={project.features} iconFor={featureIcon} />

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
