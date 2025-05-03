import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Keyboard } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SectionCard = ({ title, children, spanAll = false }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={`bg-white/80 dark:bg-gray-800/50 p-8 rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-500/10 transition-all backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 ${
      spanAll ? "md:col-span-2" : ""
    }`}
  >
    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
      {title}
    </h2>
    {children}
  </motion.section>
);

const ProjectLayout = ({ project, onLiveLinkClick }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-2 relative overflow-hidden">
      {/* Background decorations - toned down */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-teal-500/5 dark:bg-teal-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="flex justify-between items-center mb-6 relative z-10">
        <Link
          to="/#projects"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Projects
        </Link>

        <div className="px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30">
          <span className="text-blue-600 dark:text-blue-400 font-medium">
            Project Showcase
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 relative z-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
          {project.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {project.shortDescription}
        </p>
      </motion.div>

      <div className="flex flex-col gap-12 mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-2xl overflow-hidden shadow-xl dark:shadow-gray-900/30 bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-700/30"
        >
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            loop
            modules={[Navigation, Pagination, Autoplay, Keyboard]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            keyboard={{ enabled: true }}
            className="h-full"
          >
            {project.images?.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <img
                    src={src}
                    alt={`Screenshot ${i + 1}`}
                    className="object-contain w-full h-full"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* floating button - more subtle */}
        <motion.button
          onClick={onLiveLinkClick}
          animate={{
            y: [0, -5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="fixed bottom-6 right-6 z-50 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full font-semibold shadow-lg hover:shadow-blue-500/30 transition-all"
        >
          View Live Demo
        </motion.button>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Project Overview
            </h2>
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              {project.detailedDescription}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLiveLinkClick}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center gap-2"
            >
              <span>View Live Demo</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:shadow-gray-800/20 transition-all flex items-center gap-2"
            >
              <span>GitHub Repository</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </motion.a>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
        <SectionCard title="Key Features">
          <ul className="space-y-4">
            {project.features.map((feature, i) => (
              <li key={i} className="flex items-start group">
                <div className="mr-3 mt-1 flex-shrink-0 p-1 rounded-full bg-blue-100 dark:bg-blue-900/20 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors">
                  <svg
                    className="h-5 w-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Technologies Used">
          <div className="space-y-6">
            {Object.entries(project.technologiesUsed).map(([key, value]) => (
              <div key={key} className="group">
                <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-1 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                  {key}
                </h3>
                <p className="text-gray-700 dark:text-gray-400">{value}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Deployment Information" spanAll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(project.deployment).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900/50 p-6 rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-500/10 transition-all border border-gray-200/30 dark:border-gray-700/30"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {key}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{value}</p>
              </motion.div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default ProjectLayout;
