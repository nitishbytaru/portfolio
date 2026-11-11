"use client";

import React, { createContext, useContext } from "react";
import { Code2 } from "lucide-react";

function getTechIconUrl(tech: string): { url: string } | null {
  const name = tech.toLowerCase().trim();
  
  switch (name) {
    case "react":
    case "react.js":
    case "react native":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" };
    case "next.js":
    case "nextjs":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" };
    case "node.js":
    case "nodejs":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" };
    case "express":
    case "express.js":
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" };
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
      return { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" };
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
      return { url: "https://cdn.simpleicons.org/vercel/000000" };
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

/** Pinned so a chosen icon never changes under the site. */
export const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons";

/** A Simple Icons slug, e.g. "rust" or "googlecloud". */
const SLUG = /^[a-z0-9]{1,40}$/;
const DEVICON_REF = /^devicon:([a-z0-9]+)\/([a-z0-9-]+)$/;
const SIMPLE_REF = /^si:([a-z0-9]+)$/;

/**
 * An icon reference, as stored on a skill:
 *  - "devicon:react/original"  a Devicon logo in a given style
 *  - "si:rust"                 a Simple Icons logo
 *  - "HTML" or "rust"          a known tech name, or a bare Simple Icons slug (older values)
 */
export const iconUrl = (ref: string): string | null => {
  const value = ref.trim();
  const devicon = value.match(DEVICON_REF);
  if (devicon) return `${DEVICON_BASE}/${devicon[1]}/${devicon[1]}-${devicon[2]}.svg`;
  const simple = value.match(SIMPLE_REF);
  if (simple) return `https://cdn.simpleicons.org/${simple[1]}`;
  const known = getTechIconUrl(value);
  if (known) return known.url;
  return SLUG.test(value.toLowerCase()) && value.length > 0 ? `https://cdn.simpleicons.org/${value.toLowerCase()}` : null;
};

/**
 * Icons chosen for skills on the Skills page, keyed by lowercase skill name. Provided once per page
 * so a skill's icon is the same wherever its name appears.
 */
const IconOverrides = createContext<Record<string, string>>({});

export function TechIconProvider({ icons, children }: { icons: Record<string, string>; children: React.ReactNode }) {
  return <IconOverrides.Provider value={icons}>{children}</IconOverrides.Provider>;
}

/** An explicit icon first, then the skill's chosen icon, then the built-in map. */
const resolveIcon = (name: string, icon: string | undefined, overrides: Record<string, string>) => {
  if (icon) {
    const url = iconUrl(icon);
    if (url) return { url };
  }
  const chosen = overrides[name.trim().toLowerCase()];
  if (chosen) {
    const url = iconUrl(chosen);
    if (url) return { url };
  }
  // A name can itself be a reference (a group's large background icon).
  if (DEVICON_REF.test(name) || SIMPLE_REF.test(name)) return { url: iconUrl(name)! };
  return getTechIconUrl(name);
};

/** Whether a name has a logo, taking chosen icons into account. */
export function useHasTechIcon() {
  const overrides = useContext(IconOverrides);
  return (name: string, icon?: string) => resolveIcon(name, icon, overrides) !== null;
}

interface TechIconProps {
  name: string;
  /** Optional icon reference that wins over everything else. */
  icon?: string;
  className?: string;
  sizeClassName?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({
  name,
  icon,
  className = "",
  sizeClassName = "w-4 h-4",
}) => {
  const overrides = useContext(IconOverrides);
  const iconData = resolveIcon(name, icon, overrides);
  if (!iconData) {
    // Render a default Code2 icon if the specific technology icon is not found
    return <Code2 aria-hidden="true" className={`${sizeClassName} shrink-0 ${className}`} />;
  }

  return (
    <img
      src={iconData.url}
      alt=""
      loading="lazy"
      className={`${sizeClassName} object-contain ${className}`}
    />
  );
};
