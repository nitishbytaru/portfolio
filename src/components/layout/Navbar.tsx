"use client";

import React, { useState, useEffect } from "react";
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

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav
      aria-label="Main"
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div
          className={`relative flex items-center justify-between rounded-2xl transition-all duration-500 ${
            scrolled
              ? "border border-border shadow-xl shadow-primary/5 px-5 py-3"
              : "bg-transparent px-2 py-1"
          }`}
        >
          <div
            className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none -z-10 ${
              scrolled
                ? "bg-surface/75 backdrop-blur-2xl opacity-100"
                : "bg-transparent opacity-0"
            }`}
          />

          <Link
            href="/"
            className="relative z-10 text-xl sm:text-2xl font-bold transition-colors flex items-center gap-2 group"
          >
            <span className="text-text relative">
              Nitish Durga
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </span>

            <span className="text-text">Bytaru</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4 relative z-10">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`px-3 py-2 rounded-xl font-medium transition-all duration-300 relative group ${
                    active
                      ? "text-primary bg-primary/10"
                      : "text-text hover:text-primary hover:bg-surface-elevated/70"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            className="md:hidden relative z-10 flex h-11 w-11 items-center justify-center text-text bg-surface/70 border border-border hover:text-primary hover:bg-surface-elevated transition-colors rounded-xl"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden absolute top-full left-0 w-full px-4 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-screen opacity-100 mt-3" : "invisible max-h-0 opacity-0"
        }`}
      >
        <div className="bg-surface border border-border rounded-2xl shadow-2xl shadow-primary/10 p-5">
          <div className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                    active
                      ? "text-primary bg-primary/10"
                      : "text-text hover:text-primary hover:bg-background/70"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
