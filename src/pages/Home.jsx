import React from "react";
import HeroSection from "./home/HeroSection";
import GitHubStats from "./home/GitHubStats";
import Projects from "./home/Projects";
import Coding from "./home/Coding";
import SkillsSection from "./home/SkillsSection";

const Home = () => {
  return (
    <div className="bg-black">
      <HeroSection />
      <GitHubStats />
      <section id="projects" className="scroll-mt-20">
        <Projects />
      </section>
      <SkillsSection />
      <Coding />
    </div>
  );
};

export default Home;
