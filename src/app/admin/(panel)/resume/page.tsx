import type { Metadata } from "next";
import ResumeEditor from "@/components/admin/ResumeEditor";
import LoadError from "@/components/admin/LoadError";
import { loadForEditing } from "@/lib/server/admin-content";

import Heading from "../heading";

export const metadata: Metadata = { title: "Resume" };

export default async function Page() {
  const loaded = await loadForEditing("resume");
  return (
    <>
      <Heading title="Resume">Paste a Google Drive link to replace the resume everywhere on the site.</Heading>
      {loaded.ok ? <ResumeEditor initial={loaded.data} sha={loaded.sha} /> : <LoadError message={loaded.error} />}
    </>
  );
}

