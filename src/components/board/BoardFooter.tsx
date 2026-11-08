import { Github, Linkedin, Mail } from "lucide-react";
import { RESUME_URL } from "@/data/site";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/nitishbytaru", Icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/nitishbytaru", Icon: Linkedin },
  { label: "Email", href: "mailto:bndnitish24@gmail.com", Icon: Mail },
];

export default function BoardFooter() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 pb-4 text-sm text-graphite sm:px-6 lg:px-0">
      <p>&copy; {new Date().getFullYear()} Nitish Durga Bytaru</p>
      <div className="flex flex-wrap items-center gap-1">
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mr-2 inline-flex h-11 items-center font-semibold text-ink underline underline-offset-4"
        >
          View Resume
        </a>
        {SOCIALS.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-ink transition-colors hover:bg-page"
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </footer>
  );
}
