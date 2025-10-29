'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import ProjectImageCard from "@/app/_components/projectsComponents/projectImageCard.jsx";
import Modal from "@/app/_components/mainComponents/modal/modal";
import be from "@/app/_utils/Api";
import { API_PATH } from "@/app/_lib/api_paths.js";

export default function ProjectsClientComponent() {
    
    const { projectId } = useParams();

    useEffect(() => {
        be.get(`projects/${projectId}`)
            .then(response => response.data)
            .then(data => {
                const images = data.data.images;
                const imgCardsData = images.map((image) => ({
                    id: image.id,
                    imageUrl: image.image_src,
                }));
                setImgCards(imgCardsData);
            })
            .catch(error => {
                console.error("Error fetching project data:", error);
            });
    }, [projectId]);

    const [imgCards, setImgCards] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);

    const [modalIsActive, setModalIsActive] = useState(false);

    return (
        <>
            {imageSrc &&
                <Modal active={modalIsActive} setActive={setModalIsActive}>
                    <Image
                        alt=""
                        src={imageSrc}
                        width={1400}
                        height={900}
                        className="w-[85vw] h-[85v] max-w-6xl object-cover rounded-md"
                        sizes="85vw"
                    />
                </Modal>
            }

            <ul className="flex flex-col md:grid xl:grid-cols-3 lg:grid-cols-2 gap-8 py-2">
                {imgCards && imgCards.map((card) => (
                    <li
                        key={card.id}
                        onMouseOver={() => setImageSrc(API_PATH.BACKEND_URL + card.imageUrl)}
                        className="group w-96 h-64 transition duration-300 ease-in-out hover:translate-y-1 hover:scale-105 shadow-md/30 hover:shadow-xl/40 rounded-lg relative overflow-hidden bg-slate-200 dark:bg-slate-900 text-slate-200 p-4 border border-gig-blue dark:border-slate-300 cursor-pointer"
                    >
                        <ProjectImageCard img={API_PATH.BACKEND_URL + card.imageUrl} id={projectId} />
                    </li>
                ))}
            </ul>
        </>
    );
}