"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface ThemeConfig {
  id: string;
  name: string;
  color: string;
}

export const themesConfig: ThemeConfig[] = [
  { id: "ocean-cyan", name: "Ocean Cyan", color: "#06B6D4" },
  { id: "emerald-neo", name: "Emerald Neo", color: "#22C55E" },
  { id: "rose-crimson", name: "Rose Crimson", color: "#E11D48" },
  { id: "aurora-teal", name: "Aurora Teal", color: "#14B8A6" },
  { id: "neon-lime", name: "Neon Lime", color: "#84CC16" },
];

interface ThemeContextType {
  theme: string;
  mode: "light" | "dark";
  changeTheme: (newTheme: string) => void;
  toggleMode: () => void;
  themesConfig: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<string>("ocean-cyan");
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme && themesConfig.some(t => t.id === savedTheme)) {
      setTheme(savedTheme);
    }
    
    const savedMode = localStorage.getItem("portfolio-mode") as "light" | "dark" | null;
    if (savedMode === "light" || savedMode === "dark") {
      setMode(savedMode);
    } else {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setMode(systemDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.setAttribute("data-mode", mode);
    
    localStorage.setItem("portfolio-theme", theme);
    localStorage.setItem("portfolio-mode", mode);
  }, [theme, mode, mounted]);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Prevent hydration mismatch by not rendering anything until mounted
  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, mode, changeTheme, toggleMode, themesConfig }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
