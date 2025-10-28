'use client';

import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import ProjectImageCard from "@/app/_components/projectsComponents/projectImageCard.jsx";
import Modal from "@/app/_components/mainComponents/modal/modal";

export default function ProjectsClientComponent() {
    const { projectId } = useParams();

    const imgCards = [
        {
            id: 1,
            imageUrl: "/images/services/electrical.jpg",
            altText: "Electrical Services",
        },
        {
            id: 2,
            imageUrl: "/images/services/plumbing.jpg",
            altText: "Plumbing Services",
        },
        {
            id: 3,
            imageUrl: "/images/services/masonry.jpg",
            altText: "Masonry Services",
        },
        // Additional image cards can be added here
    ];

    const [modalIsActive, setModalIsActive] = useState(false);

    const [imageSrc, setImageSrc] = useState("");

    return (
        <>
            <Modal active={modalIsActive} setActive={setModalIsActive}>
                <Image
                    alt=""
                    src={imageSrc}
                    width={800}
                    height={600}
                    className="object-cover"
                />
            </Modal>

            <ul className="flex flex-col md:grid xl:grid-cols-3 lg:grid-cols-2 gap-8 py-2">
                {/* <h1>Project {projectId} Details Page</h1> */}
                {imgCards.map((card) => (
                    <li
                        key={card.id}
                        onClick={() => setImageSrc(card.imageUrl)}
                        className="group w-96 h-64 transition duration-300 ease-in-outhover:translate-y-1 hover:scale-105 shadow-md/30 hover:shadow-xl/40 rounded-lg relative overflow-hidden bg-slate-200 dark:bg-slate-900 text-slate-200 p-4 border border-gig-blue dark:border-slate-300 cursor-pointer"
                    >
                        <ProjectImageCard imgSrc={card.imageUrl} altText={card.altText} />
                    </li>
                ))}
            </ul>
        </>
    );
}