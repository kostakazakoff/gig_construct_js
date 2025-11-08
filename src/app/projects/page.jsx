import ProjectsComponent from "./clientComponent";

export const metadata = {
    title: 'Projects',
    description: 'Our completed projects showcasing our expertise in construction and renovation services.',
    tags: ['construction', 'renovation', 'projects', 'portfolio'],
}

export default function ProjectsPage() {
    return (
        <div className="py-12 isolate">
            <ProjectsComponent />
        </div>
    );
}