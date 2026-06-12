"use client";

import React from "react";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { Project } from "@/data/ProjectData";

interface ProjectDetailsClientProps {
  project: Project;
}

export default function ProjectDetailsClient({ project }: ProjectDetailsClientProps) {
  const handleLiveLinkClick = () => {
    if (project.liveLink) {
      window.open(project.liveLink, "_blank");
    }
  };

  return (
    <ProjectLayout project={project} onLiveLinkClick={handleLiveLinkClick} />
  );
}
