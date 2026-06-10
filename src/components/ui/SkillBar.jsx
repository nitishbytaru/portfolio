// src/components/ui/SkillBar.jsx
import React from "react";

/**
 * Labeled progress bar.
 *   <SkillBar label="Frontend" value="92%" animate />
 *
 * `animate` will animate from 0 -> value when the bar mounts/becomes visible.
 */
const SkillBar = ({ label, value, animate = true, size = "md" }) => {
  const height = size === "sm" ? "h-1.5" : "h-2";
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-text-secondary">{label}</span>
        <span className="font-semibold text-text">{value}</span>
      </div>
      <div className={`${height} overflow-hidden rounded-full bg-border/50`}>
        <div
          className="h-full rounded-full bg-primary motion-safe:transition-all motion-safe:duration-1000"
          style={{ width: animate ? value : value }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
