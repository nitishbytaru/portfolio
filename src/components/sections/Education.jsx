import React from "react";
import { GraduationCap, Users, CheckCircle2, Sparkles } from "lucide-react";
import { useScrollReveal, useCountUp } from "../../hooks/useScrollReveal";
import SectionShell from "../ui/SectionShell";
import SectionHeader from "../ui/SectionHeader";
import GlassCard from "../ui/GlassCard";
import Pill from "../ui/Pill";

export default function Education() {
  const gridReveal = useScrollReveal({ threshold: 0.1 });
  const gpaCount = useCountUp(8.3, 1500, gridReveal.isVisible);

  return (
    <SectionShell id="education">
      <SectionHeader
        eyebrow="Background"
        eyebrowIcon={GraduationCap}
        title="Education & Leadership"
        lead="My academic foundation, extracurricular initiatives, and ongoing learning journey."
        align="center"
      />

      {/* Bento Grid */}
      <div
        ref={gridReveal.ref}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto"
      >
        {/* Education Box */}
        <GlassCard
          className={`scroll-reveal stagger-1 ${
            gridReveal.isVisible ? "revealed" : ""
          } flex flex-col justify-center`}
          padding="p-8"
        >
          <div className="flex items-center mb-6 relative z-10">
            <div className="bg-primary/10 p-3 rounded-xl mr-4 shrink-0 border border-primary/25 text-primary">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-text">Education</h3>
          </div>

          <div className="bg-background/50 backdrop-blur-xl p-6 rounded-2xl border border-border relative z-10">
            <h4 className="text-xl font-bold text-text mb-2">
              B.Tech in Computer Science
            </h4>
            <div className="text-lg font-medium text-text-secondary mb-4">
              GMR Institute of Technology
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-text-secondary font-medium">
              <Pill tone="default" size="sm">
                2022 - 2026
              </Pill>
              <Pill tone="default" size="sm">
                Rajam, AP
              </Pill>
              <Pill tone="primary" size="sm">
                GPA: <span className="font-mono">{gpaCount}</span> / 10
              </Pill>
            </div>
          </div>
        </GlassCard>

        {/* Leadership Box */}
        <GlassCard
          className={`scroll-reveal stagger-3 ${
            gridReveal.isVisible ? "revealed" : ""
          }`}
          padding="p-8"
        >
          <div className="flex items-center mb-6 relative z-10">
            <div className="bg-primary/10 p-3 rounded-xl mr-4 shrink-0 border border-primary/25 text-primary">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-text">Leadership</h3>
          </div>

          <div className="relative z-10">
            <div className="mb-4">
              <h4 className="text-lg font-bold text-text">Vice Chairperson</h4>
              <div className="text-text-secondary font-medium">
                ACM Student Chapter, GMRIT
              </div>
            </div>

            <div className="space-y-3">
              {[
                "Organised and coordinated 8+ technical events, engaging a wide student audience.",
                "Delivered 2 hands-on workshops on JavaScript and React.",
                "Maintained detailed documentation and reports for 14+ chapter events.",
              ].map((point, i) => (
                <div
                  key={i}
                  className="flex items-start p-2 rounded-xl hover:bg-surface/50 transition-colors duration-300"
                >
                  <CheckCircle2 className="w-5 h-5 text-secondary mr-3 shrink-0 mt-0.5" />
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </SectionShell>
  );
}
