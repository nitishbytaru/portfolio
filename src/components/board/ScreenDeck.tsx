"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

interface ScreenDeckProps {
  title: string;
  images: string[];
}

const SLIDE_MS = 5000;

// Shortest signed distance around the loop, so the deck wraps seamlessly.
const loopOffset = (index: number, active: number, total: number) => {
  let offset = index - active;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
};

export default function ScreenDeck({ title, images }: ScreenDeckProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragStart = useRef<number | null>(null);
  const total = images.length;

  useEffect(() => {
    setActive(0);
  }, [images]);

  // Starts paused for visitors who asked for less motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPaused(true);
  }, []);

  // Rescheduled on every change, so a manual move always gets a full five seconds.
  useEffect(() => {
    if (paused || total < 2) return;
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % total);
    }, SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [active, paused, total]);

  const step = (delta: number) => setActive((current) => (current + delta + total) % total);

  const handleKey = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  };

  const handlePointerUp = (event: React.PointerEvent) => {
    if (dragStart.current === null) return;
    const distance = event.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(distance) > 40) step(distance < 0 ? 1 : -1);
  };

  return (
    <div>
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label={`${title} screenshots`}
        tabIndex={0}
        onKeyDown={handleKey}
        onPointerDown={(event) => { dragStart.current = event.clientX; }}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => { dragStart.current = null; }}
        className="relative aspect-[16/9] touch-pan-y select-none [perspective:1400px]"
      >
        {images.map((src, index) => {
          const offset = total > 1 ? loopOffset(index, active, total) : 0;
          const distance = Math.abs(offset);
          if (distance > 3) return null;
          return (
            <div
              key={src}
              aria-hidden={offset !== 0}
              onClick={() => offset !== 0 && setActive(index)}
              className={`absolute left-1/2 top-1/2 aspect-[16/10] w-[86%] overflow-hidden sm:w-[74%] rounded-xl bg-ink shadow-[0_24px_40px_-16px_rgb(0_0_0/0.55)] motion-safe:transition-[transform,opacity,filter] motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] ${
                offset === 0 ? "" : "cursor-pointer"
              }`}
              style={{
                transform: `translate(-50%, -50%) translateX(${offset * 46}%) translateZ(${distance * -170}px) rotateY(${offset * -26}deg)`,
                opacity: distance > 2 ? 0 : distance === 2 ? 0.55 : 1,
                filter: offset === 0 ? "none" : "brightness(0.72)",
                zIndex: 10 - distance,
              }}
            >
              <Image
                src={src}
                alt={offset === 0 ? `${title} screenshot ${index + 1} of ${total}` : ""}
                fill
                draggable={false}
                priority={offset === 0}
                sizes="(min-width: 1024px) 45vw, 75vw"
                className="pointer-events-none object-contain"
              />
            </div>
          );
        })}
      </div>

      {total > 1 && (
        <div className="mt-3 flex items-center gap-3">
          <p aria-live={paused ? "polite" : "off"} className="wide w-16 shrink-0 text-sm font-bold">
            {active + 1} / {total}
          </p>
          <span aria-hidden="true" className="block h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-ink/20 sm:hidden">
            <span className="block h-full rounded-full bg-indigo motion-safe:transition-[width] motion-safe:duration-500" style={{ width: `${((active + 1) / total) * 100}%` }} />
          </span>
          <div className="hidden min-w-0 flex-1 gap-1 sm:flex">
            {images.map((src, index) => (
              <button
                key={src}
                type="button"
                aria-label={`Show screenshot ${index + 1}`}
                aria-pressed={active === index}
                onClick={() => setActive(index)}
                className="group flex h-11 min-w-0 flex-1 items-center"
              >
                <span
                  className={`block w-full rounded-full motion-safe:transition-all motion-safe:duration-500 ${
                    active === index ? "h-2.5 bg-ink" : "h-1 bg-ink/35 group-hover:bg-ink/70"
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => setPaused(!paused)}
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink"
            >
              <svg viewBox="0 0 44 44" aria-hidden="true" className="absolute inset-0 h-full w-full -rotate-90">
                <circle cx="22" cy="22" r="20" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="3" />
                {!paused && (
                  <circle key={active} className="deck-ring" cx="22" cy="22" r="20" fill="none" stroke="#5459AE" strokeWidth="3" strokeLinecap="round" strokeDasharray="125.66" style={{ animationDuration: `${SLIDE_MS}ms` }} />
                )}
              </svg>
              {paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
            </button>
            <button type="button" onClick={() => step(-1)} aria-label="Previous screenshot" className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white">
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next screenshot" className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white">
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
