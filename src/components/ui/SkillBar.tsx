import React from "react";

interface SkillBarProps {
  label: string;
  value: string;
  animate?: boolean;
  size?: "sm" | "md";
}

const SkillBar: React.FC<SkillBarProps> = ({ label, value, animate = true, size = "md" }) => {
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
