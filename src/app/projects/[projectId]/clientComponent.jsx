'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import ProjectImageCard from "@/app/_components/projectsComponents/projectImageCard.jsx";
import Modal from "@/app/_components/mainComponents/modal/modal";
import be from "@/app/_utils/Api";
import { API_PATH } from "@/app/_lib/api_paths.js";
import { Button } from "@headlessui/react";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import CompLoader from "@/app/_components/mainComponents/compLoader";
import useLanguageContext from "@/app/_hooks/useLanguageContext";
import Translate from "@/app/_utils/Translator";

export default function ProjectsClientComponent() {

    const { language } = useLanguageContext();
    const { projectId } = useParams();

    useEffect(() => {
        be.get(`projects/${projectId}`)
            .then(response => response.data)
            .then(data => {
                const translatedData = Translate({ data: data.data, language });
                const images = translatedData.images;
                const imgCardsData = images.map((image) => ({
                    id: image.id,
                    imageUrl: image.image_src,
                }));
                setImgCards(imgCardsData);
            })
            .catch(error => {
                console.error("Error fetching project data:", error);
            });
    }, [projectId, language]);

    const [imgCards, setImgCards] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [modalIsActive, setModalIsActive] = useState(false);
    const [imageId, setImageId] = useState(null);

    useEffect(() => {
        if (imageId !== null && imgCards && imgCards.length > 0) {
            const card = imgCards.find(card => card.id === imageId);
            if (card) {
                setImageSrc(API_PATH.BACKEND_URL + card.imageUrl);
            }
        }
    }, [imageId, imgCards]);

    // Keyboard navigation for modal
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!modalIsActive) return;
            
            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    navigateImage('prev');
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    navigateImage('next');
                    break;
                // case 'Escape':
                //     event.preventDefault();
                //     setModalIsActive(false);
                //     break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [modalIsActive, imageId, imgCards]);

    const navigateImage = (direction) => {
        if (!imgCards || imgCards.length === 0) return;

        const currentIndex = imgCards.findIndex(card => card.id === imageId);
        let newIndex;

        if (direction === 'next') {
            newIndex = (currentIndex + 1) % imgCards.length;
        } else if (direction === 'prev') {
            newIndex = (currentIndex - 1 + imgCards.length) % imgCards.length;
        }

        const newImageId = imgCards[newIndex].id;
        setImageId(newImageId);
    };

    return (
        imgCards ? (
            <>
                {imageSrc && (
                    <Modal active={modalIsActive} setActive={setModalIsActive}>
                        <Button
                            onClick={() => navigateImage('prev')}
                            className='fixed left-4 top-1/2 translate-y-[-50%] z-60 p-12 sm:p-24 lg:p-48 xl:p-60 cursor-pointer opacity-20 hover:opacity-100 transition-opacity hover:left-2 transition-ease-in-out duration-400'
                        >
                            <ArrowLeftCircleIcon className="h-12 w-12 text-white bg-slate-700 rounded-full" />
                        </Button>
                        <Button
                            onClick={() => navigateImage('next')}
                            className='fixed right-4 top-1/2 translate-y-[-50%] z-60 p-12 sm:p-24 lg:p-48 xl:p-60 cursor-pointer opacity-20 hover:opacity-100 transition-opacity hover:right-2 transition-ease-in-out duration-400'
                        >
                            <ArrowRightCircleIcon className="h-12 w-12 text-white bg-slate-700 rounded-full" />
                        </Button>
                        <Image
                            alt=""
                            src={imageSrc}
                            width={1400}
                            height={900}
                            className="w-[85vw] h-[85vh] max-w-6xl object-cover rounded-md"
                            sizes="85vw"
                        />
                    </Modal>
                )}

                <ul className="flex flex-col md:grid xl:grid-cols-3 lg:grid-cols-2 gap-8">
                    {imgCards.map((card) => (
                        <li
                            key={card.id}
                            id={card.id}
                            onMouseOver={() => setImageId(card.id)}
                            className="group w-96 h-64 transition duration-300 ease-in-out hover:translate-y-1 hover:scale-105 shadow-md/30 hover:shadow-xl/40 rounded-lg relative overflow-hidden bg-slate-200 dark:bg-slate-900 text-slate-200 p-4 border border-gig-blue dark:border-slate-300 cursor-pointer"
                        >
                            <ProjectImageCard img={API_PATH.BACKEND_URL + card.imageUrl} id={projectId} />
                        </li>
                    ))}
                </ul>
            </>
        ) : <CompLoader />
    );
}