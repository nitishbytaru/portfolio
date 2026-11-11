import "server-only";
import { describeIssues, SCHEMAS, type ContentData, type ContentFile } from "@/lib/schema";
import { readFile } from "./github";
import { DEFAULT_LAYERS, splitSpec, techName, type TechCatalog } from "@/lib/tech";

export const contentPath = (file: ContentFile) => `content/${file}.json`;

export type Loaded<F extends ContentFile> =
  | { ok: true; data: ContentData[F]; sha: string }
  | { ok: false; error: string };

/** The latest copy from GitHub, including hidden items, for an editor to start from. */
export async function loadForEditing<F extends ContentFile>(file: F): Promise<Loaded<F>> {
  try {
    const { text, sha } = await readFile(contentPath(file));
    const parsed = SCHEMAS[file].safeParse(JSON.parse(text));
    if (!parsed.success) {
      return { ok: false, error: `content/${file}.json on GitHub is invalid. Fix it in the repo first: ${describeIssues(parsed.error).join("; ")}` };
    }
    return { ok: true, data: parsed.data as ContentData[F], sha };
  } catch (error) {
    return { ok: false, error: (error as Error).message };
  }
}

/**
 * What the editors may pick from: every skill (hidden ones too) plus names already in use, so nothing
 * existing disappears. Case-insensitive duplicates collapse, and the first spelling seen wins
 * (skills come first).
 */
export async function loadTechCatalog(): Promise<TechCatalog> {
  const [skills, projects, experience] = await Promise.all([loadForEditing("skills"), loadForEditing("projects"), loadForEditing("experience")]);
  const list = () => {
    const names = new Map<string, string>();
    return {
      add: (name: string) => {
        const key = name.trim().toLowerCase();
        if (key && !names.has(key)) names.set(key, name.trim());
      },
      done: () => [...names.values()].sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" })),
    };
  };
  const stack = list();
  const built = list();
  const deploy = list();
  const allProjects = projects.ok ? projects.data : [];

  if (skills.ok) skills.data.forEach((group) => group.skills.forEach((skill) => [stack, built, deploy].forEach((target) => target.add(skill.name))));
  allProjects.forEach((project) => project.techStack.forEach((tech) => [stack, built, deploy].forEach((target) => target.add(tech))));
  if (experience.ok) experience.data.forEach((item) => item.skills.forEach(stack.add));
  allProjects.forEach((project) => {
    Object.values(project.technologiesUsed).forEach((text) => splitSpec(text).forEach((item) => built.add(techName(item))));
    Object.values(project.deployment).forEach((text) => splitSpec(text).forEach((item) => deploy.add(techName(item))));
  });

  // Layer names keep their order: the usual ones first, then any others already in use.
  const layerNames = new Map<string, string>();
  [...DEFAULT_LAYERS, ...allProjects.flatMap((project) => [...Object.keys(project.technologiesUsed), ...Object.keys(project.deployment)])].forEach((name) => {
    const key = name.toLowerCase().replace(/[_\s-]+/g, "");
    if (!layerNames.has(key)) layerNames.set(key, name);
  });

  const icons: Record<string, string> = {};
  if (skills.ok) skills.data.forEach((group) => group.skills.forEach((skill) => { if (skill.icon) icons[skill.name.toLowerCase()] = skill.icon; }));

  return { stack: stack.done(), built: built.done(), deploy: deploy.done(), layers: [...layerNames.values()], icons };
}
