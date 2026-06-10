// src/components/ui/SectionHeader.jsx
import React from "react";
import Pill from "./Pill";
import { useScrollReveal } from "../../hooks/useScrollReveal";

/**
 * Standard section heading block:
 *   eyebrow pill + h2 + lead paragraph + optional aside (right side).
 *
 *   <SectionHeader
 *     eyebrow="Selected Works"
 *     eyebrowIcon={Sparkles}
 *     title="Featured Projects"
 *     lead="A collection of polished, scalable products."
 *     aside={<Pill icon={Layers} tone="solid">5 Projects</Pill>}
 *   />
 */
const SectionHeader = ({
  eyebrow,
  eyebrowIcon,
  title,
  lead,
  align = "left", // "left" | "center"
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
