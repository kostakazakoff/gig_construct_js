'use client';

import { useParams } from "next/navigation";
import ProjectImageCard from "@/app/_components/projectsComponents/projectImageCard.jsx";

export default function ProjectsClientComponent() {
    const { projectId } = useParams();

    const imgCards = [
        {
            id: 1,
            imageUrl: "/images/service_details_cards/electro/Electrical-Services.jpg",
            altText: "Electrical Services",
        },
        {
            id: 2,
            imageUrl: "/images/service_details_cards/plumbing/Plumbing-Services.jpg",
            altText: "Plumbing Services",
        },
        {
            id: 3,
            imageUrl: "/images/service_details_cards/carpentry/Carpentry-Services.jpg",
            altText: "Carpentry Services",
        },
        // Additional image cards can be added here
    ];

    return (

        <ul className="flex flex-col md:grid xl:grid-cols-3 lg:grid-cols-2 gap-8 py-2">
            {/* <h1>Project {projectId} Details Page</h1> */}
            {imgCards.map((card) => (
                <li key={card.id} className="group w-96 h-64 transition duration-300 ease-in-outhover:translate-y-1 hover:scale-105 shadow-md/30 hover:shadow-xl/40 rounded-lg relative overflow-hidden bg-slate-200 dark:bg-slate-900 text-slate-200 p-4 border border-gig-blue dark:border-slate-300">
                    <ProjectImageCard imgSrc={card.imageUrl} altText={card.altText} />
                </li>
            ))}
        </ul>
    );
}