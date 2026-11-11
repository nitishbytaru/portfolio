import SiteFrame from "@/components/board/SiteFrame";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteFrame>{children}</SiteFrame>;
}
