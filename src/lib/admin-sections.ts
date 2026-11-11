// Each admin section keeps one of the board's tones, so the nav, the heading and the overview
// tiles agree on where you are.
export const ADMIN_SECTIONS = [
  { href: "/admin", label: "Overview", tone: "periwinkle" },
  { href: "/admin/resume", label: "Resume", tone: "violet" },
  { href: "/admin/experience", label: "Experience", tone: "amber" },
  { href: "/admin/projects", label: "Projects", tone: "mint" },
  { href: "/admin/skills", label: "Skills", tone: "pink" },
  { href: "/admin/profile", label: "Profile", tone: "apricot" },
] as const;

export const sectionTone = (label: string) => ADMIN_SECTIONS.find((section) => section.label === label)?.tone ?? "periwinkle";
