import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Keyboard } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SectionCard = ({ title, children }) => (
  <section className="bg-gray-900 p-6 rounded-xl shadow-md mb-6 border-l-4 border-blue-500">
    <h2 className="text-2xl font-semibold text-white mb-4">
      <span className="text-amber-400">{title.split(" ")[0]}</span>{" "}
      {title.split(" ").slice(1).join(" ")}
    </h2>
    {children}
  </section>
);

const ProjectLayout = ({ project, onLiveLinkClick }) => {
  return (
    <div className="pt-20 pb-12 px-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/#projects"
          className="text-blue-400 hover:text-blue-300 inline-flex items-center transition-colors"
        >
          &larr; Back to Projects
        </Link>

        <span className="inline-block px-3 py-1 text-sm font-medium text-amber-400 bg-amber-900 bg-opacity-20 rounded-full">
          Project Showcase
        </span>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">
          <span className="bg-gradient-to-r from-amber-600 to-blue-500 bg-clip-text text-transparent">
            {project.title}
          </span>
        </h1>
        <p className="text-xl text-gray-300">{project.shortDescription}</p>
      </div>

      <div className="flex flex-col gap-8 mb-12">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-amber-500 rounded-xl blur opacity-25"></div>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            loop
            modules={[Navigation, Pagination, Autoplay, Keyboard]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            keyboard={{ enabled: true }}
            className="rounded-xl overflow-hidden shadow-lg relative"
          >
            {project.images?.map((src, i) => (
              <SwiperSlide key={i}>
                <img
                  src={src}
                  alt={`Screenshot ${i + 1}`}
                  className="w-full h-auto object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div>
          <div className="mb-8">
            <div className="prose text-gray-300">
              {project.detailedDescription}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={onLiveLinkClick}
              className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-xl hover:from-amber-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg"
            >
              View Live Demo
            </button>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-green-800 transition-colors flex items-center"
            >
              <span>GitHub Repository</span>
              <svg
                className="w-4 h-4 ml-2 text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path>
              </svg>
            </a>
          </div>

          <div>
            <h3 className="text-xl font-medium text-white mb-3">
              <span className="text-amber-400">Tech</span> Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-full text-sm ${
                    i % 2 === 0
                      ? "bg-blue-900 text-blue-200"
                      : "bg-amber-900 text-amber-200"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SectionCard title="Key Features">
          <ul className="space-y-2 list-disc pl-5 marker:text-amber-400">
            {project.features.map((feature, i) => (
              <li key={i} className="text-gray-300">
                {feature}
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Technologies Used">
          <div className="space-y-4">
            {Object.entries(project.technologiesUsed).map(([key, value]) => (
              <div key={key}>
                <h3 className="font-medium text-white">
                  <span className="text-blue-400">{key}</span>
                </h3>
                <p className="text-gray-300">{value}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Deployment Information">
          <div className="space-y-4">
            {Object.entries(project.deployment).map(([key, value]) => (
              <div key={key}>
                <h3 className="font-medium text-white">
                  <span className="text-amber-400">{key}</span>
                </h3>
                <p className="text-gray-300">{value}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default ProjectLayout;
