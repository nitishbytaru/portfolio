import { Github, Globe, Instagram, Linkedin, LucideIcon, Mail, Twitter, Youtube } from "lucide-react";
import type { Profile } from "@/lib/schema";

const ICONS: Record<Profile["socials"][number]["icon"], LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  x: Twitter,
  globe: Globe,
  instagram: Instagram,
  youtube: Youtube,
};

export default function BoardFooter({ name, socials }: Pick<Profile, "name" | "socials">) {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 pb-4 text-sm text-graphite sm:px-6 lg:px-0">
      <p>&copy; {new Date().getFullYear()} {name}</p>
      <div className="flex flex-wrap items-center gap-1">
        <a
          href="/resume"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-2 inline-flex h-11 items-center font-semibold text-ink underline underline-offset-4"
        >
          View Resume
        </a>
        {socials.map(({ id, label, href, icon }) => {
          const Icon = ICONS[icon] ?? Globe;
          return (
            <a
              key={id}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex h-11 w-11 items-center justify-center rounded-xl text-ink transition-colors hover:bg-page"
            >
              <Icon className="h-5 w-5" />
            </a>
          );
        })}
      </div>
    </footer>
  );
}
