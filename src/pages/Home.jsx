import HeroSection from "../components/sections/HeroSection";
import Experience from "../components/sections/Experience";
import Projects from "../components/sections/Projects";
import SkillsSection from "../components/sections/SkillsSection";
import Education from "../components/sections/Education";
import Coding from "../components/sections/Coding";

const Home = () => {
  return (
    <div className="bg-background">
      <HeroSection />
      <Experience />
      <section id="projects" className="scroll-mt-20">
        <Projects />
      </section>
      <SkillsSection />
      <Education />
      <Coding />
    </div>
  );
};

export default Home;
