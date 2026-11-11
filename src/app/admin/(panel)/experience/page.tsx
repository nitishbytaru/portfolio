import type { Metadata } from "next";
import ExperienceEditor from "@/components/admin/ExperienceEditor";
import LoadError from "@/components/admin/LoadError";
import { TechIconProvider } from "@/components/ui/TechIcon";
import { loadForEditing, loadTechCatalog } from "@/lib/server/admin-content";

import Heading from "../heading";

export const metadata: Metadata = { title: "Experience" };

export default async function Page() {
  const [loaded, catalog] = await Promise.all([loadForEditing("experience"), loadTechCatalog()]);
  return (
    <>
      <Heading title="Experience">Jobs, internships and freelance work. Hide a role to take it off the site without losing it.</Heading>
      {loaded.ok ? (
        <TechIconProvider icons={catalog.icons}>
          <ExperienceEditor initial={loaded.data} sha={loaded.sha} techOptions={catalog.stack} />
        </TechIconProvider>
      ) : <LoadError message={loaded.error} />}
    </>
  );
}

