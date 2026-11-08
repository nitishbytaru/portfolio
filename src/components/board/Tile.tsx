import React from "react";

const TONES = {
  periwinkle: "bg-periwinkle text-ink",
  pink: "bg-pink text-ink",
  mint: "bg-mint text-ink",
  violet: "bg-violet text-ink",
  amber: "bg-amber text-ink",
  graphite: "bg-graphite text-white",
  black: "bg-ink text-white",
  white: "bg-white text-ink",
  plain: "bg-page text-ink",
};

export type TileTone = keyof typeof TONES;

interface TileProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  tone?: TileTone;
  corner?: boolean;
  interactive?: boolean;
  [key: string]: unknown;
}

export const Corner = () => (
  <span
    aria-hidden="true"
    className="pointer-events-none absolute right-4 top-4 z-10 h-3 w-3 border-r-2 border-t-2 border-current"
  />
);

export default function Tile({
  as: Tag = "div",
  tone = "plain",
  corner = false,
  interactive = false,
  className = "",
  children,
  ...rest
}: TileProps) {
  return (
    <Tag
      className={[
        "relative block overflow-hidden rounded-[20px]",
        TONES[tone],
        interactive ? "transition-transform duration-300 hover:-translate-y-1" : "",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
      {corner && <Corner />}
    </Tag>
  );
}
