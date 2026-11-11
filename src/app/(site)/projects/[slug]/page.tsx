import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjects } from "@/lib/content";
import ProjectDetailsClient from "./ProjectDetailsClient";

// Only visible projects get a page; any other slug is a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjects().find((p) => p.slug === slug);
  return project ? { title: project.title, description: project.shortDescription } : {};
}

const neighbour = (project: { slug: string; title: string; thumbnail: string } | undefined) =>
  project ? { slug: project.slug, title: project.title, thumbnail: project.thumbnail } : null;

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = getProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  return (
    <ProjectDetailsClient
      project={projects[index]}
      index={index}
      previousProject={neighbour(projects[index - 1])}
      nextProject={neighbour(projects[index + 1])}
    />
  );
}
