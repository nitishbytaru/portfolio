import { z } from "zod";

// Shared by the build, the server actions and the admin forms. No server-only imports here.

export const CONTENT_FILES = ["profile", "experience", "projects", "skills", "resume"] as const;
export type ContentFile = (typeof CONTENT_FILES)[number];

const text = (max: number) => z.string().trim().max(max);
const required = (max: number) => text(max).min(1, "Required");

const id = z
  .string()
  .regex(/^[a-z0-9][a-z0-9-]{0,63}$/, "Use lowercase letters, numbers and dashes");

const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Use YYYY-MM");

/** Any outbound link on the site. */
export const safeUrl = z
  .string()
  .trim()
  .max(2000)
  .refine((value) => {
    try {
      const url = new URL(value);
      return url.protocol === "https:" || url.protocol === "mailto:";
    } catch {
      return false;
    }
  }, "Links must start with https:// or mailto:");

const DRIVE_FILE = /^https:\/\/drive\.google\.com\/file\/d\/([\w-]{10,})(\/[^\s]*)?(\?[^\s]*)?$/;

export const driveFileUrl = z
  .string()
  .trim()
  .regex(DRIVE_FILE, "Paste a Google Drive file link: https://drive.google.com/file/d/<id>/...");

export const driveFileId = (url: string) => url.match(DRIVE_FILE)?.[1] ?? null;

/** A file served from /public, e.g. /echorealm/1.jpeg or /uploads/2026/ab12cd34.webp. */
export const localImage = z
  .string()
  .regex(/^\/(?!.*\.\.)[\w\-./]+\.(png|jpe?g|webp|gif|avif)$/i, "Must be an image path inside /public");

export const EXPERIENCE_KINDS = ["internship", "full_time", "contract", "freelance"] as const;
export const KIND_LABELS: Record<(typeof EXPERIENCE_KINDS)[number], string> = {
  internship: "Internship",
  full_time: "Full-time",
  contract: "Contract",
  freelance: "Freelance",
};

/** Colours a role can take. They all keep indigo text readable. */
export const ROLE_COLORS = ["amber", "mint", "pink", "periwinkle", "violet", "apricot"] as const;
/** Colours a skill group can take. */
export const GROUP_COLORS = ["mint", "amber", "pink", "indigo", "violet", "periwinkle", "iris", "apricot"] as const;

export const METRIC_ICONS = ["database", "code", "layers", "activity", "briefcase", "server", "cpu", "globe", "users", "zap", "shield", "chart"] as const;
export const SOCIAL_ICONS = ["github", "linkedin", "mail", "x", "globe", "instagram", "youtube"] as const;

export const metricSchema = z.object({
  label: required(40),
  value: required(60),
  icon: z.enum(METRIC_ICONS),
});

export const experienceSchema = z
  .object({
    id,
    visible: z.boolean(),
    kind: z.enum(EXPERIENCE_KINDS),
    company: required(60),
    role: required(80),
    location: text(60),
    start: yearMonth,
    /** Empty means "Present". */
    end: z.union([yearMonth, z.literal("")]),
    typeLabel: text(60),
    summaryLabel: text(60),
    points: z.array(required(500)).max(12),
    skills: z.array(required(40)).max(30),
    metrics: z.array(metricSchema).max(8),
    /** Empty when there is no certificate. */
    certificate: z.union([driveFileUrl, z.literal("")]),
    color: z.enum(ROLE_COLORS),
  })
  .refine((item) => item.end === "" || item.end >= item.start, { message: "End must not be before start", path: ["end"] });

export const experienceFileSchema = z.array(experienceSchema).superRefine(uniqueIds);

const keyValues = z.record(required(40), required(200));

export const projectSchema = z.object({
  id,
  visible: z.boolean(),
  featured: z.boolean(),
  slug: id,
  title: required(60),
  shortDescription: required(300),
  thumbnail: localImage,
  liveLink: safeUrl,
  githubLink: safeUrl,
  techStack: z.array(required(40)).max(30),
  features: z.array(required(200)).max(20),
  intro: z.array(required(800)).max(6),
  note: text(500),
  technologiesUsed: keyValues,
  deployment: keyValues,
  images: z.array(localImage).min(1, "Add at least one screenshot").max(30),
});

export const projectsFileSchema = z.array(projectSchema).superRefine((items, ctx) => {
  uniqueIds(items, ctx);
  const slugs = new Set<string>();
  items.forEach((item, index) => {
    if (slugs.has(item.slug)) ctx.addIssue({ code: "custom", message: `Duplicate slug "${item.slug}"`, path: [index, "slug"] });
    slugs.add(item.slug);
  });
});

export const skillSchema = z.object({
  id,
  visible: z.boolean(),
  featured: z.boolean(),
  name: required(40),
  aliases: z.array(required(40)).max(10),
  /** A known tech name (see TechIcon) or a Simple Icons slug such as "rust". */
  icon: text(40).optional(),
});

export const skillGroupSchema = z.object({
  id,
  visible: z.boolean(),
  title: required(40),
  color: z.enum(GROUP_COLORS),
  leadIcon: required(40),
  skills: z.array(skillSchema).max(16).superRefine(uniqueIds),
});

export const skillsFileSchema = z.array(skillGroupSchema).superRefine(uniqueIds);

export const resumeVersionSchema = z.object({
  id,
  label: required(60),
  url: driveFileUrl,
  addedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const resumeFileSchema = z
  .object({
    activeId: id,
    versions: z.array(resumeVersionSchema).min(1).superRefine(uniqueIds),
  })
  .refine((file) => file.versions.some((version) => version.id === file.activeId), {
    message: "The active resume must be one of the versions",
    path: ["activeId"],
  });

export const socialSchema = z.object({
  id,
  label: required(30),
  href: safeUrl,
  icon: z.enum(SOCIAL_ICONS),
});

export const profileFileSchema = z.object({
  name: required(80),
  headline: required(120),
  bio: required(600),
  email: z.string().trim().email(),
  portrait: localImage,
  githubUsername: z.string().regex(/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/, "Not a valid GitHub username"),
  seo: z.object({ title: required(80), description: required(300) }),
  socials: z.array(socialSchema).max(8).superRefine(uniqueIds),
});

export const SCHEMAS = {
  profile: profileFileSchema,
  experience: experienceFileSchema,
  projects: projectsFileSchema,
  skills: skillsFileSchema,
  resume: resumeFileSchema,
} satisfies Record<ContentFile, z.ZodType>;

export type Experience = z.infer<typeof experienceSchema>;
export type Metric = z.infer<typeof metricSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type Resume = z.infer<typeof resumeFileSchema>;
export type Profile = z.infer<typeof profileFileSchema>;
export type ContentData = {
  profile: Profile;
  experience: Experience[];
  projects: Project[];
  skills: SkillGroup[];
  resume: Resume;
};

function uniqueIds(items: { id: string }[], ctx: z.RefinementCtx) {
  const seen = new Set<string>();
  items.forEach((item, index) => {
    if (seen.has(item.id)) ctx.addIssue({ code: "custom", message: `Duplicate id "${item.id}"`, path: [index, "id"] });
    seen.add(item.id);
  });
}

/** Turns a zod error into short lines a person can act on. */
export const describeIssues = (error: z.ZodError) =>
  error.issues.slice(0, 8).map((issue) => `${issue.path.length ? issue.path.join(" > ") + ": " : ""}${issue.message}`);
