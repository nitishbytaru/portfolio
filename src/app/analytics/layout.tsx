import type { Metadata } from "next";

export const metadata: Metadata = { title: "GitHub Stats" };

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
