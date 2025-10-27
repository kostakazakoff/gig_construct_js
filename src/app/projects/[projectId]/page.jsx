import ProjectImageCard from "@/app/_components/projectsComponents/projectImageCard";
import ProjectsClientComponent from "./clientComponent";

export default function ProjectDetailsPage({ params }) {
    const { projectId } = params;

    return (
        <ProjectsClientComponent projectId={projectId} />
    );
}