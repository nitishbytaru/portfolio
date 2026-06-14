"use client";

import React from "react";
import { Heart, Code2, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-background text-text-secondary py-10 border-t border-border/80 overflow-hidden mt-auto transition-colors duration-300">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Branding & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-sm font-bold text-text tracking-wide">
              Nitish Bytaru
            </span>
            <p className="text-xs text-text-secondary">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Center: Built With Info */}
          <div className="flex items-center text-xs text-text-secondary font-medium group">
            <span>Built with</span>
            <Code2 className="w-3.5 h-3.5 mx-1 text-primary transition-transform duration-300 group-hover:scale-110" />
            <span>design &amp;</span>
            <Heart className="w-3.5 h-3.5 mx-1 text-primary fill-primary group-hover:animate-heart-beat transition-transform duration-300" />
            <span>precision.</span>
          </div>

          {/* Right: Inline Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/nitishbytaru"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-surface/50 border border-border text-text-secondary hover:text-primary hover:border-primary/50 hover:bg-surface-elevated transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/nitishbytaru"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-surface/50 border border-border text-text-secondary hover:text-primary hover:border-primary/50 hover:bg-surface-elevated transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:bndnitish24@gmail.com"
              className="p-2.5 rounded-xl bg-surface/50 border border-border text-text-secondary hover:text-primary hover:border-primary/50 hover:bg-surface-elevated transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
