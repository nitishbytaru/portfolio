import React from "react";

interface WordmarkProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
}

export default function Wordmark({ children, as: Tag = "h1", className = "" }: WordmarkProps) {
  return (
    <Tag
      className={`enter-word wide relative inline-block pr-[0.1em] text-[clamp(40px,9.4vw,7.75rem)] font-bold leading-[0.95] tracking-normal text-ink ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute right-0 top-[0.08em] h-[max(0.14em,12px)] w-[max(0.14em,12px)] border-r-[max(0.04em,2px)] border-t-[max(0.04em,2px)] border-ink"
      />
    </Tag>
  );
}
