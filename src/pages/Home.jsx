import HeroSection from "../components/sections/HeroSection";
import Experience from "../components/sections/Experience";
import Projects from "../components/sections/Projects";
import SkillsSection from "../components/sections/SkillsSection";
import GitHubAnalytics from "../components/sections/GitHubAnalytics";

const Home = () => {
  return (
    <div className="bg-background">
      <HeroSection />
      <Experience />
      <section id="projects" className="scroll-mt-20">
        <Projects />
      </section>
      <SkillsSection />
      <GitHubAnalytics />
    </div>
  );
};

export default Home;
