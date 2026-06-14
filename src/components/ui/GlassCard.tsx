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
        "group relative overflow-hidden border border-border bg-surface/75 shadow-sm backdrop-blur-2xl transition-all duration-700",
        rounded,
        padding,
        interactive
          ? "hover:-translate-y-2 hover:border-primary/45 hover:bg-surface-elevated/90 hover:shadow-2xl hover:shadow-primary/10"
          : "",
        className,
      ].join(" ")}
      {...rest}
    >
      {/* Dynamic Hover Effects */}
      {interactive && (
        <>
          {/* Soft outer glow behind the card */}
          <span className="pointer-events-none absolute -inset-0.5 rounded-[inherit] bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 blur-xl transition-all duration-700 group-hover:opacity-60" />
          
          {/* Subtle gradient overlay to add depth */}
          <span className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-primary/[0.04] via-transparent to-secondary/[0.04] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          
          {/* Spotlight light wash effect from the top center */}
          <span 
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background: "radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--primary) 12%, transparent), transparent 75%)",
            }}
          />
        </>
      )}

      {/* Top accent line */}
      {accentBar && (
        <span className="pointer-events-none absolute left-0 top-0 z-20 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-primary via-secondary to-primary transition-transform duration-700 ease-out group-hover:scale-x-100" />
      )}

      {/* Content wrapper to ensure it sits above the overlays */}
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </Tag>
  );
});

export default GlassCard;
