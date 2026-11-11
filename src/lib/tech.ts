// "How it's built" and "Deployment" values are text like "A, B (note, more), C". Shared by the
// public page and the admin so both read them the same way.

/** Splits on commas outside parentheses. */
export const splitSpec = (value: string) => value.split(/,(?![^(]*\))/).map((item) => item.trim()).filter(Boolean);

/** "MongoDB (for user data)" -> "MongoDB" */
export const techName = (item: string) => item.replace(/\s*\(.*\)/, "").trim();

/** "MongoDB (for user data)" -> "for user data" */
export const techNote = (item: string) => item.match(/\((.*)\)/)?.[1]?.trim() ?? "";

export const withNote = (name: string, note: string) => {
  const clean = note.replace(/[()]/g, "").trim();
  return clean ? `${name} (${clean})` : name;
};

export const joinSpec = (items: string[]) => items.join(", ");

/** Layer names offered for "How it's built" and "Deployment", alongside any already in use. */
export const DEFAULT_LAYERS = ["Frontend", "Backend", "Database", "Authentication", "File Storage", "Real-time", "Machine Learning", "Mobile", "Hosting", "CI/CD"];

export interface TechCatalog {
  /** Project tech stacks and role skills. */
  stack: string[];
  /** Tech inside "How it's built" layers. */
  built: string[];
  /** Hosting inside "Deployment" layers. */
  deploy: string[];
  /** Layer names, e.g. Frontend. */
  layers: string[];
  /** Icons chosen on the Skills page, by lowercase skill name. */
  icons: Record<string, string>;
}
