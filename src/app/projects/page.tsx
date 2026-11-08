import type { Metadata } from "next";
import ProjectsBoard from "@/components/board/ProjectsBoard";
import Wordmark from "@/components/board/Wordmark";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <div>
      <Wordmark className="mb-6">Projects</Wordmark>
      <ProjectsBoard />
    </div>
  );
}
