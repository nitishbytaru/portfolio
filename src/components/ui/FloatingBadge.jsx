// src/components/ui/FloatingBadge.jsx
import React from "react";

const FloatingBadge = ({ label, className = "" }) => (
  <div
    className={`absolute z-20 hidden rounded-full border border-border bg-surface/90 px-4 py-2 text-sm font-semibold text-text shadow-lg backdrop-blur-xl motion-safe:animate-float md:block ${className}`}
  >
    {label}
  </div>
);

export default FloatingBadge;
