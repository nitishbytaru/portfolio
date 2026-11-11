"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  Award,
  Briefcase,
  Calendar,
  Check,
  MapPin,
  ExternalLink,
  Code2,
  Database,
  Layers,
  Activity,
  ChartColumn,
  Cpu,
  Globe,
  LucideIcon,
  Server,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import Tile, { TileTone } from "@/components/board/Tile";
import Image from "next/image";
import { TechIcon, hasTechIcon } from "@/components/ui/TechIcon";
import { driveFileId, type Experience, type Metric } from "@/lib/schema";
import { buildRuler, rangeLabel } from "@/lib/layout";
import { toneBg } from "@/lib/tones";

const METRIC_ICON: Record<Metric["icon"], LucideIcon> = {
  database: Database,
  code: Code2,
  layers: Layers,
  activity: Activity,
  briefcase: Briefcase,
  server: Server,
  cpu: Cpu,
  globe: Globe,
  users: Users,
  zap: Zap,
  shield: Shield,
  chart: ChartColumn,
};

const escape = (word: string) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Splits text so each known keyword can be marked. Keywords arrive longest first. */
const useHighlighter = (keywords: string[]) =>
  useMemo(() => {
    if (keywords.length === 0) return (text: string): React.ReactNode => text;
    const known = new Set(keywords);
    const pattern = new RegExp(`(${keywords.map(escape).join("|")})`, "g");
    return (text: string): React.ReactNode =>
      text.split(pattern).map((chunk, i) => (known.has(chunk) ? <mark key={i} className="flow-mark">{chunk}</mark> : chunk));
  }, [keywords]);

// Visible by default; only hidden once script confirms it can reveal it again.
const FlowStep = ({ children, last }: { children: React.ReactNode; last: boolean }) => {
  const ref = useRef<HTMLLIElement>(null);
  const [armed, setArmed] = useState(false);
  const [seen, setSeen] = useState(false);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) setArmed(true);
  }, []);

  useEffect(() => {
    if (!armed || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [armed]);

  return (
    <li ref={ref} className={`flow-step group/step relative pb-8 pl-14 last:pb-0 max-md:pb-3 max-md:pl-9 ${armed ? "is-armed" : ""} ${seen ? "is-in" : ""}`}>
      {!last && <span aria-hidden="true" className="flow-line absolute bottom-0 left-[19px] top-10 w-0.5 max-md:left-[13px] max-md:top-7 origin-top bg-indigo" />}
      <span aria-hidden="true" className="flow-node absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-indigo max-md:h-7 max-md:w-7 text-white transition-transform duration-300 group-hover/step:scale-110">
        <Check className="h-5 w-5" />
      </span>
      <p className="flow-text pt-1 text-lg leading-relaxed max-md:pt-0 max-md:text-sm max-md:leading-snug transition-transform duration-300 group-hover/step:translate-x-1">{children}</p>
    </li>
  );
};

const CertificateCard = ({ url, company, roleName, date }: { url: string; company: string; roleName: string; date: string }) => {
  const [failed, setFailed] = useState(false);
  const fileId = driveFileId(url);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${company} certificate`}
      className="group/cert mx-auto block w-full max-w-md [perspective:1200px]"
    >
      <span className="block rounded-xl bg-white p-3 shadow-[0_24px_40px_-16px_rgb(0_0_0/0.5)] [transform:rotate(-2.5deg)] motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cert:[transform:rotate(0deg)_scale(1.04)]">
        <span className="relative block aspect-[1.414] overflow-hidden rounded-md bg-frame">
          {fileId && !failed ? (
            <img
              src={`https://drive.google.com/thumbnail?id=${fileId}&sz=w800`}
              alt={`${company} certificate`}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setFailed(true)}
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="flex h-full flex-col items-center justify-center gap-2 border-[6px] border-double border-ink/25 p-5 text-center text-ink">
              <Award className="h-10 w-10" aria-hidden="true" />
              <span className="wide text-xl font-extrabold">{company}</span>
              <span className="text-sm font-semibold">{roleName}</span>
              <span className="text-xs">{date}</span>
            </span>
          )}
        </span>
        <span className="mt-3 flex items-center justify-between px-1 text-sm font-semibold text-ink">
          Certificate
          <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover/cert:-translate-y-0.5 group-hover/cert:translate-x-0.5" aria-hidden="true" />
        </span>
      </span>
    </a>
  );
};

