import React from "react";
import { FaCode } from "react-icons/fa";
import { motion } from "framer-motion";

const Coding = () => {
  return (
    <div className="min-h-[60vh] py-24 px-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-portfolio-primary/10 dark:bg-portfolio-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-portfolio-secondary/10 dark:bg-portfolio-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center relative z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 50, duration: 0.6 }}
          className="mb-8"
        >
          <div className="p-6 rounded-full bg-portfolio-primary/10 dark:bg-portfolio-primary/20">
            <FaCode className="text-6xl text-portfolio-primary dark:text-portfolio-accent animate-pulse-slow" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl font-extrabold mb-6 gradient-heading"
        >
          Coming Soon 🚀
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-gray-600 dark:text-gray-400 text-xl"
        >
          My coding statistics and achievements are on the way... Stay tuned!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          <ComingSoonFeature
            title="LeetCode Stats"
            description="Problem-solving progress and rankings"
            delay={0.2}
          />
          <ComingSoonFeature
            title="CodeChef Activity"
            description="Contest participation and achievements"
            delay={0.3}
          />
          <ComingSoonFeature
            title="Coding Challenges"
            description="Solutions to interesting programming problems"
            delay={0.4}
          />
        </motion.div>
      </div>
    </div>
  );
};

const ComingSoonFeature = ({ title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: delay }}
    whileHover={{ y: -5 }}
    className="p-6 bg-white/80 dark:bg-gray-800/50 rounded-xl shadow-md hover:shadow-lg hover:shadow-portfolio-primary/10 transition-all backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30"
  >
    <h3 className="text-lg font-semibold mb-2 text-portfolio-primary dark:text-portfolio-accent">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </motion.div>
);

export default Coding;
