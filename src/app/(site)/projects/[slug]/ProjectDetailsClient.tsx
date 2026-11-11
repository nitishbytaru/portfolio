"use client";

import React from "react";
import ProjectLayout from "@/components/layout/ProjectLayout";

type ProjectDetailsClientProps = React.ComponentProps<typeof ProjectLayout>;

export default function ProjectDetailsClient(props: ProjectDetailsClientProps) {
  return <ProjectLayout key={props.project.slug} {...props} />;
}
