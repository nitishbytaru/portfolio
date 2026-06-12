import React from "react";
import { LucideIcon } from "lucide-react";

type Tone = "default" | "solid" | "primary";
type Size = "sm" | "md" | "lg";

const toneMap: Record<Tone, string> = {
  default: "bg-surface/80 text-text-secondary border-border",
  solid: "bg-background/95 text-text font-bold border-border shadow-md",
  primary: "bg-primary/10 text-primary border-primary/20",
};

const sizeMap: Record<Size, string> = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-1.5 text-sm",
  lg: "px-4 py-2 text-sm",
};

interface PillProps {
  icon?: LucideIcon;
  iconElement?: React.ReactNode;
  children: React.ReactNode;
  tone?: Tone;
  size?: Size;
  dot?: boolean;
  className?: string;
  uppercase?: boolean;
}

const Pill: React.FC<PillProps> = ({
  icon: Icon,
  iconElement,
  tone = "default",
  size = "md",
  dot = false,
  className = "",
  uppercase = false,
  children,
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
      {iconElement}
      {children}
    </span>
  );
};

export default Pill;