const Barcode = ({ seed }: { seed: string }) => (
  <span aria-hidden="true" className="flex h-8 items-stretch justify-center gap-[2px]">
    {Array.from({ length: 34 }, (_, index) => (
      <span key={index} className="block bg-indigo" style={{ width: `${(seed.charCodeAt(index % seed.length) % 3) + 1}px` }} />
    ))}
  </span>
);

const IdBadge = ({ item, accent, name, portrait }: { item: Experience; accent: string; name: string; portrait: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const lean = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current || !window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    cardRef.current.style.transform = `rotateZ(${x * -9}deg) rotateY(${x * 16}deg)`;
  };

  const settle = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
  };

  return (
    <div className="-mt-3 md:-ml-3 md:-mt-6 lg:-mt-10 lg:ml-0" onPointerMove={lean} onPointerLeave={settle}>
      <div className="badge-swing mx-auto w-[260px] origin-top max-md:[zoom:0.57] [perspective:900px]">
        <div ref={cardRef} className="origin-top motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out">
          <div aria-hidden="true" className="mx-auto flex h-24 w-8 items-center justify-center overflow-hidden bg-indigo lg:h-28">
            <span className="wide whitespace-nowrap text-[11px] font-bold tracking-wide text-white [writing-mode:vertical-rl]">{item.company}</span>
          </div>
          <div aria-hidden="true" className="mx-auto h-5 w-10 rounded-b-md bg-graphite" />
          <div className="-mt-1 overflow-hidden rounded-2xl bg-white text-center text-indigo shadow-[0_22px_36px_-14px_rgb(46_42_92/0.55)]">
            <div className="flex h-14 items-start justify-center bg-indigo pt-3">
              <span aria-hidden="true" className="block h-2.5 w-14 rounded-full bg-white" />
            </div>
            <div className={`relative mx-auto -mt-6 h-28 w-28 overflow-hidden rounded-full border-4 border-white ${accent}`}>
              <Image src={portrait} alt="" fill sizes="112px" className="object-cover object-top" />
            </div>
            <div className="px-5 pb-5 pt-3">
              <p className="wide text-base font-extrabold leading-tight">{name}</p>
              <p className="mt-1 text-sm font-semibold">{item.role}</p>
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm"><MapPin className="h-4 w-4" aria-hidden="true" />{item.location}</p>
              <p className="flex items-center justify-center gap-1.5 text-sm"><Calendar className="h-4 w-4" aria-hidden="true" />{rangeLabel(item.start, item.end)}</p>
              <div className="mt-4"><Barcode seed={item.company + item.role} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const STAMP_TILT = ["-4deg", "3deg", "2.5deg", "-3deg"];

const Stamps = ({ metrics }: { metrics: Metric[] }) => {
  const ref = useRef<HTMLDListElement>(null);
  const [state, setState] = useState("idle");

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
      { threshold: 0.25 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [state]);

  return (
    <dl ref={ref} data-state={state} className="stamps grid grid-cols-1 gap-5 max-md:gap-1.5 lg:grid-cols-2">
      {metrics.map((metric, index) => {
        const Icon = METRIC_ICON[metric.icon] ?? Activity;
        return (
          <div
            key={`${metric.label}-${index}`}
            className="stamp flex cursor-default items-center gap-3 rounded-xl border-[3px] border-double border-indigo p-3 text-indigo max-md:gap-1.5 max-md:p-1.5 max-md:text-xs"
            style={{ "--tilt": STAMP_TILT[index % STAMP_TILT.length], animationDelay: `${index * 170}ms` } as React.CSSProperties}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-indigo max-md:h-7 max-md:w-7">
              <Icon className="h-5 w-5 max-md:h-3.5 max-md:w-3.5" aria-hidden="true" />
            </span>
            <span className="flex min-w-0 flex-col-reverse">
              <dt className="text-sm max-md:text-xs">{metric.label}</dt>
              <dd className="font-bold leading-tight">{metric.value}</dd>
            </span>
          </div>
        );
      })}
    </dl>
  );
};

interface ExperienceBoardProps {
  items: Experience[];
  keywords: string[];
  /** "YYYY-MM" at build time, so a role with no end date reaches the same month on server and client. */
  today: string;
  name: string;
  portrait: string;
}

export default function ExperienceBoard({ items, keywords, today, name, portrait }: ExperienceBoardProps) {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [origin, setOrigin] = useState(50);
  const rulerRef = useRef<HTMLDivElement>(null);
  const needleRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const ticks = useRef<(HTMLSpanElement | null)[]>([]);
  const highlight = useHighlighter(keywords);
  const ruler = useMemo(() => buildRuler(items, today), [items, today]);

  // About six ticks a month on short rulers, thinning out as the range grows.
  const perMonth = Math.max(1, Math.floor(72 / ruler.months));
  const tickCount = Math.min(ruler.months * perMonth, 72);
  const majorEvery = ruler.months <= 24 ? perMonth : perMonth * 12;
  const columns = { gridTemplateColumns: `repeat(${ruler.months}, minmax(0, 1fr))` };
  const phoneLabelStep = ruler.labels.length > 11 ? Math.ceil(ruler.labels.length / 8) : 1;

  if (items.length === 0) {
    return (
      <Tile tone="indigo" className="p-6">
        <p className="wide text-xl font-extrabold text-white">Experience is on its way.</p>
      </Tile>
    );
  }

  const roleAt = (column: number) => {
    const covering = ruler.spans
      .map((span, index) => ({ span, index }))
      .filter(({ span }) => column >= span.start && column < span.end);
    if (covering.length === 0) return -1;
    return covering.some(({ index }) => index === active) ? active : covering[0].index;
  };

  const choose = (index: number, atPercent: number) => {
    if (index === active || index < 0) return;
    setPrevious(active);
    setOrigin(atPercent);
    setActive(index);
  };

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !rulerRef.current) return;
    const box = rulerRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(0.9999, (event.clientX - box.left) / box.width));
    ticks.current.forEach((tick, index) => {
      if (!tick) return;
      const distance = (index + 0.5) / tickCount - ratio;
      tick.style.transform = `scaleY(${1 + 2.6 * Math.exp(-((distance / 0.045) ** 2))})`;
    });
    const column = Math.floor(ratio * ruler.months);
    if (needleRef.current) {
      needleRef.current.style.opacity = "1";
      needleRef.current.style.left = `${ratio * 100}%`;
    }
    if (bubbleRef.current) bubbleRef.current.textContent = ruler.nameAt(column);
    choose(roleAt(column), ratio * 100);
  };

  const handleLeave = () => {
    ticks.current.forEach((tick) => {
      if (tick) tick.style.transform = "scaleY(1)";
    });
    if (needleRef.current) needleRef.current.style.opacity = "0";
  };

  const safeActive = Math.min(active, items.length - 1);
  const role = items[safeActive];
  const accent = toneBg(role.color);
  const behind = toneBg(items[Math.min(previous, items.length - 1)].color);

  return (
    <div className="flex flex-col gap-4">
      {/* Time ruler */}
      <Tile tone="indigo" className="!overflow-visible enter-ruler z-20 shrink-0 px-5 pb-4 pt-3 max-md:px-3 max-md:pb-2 max-md:pt-1">
        <div ref={rulerRef} onPointerMove={handleMove} onPointerLeave={handleLeave} className="relative">
          <div aria-hidden="true" className="flex h-16 items-end justify-between max-md:h-8">
            {Array.from({ length: tickCount }, (_, index) => (
              <span
                key={index}
                ref={(node) => { ticks.current[index] = node; }}
                className={`block w-0.5 origin-bottom max-sm:[&:nth-child(even)]:hidden rounded-full motion-safe:transition-transform motion-safe:duration-150 ${
                  index % majorEvery === 0 ? "h-5 bg-white" : "h-3 bg-white/45"
                }`}
              />
            ))}
          </div>

          <div ref={needleRef} aria-hidden="true" className="pointer-events-none absolute top-0 h-16 w-0.5 max-md:h-8 bg-amber opacity-0 motion-safe:transition-opacity">
            <span ref={bubbleRef} className="absolute left-2 top-0 whitespace-nowrap rounded-full bg-amber px-2.5 py-0.5 text-xs font-bold text-ink" />
          </div>

          <div aria-hidden="true" className="mb-2 mt-1 grid text-center text-xs font-semibold text-white" style={columns}>
            {ruler.labels.map((label, index) => (
              <span
                key={label.from}
                // Phones fit about eight labels; past that, every few are kept so they don't run together.
                className={phoneLabelStep > 1 && index % phoneLabelStep !== 0 ? "max-sm:invisible" : undefined}
                style={{ gridColumn: `${label.from + 1} / ${label.to + 1}` }}
              >
                {label.text}
              </span>
            ))}
          </div>

          <div className="grid gap-1" style={columns}>
            {items.map((item, index) => {
              const itemSpan = ruler.spans[index];
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={safeActive === index}
                  aria-label={`${item.company}, ${rangeLabel(item.start, item.end)}`}
                  onClick={() => choose(index, ((itemSpan.start + itemSpan.end) / 2 / ruler.months) * 100)}
                  style={{ gridColumn: `${itemSpan.start + 1} / ${itemSpan.end + 1}`, gridRow: itemSpan.lane + 1 }}
                  className={`min-h-11 truncate rounded-full px-3 text-sm font-bold motion-safe:transition-colors motion-safe:duration-300 ${
                    safeActive === index ? `${toneBg(item.color)} text-ink` : "bg-indigo-soft text-white"
                  }`}
                >
                  {item.company}
                </button>
              );
            })}
          </div>
        </div>
      </Tile>

      {/* Role, wiped in from the point on the ruler */}
      <div className={`rounded-[20px] ${behind}`}>
        <Tile
          key={role.id}
          as="article"
          tone={role.color as TileTone}
          className="wipe-in !text-indigo p-6 max-md:p-3 lg:p-10"
          style={{ "--wipe-x": `${origin}%` } as React.CSSProperties}
        >
          <div className="grid gap-8 max-md:grid-cols-[150px_minmax(0,1fr)] max-md:gap-x-3 max-md:gap-y-3 md:grid-cols-[260px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12">
            <IdBadge item={role} accent={accent} name={name} portrait={portrait} />

            <div className="min-w-0 max-md:contents">
              <div className="min-w-0 self-center">
              <h2 className="wide text-[clamp(2.25rem,5.4vw,5rem)] font-extrabold leading-none max-md:text-xl">{role.company}</h2>
              <p className="mt-3 text-xl font-bold max-md:mt-1 max-md:text-sm">{role.role}</p>
              {(role.typeLabel || role.summaryLabel) && (
                <p className="mt-2 font-medium max-md:mt-1 max-md:text-xs">{[role.typeLabel, role.summaryLabel].filter(Boolean).join(", ")}</p>
              )}
              <p className="mt-1 text-xs font-medium md:hidden">{[role.location, rangeLabel(role.start, role.end)].filter(Boolean).join(", ")}</p>
              </div>

              {role.skills.length > 0 && (
              <ul aria-label="Skills applied" className="mt-5 flex flex-wrap gap-2 max-md:col-span-2 max-md:mt-0 max-md:gap-1">
                {role.skills.map((skill, index) => (
                  <li
                    key={skill}
                    className={`pop-in inline-flex h-10 items-center gap-2 rounded-full bg-frame text-sm max-md:h-7 max-md:gap-1 max-md:text-xs font-semibold text-indigo transition-transform duration-200 hover:-translate-y-1 ${
                      hasTechIcon(skill) ? "pl-2 pr-3.5" : "px-3.5"
                    }`}
                    style={{ animationDelay: `${180 + index * 45}ms` }}
                  >
                    {hasTechIcon(skill) && <TechIcon name={skill} sizeClassName="w-4 h-4 md:w-6 md:h-6" />}
                    {skill}
                  </li>
                ))}
              </ul>
              )}

              {role.points.length > 0 && (
              <ol className="mt-8 max-md:col-span-2 max-md:mt-0">
                {role.points.map((point, index) => (
                  <FlowStep key={`${index}-${point}`} last={index === role.points.length - 1}>
                    {highlight(point)}
                  </FlowStep>
                ))}
              </ol>
              )}
            </div>
          </div>

          {(role.certificate || role.metrics.length > 0) && (
          <div className="mt-10 grid grid-cols-2 items-center gap-10 max-md:mt-2 max-md:gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
            {role.certificate && (
              <CertificateCard url={role.certificate} company={role.company} roleName={role.role} date={rangeLabel(role.start, role.end)} />
            )}
            {role.metrics.length > 0 && <Stamps metrics={role.metrics} />}
          </div>
          )}
        </Tile>
      </div>
    </div>
  );
}
