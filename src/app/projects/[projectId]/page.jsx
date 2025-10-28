import ProjectsClientComponent from "./clientComponent";

export default function ProjectDetailsPage({ params }) {
    const { projectId } = params;

    return (
        <ProjectsClientComponent projectId={projectId} />
    );
}