// src/projects/AgroGuide.jsx
import React from "react";
import ProjectLayout from "../components/ProjectLayout";
import { projectsData } from "../data/ProjectData";
import { toast } from "react-hot-toast";

const AgroGuide = () => {
  const project = projectsData[0];

  const handleLiveLinkClick = (e) => {
    e.preventDefault();
    window.open(project.liveLink, "_blank");
  };

  return (
    <>
      <ProjectLayout project={project} onLiveLinkClick={handleLiveLinkClick} />
    </>
  );
};

export default AgroGuide;
