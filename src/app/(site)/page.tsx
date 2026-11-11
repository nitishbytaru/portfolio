import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Tile from "@/components/board/Tile";
import Wordmark from "@/components/board/Wordmark";
import AboutCard from "@/components/board/AboutCard";
import SkillKeysTile from "@/components/board/SkillKeysTile";
import GitHubPulseTile from "@/components/board/GitHubPulseTile";
import { TechIcon } from "@/components/ui/TechIcon";
import { getExperience, getFeaturedProject, getHomeSkills, getProfile, getProjects, getResumeUrl } from "@/lib/content";
import { endLabel, experienceLabel, monthLabel, monthsLong, thisMonth } from "@/lib/layout";

const FEATURED_STACK = 4;
const MAX_AVATARS = 5;

const MAX_STACKED = 3;
const ROLE_COLORS = ["bg-indigo", "bg-iris", "bg-violet"];
const TIMELINE_COLORS = ["bg-amber", "bg-mint", "bg-pink", "bg-white"];

const Count = ({ value, label, white }: { value: number; label: string; white?: boolean }) => (
  <span className={`block ${white ? "text-white" : ""}`}>
    <span className="wide block text-4xl font-extrabold leading-none max-md:text-2xl transition-transform duration-300 group-hover:-translate-y-1">{value}</span>
    <span className="wide mt-1 block text-base max-md:mt-0 max-md:text-sm">{label}</span>
  </span>
);

