import type { Metadata } from "next";
import ExperienceEditor from "@/components/admin/ExperienceEditor";
import LoadError from "@/components/admin/LoadError";
import { loadForEditing } from "@/lib/server/admin-content";

import Heading from "../heading";

export const metadata: Metadata = { title: "Experience" };

export default async function Page() {
  const loaded = await loadForEditing("experience");
  return (
    <>
      <Heading title="Experience">Jobs, internships and freelance work. Hide a role to take it off the site without losing it.</Heading>
      {loaded.ok ? <ExperienceEditor initial={loaded.data} sha={loaded.sha} /> : <LoadError message={loaded.error} />}
    </>
  );
}

