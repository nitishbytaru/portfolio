"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Code2, GitBranch, GitCommitHorizontal, Github, Globe, Images, Linkedin, LucideIcon, Rocket } from "lucide-react";
import { Project } from "@/data/ProjectData";
import { TechIcon } from "@/components/ui/TechIcon";
import Odometer from "@/components/board/Odometer";
import Tile, { TileTone } from "@/components/board/Tile";

const MAX_PREVIEWS = 4;
const PREVIEW_SCREENS = 5;
const FLOATING_ICONS = [Code2, GitBranch, GitCommitHorizontal];
const STAT_TONES: TileTone[] = ["pink", "mint", "violet", "amber"];

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
    return parsed.hostname.endsWith("github.com") ? parsed.pathname.replace(/^\/|\/$/g, "") : hostOf(url);
  } catch {
    return url;
  }
};

// Starts full so the text exists without script, then types on mount and on demand.
const useTyped = (text: string) => {
  const [count, setCount] = useState(text.length);
  const [run, setRun] = useState(0);
  const replay = useCallback(() => setRun((current) => current + 1), []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let shown = 0;
    setCount(0);
    const timer = window.setInterval(() => {
      shown += 1;
      setCount(shown);
      if (shown >= text.length) window.clearInterval(timer);
    }, 38);
    return () => window.clearInterval(timer);
  }, [text, run]);

  return { typed: text.slice(0, count), done: count >= text.length, replay };
};

const AddressBar = ({ icon, typed, done, sweep, className }: { icon: React.ReactNode; typed: string; done: boolean; sweep: string; className: string }) => (
  <span aria-hidden="true" className={`relative z-10 block shrink-0 overflow-hidden rounded-full bg-white text-indigo ${className}`}>
    <span className="flex h-11 items-center gap-2 px-3 text-sm font-semibold">
      {icon}
      <span className="min-w-0 truncate">{typed}</span>
      {!done && <span className="caret -ml-1 h-4 w-0.5 shrink-0 bg-indigo" />}
    </span>
    <span className={`absolute inset-x-0 bottom-0 block h-1 origin-left scale-x-0 motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-out group-hover:scale-x-100 ${sweep}`} />
  </span>
);

const WaveTitle = ({ text, className }: { text: string; className: string }) => {
  let letter = 0;
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word) => (
          <span key={word} className="mr-[0.28em] inline-block whitespace-nowrap">
            {word.split("").map((char, index) => {
              letter += 1;
              return <span key={index} className="wave-letter inline-block" style={{ "--i": letter } as React.CSSProperties}>{char}</span>;
            })}
          </span>
        ))}
      </span>
    </span>
  );
};

const jumpTo = (id: string) => {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ block: "center" });
  target.classList.remove("jump-flash");
  void target.offsetWidth;
  target.classList.add("jump-flash");
};

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="fact-chip flex h-8 w-8 items-center justify-center rounded-full bg-frame text-indigo">{children}</span>
);

interface LaunchpadProps {
  project: Project;
  images: string[];
  featureIcons: LucideIcon[];
  heroTone: TileTone;
}

