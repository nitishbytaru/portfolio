import { FaCss3Alt, FaReact, FaHtml5, FaGithub, FaPhp } from "react-icons/fa";
import { FaPython } from "react-icons/fa6";
import {
  SiMysql,
  SiMongodb,
  SiNextdotjs,
  SiTypescript,
  SiExpress,
} from "react-icons/si";
import { TbBrandLaravel } from "react-icons/tb";
import { IoLogoJavascript } from "react-icons/io";
import { BiLogoDjango } from "react-icons/bi";

export const skill = [
  {
    name: "HTML",
    path: <FaHtml5 />,
    description: "Markup language used to structure web content.",
  },
  {
    name: "CSS",
    path: <FaCss3Alt />,
    description: "Styles language used to design web pages.",
  },
  {
    name: "JavaScript",
    path: <IoLogoJavascript />,
    description: "Core language of the web for interactivity and logic.",
  },
  {
    name: "Express",
    path: <SiExpress />,
    description: "Minimal Node.js framework for building APIs.",
  },
  {
    name: "React",
    path: <FaReact />,
    description: "JavaScript library for building user interfaces.",
  },
  {
    name: "PHP",
    path: <FaPhp />,
    description: "Scripting language for server-side web development.",
  },
  {
    name: "Laravel",
    path: <TbBrandLaravel />,
    description: "Modern PHP framework for web applications.",
  },
  {
    name: "Python",
    path: <FaPython />,
    description: "General-purpose language great for web, data, and scripting.",
  },
  {
    name: "Django",
    path: <BiLogoDjango />,
    description: "Python framework for fast web development.",
  },
  {
    name: "MySQL",
    path: <SiMysql />,
    description: "Popular relational database system.",
  },
  {
    name: "MongoDB",
    path: <SiMongodb />,
    description: "NoSQL database for flexible data storage.",
  },
  {
    name: "TypeScript",
    path: <SiTypescript />,
    description: "Typed superset of JavaScript for safer code.",
  },
  {
    name: "Next.js",
    path: <SiNextdotjs />,
    description: "React framework for SSR and static sites.",
  },
  {
    name: "Git",
    path: <FaGithub />,
    description: "Version control system for tracking code changes.",
  },
];
