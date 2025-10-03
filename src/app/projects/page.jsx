import ProjectsComponent from "./client";

export const metadata = {
    title: 'Projects - GIG Construct',
    description: 'Our completed projects showcasing our expertise in construction and renovation services.',
    tags: ['construction', 'renovation', 'projects', 'portfolio'],
}

export default function ProjectsPage() {
  return (
    <div>
      <ProjectsComponent  />
    </div>
  );
}