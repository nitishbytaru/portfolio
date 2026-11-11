import type { Metadata } from "next";
import ProfileEditor from "@/components/admin/ProfileEditor";
import LoadError from "@/components/admin/LoadError";
import { loadForEditing } from "@/lib/server/admin-content";
import { rawBase } from "@/lib/server/github";
import Heading from "../heading";

export const metadata: Metadata = { title: "Profile" };

export default async function Page() {
  const loaded = await loadForEditing("profile");
  return (
    <>
      <Heading title="Profile">Your name, bio, contact details and portrait.</Heading>
      {loaded.ok ? <ProfileEditor initial={loaded.data} sha={loaded.sha} rawBase={safeRawBase()} /> : <LoadError message={loaded.error} />}
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
