import React, { useState } from "react";
import ProjectLayout from "../components/ProjectLayout";
import { projectsData } from "../data/ProjectData";
import Modal from "../components/Modal";

const EchoRealm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const project = projectsData[1];

  const handleLiveLinkClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleContinue = () => {
    setIsModalOpen(false);
    window.open(project.liveLink, "_blank");
  };

  return (
    <>
      <ProjectLayout project={project} onLiveLinkClick={handleLiveLinkClick} />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onContinue={handleContinue}
      />
    </>
  );
};

export default EchoRealm;
