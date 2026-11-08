import React from "react";

interface WordmarkProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
}

export default function Wordmark({ children, as: Tag = "h1", className = "" }: WordmarkProps) {
  return (
    <Tag
      className={`wide relative inline-block pr-[0.1em] text-[clamp(2.5rem,9.4vw,7.75rem)] font-bold leading-[0.95] tracking-normal text-ink ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute right-0 top-[0.08em] h-[0.14em] w-[0.14em] border-r-[0.04em] border-t-[0.04em] border-ink"
      />
    </Tag>
  );
}