export default function ProjectLaunchpad({ project, images, featureIcons, heroTone }: LaunchpadProps) {
  const isLinkedIn = project.liveLink?.includes("linkedin.com");
  const address = useTyped(hostOf(project.liveLink));
  const repo = useTyped(repoPathOf(project.githubLink));
  const [previewing, setPreviewing] = useState(false);
  const [screen, setScreen] = useState(0);
  const previews = images.slice(0, PREVIEW_SCREENS);
  const host = Object.values(project.deployment ?? {})[0];
  const layers = Object.keys(project.technologiesUsed ?? {}).slice(0, 3);

  useEffect(() => {
    if (!previewing || previews.length < 2) return;
    const timer = window.setInterval(() => setScreen((current) => (current + 1) % previews.length), 700);
    return () => window.clearInterval(timer);
  }, [previewing, previews.length]);

  useEffect(() => {
    setScreen(0);
  }, [project.slug]);
  const statTones = STAT_TONES.filter((tone) => tone !== heroTone).slice(0, 3);

  const facts = [
    {
      id: "features",
      value: project.features.length,
      label: "Features",
      visual: featureIcons.slice(0, MAX_PREVIEWS).map((Icon, index) => (
        <Chip key={index}><Icon className="h-4 w-4" aria-hidden="true" /></Chip>
      )),
    },
    {
      id: "stack",
      value: project.techStack.length,
      label: "Tools",
      visual: project.techStack.slice(0, MAX_PREVIEWS).map((tech) => (
        <Chip key={tech}><TechIcon name={tech} sizeClassName="w-5 h-5" /></Chip>
      )),
    },
    {
      id: "screens",
      value: images.length,
      label: "Screens",
      visual: [<Chip key="screens"><Images className="h-4 w-4" aria-hidden="true" /></Chip>],
    },
  ];

  return (
    <div className="enter-launch stagger flex flex-col gap-4 md:grid md:grid-cols-2 lg:col-span-4 lg:flex lg:gap-5">
      <a
        href={project.liveLink}
        target="_blank"
        rel="noopener noreferrer"
        onPointerEnter={(event) => {
          address.replay();
          if (event.pointerType === "mouse" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPreviewing(true);
        }}
        onPointerLeave={() => setPreviewing(false)}
        className="group relative flex min-h-40 flex-[1.5] flex-col justify-between gap-6 overflow-hidden rounded-[20px] bg-amber p-6 text-ink lg:min-h-48"
      >
        <span aria-hidden="true" className="absolute right-6 top-6 h-14 w-14 rounded-full bg-ink transition-transform duration-500 ease-out motion-safe:group-hover:scale-[16]" />
        <span aria-hidden="true" className="absolute right-6 top-6 z-10 flex h-14 w-14 items-center justify-center text-white">
          <ArrowUpRight className="h-7 w-7 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
        <AddressBar
          icon={<Globe className="h-4 w-4 shrink-0" />}
          typed={address.typed}
          done={address.done}
          sweep="bg-iris"
          className="mr-[72px] mt-1.5"
        />
        <span aria-hidden="true" className="absolute bottom-4 right-4 z-10 block w-[30%]">
          <span className="preview-float block">
            <span className="relative block aspect-[16/10] -rotate-6 overflow-hidden rounded-lg border-2 border-white bg-ink shadow-[0_12px_22px_-8px_rgb(0_0_0/0.5)] motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom-right motion-safe:group-hover:rotate-0 motion-safe:group-hover:scale-110">
              {previews.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  fill
                  sizes="180px"
                  className={`object-cover object-left-top motion-safe:transition-opacity motion-safe:duration-300 ${screen === index ? "opacity-100" : "opacity-0"}`}
                />
              ))}
            </span>
          </span>
        </span>
        <span className="relative z-10 mr-[32%] block transition-colors delay-100 duration-300 motion-safe:group-hover:text-white">
          <WaveTitle text={isLinkedIn ? "LinkedIn Post" : "Live Demo"} className="wide block text-4xl font-extrabold leading-[1.05]" />
          {(isLinkedIn || host) && (
            <span className="mt-2 flex items-center gap-1.5 text-sm font-semibold">
              {isLinkedIn ? (
                <Linkedin className="h-4 w-4 shrink-0" aria-hidden="true" />
              ) : (
                <Rocket className="h-4 w-4 shrink-0 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
              )}
              {isLinkedIn ? "Opens on LinkedIn" : `Hosted on ${host}`}
            </span>
          )}
        </span>
      </a>

      <Tile
        as="a"
        href={project.githubLink}
        target="_blank"
        rel="noopener noreferrer"
        tone="iris"
        corner
        onPointerEnter={repo.replay}
        className="group flex min-h-[204px] flex-1 flex-col justify-between gap-5 p-6 motion-safe:transition-colors motion-safe:duration-300 hover:!bg-indigo"
      >
        <Github aria-hidden="true" className="absolute -bottom-8 -right-6 h-44 w-44 text-white/20 transition-transform duration-500 ease-out group-hover:-rotate-12 group-hover:scale-110" />
        {FLOATING_ICONS.map((Icon, index) => (
          <Icon
            key={index}
            aria-hidden="true"
            className="code-float absolute bottom-16 h-5 w-5 text-amber"
            style={{ right: `${40 + index * 46}px`, "--i": index } as React.CSSProperties}
          />
        ))}
        <AddressBar
          icon={<Github className="h-4 w-4 shrink-0" />}
          typed={repo.typed}
          done={repo.done}
          sweep="bg-amber"
          className="mr-8"
        />
        <span className="relative z-10 block">
          <WaveTitle text="Source Code" className="wide block text-3xl font-extrabold leading-[1.05]" />
          {layers.length > 0 && (
            <span className="mt-3 flex flex-wrap gap-1.5">
              {layers.map((layer, index) => (
                <span
                  key={layer}
                  className="layer-chip rounded-full bg-white px-3 py-1 text-sm font-semibold text-indigo"
                  style={{ "--i": index } as React.CSSProperties}
                >
                  {layer.replace(/_/g, " ")}
                </span>
              ))}
            </span>
          )}
        </span>
      </Tile>

      <div className="grid grid-cols-3 overflow-hidden rounded-[20px] md:col-span-2">
        {facts.map((fact, index) => (
          <Tile
            key={fact.id}
            as="button"
            type="button"
            tone={statTones[index]}
            corner
            onClick={() => jumpTo(fact.id)}
            aria-label={`${fact.value} ${fact.label}, go to section`}
            className="group/fact focus-inset !rounded-none p-3 text-left !text-ink transition-[filter] duration-300 hover:brightness-95 sm:p-4"
          >
            <span aria-hidden="true" className="wide block text-4xl font-extrabold leading-none"><Odometer value={fact.value} /></span>
            <span aria-hidden="true" className="wide mt-1 block text-sm font-semibold">{fact.label}</span>
            <span aria-hidden="true" className="fact-row mt-3 flex">{fact.visual}</span>
          </Tile>
        ))}
      </div>
    </div>
  );
}
