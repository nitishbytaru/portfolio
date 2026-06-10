// src/components/ui/Pill.jsx
import React from "react";

/**
 * Glass pill / eyebrow badge.
 *   <Pill icon={Sparkles}>Selected Works</Pill>
 *   <Pill tone="primary" size="sm">React</Pill>
 *   <Pill dot>Available for hire</Pill>
 */
const toneMap = {
  default: "bg-surface/80 text-text-secondary border-border",
  solid: "bg-surface/90 text-text border-border",
  primary: "bg-primary/10 text-primary border-primary/20",
};

const sizeMap = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-1.5 text-sm",
  lg: "px-4 py-2 text-sm",
};

const Pill = ({
  icon: Icon,
  children,
  tone = "default",
  size = "md",
  dot = false,
  className = "",
  uppercase = false,
}) => {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border font-medium shadow-sm backdrop-blur-xl shimmer-badge",
        toneMap[tone] ?? toneMap.default,
        sizeMap[size] ?? sizeMap.md,
        uppercase ? "uppercase tracking-wide font-semibold" : "",
        className,
      ].join(" ")}
    >
      {dot && (
        <span className="inline-flex h-2 w-2 rounded-full bg-primary motion-safe:animate-pulse" />
      )}
      {Icon && <Icon className="h-4 w-4 text-primary" />}
      {children}
    </span>
  );
};

export default Pill;
