"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Cloud, Cpu, Database, Layers, LucideIcon, Monitor, Server, Zap } from "lucide-react";
import { Project } from "@/data/ProjectData";
import { TechIcon, hasTechIcon } from "@/components/ui/TechIcon";
import Tile from "@/components/board/Tile";

type RevealState = "idle" | "waiting" | "in";

// Content stays visible until script confirms it can animate it back in.
const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<RevealState>("idle");

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) setState("waiting");
  }, []);

  useEffect(() => {
    if (state !== "waiting" || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("in");
          observer.disconnect();
        }
      },
      { threshold: 0.55 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [state]);

  return { ref, state };
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="wide mb-5 text-2xl font-extrabold">{children}</h2>
);

export const AboutTile = ({ project }: { project: Project }) => {
  const { ref, state } = useReveal();
  const [lead, ...rest] = project.detailedDescription?.intro ?? [];
  const note = project.detailedDescription?.note;
  const titleWords = project.title.toLowerCase().split(" ");

  return (
    <Tile tone="periwinkle" className="p-6 lg:col-span-5">
      <div ref={ref} data-reveal={state}>
        <span aria-hidden="true" className="story-letter wide pointer-events-none absolute -bottom-12 -right-2 select-none text-[15rem] font-extrabold leading-none text-white/15">
          {project.title[0]}
        </span>
        <SectionTitle>About Project</SectionTitle>
        {lead && (
          <p className="relative text-lg font-semibold leading-snug">
            {lead.split(" ").map((word, index) => {
              const isName = titleWords.includes(word.replace(/[^\w]/g, "").toLowerCase());
              return (
                <React.Fragment key={index}>
                  <span
                    className={`story-word inline-block ${isName ? "story-mark" : ""}`}
                    style={{ "--i": index } as React.CSSProperties}
                  >
                    {word}
                  </span>{" "}
                </React.Fragment>
              );
            })}
          </p>
        )}
        {(rest.length > 0 || note) && (
          <details className="group/more relative mt-3">
            <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1 font-semibold underline underline-offset-4">
              Read more
              <ChevronDown className="h-4 w-4 motion-safe:transition-transform motion-safe:duration-300 group-open/more:rotate-180" aria-hidden="true" />
            </summary>
            <div className="mt-2 space-y-2 leading-relaxed">
              {rest.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {note && <p>{note}</p>}
            </div>
          </details>
        )}
      </div>
    </Tile>
  );
};

const DISC_RADIUS = 28;
const MAGNET_RANGE = 170;

// One gently waving path per wrapped row, running through the logo centers.
const wirePaths = (list: HTMLElement) => {
  const rows = new Map<number, { x: number; y: number }[]>();
  list.querySelectorAll<HTMLElement>("[data-magnet]").forEach((magnet) => {
    const item = magnet.parentElement as HTMLElement;
    const y = item.offsetTop + DISC_RADIUS;
    rows.set(y, [...(rows.get(y) ?? []), { x: item.offsetLeft + item.offsetWidth / 2, y }]);
  });
  return Array.from(rows.values())
    .filter((row) => row.length > 1)
    .map((row) =>
      row.reduce((path, point, index) => {
        if (index === 0) return `M ${point.x} ${point.y}`;
        const previous = row[index - 1];
        const bend = index % 2 === 0 ? 11 : -11;
        return `${path} Q ${(previous.x + point.x) / 2} ${point.y + bend} ${point.x} ${point.y}`;
      }, "")
    );
};

export const StackTile = ({ techStack }: { techStack: string[] }) => {
  const { ref, state } = useReveal();
  const listRef = useRef<HTMLUListElement>(null);
  const [wires, setWires] = useState<string[]>([]);
  const middle = (techStack.length - 1) / 2;

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => setWires(wirePaths(list));
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    measure();
    return () => observer.disconnect();
  }, [techStack]);

  const magnets = () => listRef.current?.querySelectorAll<HTMLElement>("[data-magnet]") ?? [];

  const pull = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse" || state !== "in" || !listRef.current) return;
    const box = listRef.current.getBoundingClientRect();
    magnets().forEach((magnet) => {
      const item = magnet.parentElement as HTMLElement;
      const dx = event.clientX - (box.left + item.offsetLeft + item.offsetWidth / 2);
      const dy = event.clientY - (box.top + item.offsetTop + DISC_RADIUS);
      const strength = Math.max(0, 1 - Math.hypot(dx, dy) / MAGNET_RANGE);
      magnet.style.transform = strength ? `translate(${dx * 0.16 * strength}px, ${dy * 0.16 * strength}px) scale(${1 + 0.1 * strength})` : "";
    });
  };

  const release = () => magnets().forEach((magnet) => { magnet.style.transform = ""; });

  return (
    <Tile id="stack" tone="plain" className="p-6 lg:col-span-7">
      <SectionTitle>Core Stack</SectionTitle>
      <div ref={ref} data-reveal={state}>
        <ul ref={listRef} onPointerMove={pull} onPointerLeave={release} className="stack-list relative flex flex-wrap gap-x-5 gap-y-4">
          <svg aria-hidden="true" className="stack-wire pointer-events-none absolute inset-0 h-full w-full overflow-visible">
            {wires.map((path) => <path key={path} d={path} fill="none" stroke="#5459AE" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 8" />)}
          </svg>
          {techStack.map((tech, index) => (
            <li
              key={tech}
              className="stack-item relative flex w-[4.5rem] cursor-default flex-col items-center gap-2 text-center text-xs font-semibold"
              style={{ "--i": index, "--pull": `${(middle - index) * 92}px` } as React.CSSProperties}
            >
              <span data-magnet className="block motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out">
                <span className="stack-bob block">
                  <span className="stack-disc relative flex h-14 w-14 items-center justify-center rounded-full bg-white">
                    <span aria-hidden="true" className="stack-ping absolute inset-0 rounded-full border-2 border-iris opacity-0" />
                    <TechIcon name={tech} sizeClassName="w-7 h-7" />
                  </span>
                </span>
              </span>
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </Tile>
  );
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
    <span title={item} className="inline-flex h-10 items-center rounded-full bg-white px-3 text-sm font-semibold text-indigo">
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

const STEP_MS = 1500;

export const BuiltTile = ({ project }: { project: Project }) => {
  const { ref, state } = useReveal();
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const layers = Object.entries(project.technologiesUsed ?? {});
  const deployment = Object.entries(project.deployment ?? {});
  const running = state === "in";

  useEffect(() => {
    if (!running || held || layers.length < 2) return;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % layers.length), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [running, held, active, layers.length]);

  if (layers.length === 0) return null;

  return (
    <Tile tone="amber" className="p-6 lg:col-span-12">
      <span aria-hidden="true" className="built-grid pointer-events-none absolute inset-0" />
      <div ref={ref} data-reveal={state} className="relative">
        <SectionTitle>How It&apos;s Built</SectionTitle>
        <ol
          className="flex flex-col items-stretch gap-1.5 md:flex-row md:items-center md:gap-2"
          onPointerLeave={() => setHeld(false)}
        >
          {layers.map(([key, value], index) => {
            const Icon = layerIcon(key);
            const lit = running && active === index;
            return (
              <React.Fragment key={key}>
                {index > 0 && (
                  <li aria-hidden="true" className="built-step relative flex justify-center" style={{ "--i": index * 2 - 1 } as React.CSSProperties}>
                    <ArrowRight className="h-5 w-5 rotate-90 md:rotate-0" />
                    {running && active === index - 1 && !held && (
                      <span className="packet absolute h-3 w-3 rounded-full bg-indigo" style={{ animationDuration: `${STEP_MS}ms` }} />
                    )}
                  </li>
                )}
                <li
                  onPointerEnter={(event) => {
                    if (event.pointerType !== "mouse" || !running) return;
                    setHeld(true);
                    setActive(index);
                  }}
                  style={{ "--i": index * 2 } as React.CSSProperties}
                  className={`built-step relative flex min-w-0 flex-1 items-center justify-between gap-3 rounded-2xl p-3 motion-safe:transition-[background-color,color,transform] motion-safe:duration-300 md:block md:p-4 ${
                    lit ? "-translate-y-1 bg-indigo text-white" : "bg-frame text-ink"
                  }`}
                >
                  {lit && !held && (
                    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
                      <rect className="built-current" width="100%" height="100%" rx="16" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" pathLength="100" strokeDasharray="14 86" style={{ animationDuration: `${STEP_MS}ms` }} />
                    </svg>
                  )}
                  <div className="flex items-center gap-2 md:mb-3">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full motion-safe:transition-colors motion-safe:duration-300 ${lit ? "bg-amber text-indigo" : "bg-indigo text-white"}`}>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="wide text-sm font-bold md:text-xs lg:text-sm">{key.replace(/_/g, " ")}</span>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2 md:justify-start">
                    {splitSpec(value).map((item, markIndex) => (
                      <span
                        key={item}
                        className={lit ? "mark-hop block" : "block"}
                        style={{ "--i": markIndex } as React.CSSProperties}
                      >
                        <TechMark item={item} />
                      </span>
                    ))}
                  </div>
                </li>
              </React.Fragment>
            );
          })}
        </ol>
        {deployment.length > 0 && (
          <ul className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-ink/20 pt-4 text-sm font-medium">
            <li aria-hidden="true" className="built-cloud mr-1"><Cloud className="h-5 w-5" /></li>
            {deployment.map(([key, value]) => {
              const hosting = running && layers[active]?.[0].toLowerCase() === key.toLowerCase();
              return (
                <li
                  key={key}
                  className={`rounded-full px-3 py-1 motion-safe:transition-colors motion-safe:duration-300 ${hosting ? "bg-indigo text-white" : ""}`}
                >
                  <span className="font-bold">{key.replace(/_/g, " ")}:</span> {value}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Tile>
  );
};
