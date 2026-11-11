import "server-only";
import { describeIssues, SCHEMAS, type ContentData, type ContentFile } from "@/lib/schema";
import { readFile } from "./github";

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
