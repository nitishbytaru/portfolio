import type { Metadata } from "next";
import SkillsBoard from "@/components/board/SkillsBoard";
import Wordmark from "@/components/board/Wordmark";

export const metadata: Metadata = { title: "Skills" };

export default function SkillsPage() {
  return (
    <div>
      <Wordmark className="mb-6">Skills</Wordmark>
      <SkillsBoard />
    </div>
  );
}
