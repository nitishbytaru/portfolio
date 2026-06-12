import React from "react";
import { Github, Linkedin, Code2, Mail } from "lucide-react";

interface SocialLinkItem {
  id: number;
  icon: React.ReactNode;
  href: string;
  name: string;
}

const SocialLinks: React.FC = () => {
  const links: SocialLinkItem[] = [
    {
      id: 1,
      icon: <Github size={24} />,
      href: "https://github.com/nitishbytaru",
      name: "GitHub",
    },
    {
      id: 2,
      icon: <Linkedin size={24} />,
      href: "https://linkedin.com/in/nitishbytaru",
      name: "LinkedIn",
    },
    {
      id: 3,
      icon: <Code2 size={24} />,
      href: "https://leetcode.com/",
      name: "LeetCode",
    },
    {
      id: 4,
      icon: <Mail size={24} />,
      href: "mailto:bndnitish24@gmail.com",
      name: "Email",
    },
  ];

  return (
    <div className="p-6 rounded-2xl border border-border bg-surface backdrop-blur-sm transition-colors duration-300">
      <h3 className="text-lg font-semibold text-text mb-4 transition-colors">
        Connect <span className="text-text-secondary/60">with</span> me
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {links.map(({ id, icon, href, name }) => (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ripple flex flex-col items-center justify-center p-4 bg-background rounded-xl hover:bg-surface-elevated transition-all duration-300 hover:-translate-y-1.5 border border-border hover:border-primary hover:shadow-lg text-text-secondary hover:text-primary group focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <div className="mb-2 social-icon-rotate">{icon}</div>
            <span className="text-sm font-medium">{name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
