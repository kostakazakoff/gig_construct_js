'use client';

import useLanguageContext from '@/app/_hooks/useLanguageContext.jsx';
import ProjectCard from '@/app/_components/projectsComponents/projectsCard.jsx';
import { projectsStaticData } from '@/app/_lib/static_data.js';
import { useEffect, useState } from 'react';
import Translate from '../_utils/Translator';
import be from '../_utils/Api';
import ComponentLoader from '../_components/mainComponents/componentLoader';
import { usePathname } from 'next/navigation';
import Modal from '../_components/mainComponents/modal/modal';
import ErrorMessage from '../_components/mainComponents/errorMessage';
import { useErrorModal } from '../_utils/ActivateErrorModal';

export default function ProjectsComponent() {

    const pathname = usePathname();
    const { language } = useLanguageContext();
    const [translated, setTranslated] = useState(null);
    const [translatedStaticData, setTranslatedStaticData] = useState(Translate({ data: projectsStaticData, language: language }));
    const { modalIsActive, setModalIsActive, formError, activateErrorModal } = useErrorModal();

    const getProjectsData = () => {
        be.get('projects/')
            .then(response => response.data)
            .then(projectsData => {
                console.log('Projects data received:', projectsData.succeed);
                if (projectsData && projectsData.data && projectsData.succeed) {
                    const translatedProjects = Translate({ data: projectsData.data, language });
                    setTranslated(translatedProjects);
                } else {
                    // activateErrorModal(projectsData?.message || 'An error occurred while loading projects');
                    console.log('Error loading projects:', projectsData?.message || 'Unknown error');
                    setTranslated(null);
                }
            })
            .catch(response => {
                // activateErrorModal(response.response.data.message || 'Failed to fetch projects data');
                console.log('Error fetching projects data:', response.response.data.message);
                setTranslated(null);
            });
    };

    useEffect(() => {
        setTranslatedStaticData(Translate({ data: projectsStaticData, language: language }));
        getProjectsData();
    }, [language]);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            setTimeout(() => {
                const el = document.getElementById(hash.substring(1));
                if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 500);
        }
    }, [pathname]);

    return (
        <>

            {/* <Modal active={modalIsActive} setActive={setModalIsActive}>
                <ErrorMessage formError={formError} closeWrapper={() => setModalIsActive(false)} />
            </Modal> */}

            {translated ?
                <div className='relative'>
                    <section className='grid grid-cols-1 xl:grid-cols-2 gap-16 px-8 xl:px-24 2xl:px-40' lang={language.toLowerCase()}>
                        {translated.map((project) => (
                            <ProjectCard key={project.project_id} project={project} staticData={translatedStaticData} language={language} />
                        ))}
                    </section>
                </div>
                : <ComponentLoader />
            }
        </>
    );
}