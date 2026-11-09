"use client";

import { useState } from "react";

const SpinBadge = ({ className = "" }: { className?: string }) => {
  const [paused, setPaused] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setPaused(!paused)}
      aria-pressed={paused}
      aria-label="Pause the Available for full stack roles badge animation"
      className={`rounded-full bg-ink p-1 ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="h-full w-full motion-safe:animate-[spin_18s_linear_infinite]"
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        <defs>
          <path id="badge-ring" d="M50 50 m-37 0 a37 37 0 1 1 74 0 a37 37 0 1 1 -74 0" />
        </defs>
        <text fill="#fff" fontSize="10.5" fontWeight="700">
          <textPath href="#badge-ring" textLength="228">
            AVAILABLE FOR FULL STACK ROLES
          </textPath>
        </text>
        <circle cx="50" cy="50" r="12" fill="#fff" />
      </svg>
    </button>
  );
};

export default SpinBadge;
