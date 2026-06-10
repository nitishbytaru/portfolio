import React from "react";
import {
  FileCode2,
  FileJson,
  Server,
  Atom,
  TerminalSquare,
  DatabaseZap,
  Database,
  Leaf,
  FileSignature,
  Globe2,
  GitBranch,
  Coffee,
  Smartphone,
  Layout,
  Cpu,
  Layers,
  Wind,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const skill = [
  {
    name: "JavaScript",
    path: <FileJson />,
    category: "Language",
    description: "Core language of the web for interactivity and logic.",
  },
  {
    name: "TypeScript",
    path: <FileSignature />,
    category: "Language",
    description: "Typed superset of JavaScript for scalable applications.",
  },
  {
    name: "Java",
    path: <Coffee />,
    category: "Language",
    description: "Object-oriented language for enterprise applications.",
  },
  {
    name: "Python",
    path: <TerminalSquare />,
    category: "Language",
    description: "Versatile language for web, data, and machine learning.",
  },
  {
    name: "React.js",
    path: <Atom />,
    category: "Frontend",
    description: "JavaScript library for building dynamic user interfaces.",
  },
  {
    name: "Next.js",
    path: <Globe2 />,
    category: "Frontend",
    description: "React framework for production-grade SSR applications.",
  },
  {
    name: "React Native",
    path: <Smartphone />,
    category: "Mobile",
    description: "Framework for building cross-platform mobile apps.",
  },
  {
    name: "Angular",
    path: <Layout />,
    category: "Frontend",
    description: "Platform for building mobile and desktop web applications.",
  },
  {
    name: "Node.js",
    path: <Server />,
    category: "Backend",
    description: "JavaScript runtime built on Chrome's V8 engine.",
  },
  {
    name: "Express.js",
    path: <Server />,
    category: "Backend",
    description: "Fast, unopinionated web framework for Node.js.",
  },
  {
    name: ".NET / C#",
    path: <Cpu />,
    category: "Backend",
    description: "Framework and language for enterprise software.",
  },
  {
    name: "Entity Framework",
    path: <Layers />,
    category: "Backend",
    description: "Object-relational mapper for .NET.",
  },
  {
    name: "Django / Flask",
    path: <DatabaseZap />,
    category: "Backend",
    description: "Python frameworks for rapid web development.",
  },
  {
    name: "MongoDB",
    path: <Leaf />,
    category: "Database",
    description: "NoSQL document database for modern applications.",
  },
  {
    name: "MySQL",
    path: <Database />,
    category: "Database",
    description: "Open-source relational database management system.",
  },
  {
    name: "Tailwind CSS",
    path: <Wind />,
    category: "Styling",
    description: "Utility-first CSS framework for rapid UI development.",
  },
  {
    name: "HTML / CSS",
    path: <FileCode2 />,
    category: "Frontend",
    description: "Fundamental building blocks of the web.",
  },
  {
    name: "Git & GitHub",
    path: <GitBranch />,
    category: "Tooling",
    description: "Version control system and collaboration platform.",
  },
  {
    name: "Jupyter Notebook",
    path: <BookOpen />,
    category: "Tooling",
    description: "Interactive computing environment for data science.",
  },
];

export default function SkillsSection() {
  const titleReveal = useScrollReveal({ threshold: 0.2 });
  const gridReveal = useScrollReveal({ threshold: 0.05 });

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.08] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px] opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[150px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          ref={titleReveal.ref}
          className={`scroll-reveal ${
            titleReveal.isVisible ? "revealed" : ""
          } mb-16 text-center`}
        >
          <div className="mb-4">
            <span className="inline-flex items-center px-4 py-1.5 text-sm font-medium text-text bg-surface/70 backdrop-blur-2xl rounded-full border border-border shadow-sm shimmer-badge">
              <Sparkles className="w-4 h-4 mr-2 text-primary" />
              Technical Expertise
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-4">
            My Technical Skills
          </h2>

          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Technologies, frameworks, and tools I use to build robust, scalable,
            and production-ready applications.
          </p>
        </div>

        <div
          ref={gridReveal.ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skill.map(({ name, path, description, category }, index) => (
            <div
              key={index}
              className={`scroll-reveal stagger-${Math.min(
                (index % 10) + 1,
                10
              )} ${
                gridReveal.isVisible ? "revealed" : ""
              } group relative flex flex-col items-start border border-border rounded-3xl p-6 bg-surface/70 backdrop-blur-2xl overflow-hidden transition-all duration-500 hover:bg-surface/90 hover:-translate-y-2 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

              <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary transition-transform duration-500 origin-left group-hover:scale-x-100 scale-x-0 w-full z-20" />

              <div className="relative z-10 flex justify-between items-start w-full mb-5">
                <div className="flex justify-center items-center w-14 h-14 bg-border/70 backdrop-blur-xl rounded-2xl border border-border group-hover:bg-primary group-hover:text-white transition-all duration-500 text-text shadow-sm group-hover:shadow-glow-primary">
                  {React.cloneElement(path, {
                    className:
                      "w-7 h-7 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6",
                  })}
                </div>

                <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold">
                  {category}
                </span>
              </div>

              <div className="relative z-10 flex-1 w-full">
                <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
                  {name}
                </h3>

                <p className="text-text-secondary leading-relaxed text-sm">
                  {description}
                </p>
              </div>

              <div className="relative z-10 mt-6 w-full">
                <div className="h-1.5 rounded-full bg-border/60 overflow-hidden">
                  <div className="h-full w-0 rounded-full bg-primary group-hover:w-full transition-all duration-700" />
                </div>
              </div>

              <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-glow-inset" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}