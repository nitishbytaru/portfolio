"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projectsData } from "@/data/ProjectData";

export default function ProjectPeekList() {
  const [peek, setPeek] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const lastX = useRef(0);

  const handleMove = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse" || !cardRef.current) return;
    const lean = Math.max(-10, Math.min(10, (event.clientX - lastX.current) * 0.6));
    lastX.current = event.clientX;
    cardRef.current.style.transform = `translate3d(${event.clientX + 24}px, ${event.clientY - 90}px, 0) rotate(${lean}deg)`;
  };

  const shown = projectsData.find((project) => project.slug === peek);

  return (
    <div onPointerMove={handleMove} onPointerLeave={() => setPeek(null)}>
      <ul className="divide-y divide-ink/20">
        {projectsData.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              onPointerEnter={(event) => { if (event.pointerType === "mouse") setPeek(project.slug); }}
              className="group flex items-center justify-between py-3 font-semibold transition-[padding] duration-300 hover:pl-3"
            >
              {project.title}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
      <div
        ref={cardRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-50 w-64 motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out"
      >
        <div className={`relative aspect-[16/10] overflow-hidden rounded-xl bg-ink shadow-[0_20px_36px_-12px_rgb(0_0_0/0.5)] motion-safe:transition-[opacity,transform] motion-safe:duration-200 ${shown ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}>
          {shown && <Image key={shown.slug} src={shown.thumbnail} alt="" fill sizes="256px" className="object-cover object-left-top" />}
        </div>
      </div>
    </div>
  );
}
