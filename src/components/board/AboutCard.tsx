"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Eye, EyeOff, FileText, Hexagon, Mail } from "lucide-react";
import Tile from "@/components/board/Tile";
import SpinBadge from "@/components/board/SpinBadge";
import { EMAIL, RESUME_URL } from "@/data/site";

const RESUME_ID = RESUME_URL.match(/\/d\/(.*?)\//)?.[1];
const RESUME_THUMB = `https://drive.google.com/thumbnail?id=${RESUME_ID}&sz=w600`;
const PARALLAX = "motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out";

const canFollow = () =>
  window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches;

export default function AboutCard() {
  const cardRef = useRef<HTMLElement>(null);
  const [previewing, setPreviewing] = useState(false);
  const [wanted, setWanted] = useState(false);
  const [failed, setFailed] = useState(false);

  const show = (next: boolean) => {
    setWanted(true);
    setPreviewing(next);
  };

  const shift = (x: number, y: number) => {
    cardRef.current?.querySelectorAll<HTMLElement>("[data-depth]").forEach((layer) => {
      const depth = Number(layer.dataset.depth);
      layer.style.transform = x === 0 && y === 0 ? "" : `translate3d(${x * depth}px, ${y * depth}px, 0)`;
    });
  };

  const handleMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!canFollow()) return;
    const box = event.currentTarget.getBoundingClientRect();
    shift((event.clientX - box.left) / box.width - 0.5, (event.clientY - box.top) / box.height - 0.5);
  };

  const handleLeave = (event: React.PointerEvent<HTMLElement>) => {
    shift(0, 0);
    if (event.pointerType === "mouse") setPreviewing(false);
  };

  return (
    <Tile
      as="section"
      tone="periwinkle"
      aria-labelledby="about-name"
      ref={cardRef}
      onPointerEnter={() => setWanted(true)}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="flex flex-col !rounded-tl-none p-6 max-md:grid max-md:grid-cols-[minmax(0,1fr)_112px] max-md:gap-x-2 max-md:p-3 md:flex-row md:items-center md:gap-8 lg:flex-col lg:items-stretch lg:gap-0 lg:col-start-1 lg:row-span-2 lg:row-start-1"
    >
      <button
            type="button"
            onClick={() => show(!previewing)}
            aria-pressed={previewing}
            aria-label={previewing ? "Hide resume preview" : "Show resume preview"}
            className="absolute right-1.5 top-1.5 z-40 flex h-11 w-11 max-md:scale-[0.82] items-center justify-center rounded-full bg-frame text-ink transition-transform duration-200 hover:scale-110"
          >
            {previewing ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
          </button>

      <svg aria-hidden="true" viewBox="0 0 170 68" className="absolute -left-px -top-px h-[68px] w-[170px] fill-frame">
        <path d="M0 0H170C154 0 146 6 138 14L116 36C108 44 100 48 88 48H20C8 48 0 56 0 68Z" />
      </svg>
      <div className="absolute left-1 top-0 flex h-12 items-center gap-2 text-sm font-semibold text-ink">
        <Hexagon className="h-4 w-4" aria-hidden="true" />
        About Me
      </div>

      <div className="group/portrait relative mx-auto mt-8 aspect-[1/1.16] w-[min(74%,270px)] shrink-0 max-md:col-start-2 max-md:row-span-4 max-md:row-start-1 max-md:mt-5 max-md:w-[104px] md:mx-0 md:ml-4 md:w-[230px] lg:mx-auto lg:ml-auto lg:my-auto lg:w-[min(88%,36vh)]">
        <div data-depth="-8" className={`absolute bottom-0 left-0 aspect-square w-full ${PARALLAX}`}>
          <div className="absolute -inset-2.5 rounded-full border-[5px] border-white transition-transform duration-500 ease-out group-hover/portrait:scale-105" />
          <div className="absolute inset-0 rounded-full bg-pink" />
        </div>
        <div data-depth="14" className={`absolute inset-0 overflow-hidden rounded-b-[999px] ${PARALLAX}`}>
          <Image
            src="/NitishCutout.png"
            alt="Portrait of Nitish Durga Bytaru"
            fill
            priority
            sizes="(min-width: 1024px) 340px, 280px"
            className="object-cover object-top"
          />
        </div>
        <div data-depth="22" className={`absolute -bottom-3 -right-8 h-[84px] w-[84px] max-md:-bottom-1 max-md:-right-2 max-md:h-11 max-md:w-11 ${PARALLAX}`}>
          <SpinBadge className="h-full w-full" />
        </div>

        {/* Resume sheet that rises over the portrait */}
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-hidden={!previewing}
          tabIndex={previewing ? 0 : -1}
          aria-label="Open full resume"
          className={`absolute left-1/2 top-1/2 z-30 block aspect-[1/1.414] h-[96%] origin-bottom rounded-md bg-white p-1.5 shadow-[0_24px_40px_-12px_rgb(0_0_0/0.55)] motion-safe:transition-[transform,opacity] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] ${
            previewing
              ? "-translate-x-1/2 -translate-y-1/2 -rotate-2 opacity-100"
              : "pointer-events-none -translate-x-1/2 translate-y-[6%] rotate-6 opacity-0"
          }`}
        >
          {wanted && !failed ? (
            <img
              src={RESUME_THUMB}
              alt="Preview of Nitish Durga Bytaru's resume"
              referrerPolicy="no-referrer"
              onError={() => setFailed(true)}
              className="h-full w-full rounded-sm object-cover object-top"
            />
          ) : (
            <span className="flex h-full flex-col items-center justify-center gap-2 border-2 border-dashed border-ink/25 p-3 text-center text-ink">
              <FileText className="h-9 w-9" aria-hidden="true" />
              <span className="wide text-sm font-extrabold">Resume</span>
              <span className="text-xs font-semibold">Open full resume</span>
            </span>
          )}
        </a>
      </div>

      <div className="pt-5 max-md:contents md:min-w-0 md:flex-1 lg:flex-none">
        <p className="wide text-3xl font-light leading-none text-white max-md:col-start-1 max-md:row-start-1 max-md:pt-9 max-md:text-base">I&apos;m,</p>
        <h1 id="about-name" className="wide mt-1 text-[2rem] font-semibold leading-[1.04] text-white max-md:col-start-1 max-md:row-start-2 max-md:mt-0 max-md:text-lg">
          Nitish Durga Bytaru
        </h1>
        <p className="mt-2 text-lg font-semibold text-ink max-md:col-start-1 max-md:row-start-3 max-md:mt-0.5 max-md:text-xs">Full Stack Web Developer, open to roles</p>
        <p className="mt-3 text-[15px] leading-snug text-ink max-md:hidden">
          I build full stack web apps, from real-time messaging with Socket.io to machine learning tools
          that help farmers make data-driven decisions.
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-x-4 max-md:col-start-1 max-md:row-start-4 max-md:mt-1">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex min-h-11 min-w-0 items-center gap-2 text-[15px] font-semibold text-ink underline max-md:hidden decoration-dashed underline-offset-4"
          >
            {EMAIL}
            <Mail className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            onPointerEnter={(event) => { if (event.pointerType === "mouse") setPreviewing(true); }}
            onFocus={() => show(true)}
            className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-ink px-4 text-[15px] font-semibold text-white max-md:text-xs"
          >
            View Resume
          </a>
        </div>
      </div>
    </Tile>
  );
}
