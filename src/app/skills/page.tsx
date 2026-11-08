import type { Metadata } from "next";
import React from "react";
import Tile, { TileTone } from "@/components/board/Tile";
import Wordmark from "@/components/board/Wordmark";
import { TechIcon } from "@/components/ui/TechIcon";

interface CoreSkill {
  name: string;
  category: string;
  description: string;
  colSpan: string;
}

const coreSkills: CoreSkill[] = [
  {
    name: "React.js",
    category: "Frontend",
    description: "Building dynamic, interactive user interfaces with modern React.",
    colSpan: "md:col-span-2 lg:col-span-2",
  },
  {
    name: "Next.js",
    category: "Frontend",
    description: "React framework for production-grade SSR applications.",
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    name: "Node.js",
    category: "Backend",
    description: "Scalable server-side logic and RESTful APIs.",
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    name: "React Native",
    category: "Mobile",
    description: "Framework for building cross-platform mobile apps.",
    colSpan: "md:col-span-2 lg:col-span-1",
  },
  {
    name: "MongoDB",
    category: "Database",
    description: "NoSQL document database for modern applications.",
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    name: "Git & GitHub",
    category: "Tooling",
    description: "Version control system and collaboration platform.",
    colSpan: "md:col-span-1 lg:col-span-2",
  },
];

interface LandscapeSkill {
  name: string;
  category: string;
}

const landscapeSkills: LandscapeSkill[] = [
  { name: "JavaScript", category: "Language" },
  { name: "TypeScript", category: "Language" },
  { name: "Python", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Java", category: "Language" },
  { name: "Angular", category: "Frontend" },
  { name: "Express.js", category: "Backend" },
  { name: ".NET / C#", category: "Backend" },
  { name: "Entity Framework", category: "Backend" },
  { name: "Django / Flask", category: "Backend" },
  { name: "MySQL", category: "Database" },
  { name: "HTML / CSS", category: "Frontend" },
  { name: "Jupyter", category: "Tooling" },
];

const TONES: TileTone[] = ["periwinkle", "amber", "mint", "pink", "violet", "periwinkle"];

export const metadata: Metadata = { title: "Skills" };

export default function SkillsPage() {
  return (
    <div>
      <Wordmark className="mb-6">Skills</Wordmark>

      <h2 className="wide mb-4 text-2xl font-extrabold">Core Arsenal</h2>
      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
        {coreSkills.map((skill, index) => (
          <Tile key={skill.name} tone={TONES[index]} className={`${skill.colSpan} flex flex-col justify-between gap-8 p-6`}>
            <div className="flex items-start justify-between">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-frame">
                <TechIcon name={skill.name} sizeClassName="w-7 h-7" />
              </span>
              <span className="text-sm font-semibold">{skill.category}</span>
            </div>
            <div>
              <h3 className="wide text-2xl font-extrabold">{skill.name}</h3>
              <p className="mt-1 leading-relaxed">{skill.description}</p>
            </div>
          </Tile>
        ))}
      </div>

      <h2 className="wide mb-4 text-2xl font-extrabold">Tech Landscape</h2>
      <Tile tone="plain" className="p-5 lg:p-6">
        <ul className="flex flex-wrap gap-3">
          {landscapeSkills.map((skill) => (
            <li key={skill.name} className="inline-flex items-center gap-2 rounded-full bg-frame px-4 py-2.5 font-semibold">
              <TechIcon name={skill.name} sizeClassName="w-5 h-5" />
              {skill.name}
            </li>
          ))}
        </ul>
      </Tile>
    </div>
  );
}
