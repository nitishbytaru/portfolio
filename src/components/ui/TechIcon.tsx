import React from "react";
import { Code2 } from "lucide-react";

export function getTechIconUrl(tech: string): { url: string; darkInvert?: boolean } | null {
  const name = tech.toLowerCase().trim();
  
  switch (name) {
    case "react":
    case "react.js":
    case "react native":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" };
    case "next.js":
    case "nextjs":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", darkInvert: true };
    case "node.js":
    case "nodejs":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" };
    case "express":
    case "express.js":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", darkInvert: true };
    case "mongodb":
    case "mongo":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" };
    case "socket.io":
    case "socketio":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" };
    case "tailwind css":
    case "tailwindcss":
    case "nativewind":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" };
    case "redux":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" };
    case "redux-saga":
    case "redux saga":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" };
    case "python":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" };
    case "flask":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", darkInvert: true };
    case "tensorflow lite":
    case "tensorflow":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" };
    case "typescript":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" };
    case "javascript":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" };
    case "java":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" };
    case "angular":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" };
    case "c#":
    case "csharp":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" };
    case "entity framework":
    case "entity framework core":
    case ".net":
    case "dotnet":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" };
    case "django":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" };
    case "mysql":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" };
    case "html":
    case "html5":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" };
    case "css":
    case "css3":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" };
    case "jupyter":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" };
    case "sqlite":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" };
    case "git":
    case "github":
    case "git & github":
    case "git and github":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" };
    case "bootstrap":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" };
    case "vite":
    case "vite.js":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg" };
    case "render":
      return { url: "https://cdn.simpleicons.org/render/46E3B7" };
    case "vercel":
      return { url: "https://cdn.simpleicons.org/vercel/000000", darkInvert: true };
    case "netlify":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg" };
    case "cloudinary":
      return { url: "https://cdn.simpleicons.org/cloudinary/3448C5" };
    case "axios":
      return { url: "https://cdn.simpleicons.org/axios/5A29E4" };
    case "i18next":
      return { url: "https://cdn.simpleicons.org/i18next/26A69A" };
    case "context api":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" };
    default:
      return null;
  }
}

interface TechIconProps {
  name: string;
  className?: string;
  sizeClassName?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({
  name,
  className = "",
  sizeClassName = "w-4 h-4",
}) => {
  const iconData = getTechIconUrl(name);
  if (!iconData) {
    // Render a default Code2 icon if the specific technology icon is not found
    return <Code2 className={`${sizeClassName} text-primary/70 shrink-0 ${className}`} />;
  }

  return (
    <img
      src={iconData.url}
      alt={name}
      className={`${sizeClassName} object-contain ${
        iconData.darkInvert ? "dark:invert" : ""
      } ${className}`}
    />
  );
};
