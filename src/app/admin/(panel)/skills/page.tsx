import type { Metadata } from "next";
import SkillsEditor from "@/components/admin/SkillsEditor";
import LoadError from "@/components/admin/LoadError";
import { loadForEditing } from "@/lib/server/admin-content";

import Heading from "../heading";

export const metadata: Metadata = { title: "Skills" };

export default async function Page() {
  const loaded = await loadForEditing("skills");
  return (
    <>
      <Heading title="Skills">Groups and skills. Untick “Show on Home” to keep a skill off the Home tile.</Heading>
      {loaded.ok ? <SkillsEditor initial={loaded.data} sha={loaded.sha} /> : <LoadError message={loaded.error} />}
    </>
  );
}

