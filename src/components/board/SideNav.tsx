"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, Code2, FolderOpen, Github, House } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", short: "Home", href: "/", Icon: House },
  { name: "Experience", short: "Work", href: "/experience", Icon: Briefcase },
  { name: "Projects", short: "Projects", href: "/projects", Icon: FolderOpen },
  { name: "Skills", short: "Skills", href: "/skills", Icon: Code2 },
  { name: "GitHub Stats", short: "GitHub", href: "/analytics", Icon: Github },
];

export default function SideNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/projects") return pathname.startsWith("/projects");
    return pathname === href;
  };

  return (
    <>
      {/* Desktop: rotated labels down the sheet's left edge */}
      <nav
        aria-label="Main"
        className="sticky top-6 hidden h-[calc(100vh-3rem)] w-20 shrink-0 flex-col items-center gap-5 overflow-y-auto py-2 lg:flex [justify-content:safe_center]"
      >
        {NAV_LINKS.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              prefetch={link.href === "/" ? false : undefined}
              aria-current={active ? "page" : undefined}
              className={`relative rotate-180 px-3 py-2 text-sm text-ink underline-offset-4 [writing-mode:vertical-rl] hover:underline ${
                active ? "font-extrabold" : "font-medium"
              }`}
            >
              {link.name}
              {active && (
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-ink"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Phones and tablets: name on top, tabs within thumb reach */}
      <div className="px-4 pt-3 max-sm:hidden sm:px-6 lg:hidden">
        <Link href="/" prefetch={false} className="wide inline-flex min-h-11 items-center text-lg font-extrabold text-ink">
          Nitish Durga Bytaru
        </Link>
      </div>
      <nav
        aria-label="Main"
        className="fixed inset-x-3 z-50 mx-auto max-w-xl rounded-[22px] bg-indigo p-1.5 shadow-[0_14px_30px_-10px_rgb(46_42_92/0.6)] lg:hidden"
        style={{ bottom: "max(12px, env(safe-area-inset-bottom))" }}
      >
        <ul className="grid grid-cols-5 gap-1">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            const Icon = link.Icon;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  prefetch={link.href === "/" ? false : undefined}
                  aria-current={active ? "page" : undefined}
                  className={`flex h-14 flex-col items-center justify-center gap-0.5 rounded-2xl text-xs font-semibold motion-safe:transition-colors motion-safe:duration-200 ${
                    active ? "bg-apricot text-indigo" : "text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {link.short}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
