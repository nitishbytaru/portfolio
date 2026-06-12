import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  padding?: string;
  rounded?: string;
  interactive?: boolean;
  accentBar?: boolean;
  [key: string]: any;
}

const GlassCard = React.forwardRef<any, GlassCardProps>(function GlassCard(
  {
    as: Tag = "div",
    children,
    className = "",
    padding = "p-6",
    rounded = "rounded-3xl",
    interactive = true,
    accentBar = true,
    ...rest
  },
  ref
) {
  return (
    <Tag
      ref={ref}
      className={[
        "group relative overflow-hidden border border-border bg-surface/80 shadow-sm backdrop-blur-2xl transition-all duration-500",
        rounded,
        padding,
        interactive
          ? "hover:-translate-y-2 hover:border-primary/60 hover:bg-surface/95 hover:shadow-xl hover:shadow-primary/10"
          : "",
        className,
      ].join(" ")}
      {...rest}
    >
      {accentBar && (
        <span className="pointer-events-none absolute left-0 top-0 z-20 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-primary to-secondary transition-transform duration-500 group-hover:scale-x-100" />
      )}
      {children}
      {interactive && (
        <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 shadow-glow-inset transition-opacity duration-500 group-hover:opacity-100" />
      )}
    </Tag>
  );
});

export default GlassCard;
