import type { Metadata } from "next";
import ExperienceBoard from "@/components/board/ExperienceBoard";
import Wordmark from "@/components/board/Wordmark";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <div>
      <Wordmark className="mb-6">Experience</Wordmark>
      <ExperienceBoard />
    </div>
  );
}
