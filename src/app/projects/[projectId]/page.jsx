import ProjectsClientComponent from "./clientComponent";

export const metadata = {
    title: 'Gallery',
    description: 'Научете повече за GiG Construct, нашата мисия, визия и екип. Строителни услуги с качество и доверие.',
    tags: ['gallery', 'GIG construct', 'mission', 'vision', 'team', 'quality construction', 'trusted builder', 'мисия', 'визия', 'екип', 'качествено строителство', 'доверен строител', 'ремонтни услуги'],
}

export default function ProjectDetailsPage({ params }) {
    const { projectId } = params;

    return (
        <ProjectsClientComponent projectId={projectId} />
    );
}