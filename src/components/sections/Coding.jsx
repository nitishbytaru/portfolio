import React from "react";
import { Code2, Terminal, Cpu, Sparkles } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import SectionShell from "../ui/SectionShell";
import SectionHeader from "../ui/SectionHeader";
import GlassCard from "../ui/GlassCard";
import Pill from "../ui/Pill";

const Coding = () => {
  const cardsReveal = useScrollReveal({ threshold: 0.1 });

  return (
    <SectionShell id="coding">
      <SectionHeader
        eyebrow="Coding Profiles"
        eyebrowIcon={Code2}
        title="Competitive Programming"
        lead="My algorithmic problem-solving statistics and achievements are being integrated. Stay tuned! 🚀"
        align="center"
      />

      <div
        ref={cardsReveal.ref}
        className="grid md:grid-cols-2 max-w-4xl mx-auto gap-6 lg:gap-8"
      >
        <ComingSoonFeature
          icon={Terminal}
          title="LeetCode Stats"
          description="Daily problem-solving progress, contest ratings, and global rankings."
          index={1}
          isVisible={cardsReveal.isVisible}
        />

        <ComingSoonFeature
          icon={Cpu}
          title="Data Structures"
          description="In-depth implementations of complex algorithms and data structures."
          index={3}
          isVisible={cardsReveal.isVisible}
        />
      </div>
    </SectionShell>
  );
};

const ComingSoonFeature = ({ icon: Icon, title, description, index, isVisible }) => (
  <GlassCard
    className={`scroll-reveal stagger-${index * 2} ${
      isVisible ? "revealed" : ""
    } flex flex-col items-center text-center`}
    padding="p-8"
  >
    <div className="relative z-10 flex flex-col items-center">
      <div className="mb-6 p-4 bg-border/70 backdrop-blur-xl rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 border border-border group-hover:scale-110 inline-flex">
        <Icon className="w-8 h-8 text-text group-hover:text-inherit transition-colors" />
      </div>

      <h3 className="text-xl font-bold text-text mb-3">{title}</h3>
      <p className="text-text-secondary leading-relaxed transition-colors mb-4">
        {description}
      </p>

      {/* Coming Soon Badge Overlay */}
      <div className="absolute top-0 right-0">
        <Pill tone="default" size="sm" uppercase className="animate-pulse">
          Soon
        </Pill>
      </div>
    </div>
  </GlassCard>
);

export default Coding;
