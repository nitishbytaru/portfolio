import { projectsData } from "@/data/ProjectData";
import { redirect } from "next/navigation";
import ProjectDetailsClient from "./ProjectDetailsClient";

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    redirect("/#projects");
  }

  return <ProjectDetailsClient project={project} />;
}
