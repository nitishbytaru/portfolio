import React from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  ExternalLink,
  Code2,
  Database,
  Layers,
  Activity,
  LucideIcon,
} from "lucide-react";
import Tile, { TileTone } from "@/components/board/Tile";
import Wordmark from "@/components/board/Wordmark";
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
    KEYWORDS.includes(chunk) ? <strong key={i}>{chunk}</strong> : chunk
  );

const ROLE_TONES: { main: TileTone; side: TileTone }[] = [
  { main: "periwinkle", side: "mint" },
  { main: "amber", side: "pink" },
];

export default function ExperiencePage() {
  return (
    <div>
      <Wordmark className="mb-6">Experience</Wordmark>
      <div className="space-y-4 lg:space-y-5">
        {experiences.map((exp, index) => {
          const tones = ROLE_TONES[index % ROLE_TONES.length];
          return (
            <article key={exp.company} className="grid gap-4 lg:grid-cols-3 lg:gap-5">
              <Tile tone={tones.main} className="p-6 lg:col-span-2 lg:p-8">
                <h2 className="wide text-3xl font-extrabold leading-tight md:text-4xl">{exp.role}</h2>
                <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-medium">
                  <span className="inline-flex items-center gap-1.5"><Briefcase className="h-4 w-4" aria-hidden="true" />{exp.company}</span>
                  <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" aria-hidden="true" />{exp.location}</span>
                  <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" aria-hidden="true" />{exp.date}</span>
                  <span>{exp.type}, {exp.summaryLabel}</span>
                </p>
                <ul className="mt-6 max-w-[70ch] list-disc space-y-3 pl-5 text-lg leading-relaxed">
                  {exp.points.map((point) => <li key={point}>{highlightKeywords(point)}</li>)}
                </ul>
                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-ink/30 pt-5 sm:grid-cols-4">
                  {exp.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt className="text-sm">{metric.label}</dt>
                      <dd className="font-bold">{metric.value}</dd>
                    </div>
                  ))}
                </dl>
              </Tile>

              <div className="flex flex-col gap-4 lg:gap-5">
                <Tile tone={tones.side} className="flex-1 p-6">
                  <h3 className="wide mb-4 text-xl font-extrabold">Skills Applied</h3>
                  <ul className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <li key={skill} className="inline-flex items-center gap-1.5 rounded-full bg-frame px-3 py-1.5 text-sm font-medium">
                        <TechIcon name={skill} sizeClassName="w-4 h-4" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </Tile>
                {exp.certificate !== "#" ? (
                  <Tile as="a" href={exp.certificate} target="_blank" rel="noopener noreferrer" tone="black" interactive corner className="flex items-center gap-3 p-6">
                    <ExternalLink className="h-6 w-6 shrink-0" aria-hidden="true" />
                    <span className="wide block pr-5 text-lg font-extrabold leading-tight">View {exp.company} Certificate</span>
                  </Tile>
                ) : (
                  <Tile tone="graphite" className="p-6 font-semibold">Certificate Pending</Tile>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
