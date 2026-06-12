"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Sun,
  Moon,
  Check,
  ChevronDown,
  Mail,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const themeDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const { theme, mode, changeTheme, toggleMode, themesConfig } = useTheme();

  useEffect(() => {
    setHash(window.location.hash);
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        themeDropdownRef.current &&
        !themeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsThemeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsThemeOpen(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/#projects" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" && !hash;
    if (href.startsWith("/#")) {
      return pathname === "/" && hash === href.substring(1);
    }
    return pathname === href;
  };

  const activeTheme = themesConfig.find((t) => t.id === theme) || themesConfig[0];

  return (
    <nav
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
          {/* Sibling background glass layer to prevent backdrop-filter rendering bugs in dropdowns */}
          <div
            className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none -z-10 ${
              scrolled
                ? "bg-surface/75 backdrop-blur-2xl opacity-100"
                : "bg-transparent opacity-0"
            }`}
          />
          {scrolled && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none -z-10" />
          )}

          <Link
            href="/"
            className="relative z-10 text-2xl font-bold transition-colors flex items-center gap-2 group"
          >
            <span className="text-text relative">
              Nitish's
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </span>

            <span className="text-text/60">Portfolio</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4 relative z-10">
            {navLinks.map((link, index) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={index}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl font-medium transition-all duration-300 relative group ${
                    active
                      ? "text-primary bg-primary/10"
                      : "text-text/80 hover:text-primary hover:bg-surface-elevated/70"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="relative" ref={themeDropdownRef}>
              <button
                onClick={() => setIsThemeOpen(!isThemeOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-surface/70 backdrop-blur-xl text-sm font-medium hover:bg-surface-elevated transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-haspopup="true"
                aria-expanded={isThemeOpen}
                aria-label="Select theme"
              >
                <span
                  className="w-3.5 h-3.5 rounded-full shadow-sm"
                  style={{ backgroundColor: activeTheme.color }}
                />
                <span className="hidden lg:inline-block text-text">
                  {activeTheme.name}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-text-secondary transition-transform duration-300 ${
                    isThemeOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute top-full right-0 mt-3 w-56 bg-surface/90 backdrop-blur-2xl border border-border rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden transition-all duration-300 origin-top-right ${
                  isThemeOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="p-2">
                  {themesConfig.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        changeTheme(t.id);
                        setIsThemeOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm flex items-center justify-between transition-all duration-300 group ${
                        theme === t.id
                          ? "bg-primary/10"
                          : "hover:bg-background/80"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-3.5 h-3.5 rounded-full group-hover:scale-125 transition-transform"
                          style={{ backgroundColor: t.color }}
                        />
                        <span
                          className={`transition-colors ${
                            theme === t.id
                              ? "text-primary font-semibold"
                              : "text-text"
                          }`}
                        >
                          {t.name}
                        </span>
                      </div>

                      {theme === t.id && <Check size={14} className="text-primary" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={toggleMode}
              className="theme-toggle-icon p-2.5 text-text/80 bg-surface/70 backdrop-blur-xl border border-border hover:bg-surface-elevated rounded-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Toggle light/dark mode"
            >
              {mode === "dark" ? (
                <Sun size={20} className="text-primary" />
              ) : (
                <Moon size={20} className="text-primary" />
              )}
            </button>

            <a
              href="mailto:bndnitish24@gmail.com"
              className="btn-ripple inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-primary text-white rounded-xl hover:bg-primary-hover transition-all duration-300 hover:scale-105 hover:shadow-glow-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Mail size={16} />
              Let's Talk
            </a>
          </div>

          <div className="md:hidden flex items-center gap-3 relative z-10">
            <button
              onClick={toggleMode}
              className="theme-toggle-icon p-2 text-text/80 bg-surface/70 border border-border hover:bg-surface-elevated rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {mode === "dark" ? (
                <Sun size={20} className="text-primary" />
              ) : (
                <Moon size={20} className="text-primary" />
              )}
            </button>

            <button
              className="text-text/80 bg-surface/70 border border-border hover:text-primary hover:bg-surface-elevated transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-xl p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 w-full px-4 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-screen opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-surface/90 backdrop-blur-2xl border border-border rounded-2xl shadow-2xl shadow-primary/10 p-5">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link, index) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={index}
                  href={link.href}
                  className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                    active
                      ? "text-primary bg-primary/10"
                      : "text-text/80 hover:text-primary hover:bg-background/70"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-text-secondary mb-3 font-medium">
                Select Theme
              </p>

              <div className="grid grid-cols-2 gap-2">
                {themesConfig.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      changeTheme(t.id);
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-sm ${
                      theme === t.id
                        ? "border-primary bg-primary/10 text-primary font-medium"
                        : "border-border bg-background/60 text-text hover:border-primary/50"
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: t.color }}
                    />
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            <a
              href="mailto:bndnitish24@gmail.com"
              className="text-center px-5 py-3 mt-4 font-semibold bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
