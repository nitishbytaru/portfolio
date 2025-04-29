import React from "react";
import { motion } from "framer-motion";
import SocialLinks from "../../components/SocialLinks";

const HeroSection = () => {
  const stats = [
    {
      value: "3",
      label: "Full Stack Projects",
      description: "With complete frontend + backend",
    },
    {
      value: "6+",
      label: "Languages & Frameworks",
      description: "JavaScript, Python, PHP, React, Node, Django",
    },
    {
      value: "2",
      label: "Database Systems",
      description: "MongoDB & MySQL expertise",
    },
    {
      value: "Full Stack",
      label: "Specialization",
      description: "From UI to database architecture",
    },
  ];

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    projectsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-portfolio-primary/20 dark:bg-portfolio-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-portfolio-secondary/20 dark:bg-portfolio-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-6xl w-full relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-2 px-4 py-1.5 rounded-full bg-portfolio-accent/10 dark:bg-portfolio-accent/20 border border-portfolio-accent/20 dark:border-portfolio-accent/30"
          >
            <span className="text-portfolio-primary dark:text-portfolio-accent font-medium">
              👋 Hi there, I'm a Developer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 gradient-heading"
          >
            Nitish Durga Bytaru
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-2"
          >
            Full Stack Web Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8"
          >
            Building complete web solutions with JavaScript, Python, and modern
            frameworks
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <SocialLinks />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index + 0.5 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 shadow-md hover:shadow-lg hover:shadow-portfolio-primary/10 transition-all backdrop-blur-sm"
            >
              <div>
                <div className="text-3xl font-bold gradient-heading">
                  {stat.value}
                </div>
                <div className="text-lg font-medium text-gray-800 dark:text-gray-200 mt-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProjects}
              className="px-8 py-4 bg-gradient-to-r from-portfolio-primary to-portfolio-secondary text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:shadow-portfolio-primary/30 transition-all flex items-center gap-2 animate-gradient-x"
            >
              <span className="text-lg">View My Projects</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white dark:bg-gray-800/50 border-2 border-portfolio-primary/20 dark:border-portfolio-primary/30 text-gray-800 dark:text-gray-200 rounded-full font-medium shadow-lg hover:shadow-xl hover:shadow-portfolio-primary/20 backdrop-blur-sm transition-all flex items-center gap-2"
            >
              <span className="text-lg">Download Resume</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
