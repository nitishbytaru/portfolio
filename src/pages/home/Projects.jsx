import React from "react";
import { Link } from "react-router-dom";

// Projects data
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
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-sm font-medium text-amber-400 bg-amber-900 bg-opacity-20 rounded-full">
              My Work
            </span>
          </div>

          <h2 className="text-3xl font-bold text-blue-400 mb-4">
            Featured <span className="text-amber-400">Projects</span>
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Here are some of the projects I've built with passion and expertise
            in different technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-gray-700 hover:border-amber-500 transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <Link to={project.link} className="block relative z-10">
                {/* Thumbnail */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 bg-gradient-to-r from-amber-600 to-blue-500 bg-clip-text text-transparent">
                      {project.title}
                    </h3>
                    <p className="text-gray-400">{project.description}</p>
                  </div>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2 py-1 rounded-full ${
                          idx % 2 === 0
                            ? "bg-blue-900 text-blue-200"
                            : "bg-amber-900 text-amber-200"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300">
                        +{project.techStack.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
