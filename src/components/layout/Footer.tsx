"use client";

import React from "react";
import { Heart, Sparkles, Code2, Mail, ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const Footer = () => {
  const footerReveal = useScrollReveal({ threshold: 0.1 });

  return (
    <footer className="relative bg-background text-text-secondary pt-20 pb-8 border-t border-border overflow-hidden mt-auto transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.08] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-40 bg-gradient-to-b from-primary/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-[140px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[140px] opacity-40 pointer-events-none" />

      <div
        ref={footerReveal.ref}
        className={`scroll-reveal ${
          footerReveal.isVisible ? "revealed" : ""
        } max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10`}
      >
        <div className="relative rounded-3xl border border-border bg-surface/70 backdrop-blur-2xl p-8 md:p-10 shadow-2xl shadow-primary/5 overflow-hidden mb-10 group">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left flex flex-col items-center md:items-start">
              <span className="inline-flex items-center px-4 py-1.5 text-sm font-medium text-text bg-background/70 backdrop-blur-xl rounded-full border border-border shadow-sm shimmer-badge mb-4">
                <Sparkles className="w-4 h-4 mr-2 text-primary" />
                Portfolio
              </span>

              <h3 className="text-3xl font-extrabold text-text tracking-tight mb-3">
                Nitish Bytaru
              </h3>

              <p className="text-sm text-text-secondary max-w-sm leading-relaxed">
                Crafting premium digital experiences through robust engineering,
                modern design, and scalable full-stack development.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-5">
              <div className="flex flex-wrap justify-center md:justify-end items-center gap-3 text-sm font-medium">
                {["React", "Node.js", "Python", "Tailwind CSS"].map((tech, i) => (
                  <span
                    key={tech}
                    className={`scroll-reveal stagger-${i + 1} ${
                      footerReveal.isVisible ? "revealed" : ""
                    } px-4 py-2 bg-background/70 backdrop-blur-xl rounded-full border border-border text-text shadow-sm transition-all duration-300 hover:bg-surface-elevated hover:text-primary hover:border-primary/60 hover:-translate-y-1 cursor-default`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href="mailto:bndnitish24@gmail.com"
                className="inline-flex items-center px-5 py-3 rounded-2xl bg-primary text-white font-semibold text-sm hover:bg-primary-hover hover:scale-105 hover:shadow-glow-primary transition-all duration-300"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Me
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-secondary font-medium">
          <p>&copy; {new Date().getFullYear()} Nitish Bytaru. All rights reserved.</p>

          <p className="flex items-center group">
            Built with
            <Code2 className="w-4 h-4 mx-1.5 text-primary" />
            design,
            <Heart className="w-4 h-4 mx-1.5 text-primary fill-primary group-hover:animate-heart-beat transition-transform" />
            and precision.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
