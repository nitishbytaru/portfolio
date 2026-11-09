"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  LucideIcon,
} from "lucide-react";
import Tile, { TileTone } from "@/components/board/Tile";
import Image from "next/image";
import { TechIcon, hasTechIcon } from "@/components/ui/TechIcon";

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

const MONTHS = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
const yearOf = (monthIndex: number) => (monthIndex <= 5 ? 2025 : 2026);
const TICKS = 66;

// Month ranges on the ruler, end exclusive.
const SPANS: Record<string, { start: number; end: number; tone: TileTone; bg: string }> = {
  "Evaluate Health": { start: 0, end: 5, tone: "amber", bg: "bg-amber" },
  Infosys: { start: 5, end: 11, tone: "mint", bg: "bg-mint" },
};

const roleAt = (monthIndex: number) =>
  experiences.findIndex((role) => {
    const span = SPANS[role.company];
    return monthIndex >= span.start && monthIndex < span.end;
  });

const KEYWORDS = [
  "Entity Framework Core", "React Native", "Redux-Saga", "REST APIs", "TypeScript",
  "Angular", "MySQL", "Redux", "Agile", "DBMS", "Java", "OOP", ".NET", "C#",
];
const KEYWORD_PATTERN = new RegExp(
  `(${KEYWORDS.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
  "g"
);

const highlightKeywords = (text: string) =>
  text.split(KEYWORD_PATTERN).map((chunk, i) =>
    KEYWORDS.includes(chunk) ? <mark key={i} className="flow-mark">{chunk}</mark> : chunk
  );

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
    <li ref={ref} className={`flow-step group/step relative pb-8 pl-14 last:pb-0 ${armed ? "is-armed" : ""} ${seen ? "is-in" : ""}`}>
      {!last && <span aria-hidden="true" className="flow-line absolute bottom-0 left-[19px] top-10 w-0.5 origin-top bg-indigo" />}
      <span aria-hidden="true" className="flow-node absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-indigo text-white transition-transform duration-300 group-hover/step:scale-110">
        <Check className="h-5 w-5" />
      </span>
      <p className="flow-text pt-1 text-lg leading-relaxed transition-transform duration-300 group-hover/step:translate-x-1">{children}</p>
    </li>
  );
};

const CertificateCard = ({ url, company, roleName, date }: { url: string; company: string; roleName: string; date: string }) => {
  const [failed, setFailed] = useState(false);
  const fileId = url.match(/\/d\/(.*?)\//)?.[1];

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

const IdBadge = ({ item, accent }: { item: ExperienceItem; accent: string }) => {
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
    <div className="-mt-6 md:-ml-3 lg:-mt-10 lg:ml-0" onPointerMove={lean} onPointerLeave={settle}>
      <div className="badge-swing mx-auto w-[260px] origin-top [perspective:900px]">
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
              <Image src="/NitishCutout.png" alt="" fill sizes="112px" className="object-cover object-top" />
            </div>
            <div className="px-5 pb-5 pt-3">
              <p className="wide text-base font-extrabold leading-tight">Nitish Durga Bytaru</p>
              <p className="mt-1 text-sm font-semibold">{item.role}</p>
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm"><MapPin className="h-4 w-4" aria-hidden="true" />{item.location}</p>
              <p className="flex items-center justify-center gap-1.5 text-sm"><Calendar className="h-4 w-4" aria-hidden="true" />{item.date}</p>
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
    <dl ref={ref} data-state={state} className="stamps grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div
            key={metric.label}
            className="stamp flex cursor-default items-center gap-3 rounded-xl border-[3px] border-double border-indigo p-3 text-indigo"
            style={{ "--tilt": STAMP_TILT[index % STAMP_TILT.length], animationDelay: `${index * 170}ms` } as React.CSSProperties}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-indigo">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="flex min-w-0 flex-col-reverse">
              <dt className="text-sm">{metric.label}</dt>
              <dd className="font-bold leading-tight">{metric.value}</dd>
            </span>
          </div>
        );
      })}
    </dl>
  );
};

export default function ExperienceBoard() {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [origin, setOrigin] = useState(50);
  const rulerRef = useRef<HTMLDivElement>(null);
  const needleRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const ticks = useRef<(HTMLSpanElement | null)[]>([]);

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
      const distance = (index + 0.5) / TICKS - ratio;
      tick.style.transform = `scaleY(${1 + 2.6 * Math.exp(-((distance / 0.045) ** 2))})`;
    });
    const monthIndex = Math.floor(ratio * MONTHS.length);
    if (needleRef.current) {
      needleRef.current.style.opacity = "1";
      needleRef.current.style.left = `${ratio * 100}%`;
    }
    if (bubbleRef.current) bubbleRef.current.textContent = `${MONTHS[monthIndex]} ${yearOf(monthIndex)}`;
    choose(roleAt(monthIndex), ratio * 100);
  };

  const handleLeave = () => {
    ticks.current.forEach((tick) => {
      if (tick) tick.style.transform = "scaleY(1)";
    });
    if (needleRef.current) needleRef.current.style.opacity = "0";
  };

  const role = experiences[active];
  const span = SPANS[role.company];
  const behind = SPANS[experiences[previous].company];

  return (
    <div className="flex flex-col gap-4">
      {/* Time ruler */}
      <Tile tone="indigo" className="!overflow-visible enter-ruler z-20 shrink-0 px-5 pb-4 pt-3">
        <div ref={rulerRef} onPointerMove={handleMove} onPointerLeave={handleLeave} className="relative">
          <div aria-hidden="true" className="flex h-16 items-end justify-between">
            {Array.from({ length: TICKS }, (_, index) => (
              <span
                key={index}
                ref={(node) => { ticks.current[index] = node; }}
                className={`block w-0.5 origin-bottom max-sm:[&:nth-child(even)]:hidden rounded-full motion-safe:transition-transform motion-safe:duration-150 ${
                  index % 6 === 0 ? "h-5 bg-white" : "h-3 bg-white/45"
                }`}
              />
            ))}
          </div>

          <div ref={needleRef} aria-hidden="true" className="pointer-events-none absolute top-0 h-16 w-0.5 bg-amber opacity-0 motion-safe:transition-opacity">
            <span ref={bubbleRef} className="absolute left-2 top-0 whitespace-nowrap rounded-full bg-amber px-2.5 py-0.5 text-xs font-bold text-ink" />
          </div>

          <div aria-hidden="true" className="mb-2 mt-1 grid grid-cols-11 text-center text-xs font-semibold text-white">
            {MONTHS.map((month) => <span key={month}>{month}</span>)}
          </div>

          <div className="grid grid-cols-11 gap-1">
            {experiences.map((item, index) => {
              const itemSpan = SPANS[item.company];
              return (
                <button
                  key={item.company}
                  type="button"
                  aria-pressed={active === index}
                  onClick={() => choose(index, ((itemSpan.start + itemSpan.end) / 2 / MONTHS.length) * 100)}
                  style={{ gridColumn: `${itemSpan.start + 1} / ${itemSpan.end + 1}`, gridRow: 1 }}
                  className={`min-h-11 truncate rounded-full px-3 text-sm font-bold motion-safe:transition-colors motion-safe:duration-300 ${
                    active === index ? `${itemSpan.bg} text-ink` : "bg-indigo-soft text-white"
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
      <div className={`rounded-[20px] ${behind.bg}`}>
        <Tile
          key={role.company}
          as="article"
          tone={span.tone}
          className="wipe-in !text-indigo p-6 lg:p-10"
          style={{ "--wipe-x": `${origin}%` } as React.CSSProperties}
        >
          <div className="grid gap-8 md:grid-cols-[260px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12">
            <IdBadge item={role} accent={span.bg} />

            <div className="min-w-0">
              <h2 className="wide text-[clamp(2.25rem,5.4vw,5rem)] font-extrabold leading-none">{role.company}</h2>
              <p className="mt-3 text-xl font-bold">{role.role}</p>
              <p className="mt-2 font-medium">{role.type}, {role.summaryLabel}</p>

              <ul aria-label="Skills applied" className="mt-5 flex flex-wrap gap-2">
                {role.skills.map((skill, index) => (
                  <li
                    key={skill}
                    className={`pop-in inline-flex h-10 items-center gap-2 rounded-full bg-frame text-sm font-semibold text-indigo transition-transform duration-200 hover:-translate-y-1 ${
                      hasTechIcon(skill) ? "pl-2 pr-3.5" : "px-3.5"
                    }`}
                    style={{ animationDelay: `${180 + index * 45}ms` }}
                  >
                    {hasTechIcon(skill) && <TechIcon name={skill} sizeClassName="w-6 h-6" />}
                    {skill}
                  </li>
                ))}
              </ul>

              <ol className="mt-8">
                {role.points.map((point, index) => (
                  <FlowStep key={point} last={index === role.points.length - 1}>
                    {highlightKeywords(point)}
                  </FlowStep>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-10 grid items-center gap-10 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
            {role.certificate !== "#" && (
              <CertificateCard url={role.certificate} company={role.company} roleName={role.role} date={role.date} />
            )}
            <Stamps metrics={role.metrics} />
          </div>
        </Tile>
      </div>
    </div>
  );
}
