import React from "react";
import { skill } from "../../components/SkillData";

export default function SkillsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <span className="inline-block px-3 py-1 text-sm font-medium text-amber-500 bg-amber-900/30 rounded-full">
            Skills
          </span>
          <h2 className="text-3xl font-bold text-blue-400 mt-4 mb-2">
            My Technical <span className="text-amber-500">Skills</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Technologies and tools I work with to build amazing applications
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skill.map(({ name, path, description }, index) => (
            <div
              key={index}
              className="group relative flex items-start border border-gray-900 rounded-xl p-4 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Animated top border */}
              <span className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500 group-hover:w-full" />

              <div className="flex justify-center items-center w-12 h-12 mr-4 bg-gray-950 rounded-xl p-2 group-hover:bg-amber-900/30 group-hover:text-amber-400 transition-colors">
                {React.cloneElement(path, { className: "w-8 h-8" })}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors">
                  {name}
                </h3>
                <p className="text-sm text-gray-300 mt-1">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
