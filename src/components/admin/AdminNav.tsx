"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/resume", label: "Resume" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/profile", label: "Profile" },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Admin" className="-mx-3 overflow-x-auto px-3 sm:mx-0 sm:px-0">
      <ul className="flex w-max gap-1">
        {LINKS.map((link) => {
          const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold ${active ? "bg-indigo text-white" : "text-ink hover:bg-page"}`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
