"use client";

import React from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

interface SectionHeaderProps {
  title: string;
  aside?: React.ReactNode;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  aside,
  className = "",
}) => {
  const reveal = useScrollReveal({ threshold: 0.2 });

  return (
    <div
      ref={reveal.ref}
      className={[
        "scroll-reveal mb-16 flex flex-col items-center gap-6 text-center group",
        reveal.isVisible ? "revealed" : "",
        className,
      ].join(" ")}
    >
      <div className="mx-auto max-w-2xl flex flex-col items-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-text md:text-5xl relative pb-5 transition-colors duration-300 group-hover:text-primary">
          {title}
          {/* Glowing animated gradient underline */}
          <span
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) origin-center group-hover:w-32 ${
              reveal.isVisible ? "w-24 opacity-100" : "w-0 opacity-0"
            }`}
          />
          <span
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full blur-sm transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) origin-center opacity-70 group-hover:w-24 ${
              reveal.isVisible ? "w-16" : "w-0"
            }`}
          />
        </h2>
      </div>
      {aside && (
        <div className="shrink-0 flex justify-center transition-all duration-500 hover:scale-105">
          {aside}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
