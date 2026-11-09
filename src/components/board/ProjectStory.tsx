"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, Cloud, Cpu, Database, Layers, LucideIcon, Monitor, Server, Zap } from "lucide-react";
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
  <h2 className="wide mb-5 text-2xl font-extrabold max-md:mb-2 max-md:text-lg">{children}</h2>
);

export const AboutTile = ({ project }: { project: Project }) => {
  const { ref, state } = useReveal();
  const [lead, ...rest] = project.detailedDescription?.intro ?? [];
  const note = project.detailedDescription?.note;
  const titleWords = project.title.toLowerCase().split(" ");

  return (
    <Tile tone="periwinkle" className="p-6 max-md:col-span-2 max-md:p-3 lg:col-span-5">
      <div ref={ref} data-reveal={state}>
        <span aria-hidden="true" className="story-letter wide pointer-events-none absolute -bottom-12 -right-2 select-none text-[15rem] font-extrabold max-md:text-[8rem] leading-none text-white/15">
          {project.title[0]}
        </span>
        <SectionTitle>About Project</SectionTitle>
        {lead && (
          <p className="relative text-lg font-semibold leading-snug max-md:text-sm">
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

const MAGNET_RANGE = 170;

// One gently waving path per wrapped row, running through the logo centers.
const wirePaths = (list: HTMLElement) => {
  const rows = new Map<number, { x: number; y: number }[]>();
  list.querySelectorAll<HTMLElement>("[data-magnet]").forEach((magnet) => {
    const item = magnet.parentElement as HTMLElement;
    const y = item.offsetTop + magnet.offsetHeight / 2;
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
      const dy = event.clientY - (box.top + item.offsetTop + magnet.offsetHeight / 2);
      const strength = Math.max(0, 1 - Math.hypot(dx, dy) / MAGNET_RANGE);
      magnet.style.transform = strength ? `translate(${dx * 0.16 * strength}px, ${dy * 0.16 * strength}px) scale(${1 + 0.1 * strength})` : "";
    });
  };

  const release = () => magnets().forEach((magnet) => { magnet.style.transform = ""; });

  return (
    <Tile id="stack" tone="plain" className="p-6 max-md:col-span-2 max-md:p-3 lg:col-span-7">
      <SectionTitle>Core Stack</SectionTitle>
      <div ref={ref} data-reveal={state}>
        <ul ref={listRef} onPointerMove={pull} onPointerLeave={release} className="stack-list relative flex flex-wrap gap-x-5 gap-y-4 max-md:gap-x-1 max-md:gap-y-2">
          <svg aria-hidden="true" className="stack-wire pointer-events-none absolute inset-0 h-full w-full overflow-visible">
            {wires.map((path) => <path key={path} d={path} fill="none" stroke="#5459AE" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 8" />)}
          </svg>
          {techStack.map((tech, index) => (
            <li
              key={tech}
              className="stack-item relative flex w-[4.5rem] cursor-default flex-col items-center gap-2 text-center text-xs font-semibold max-md:w-[3.75rem] max-md:gap-1"
              style={{ "--i": index, "--pull": `${(middle - index) * 92}px` } as React.CSSProperties}
            >
              <span data-magnet className="block motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out">
                <span className="stack-bob block">
                  <span className="stack-disc relative flex h-14 w-14 max-md:h-10 max-md:w-10 items-center justify-center rounded-full bg-white">
                    <span aria-hidden="true" className="stack-ping absolute inset-0 rounded-full border-2 border-iris opacity-0" />
                    <TechIcon name={tech} sizeClassName="w-5 h-5 md:w-7 md:h-7" />
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
    <span title={item} className="flex h-10 w-10 items-center justify-center rounded-full bg-white max-md:h-8 max-md:w-8">
      <TechIcon name={name} sizeClassName="w-4 h-4 md:w-6 md:h-6" />
      <span className="sr-only">{item}</span>
    </span>
  ) : (
    <span title={item} className="inline-flex h-10 items-center rounded-full bg-white px-3 text-sm font-semibold text-indigo max-md:h-8 max-md:px-2 max-md:text-xs">
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
    <Tile tone="amber" className="p-6 max-md:col-span-2 max-md:p-3 lg:col-span-12">
      <span aria-hidden="true" className="built-grid pointer-events-none absolute inset-0" />
      <div ref={ref} data-reveal={state} className="relative">
        <SectionTitle>How It&apos;s Built</SectionTitle>
        <ol
          className="grid grid-cols-2 items-stretch gap-1.5 md:flex md:flex-row md:items-center md:gap-2"
          onPointerLeave={() => setHeld(false)}
        >
          {layers.map(([key, value], index) => {
            const Icon = layerIcon(key);
            const lit = running && active === index;
            return (
              <React.Fragment key={key}>
                {index > 0 && (
                  <li aria-hidden="true" className="built-step relative flex justify-center max-md:hidden" style={{ "--i": index * 2 - 1 } as React.CSSProperties}>
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
                  className={`built-step relative block min-w-0 flex-1 rounded-2xl p-2.5 motion-safe:transition-[background-color,color,transform] motion-safe:duration-300 md:p-4 ${
                    lit ? "-translate-y-1 bg-indigo text-white" : "bg-frame text-ink"
                  }`}
                >
                  {lit && !held && (
                    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
                      <rect className="built-current" width="100%" height="100%" rx="16" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" pathLength="100" strokeDasharray="14 86" style={{ animationDuration: `${STEP_MS}ms` }} />
                    </svg>
                  )}
                  <div className="mb-2 flex items-center gap-2 md:mb-3">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full max-md:h-7 max-md:w-7 motion-safe:transition-colors motion-safe:duration-300 ${lit ? "bg-amber text-indigo" : "bg-indigo text-white"}`}>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="wide text-sm font-bold md:text-xs lg:text-sm">{key.replace(/_/g, " ")}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
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
          <ul className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-ink/20 pt-4 text-sm font-medium max-md:mt-2 max-md:gap-x-0.5 max-md:pt-2 max-md:text-xs">
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

const FEATURE_MS = 3200;

interface FeaturesProps {
  features: string[];
  iconFor: (feature: string) => LucideIcon;
}

export const FeaturesTile = ({ features, iconFor }: FeaturesProps) => {
  const { ref, state } = useReveal();
  const [step, setStep] = useState(0);
  const [held, setHeld] = useState(false);
  const total = features.length;
  const active = ((step % total) + total) % total;
  const angle = 360 / total;
  const playing = state === "in" && !held && total > 1;
  const ActiveIcon = iconFor(features[active]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setStep((current) => current + 1), FEATURE_MS);
    return () => window.clearTimeout(timer);
  }, [playing, step]);

  // Turns the short way round, so the dial never spins backwards across the ring.
  const select = (index: number) => {
    let delta = (index - active + total) % total;
    if (delta > total / 2) delta -= total;
    setStep((current) => current + delta);
  };

  return (
    <Tile
      id="features"
      tone="pink"
      className="p-6 !text-indigo max-md:col-span-2 max-md:p-3 lg:col-span-12 lg:p-8"
      onPointerEnter={(event: React.PointerEvent) => { if (event.pointerType === "mouse") setHeld(true); }}
      onPointerLeave={() => setHeld(false)}
    >
      <div ref={ref} data-reveal={state}>
        <h2 className="wide mb-4 text-2xl font-extrabold max-md:mb-1 max-md:text-lg">Key Features</h2>
        <ul className="sr-only">
          {features.map((feature) => <li key={feature}>{feature}</li>)}
        </ul>

        <div className="grid items-center gap-6 max-md:grid-cols-[auto_minmax(0,1fr)] max-md:gap-3 md:grid-cols-[320px_minmax(0,1fr)] md:gap-16 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="feature-dial relative mx-auto h-[156px] w-[156px] md:h-[320px] md:w-[320px] lg:h-[360px] lg:w-[360px]">
            <svg aria-hidden="true" viewBox="0 0 100 100" className="feature-orbit absolute inset-0 h-full w-full">
              <circle cx="50" cy="50" r="38.5" fill="none" stroke="#2E2A5C" strokeWidth="0.5" strokeDasharray="1.2 2.4" strokeLinecap="round" />
            </svg>

            <span aria-hidden="true" className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 max-md:h-14 max-md:w-14 items-center justify-center rounded-full bg-indigo text-amber lg:h-36 lg:w-36">
              <span key={step} className="feature-hub block">
                <ActiveIcon className="h-12 w-12 max-md:h-6 max-md:w-6 lg:h-14 lg:w-14" />
              </span>
              {playing && <span key={`ring-${step}`} className="feature-ping absolute inset-0 rounded-full border-2 border-indigo" />}
            </span>

            <span aria-hidden="true" key={`beam-${step}`} className="feature-beam absolute left-[calc(50%+var(--dial-r)+28px)] top-1/2 hidden h-1 w-14 origin-left -translate-y-1/2 rounded-full bg-indigo md:block" />

            <div
              className="absolute inset-0 motion-safe:transition-transform motion-safe:duration-[850ms] motion-safe:ease-[cubic-bezier(0.34,1.25,0.64,1)]"
              style={{ transform: `rotate(${-step * angle}deg)` }}
            >
              {features.map((feature, index) => {
                const Icon = iconFor(feature);
                const isActive = index === active;
                const position = index * angle;
                return (
                  <button
                    key={feature}
                    type="button"
                    onClick={() => select(index)}
                    aria-label={`Show feature: ${feature}`}
                    aria-pressed={isActive}
                    className="feature-node absolute left-1/2 top-1/2 -ml-7 -mt-7 h-14 w-14 rounded-full max-md:-ml-[15px] max-md:-mt-[15px] max-md:h-[30px] max-md:w-[30px]"
                    style={{ transform: `rotate(${position}deg) translateX(var(--dial-r))`, "--i": index } as React.CSSProperties}
                  >
                    <span
                      className={`flex h-full w-full items-center justify-center rounded-full motion-safe:transition-[transform,background-color,color] motion-safe:duration-[850ms] motion-safe:ease-[cubic-bezier(0.34,1.25,0.64,1)] ${isActive ? "bg-indigo text-amber" : "bg-frame text-indigo hover:bg-amber"}`}
                      style={{ transform: `rotate(${-position + step * angle}deg) scale(${isActive ? 1.2 : 1})` }}
                    >
                      <Icon className="h-6 w-6 max-md:h-3.5 max-md:w-3.5" aria-hidden="true" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div aria-hidden="true" className="min-w-0">
            <p className="wide text-sm font-bold tabular-nums">{active + 1} of {total}</p>
            <p key={step} className="wide mt-1 min-h-[6.5rem] break-words text-base max-[359px]:text-sm md:mt-3 md:text-2xl font-extrabold sm:text-3xl leading-[1.12] md:min-h-[11rem] lg:text-5xl lg:leading-[1.08]">
              {features[active].split(" ").map((word, index) => (
                <React.Fragment key={index}>
                  <span className="feature-word inline-block" style={{ "--i": index } as React.CSSProperties}>{word}</span>{" "}
                </React.Fragment>
              ))}
            </p>
            <div className="mt-1 flex items-center gap-2 md:mt-4 md:gap-3">
              <button type="button" tabIndex={-1} onClick={() => setStep((current) => current - 1)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo text-white max-md:h-9 max-md:w-9">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button type="button" tabIndex={-1} onClick={() => setStep((current) => current + 1)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo text-white max-md:h-9 max-md:w-9">
                <ArrowRight className="h-5 w-5" />
              </button>
              <span className="block h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-white">
                <span
                  key={step}
                  className="feature-timer block h-full origin-left rounded-full bg-indigo"
                  style={{ animationDuration: `${FEATURE_MS}ms`, animationPlayState: playing ? "running" : "paused" }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Tile>
  );
};
