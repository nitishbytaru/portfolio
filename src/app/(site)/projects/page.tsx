import type { Metadata } from "next";
import ProjectsBoard from "@/components/board/ProjectsBoard";
import Wordmark from "@/components/board/Wordmark";
import { getProjectsBoard } from "@/lib/content";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  const { panels, more } = getProjectsBoard();
  return (
    <div>
      <Wordmark className="mb-6">Projects</Wordmark>
      <ProjectsBoard panels={panels} more={more} />
    </div>
  );
}
