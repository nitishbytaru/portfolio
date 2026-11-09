"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Tile from "@/components/board/Tile";
import { TechIcon } from "@/components/ui/TechIcon";
import { GROUPS } from "@/components/board/SkillsBoard";

// One skill from each area in turn, so neighbouring logos vary.
const allSkills = Array.from({ length: Math.max(...GROUPS.map((group) => group.skills.length)) }, (_, round) =>
  GROUPS.flatMap((group) => (group.skills[round] ? [group.skills[round]] : []))
).flat();

const rows = [allSkills.filter((_, index) => index % 2 === 0), allSkills.filter((_, index) => index % 2 === 1)];

export default function SkillKeysTile() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <Tile
      as={Link}
      href="/skills"
      tone="indigo"
      aria-label={`Skills: see all ${allSkills.length}`}
      onPointerLeave={() => setHovered(null)}
      className="skill-flow group col-span-2 flex flex-col justify-between gap-2 py-4 lg:col-span-3 xl:col-span-4"
    >
      <span className="flex items-center justify-between gap-2 px-4">
        <span className="wide min-w-0 truncate text-4xl font-extrabold leading-none lg:text-xl xl:text-4xl">{hovered ?? "Skills"}</span>
        <ArrowRight className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:translate-x-1 lg:hidden xl:block" aria-hidden="true" />
      </span>

      <span aria-hidden="true" className="flex flex-col gap-2">
        {rows.map((row, rowIndex) => (
          <span key={rowIndex} className="skill-flow-row block overflow-hidden">
            <span className={`skill-flow-track flex w-max ${rowIndex === 1 ? "is-reverse" : ""}`}>
              {[...row, ...row].map((skill, index) => (
                <span
                  key={`${skill.name}-${index}`}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") setHovered(skill.name);
                  }}
                  className="mr-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-frame transition-transform duration-200 hover:scale-110"
                >
                  <TechIcon
                    name={skill.icon ?? skill.name}
                    sizeClassName={`h-7 w-7 ${skill.name.startsWith("React") ? "brightness-75 saturate-200" : ""}`}
                  />
                </span>
              ))}
            </span>
          </span>
        ))}
      </span>
    </Tile>
  );
}
