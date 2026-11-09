"use client";

import React, { useRef, useState } from "react";
import Tile, { TileTone } from "@/components/board/Tile";
import { TechIcon } from "@/components/ui/TechIcon";
import { projectsData } from "@/data/ProjectData";

interface Skill {
  name: string;
  icon?: string;
  aliases: string[];
}

interface SkillGroup {
  title: string;
  tone: TileTone;
  leadIcon: string;
  span: string;
  skills: Skill[];
}

const GROUPS: SkillGroup[] = [
  {
    title: "Frontend",
    tone: "mint",
    leadIcon: "React.js",
    span: "xl:col-span-4",
    skills: [
      { name: "React.js", aliases: ["react", "react.js"] },
      { name: "Next.js", aliases: ["next.js"] },
      { name: "Angular", aliases: ["angular"] },
      { name: "Tailwind CSS", aliases: ["tailwind css"] },
      { name: "HTML / CSS", icon: "HTML", aliases: ["html", "css"] },
    ],
  },
  {
    title: "Backend",
    tone: "amber",
    leadIcon: "Node.js",
    span: "xl:col-span-4",
    skills: [
      { name: "Node.js", aliases: ["node.js"] },
      { name: "Express.js", aliases: ["express.js"] },
      { name: ".NET / C#", icon: ".NET", aliases: [".net", "c#"] },
      { name: "Entity Framework", icon: "Entity Framework Core", aliases: ["entity framework"] },
      { name: "Django / Flask", icon: "Django", aliases: ["django", "flask"] },
    ],
  },
  {
    title: "Languages",
    tone: "pink",
    leadIcon: "TypeScript",
    span: "xl:col-span-4",
    skills: [
      { name: "JavaScript", aliases: ["javascript"] },
      { name: "TypeScript", aliases: ["typescript"] },
      { name: "Python", aliases: ["python"] },
      { name: "Java", aliases: ["java"] },
    ],
  },
  {
    title: "Databases",
    tone: "indigo",
    leadIcon: "MongoDB",
    span: "xl:col-span-6",
    skills: [
      { name: "MongoDB", aliases: ["mongodb", "mongoose"] },
      { name: "MySQL", aliases: ["mysql"] },
    ],
  },
  {
    title: "Mobile & Tools",
    tone: "violet",
    leadIcon: "React Native",
    span: "md:col-span-2 xl:col-span-6",
    skills: [
      { name: "React Native", aliases: ["react native"] },
      { name: "Git & GitHub", aliases: ["git"] },
      { name: "Jupyter", aliases: ["jupyter"] },
    ],
  },
];

const projectCount = (group: SkillGroup) => {
  const aliases = group.skills.flatMap((skill) => skill.aliases);
  return projectsData.filter((project) => project.techStack.some((tech) => aliases.includes(tech.toLowerCase()))).length;
};

const canTilt = () =>
  window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches;

const leanToward = (event: React.PointerEvent<HTMLLIElement>) => {
  if (!canTilt()) return;
  const box = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - box.left) / box.width - 0.5;
  const y = (event.clientY - box.top) / box.height - 0.5;
  const card = event.currentTarget.querySelector<HTMLElement>("[data-tilt]");
  if (card) card.style.transform = `rotateX(${-y * 9}deg) rotateY(${x * 9}deg) translateZ(14px)`;
};

const standStraight = (event: React.PointerEvent<HTMLLIElement>) => {
  const card = event.currentTarget.querySelector<HTMLElement>("[data-tilt]");
  if (card) card.style.transform = "";
};

// Logos that wash out on their tile are drawn as a solid silhouette instead.
const GHOST_STYLE: Record<string, { wrap: string; logo: string }> = {
  Frontend: { wrap: "opacity-25", logo: "brightness-0" },
  Databases: { wrap: "opacity-90", logo: "" },
};

// The React mark is very pale on the light circles.
const deepen = (name: string) => (name.startsWith("React") ? "brightness-75 saturate-200" : "");

const FACE = "!absolute inset-0 h-full w-full [backface-visibility:hidden]";

