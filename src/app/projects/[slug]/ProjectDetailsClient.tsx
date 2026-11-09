"use client";

import React from "react";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { Project } from "@/data/ProjectData";

interface ProjectDetailsClientProps {
  project: Project;
}

export default function ProjectDetailsClient({ project }: ProjectDetailsClientProps) {
  return <ProjectLayout key={project.slug} project={project} />;
}
