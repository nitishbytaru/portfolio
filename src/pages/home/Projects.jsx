import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Define the projects data separately
const projects = [
  {
    title: "AgroGuide",
    description: "A full-stack agricultural assistant platform with ML models.",
    image: "/agroguide/thumbnail/home.png",
    link: "/projects/agroguide",
    techStack: ["React", "Flask", "Python", "TensorFlow Lite", "i18next"],
  },
  {
    title: "EchoRealm",
    description:
      "A dynamic social web app connecting people through real-time messaging, community chats, and anonymous interactions.",
    image: "/echorealm/thumbnail/4.jpeg",
    link: "/projects/echorealm",
    techStack: [
      "React",
      "Redux",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "Tailwind CSS",
    ],
  },
  {
    title: "ExpenseTracker",
    description:
      "A full-stack expense tracking web app with authentication, budget goals, and receipt uploads.",
    image: "/expensetracker/thumbnail/4.jpeg",
    link: "/projects/expensetracker",
    techStack: [
      "React.js",
      "Context API",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Cloudinary",
    ],
  },
  {
    title: "RecipeHeaven",
    description:
      "A dynamic recipe-sharing web app where users can create, manage, and discover recipes with a vibrant food-loving community.",
    image: "/recipeheaven/thumbnail/1.jpeg",
    link: "/projects/recipeheaven",
    techStack: ["Django", "Python", "SQLite", "HTML", "CSS", "Bootstrap"],
  },
];

const Projects = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70 } },
  };

  return (
    <div className="min-h-screen py-24 px-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-portfolio-primary/10 dark:bg-portfolio-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-portfolio-secondary/10 dark:bg-portfolio-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-2 px-4 py-1.5 rounded-full bg-portfolio-accent/10 dark:bg-portfolio-accent/20 border border-portfolio-accent/20 dark:border-portfolio-accent/30">
            <span className="text-portfolio-primary dark:text-portfolio-accent font-medium">
              My Work
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold gradient-heading mb-4">
            Featured Projects
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
            Here are some of the projects I've built with passion and expertise
            in different technologies.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-2 gap-10"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -8 }}
              className="group bg-white/80 dark:bg-gray-800/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-portfolio-primary/20 dark:hover:shadow-portfolio-primary/10 transition-all duration-500 backdrop-blur-sm border border-gray-100/50 dark:border-gray-700/30"
            >
              <Link to={project.link} className="block h-full">
                {/* Thumbnail */}
                <div className="relative w-full h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-portfolio-primary/50 dark:bg-portfolio-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                    <span className="text-white font-medium px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View Details
                    </span>
                  </div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold gradient-heading mb-3 group-hover:bg-gradient-to-r group-hover:from-portfolio-accent group-hover:to-portfolio-primary transition-all duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.techStack.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-full bg-portfolio-primary/10 dark:bg-portfolio-primary/20 text-portfolio-primary dark:text-portfolio-light border border-portfolio-primary/20 dark:border-portfolio-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-portfolio-secondary/10 dark:bg-portfolio-secondary/20 text-portfolio-secondary dark:text-portfolio-light border border-portfolio-secondary/20 dark:border-portfolio-secondary/30">
                        +{project.techStack.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
