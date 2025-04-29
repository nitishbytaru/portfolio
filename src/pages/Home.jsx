import React from "react";
import HeroSection from "./home/HeroSection";
import GitHubStats from "./home/GitHubStats";
import Projects from "./home/Projects";
import Coding from "./home/Coding";

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <GitHubStats />
      <section id="projects">
        <Projects />
      </section>
      <Coding />
    </div>
  );
};

export default Home;
