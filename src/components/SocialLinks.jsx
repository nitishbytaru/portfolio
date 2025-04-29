import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaCode, FaUserAlt } from "react-icons/fa";

const SocialLinks = () => {
  const links = [
    {
      id: 1,
      icon: <FaGithub size={28} />,
      href: "https://github.com/nitishbytaru",
      name: "GitHub",
    },
    {
      id: 2,
      icon: <FaLinkedin size={28} />,
      href: "https://linkedin.com/in/nitishbytaru",
      name: "LinkedIn",
    },
    {
      id: 3,
      icon: <FaCode size={28} />,
      href: "https://leetcode.com/",
      name: "LeetCode",
    },
    {
      id: 4,
      icon: <FaUserAlt size={28} />,
      href: "https://www.codechef.com/users/",
      name: "CodeChef",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="flex flex-col items-center">
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-4"
      >
        Connect with me
      </motion.h3>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex gap-8 justify-center"
      >
        {links.map(({ id, icon, href, name }) => (
          <motion.a
            key={id}
            variants={item}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group"
            aria-label={name}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="p-4 bg-white dark:bg-gray-800/70 rounded-full shadow-md group-hover:shadow-lg group-hover:shadow-portfolio-primary/20 dark:group-hover:shadow-portfolio-primary/10 transition-all group-hover:bg-portfolio-primary/10 dark:group-hover:bg-portfolio-primary/20 backdrop-blur-sm">
              <span className="text-portfolio-primary dark:text-portfolio-accent group-hover:text-portfolio-primary dark:group-hover:text-portfolio-light transition-colors">
                {icon}
              </span>
            </div>
            <span className="mt-2 text-sm text-gray-600 dark:text-gray-400 group-hover:text-portfolio-primary dark:group-hover:text-portfolio-accent transition-colors">
              {name}
            </span>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default SocialLinks;
