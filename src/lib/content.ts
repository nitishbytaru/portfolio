import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { describeIssues, SCHEMAS, type ContentData, type ContentFile } from "@/lib/schema";

// Public pages read content at build time from `content/`. A file that fails its schema stops the
// build, so the live site stays on its last good deploy. CONTENT_DIR lets tests point at fixtures.
// Public pages are all static, so this only runs during the build; nothing needs tracing for runtime.
const contentDir = () => path.resolve(/*turbopackIgnore: true*/ process.cwd(), process.env.CONTENT_DIR || "content");

const load = cache(<F extends ContentFile>(file: F): ContentData[F] => {
  const filePath = path.join(contentDir(), `${file}.json`);
  let raw: unknown;
  try {
    raw = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`content/${file}.json could not be read: ${(error as Error).message}`);
  }
  const result = SCHEMAS[file].safeParse(raw);
  if (!result.success) {
    throw new Error(`content/${file}.json is invalid:\n  ${describeIssues(result.error).join("\n  ")}`);
  }
  return result.data as ContentData[F];
});

export const getProfile = () => load("profile");

/** Visible roles in file order (newest first by convention). */
export const getExperience = cache(() => load("experience").filter((item) => item.visible));

/** Visible projects in display order. */
export const getProjects = cache(() => load("projects").filter((project) => project.visible));

/** Visible groups, each with only its visible skills. Empty groups are dropped. */
export const getSkillGroups = cache(() =>
  load("skills")
    .filter((group) => group.visible)
    .map((group) => ({ ...group, skills: group.skills.filter((skill) => skill.visible) }))
    .filter((group) => group.skills.length > 0)
);

export const getResumeUrl = () => {
  const resume = load("resume");
  return resume.versions.find((version) => version.id === resume.activeId)!.url;
};

/** The home tile's project: the first featured one, or else the first one. */
export const getFeaturedProject = () => {
  const projects = getProjects();
  return projects.find((project) => project.featured) ?? projects[0] ?? null;
};

/** Words to highlight in role descriptions: every skill name and alias the site knows. */
export const getKeywords = cache(() => {
  const words = new Set<string>();
  getExperience().forEach((item) => item.skills.forEach((skill) => words.add(skill)));
  getSkillGroups().forEach((group) => group.skills.forEach((skill) => words.add(skill.name)));
  return [...words].filter((word) => word.length > 1).sort((a, b) => b.length - a.length);
});

/** Each group with the number of visible projects that use one of its skills. */
export const getSkillGroupsWithUsage = cache(() => {
  const stacks = getProjects().map((project) => project.techStack.map((tech) => tech.toLowerCase()));
  return getSkillGroups().map((group) => {
    const aliases = group.skills.flatMap((skill) => [skill.name.toLowerCase(), ...skill.aliases.map((alias) => alias.toLowerCase())]);
    return { ...group, used: stacks.filter((stack) => stack.some((tech) => aliases.includes(tech))).length };
  });
});

/** Home shows featured skills only (all skills if none are featured), one from each group in turn. */
export const getHomeSkills = cache(() => {
  const groups = getSkillGroups();
  const featured = groups.map((group) => group.skills.filter((skill) => skill.featured));
  const lists = featured.some((list) => list.length > 0) ? featured : groups.map((group) => group.skills);
  return Array.from({ length: Math.max(0, ...lists.map((list) => list.length)) }, (_, round) =>
    lists.flatMap((list) => (list[round] ? [list[round]] : []))
  ).flat();
});

/** Most projects the Projects page shows as rich panels before the rest move to a compact list. */
const MAX_PANELS = 6;

export const getProjectsBoard = cache(() => {
  const projects = getProjects();
  const ordered = [...projects.filter((project) => project.featured), ...projects.filter((project) => !project.featured)];
  const panels = ordered.slice(0, MAX_PANELS);
  const inPanels = new Set(panels.map((project) => project.id));
  return { panels: projects.filter((project) => inPanels.has(project.id)), more: projects.filter((project) => !inPanels.has(project.id)) };
});