export default function Home() {
  const profile = getProfile();
  const projects = getProjects();
  const featured = getFeaturedProject();
  const roles = getExperience();
  const today = thisMonth();

  const avatars = projects.slice(0, MAX_AVATARS);
  const hiddenAvatars = projects.length - avatars.length;
  const chronological = [...roles].sort((a, b) => a.start.localeCompare(b.start));
  const latestEnd = roles.some((role) => !role.end) ? "" : chronological.map((role) => role.end).sort().at(-1) ?? "";
  const stacked = roles.slice(0, MAX_STACKED);
  const hiddenRoles = roles.length - stacked.length;
  const roleLabel = experienceLabel(roles.map((role) => role.kind), roles.length);

  return (
    <div className="enter-home grid gap-4 max-md:gap-2 lg:min-h-[max(620px,calc(100vh-10.5rem))] lg:grid-cols-[minmax(340px,31%)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-8 lg:gap-y-5">
      <Wordmark as="p" className="lg:col-start-2 lg:row-start-1 lg:justify-self-start wordmark-home">
        Portfolio
      </Wordmark>

      <AboutCard
        name={profile.name}
        headline={profile.headline}
        bio={profile.bio}
        email={profile.email}
        portrait={profile.portrait}
        resumeUrl={getResumeUrl()}
      />

      {/* Work tiles */}
      <div className="enter-tiles stagger grid grid-cols-2 gap-4 max-md:gap-2 lg:col-start-2 lg:row-start-2 lg:grid-cols-12 lg:grid-rows-[minmax(300px,1.6fr)_minmax(180px,1fr)] lg:gap-5">
        {/* Featured project */}
        {featured ? (
        <Tile
          as={Link}
          href={`/projects/${featured.slug}`}
          interactive
          corner
          tone="pink"
          className="group col-span-2 p-6 max-md:grid max-md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] max-md:items-center max-md:gap-2 max-md:p-3 md:flex md:items-center md:gap-5 lg:col-span-8 lg:block xl:col-span-9"
        >
          <span className="relative z-10 flex flex-col md:w-1/2 lg:h-full lg:w-auto xl:w-[46%]">
            <span className="wide block text-4xl font-extrabold leading-none max-md:text-xl">{featured.title}</span>
            <span className="mt-3 block text-base leading-snug max-md:hidden">{featured.shortDescription}</span>
            <span className="mt-4 flex flex-wrap gap-2 max-md:mt-1.5 max-md:gap-1">
              {featured.techStack.slice(0, FEATURED_STACK).map((tech) => (
                <span key={tech} title={tech} className="flex h-10 w-10 items-center justify-center rounded-full bg-frame max-md:h-7 max-md:w-7">
                  <TechIcon name={tech} sizeClassName="w-4 h-4 md:w-6 md:h-6" />
                  <span className="sr-only">{tech}</span>
                </span>
              ))}
            </span>
            <span className="mt-5 inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-ink px-4 text-sm font-semibold text-white max-md:hidden lg:mt-auto">
              Open project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </span>
          <span className="relative mt-5 block aspect-[16/10] max-md:mt-0 overflow-hidden rounded-xl bg-ink shadow-[0_20px_34px_-12px_rgb(0_0_0/0.5)] motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out md:mt-0 md:w-1/2 md:shrink-0 lg:hidden xl:absolute xl:-bottom-4 xl:-right-5 xl:mt-0 xl:block xl:w-[56%] xl:-rotate-3 xl:group-hover:rotate-0 xl:group-hover:scale-[1.03]">
            <Image
              src={featured.thumbnail}
              alt={`${featured.title} app screen`}
              width={1200}
              height={750}
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="absolute -top-[11%] left-0 h-[124%] w-full max-w-none object-cover object-left-top"
            />
          </span>
        </Tile>
        ) : (
          <Tile as={Link} href="/projects" tone="pink" corner className="col-span-2 flex items-end p-6 max-md:p-3 lg:col-span-8 xl:col-span-9">
            <span className="wide text-4xl font-extrabold leading-none max-md:text-xl">Projects</span>
          </Tile>
        )}

        <div className="col-span-2 grid grid-cols-2 overflow-hidden rounded-[20px] lg:col-span-4 lg:grid-cols-1 lg:grid-rows-2 xl:col-span-3">
          <Tile as={Link} href="/projects" tone="mint" corner className="group flex flex-col justify-between gap-2 !rounded-none p-5 max-md:p-3 transition-[filter] duration-300 hover:brightness-95 focus-inset">
            <Count value={projects.length} label={projects.length === 1 ? "Project" : "Projects"} />
            <span aria-hidden="true" className="flex">
              {avatars.map((project) => (
                <span key={project.slug} className="relative -ml-3 h-10 w-10 overflow-hidden rounded-full border-2 border-mint max-md:h-7 max-md:w-7 bg-ink first:ml-0 motion-safe:transition-[margin] motion-safe:duration-300 group-hover:-ml-1 group-hover:first:ml-0">
                  <Image src={project.thumbnail} alt="" fill sizes="40px" className="object-cover object-left-top" />
                </span>
              ))}
              {hiddenAvatars > 0 && (
                <span className="relative -ml-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-mint bg-ink text-xs font-bold text-white max-md:h-7 max-md:w-7 max-md:text-[10px] motion-safe:transition-[margin] motion-safe:duration-300 group-hover:-ml-1">
                  +{hiddenAvatars}
                </span>
              )}
            </span>
          </Tile>
          <Tile as={Link} href="/experience" tone="violet" corner className="group flex flex-col justify-between gap-2 !rounded-none p-5 max-md:p-3 transition-[filter] duration-300 hover:brightness-95 focus-inset">
            <Count value={roles.length} label={roleLabel} white />
            {chronological.length > 0 && (
            <span aria-hidden="true" className="block">
              <span className="flex gap-1">
                {chronological.map((role, index) => (
                  <span
                    key={role.id}
                    className={`h-2.5 min-w-1 origin-left rounded-full motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-y-150 ${TIMELINE_COLORS[index % TIMELINE_COLORS.length]}`}
                    style={{ flexGrow: monthsLong(role.start, role.end, today), flexBasis: 0 }}
                  />
                ))}
              </span>
              <span className="mt-1 flex justify-between text-xs font-semibold text-ink">
                <span>{monthLabel(chronological[0].start)}</span>
                <span>{endLabel(latestEnd)}</span>
              </span>
            </span>
            )}
          </Tile>
        </div>

        <SkillKeysTile skills={getHomeSkills()} />

        <GitHubPulseTile />

        <Tile as={Link} href="/experience" tone="apricot" corner className="role-deck group col-span-2 flex flex-col gap-3 p-4 max-md:gap-2 max-md:p-3 lg:col-span-4 lg:block lg:min-h-0 lg:p-0">
          <span className={`block max-md:shrink-0 lg:p-4 ${stacked.length >= MAX_STACKED ? "role-label" : ""}`}>
            <span className="wide block text-xl font-extrabold leading-tight max-md:text-base lg:text-base xl:text-xl">{roleLabel === "Experience" ? "Experience" : "Internships"}</span>
            {hiddenRoles > 0 && <span className="mt-1 block text-sm font-semibold">+{hiddenRoles} more</span>}
          </span>
          <span className="flex flex-col gap-1 max-md:grid max-md:grid-cols-2 lg:absolute lg:inset-x-2 lg:bottom-2 lg:block lg:h-12 xl:inset-x-3 xl:bottom-3">
            {stacked.map((role, index) => (
              <span
                key={role.id}
                className="role-card flex h-12 min-w-0 items-center gap-2 rounded-xl bg-white px-2 max-md:h-11 max-md:gap-1.5 max-md:px-1.5 shadow-[0_6px_12px_-6px_rgb(0_0_0/0.45)] lg:absolute lg:inset-0"
                style={{ "--i": index, "--slot": stacked.length - 1 - index, zIndex: stacked.length - index } as React.CSSProperties}
              >
                <span aria-hidden="true" className={`wide flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-white max-md:h-6 max-md:w-6 max-md:text-xs lg:hidden xl:flex ${ROLE_COLORS[index % ROLE_COLORS.length]}`}>
                  {role.company[0]}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold leading-tight">{role.company}</span>
                  <span className="block truncate text-xs leading-tight">{monthLabel(role.start)} - {endLabel(role.end)}</span>
                </span>
              </span>
            ))}
          </span>
        </Tile>
      </div>
    </div>
  );
}
