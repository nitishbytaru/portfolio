import type { Metadata } from "next";
import ExperienceBoard from "@/components/board/ExperienceBoard";
import Wordmark from "@/components/board/Wordmark";
import { getExperience, getKeywords, getProfile } from "@/lib/content";
import { thisMonth } from "@/lib/layout";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  const profile = getProfile();
  return (
    <div>
      <Wordmark className="mb-6">Experience</Wordmark>
      <ExperienceBoard
        items={getExperience()}
        keywords={getKeywords()}
        today={thisMonth()}
        name={profile.name}
        portrait={profile.portrait}
      />
    </div>
  );
}
