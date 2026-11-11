"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_SECTIONS } from "@/lib/admin-sections";
import { toneBg } from "@/lib/tones";

export default function AdminNav() {
  const pathname = usePathname();
  const activeRef = useRef<HTMLAnchorElement>(null);
  // On phones the tabs scroll sideways; keep the current one in view.
  useEffect(() => activeRef.current?.scrollIntoView({ block: "nearest", inline: "center" }), [pathname]);
  return (
    <nav aria-label="Admin" className="-mx-3 overflow-x-auto px-3 [scrollbar-width:none] sm:mx-0 sm:px-0">
      <ul className="flex w-max gap-1">
        {ADMIN_SECTIONS.map((link) => {
          const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                ref={active ? activeRef : undefined}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors duration-150 ${
                  active ? `${toneBg(link.tone)} text-ink` : "text-night-muted hover:bg-white/5 hover:text-night-text"
                }`}
              >
                {!active && <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${toneBg(link.tone)}`} />}
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
