"use client";

import React from "react";
import Pill from "./Pill";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  eyebrow?: string;
  eyebrowIcon?: LucideIcon;
  title: string;
  lead?: string;
  align?: "left" | "center";
  aside?: React.ReactNode;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  eyebrowIcon,
  title,
  lead,
  align = "left",
  aside,
  className = "",
}) => {
  const reveal = useScrollReveal({ threshold: 0.2 });
  const isCenter = align === "center";

  return (
    <div
      ref={reveal.ref}
      className={[
        "scroll-reveal mb-16 flex flex-col gap-6 md:flex-row md:items-end",
        isCenter ? "md:justify-center md:text-center" : "md:justify-between",
        reveal.isVisible ? "revealed" : "",
        className,
      ].join(" ")}
    >
      <div className={isCenter ? "mx-auto max-w-2xl" : "max-w-2xl"}>
        {eyebrow && (
          <div className="mb-4">
            <Pill icon={eyebrowIcon} tone="solid">
              {eyebrow}
            </Pill>
          </div>
        )}
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-text md:text-5xl">
          {title}
        </h2>
        {lead && (
          <p className="text-xl leading-relaxed text-text-secondary">{lead}</p>
        )}
      </div>
      {aside && <div className="hidden shrink-0 md:flex">{aside}</div>}
    </div>
  );
};

export default SectionHeader;
