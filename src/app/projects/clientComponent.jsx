'use client';

import useLanguageContext from '@/app/_hooks/useLanguageContext.jsx';
import ProjectCard from '@/app/_components/projectsComponents/projectsCard.jsx';
import { projectsStaticData } from '@/app/_lib/static_data.js';
import { useEffect, useState } from 'react';
import Translate from '../_utils/Translator';
import be from '../_utils/Api';
import ComponentLoader from '../_components/mainComponents/componentLoader';
import { usePathname } from 'next/navigation';
import { useErrorModal } from '../_utils/ActivateErrorModal';
import { API_PATH } from '../_lib/api_paths';

export default function ProjectsComponent() {

    const pathname = usePathname();
    const { language } = useLanguageContext();
    const [translated, setTranslated] = useState(null);
    const [translatedStaticData, setTranslatedStaticData] = useState(Translate({ data: projectsStaticData, language: language }));

    const getProjectsData = () => {
        be.get(API_PATH.PROJECTS)
            .then(response => response.data)
            .then(projectsData => {
                if (projectsData && projectsData.data && projectsData.succeed) {
                    setTranslated(projectsData.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
                } else {
                    // activateErrorModal(projectsData?.message || 'An error occurred while loading projects');
                    setTranslated(null);
                }
            })
            .catch(response => {
                // activateErrorModal(response.response.data.message || 'Failed to fetch projects data');
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
                <div className='relative py-6'>
                    <section className='grid grid-cols-1 xl:grid-cols-2 gap-16 px-8 xl:px-24 2xl:px-40' lang={language.toLowerCase()}>
                        {translated.map((project) => (
                            <ProjectCard key={project.id} project={project} staticData={translatedStaticData} language={language} />
                        ))}
                    </section>
                </div>
                : <ComponentLoader />
            }
        </>
    );
}