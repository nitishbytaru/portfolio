import React from "react";
import { FaCode } from "react-icons/fa";

const Coding = () => {
  return (
    <div className="bg-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-amber-900 rounded-full bg-opacity-20">
            <div className="p-3 bg-gray-900 rounded-full shadow-md">
              <FaCode className="text-4xl text-amber-400" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-4">
          Coming Soon <span className="text-amber-400">🚀</span>
        </h2>

        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          My coding statistics and achievements are on the way... Stay tuned!
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <ComingSoonFeature
            title="LeetCode Stats"
            description="Problem-solving progress and rankings"
          />
          <ComingSoonFeature
            title="CodeChef Activity"
            description="Contest participation and achievements"
          />
          <ComingSoonFeature
            title="Coding Challenges"
            description="Solutions to interesting programming problems"
          />
        </div>
      </div>
    </div>
  );
};

const ComingSoonFeature = ({ title, description }) => (
  <div className="bg-gray-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-500">
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default Coding;
