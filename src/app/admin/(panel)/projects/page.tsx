import type { Metadata } from "next";
import ProjectsEditor from "@/components/admin/ProjectsEditor";
import LoadError from "@/components/admin/LoadError";
import { TechIconProvider } from "@/components/ui/TechIcon";
import { loadForEditing, loadTechCatalog } from "@/lib/server/admin-content";
import { rawBase } from "@/lib/server/github";
import Heading from "../heading";

export const metadata: Metadata = { title: "Projects" };

export default async function Page() {
  const [loaded, catalog] = await Promise.all([loadForEditing("projects"), loadTechCatalog()]);
  return (
    <>
      <Heading title="Projects">Featured projects get the large panels; the rest appear in a compact list.</Heading>
      {loaded.ok ? (
        <TechIconProvider icons={catalog.icons}>
          <ProjectsEditor initial={loaded.data} sha={loaded.sha} rawBase={safeRawBase()} catalog={catalog} />
        </TechIconProvider>
      ) : <LoadError message={loaded.error} />}
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
