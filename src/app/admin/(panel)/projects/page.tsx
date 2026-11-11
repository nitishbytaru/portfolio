import type { Metadata } from "next";
import ProjectsEditor from "@/components/admin/ProjectsEditor";
import LoadError from "@/components/admin/LoadError";
import { loadForEditing } from "@/lib/server/admin-content";
import { rawBase } from "@/lib/server/github";
import Heading from "../heading";

export const metadata: Metadata = { title: "Projects" };

export default async function Page() {
  const loaded = await loadForEditing("projects");
  return (
    <>
      <Heading title="Projects">Featured projects get the large panels; the rest appear in a compact list.</Heading>
      {loaded.ok ? <ProjectsEditor initial={loaded.data} sha={loaded.sha} rawBase={safeRawBase()} /> : <LoadError message={loaded.error} />}
    </>
  );
}

const safeRawBase = () => {
  try {
    return rawBase();
  } catch {
    return "";
  }
};
