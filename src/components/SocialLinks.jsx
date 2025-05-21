import React from "react";
import { FaGithub, FaLinkedin, FaCode, FaUserAlt } from "react-icons/fa";

const SocialLinks = () => {
  const links = [
    {
      id: 1,
      icon: <FaGithub size={28} />,
      href: "https://github.com/nitishbytaru",
      name: "GitHub",
      color: "text-blue-400 hover:text-amber-500",
    },
    {
      id: 2,
      icon: <FaLinkedin size={28} />,
      href: "https://linkedin.com/in/nitishbytaru",
      name: "LinkedIn",
      color: "text-amber-400 hover:text-blue-500",
    },
    {
      id: 3,
      icon: <FaCode size={28} />,
      href: "https://leetcode.com/",
      name: "LeetCode",
      color: "text-blue-400 hover:text-amber-500",
    },
    {
      id: 4,
      icon: <FaUserAlt size={28} />,
      href: "https://www.codechef.com/users/",
      name: "CodeChef",
      color: "text-amber-400 hover:text-blue-500",
    },
  ];

  return (
    <div className="p-6 rounded-xl border border-amber-900">
      <h3 className="text-xl font-semibold text-white mb-4">
        Connect <span className="text-amber-400">with</span> me
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {links.map(({ id, icon, href, name, color }) => (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col items-center p-4 bg-gray-900 rounded-xl hover:bg-gray-800 transition-all hover:-translate-y-1 border border-gray-600 ${color}`}
          >
            <div className="mb-2">{icon}</div>
            <span className="font-medium">{name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