export default function SkillsBoard() {
  const [flipped, setFlipped] = useState<string | null>(null);
  const lastPointer = useRef<string | null>(null);

  return (
    <ul className="grid gap-5 md:grid-cols-2 xl:h-[calc(100vh-18.5rem)] xl:min-h-[520px] xl:grid-cols-12 xl:grid-rows-2">
      {GROUPS.map((group, groupIndex) => {
        const isFlipped = flipped === group.title;
        const used = projectCount(group);
        return (
          <li
            key={group.title}
            onPointerMove={leanToward}
            onPointerLeave={standStraight}
            className={`deal-in h-72 xl:h-auto ${group.span}`}
            style={{ animationDelay: `${groupIndex * 90}ms` }}
          >
            <button
              type="button"
              aria-expanded={isFlipped}
              aria-label={`${group.title}: ${group.skills.map((skill) => skill.name).join(", ")}`}
              onPointerDown={(event) => { lastPointer.current = event.pointerType; }}
              onPointerEnter={(event) => { if (event.pointerType === "mouse") setFlipped(group.title); }}
              onPointerLeave={(event) => { if (event.pointerType === "mouse") setFlipped(null); }}
              onClick={() => {
                if (lastPointer.current !== "mouse") setFlipped(isFlipped ? null : group.title);
                lastPointer.current = null;
              }}
              className="block h-full w-full rounded-[20px] text-left [perspective:1400px]"
            >
              <span data-tilt className="block h-full w-full [transform-style:preserve-3d] motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out">
              <span
                className={`relative block h-full w-full [transform-style:preserve-3d] motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isFlipped ? "is-open [transform:rotateY(180deg)]" : "is-closed"
                }`}
              >
                <Tile as="span" tone={group.tone} corner className={`${FACE} flex flex-col justify-between p-7`}>
                  <span aria-hidden="true" className={`pointer-events-none absolute -bottom-10 -right-8 rotate-[-12deg] ${GHOST_STYLE[group.title]?.wrap ?? "opacity-25"}`}>
                    <TechIcon name={group.leadIcon} sizeClassName={`h-56 w-56 xl:h-64 xl:w-64 ${GHOST_STYLE[group.title]?.logo ?? ""}`} />
                  </span>
                  <span className="relative z-10 flex">
                    {group.skills.map((skill, index) => (
                      <span
                        key={skill.name}
                        className="-ml-4 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-frame shadow-[0_6px_14px_-4px_rgb(0_0_0/0.35)] first:ml-0"
                        style={{ zIndex: group.skills.length - index }}
                      >
                        <TechIcon name={skill.icon ?? skill.name} sizeClassName={`w-9 h-9 ${deepen(skill.name)}`} />
                      </span>
                    ))}
                  </span>
                  <span className="relative z-10">
                    <h2 className="wide text-3xl font-extrabold leading-tight">{group.title}</h2>
                    <span className="wide mt-1 block text-sm font-semibold">{group.skills.length} skills</span>
                  </span>
                </Tile>

                <Tile as="span" tone={group.tone} className={`${FACE} flex flex-col justify-between p-7 [transform:rotateY(180deg)]`}>
                  <span className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {group.skills.map((skill, index) => (
                      <span
                        key={skill.name}
                        className="unpack-item flex items-center gap-3 text-base font-semibold leading-tight"
                        style={{
                          "--i": index,
                          "--ux": `calc(${-(index % 2)} * (100% + 16px))`,
                          "--uy": `calc(${-Math.floor(index / 2)} * (100% + 12px))`,
                        } as React.CSSProperties}
                      >
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-frame">
                          <TechIcon name={skill.icon ?? skill.name} sizeClassName={`w-7 h-7 ${deepen(skill.name)}`} />
                        </span>
                        {skill.name}
                      </span>
                    ))}
                  </span>
                  {used > 0 && (
                    <span className="unpack-item wide text-sm font-bold" style={{ "--i": group.skills.length, "--ux": "0px", "--uy": "12px" } as React.CSSProperties}>
                      Used in {used} {used === 1 ? "project" : "projects"}
                    </span>
                  )}
                </Tile>
              </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
