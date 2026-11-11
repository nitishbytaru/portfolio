// Background classes per tone, written out in full so Tailwind keeps them.
export const TONE_BG: Record<string, string> = {
  amber: "bg-amber",
  mint: "bg-mint",
  pink: "bg-pink",
  periwinkle: "bg-periwinkle",
  violet: "bg-violet",
  apricot: "bg-apricot",
  indigo: "bg-indigo",
  iris: "bg-iris",
};

export const toneBg = (tone: string) => TONE_BG[tone] ?? "bg-mint";
