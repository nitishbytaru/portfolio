"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Experience", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Skills", href: "/skills" },
  { name: "GitHub Stats", href: "/analytics" },
];

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

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

      {/* Mobile: top bar with menu */}
      <nav aria-label="Main" className="relative z-40 flex items-center justify-between px-4 py-3 lg:hidden">
        <Link href="/" prefetch={false} className="wide text-lg font-extrabold text-ink">
          Nitish Durga Bytaru
        </Link>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-white"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div
          id="mobile-menu"
          className={`absolute left-4 right-4 top-full rounded-[20px] bg-amber p-3 shadow-xl ${
            isOpen ? "" : "invisible"
          }`}
        >
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch={link.href === "/" ? false : undefined}
                aria-current={active ? "page" : undefined}
                className={`block rounded-xl px-4 py-3 text-ink ${
                  active ? "bg-white font-extrabold" : "font-medium"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
