import React from "react";
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
    <section className="relative pt-24 pb-8 md:pt-24 md:pb-12 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-sm font-medium text-amber-400 bg-amber-900 bg-opacity-20 rounded-full">
                👋 Hi there, I am
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-amber-400 mb-4">
              <span className="text-blue-400">Nitish Durga</span> Bytaru
            </h1>

            <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-amber-400 bg-amber-900 bg-opacity-20 rounded-full">
              Full Stack Web Developer
            </span>

            <p className="text-lg text-gray-400 mb-8 max-w-lg">
              Building complete web solutions with JavaScript, Python, and
              modern frameworks
            </p>

            <div className="mb-8">
              <SocialLinks />
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToProjects}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-amber-700 transition-colors shadow-md hover:shadow-lg"
              >
                <span>View My Projects</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 ml-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <button className="flex items-center px-6 py-3 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-900 transition-colors">
                <span>Download Resume</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 ml-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className=" absolute -inset-4 bg-gradient-to-r from-blue-500 to-amber-500 rounded-full blur opacity-20"></div>
              <img
                src="/NitishPIC.jpg"
                alt="Nitish Bytaru"
                className="object-cover relative w-64 h-64 md:w-[425px] md:h-[425px] rounded-full border-4 border-gray-800 shadow-xl"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mt-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`
        bg-gray-900 p-6 rounded-xl 
        border border-gray-800
        hover:shadow-lg transition-all duration-300
        hover:-translate-y-1 hover:border-opacity-50
        relative overflow-hidden
        ${
          index % 2 === 0
            ? "hover:shadow-blue-900/30"
            : "hover:shadow-amber-900/30"
        }
        group
      `}
            >
              {/* Gradient border effect */}
              <div
                className={`
        absolute inset-0 rounded-xl pointer-events-none
        ${
          index % 2 === 0
            ? "bg-gradient-to-br from-blue-900/10 via-transparent to-transparent"
            : "bg-gradient-to-br from-amber-900/10 via-transparent to-transparent"
        }
      `}
              ></div>

              {/* Animated top border */}
              <div
                className={`
        absolute top-0 left-0 right-0 h-0.5 
        ${index % 2 === 0 ? "bg-blue-500" : "bg-amber-500"}
        transition-all duration-500 origin-left
        group-hover:scale-x-100 scale-x-0
      `}
              ></div>

              <div
                className={`
        text-4xl font-bold mb-3 
        ${index % 2 === 0 ? "text-blue-400" : "text-amber-400"}
        font-mono
      `}
              >
                {stat.value}
              </div>

              <div
                className={`
        text-lg font-semibold mb-2
        ${index % 2 === 0 ? "text-blue-200" : "text-amber-200"}
      `}
              >
                {stat.label}
              </div>

              <div className="text-gray-400 text-sm leading-relaxed">
                {stat.description}
              </div>

              {/* Glow effect on hover */}
              <div
                className={`
        absolute inset-0 rounded-xl pointer-events-none
        opacity-0 group-hover:opacity-100 transition-opacity
        ${
          index % 2 === 0
            ? "shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            : "shadow-[0_0_15px_rgba(245,158,11,0.3)]"
        }
      `}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
