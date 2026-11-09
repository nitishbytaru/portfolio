"use client";

import React, { useEffect, useRef, useState } from "react";
import { Github, RotateCw } from "lucide-react";
import Tile from "@/components/board/Tile";

const STEP = 26;
const CELL = 22;
const COLORS = ["#3B3776", "#216E39", "#30A14E", "#40C463", "#9BE9A8"];
const PROFILE_URL = "https://github.com/nitishbytaru";

const ContributionWave = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const parent = canvas?.parentElement;
    if (!canvas || !context || !parent) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;

    const draw = (now: number) => {
      const time = now / 1000;
      context.clearRect(0, 0, width, height);
      const cols = Math.ceil(width / STEP);
      const rows = Math.ceil(height / STEP);
      for (let col = 0; col < cols; col += 1) {
        for (let row = 0; row < rows; row += 1) {
          const x = col * STEP + 2;
          const y = row * STEP + 2;
          const fromCenter = Math.hypot(x - width / 2, y - height / 2);
          let value = Math.max(0, Math.sin(fromCenter / 75 - time * 1.8)) ** 3;
          if (pointer.current) {
            const fromPointer = Math.hypot(x - pointer.current.x, y - pointer.current.y);
            value = Math.max(value, 1 - fromPointer / 130);
          }
          context.fillStyle = COLORS[Math.min(COLORS.length - 1, Math.floor(value * COLORS.length))];
          context.beginPath();
          context.roundRect(x, y, CELL, CELL, 5);
          context.fill();
        }
      }
    };

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      if (now - last < 33) return;
      last = now;
      draw(now);
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (still) draw(1200);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    resize();
    if (!still) frame = requestAnimationFrame(loop);

    const move = (event: PointerEvent) => {
      const box = parent.getBoundingClientRect();
      pointer.current = event.pointerType === "mouse" ? { x: event.clientX - box.left, y: event.clientY - box.top } : null;
    };
    const leave = () => { pointer.current = null; };
    if (!still) {
      parent.addEventListener("pointermove", move);
      parent.addEventListener("pointerleave", leave);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      parent.removeEventListener("pointermove", move);
      parent.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
};

const formatClock = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

export default function GitHubUnavailable() {
  const [resetAt, setResetAt] = useState<number | null>(null);
  const [left, setLeft] = useState<number | null>(null);

  // This endpoint doesn't count against GitHub's request limit.
  useEffect(() => {
    let cancelled = false;
    fetch("https://api.github.com/rate_limit")
      .then((response) => (response.ok ? response.json() : null))
      .then((json) => {
        if (!cancelled && json?.rate?.remaining === 0) setResetAt(json.rate.reset * 1000);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (resetAt === null) return;
    const tick = () => {
      const seconds = Math.max(0, Math.ceil((resetAt - Date.now()) / 1000));
      setLeft(seconds);
      if (seconds === 0) window.location.reload();
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [resetAt]);

  return (
    <Tile tone="indigo" className="flex min-h-[max(520px,calc(100vh-18.5rem))] items-center justify-center p-4">
      <ContributionWave />
      <div role="status" className="relative z-10 w-full max-w-xl rounded-3xl bg-indigo/90 p-8 text-center backdrop-blur-sm">
        <h2 className="wide text-4xl font-extrabold leading-tight md:text-5xl">GitHub needs a moment</h2>
        <p className="mx-auto mt-3 max-w-[42ch] text-lg leading-snug">
          {left !== null
            ? "My live stats are paused while GitHub resets its request limit."
            : "My live stats couldn't load right now. Try again in a moment."}
        </p>
        {left !== null && (
          <p className="mt-5">
            <span className="wide block text-6xl font-extrabold tabular-nums text-apricot">{formatClock(left)}</span>
            <span className="mt-1 block text-sm font-semibold">until the stats reload by themselves</span>
          </p>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="group/retry inline-flex min-h-11 items-center gap-2 rounded-full bg-apricot px-5 font-semibold text-indigo"
          >
            <RotateCw className="h-4 w-4 motion-safe:transition-transform motion-safe:duration-500 group-hover/retry:rotate-180" aria-hidden="true" />
            Try again
          </button>
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group/gh inline-flex min-h-11 items-center gap-2 rounded-full bg-ghblack py-1.5 pl-1.5 pr-4 font-semibold text-white motion-safe:transition-colors motion-safe:duration-300 hover:bg-ghgreen"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ghgreen motion-safe:transition-colors motion-safe:duration-300 group-hover/gh:bg-ghblack">
              <Github className="h-4 w-4" aria-hidden="true" />
            </span>
            Open GitHub profile
          </a>
        </div>
      </div>
    </Tile>
  );
}
