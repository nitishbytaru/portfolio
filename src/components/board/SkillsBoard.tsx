"use client";

import React, { useRef, useState } from "react";
import Tile, { TileTone } from "@/components/board/Tile";
import { TechIcon } from "@/components/ui/TechIcon";
import type { SkillGroup } from "@/lib/schema";
import { skillGrid } from "@/lib/layout";

export type SkillGroupWithUsage = SkillGroup & {
  /** How many visible projects use a skill in this group. */
  used: number;
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

// Logos that wash out on their tile colour are drawn as a solid silhouette instead.
const GHOST_STYLE: Record<string, { wrap: string; logo: string }> = {
  mint: { wrap: "opacity-25", logo: "brightness-0" },
  indigo: { wrap: "opacity-90", logo: "" },
  iris: { wrap: "opacity-90", logo: "" },
};

// The React mark is very pale on the light circles.
const deepen = (name: string) => (name.startsWith("React") ? "brightness-75 saturate-200" : "");

const FACE = "!absolute inset-0 h-full w-full [backface-visibility:hidden]";

export default function SkillsBoard({ groups }: { groups: SkillGroupWithUsage[] }) {
  const [flipped, setFlipped] = useState<string | null>(null);
  const lastPointer = useRef<string | null>(null);
  const grid = skillGrid(groups.length);

  return (
    <ul className={`grid grid-cols-2 gap-5 max-md:gap-2 md:grid-cols-2 xl:grid-cols-12 ${grid.fillsViewport ? "xl:h-[calc(100vh-18.5rem)] xl:min-h-[520px]" : ""} ${grid.rowsClass}`}>
      {groups.map((group, groupIndex) => {
        const isFlipped = flipped === group.id;
        const used = group.used;
        return (
          <li
            key={group.id}
            onPointerMove={leanToward}
            onPointerLeave={standStraight}
            className={`deal-in h-44 sm:h-72 ${grid.fillsViewport ? "xl:h-auto" : "xl:h-72"} ${grid.itemClass(groupIndex)}`}
            style={{ animationDelay: `${groupIndex * 90}ms` }}
          >
            <button
              type="button"
              aria-expanded={isFlipped}
              aria-label={`${group.title}: ${group.skills.map((skill) => skill.name).join(", ")}`}
              onPointerDown={(event) => { lastPointer.current = event.pointerType; }}
              onPointerEnter={(event) => { if (event.pointerType === "mouse") setFlipped(group.id); }}
              onPointerLeave={(event) => { if (event.pointerType === "mouse") setFlipped(null); }}
              onClick={() => {
                if (lastPointer.current !== "mouse") setFlipped(isFlipped ? null : group.id);
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
                <Tile as="span" tone={group.color as TileTone} corner className={`${FACE} flex flex-col justify-between p-7 max-md:p-3`}>
                  <span aria-hidden="true" className={`pointer-events-none absolute -bottom-10 -right-8 rotate-[-12deg] ${GHOST_STYLE[group.color]?.wrap ?? "opacity-25"}`}>
                    <TechIcon name={group.leadIcon} sizeClassName={`h-56 w-56 max-md:h-28 max-md:w-28 xl:h-64 xl:w-64 ${GHOST_STYLE[group.color]?.logo ?? ""}`} />
                  </span>
                  <span className="relative z-10 flex">
                    {group.skills.map((skill, index) => (
                      <span
                        key={skill.id}
                        className="-ml-4 flex h-[72px] w-[72px] max-md:-ml-3 max-md:h-9 max-md:w-9 max-md:first:ml-0 items-center justify-center rounded-full bg-frame shadow-[0_6px_14px_-4px_rgb(0_0_0/0.35)] first:ml-0"
                        style={{ zIndex: group.skills.length - index }}
                      >
                        <TechIcon name={skill.name} icon={skill.icon} sizeClassName={`w-5 h-5 md:w-9 md:h-9 ${deepen(skill.name)}`} />
                      </span>
                    ))}
                  </span>
                  <span className="relative z-10">
                    <h2 className="wide text-3xl font-extrabold leading-tight max-md:text-lg">{group.title}</h2>
                    <span className="wide mt-1 block text-sm font-semibold max-md:mt-0 max-md:text-xs">{group.skills.length} skills<span className="hidden [@media(hover:none)]:inline">, tap to flip</span></span>
                  </span>
                </Tile>

                <Tile as="span" tone={group.color as TileTone} className={`${FACE} flex flex-col justify-between p-7 max-md:p-2.5 [transform:rotateY(180deg)]`}>
                  <span className="grid grid-cols-2 gap-x-4 gap-y-3 max-md:grid-cols-1 max-md:gap-1">
                    {group.skills.map((skill, index) => (
                      <span
                        key={skill.id}
                        className="unpack-item flex items-center gap-3 text-base font-semibold leading-tight max-md:gap-1.5 max-md:text-xs"
                        style={{
                          "--i": index,
                          "--ux": `calc(${-(index % 2)} * (100% + 16px))`,
                          "--uy": `calc(${-Math.floor(index / 2)} * (100% + 12px))`,
                        } as React.CSSProperties}
                      >
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-frame max-md:h-6 max-md:w-6">
                          <TechIcon name={skill.name} icon={skill.icon} sizeClassName={`w-4 h-4 md:w-7 md:h-7 ${deepen(skill.name)}`} />
                        </span>
                        {skill.name}
                      </span>
                    ))}
                  </span>
                  {used > 0 && (
                    <span className="unpack-item wide text-sm font-bold max-md:text-xs" style={{ "--i": group.skills.length, "--ux": "0px", "--uy": "12px" } as React.CSSProperties}>
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
