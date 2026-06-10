// src/components/ui/SectionShell.jsx
import React from "react";

/**
 * Wraps a page section with the recurring background:
 *   - faint grid overlay
 *   - two soft blur orbs (primary + secondary)
 *   - optional soft gradient layer (var(--gradient-soft))
 *   - centered max-w container
 */
const SectionShell = ({
  id,
  children,
  className = "",
  containerClassName = "",
  withGradient = false,
  orbs = "both", // "both" | "top" | "bottom" | "none"
}) => {
  return (
    <section
      id={id}
      className={`relative overflow-hidden bg-background py-24 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.08] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Optional soft gradient wash */}
      {withGradient && (
        <div
          className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-20"
          style={{ backgroundImage: "var(--gradient-soft)" }}
        />
      )}

      {/* Orbs */}
      {(orbs === "both" || orbs === "top") && (
        <div className="pointer-events-none absolute -top-10 right-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[150px] opacity-50" />
      )}
      {(orbs === "both" || orbs === "bottom") && (
        <div className="pointer-events-none absolute -bottom-10 left-0 h-[420px] w-[420px] rounded-full bg-secondary/10 blur-[150px] opacity-40" />
      )}

      <div className={`relative z-10 mx-auto max-w-7xl ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};

export default SectionShell;
