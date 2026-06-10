import { useParams, Navigate } from "react-router-dom";
import ProjectLayout from "../components/layout/ProjectLayout";
import { projectsData } from "../data/ProjectData";
const ProjectDetails = () => {
  const { slug } = useParams();
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    // If project is not found, redirect to home page's projects section
    return <Navigate to="/#projects" replace />;
  }

  const handleLiveLinkClick = (e) => {
    e.preventDefault();
    if (project.liveLink) {
      window.open(project.liveLink, "_blank");
    }
  };

  return (
    <ProjectLayout project={project} onLiveLinkClick={handleLiveLinkClick} />
  );
};

export default ProjectDetails;
