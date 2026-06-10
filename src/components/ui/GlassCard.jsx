// src/components/ui/GlassCard.jsx
import React from "react";

/**
 * The recurring glass surface used by stat cards, project tiles, skill tiles.
 * Provides: glass bg, border, hover lift, animated top gradient bar, inset glow on hover.
 *
 *   <GlassCard as={Link} to={...} className="md:col-span-2">
 *     ...
 *   </GlassCard>
 */
const GlassCard = React.forwardRef(function GlassCard(
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
