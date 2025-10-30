'use client';

import useLanguageContext from '@/app/_hooks/useLanguageContext.jsx';
import ProjectCard from '@/app/_components/projectsComponents/projectsCard.jsx';
import { projectsStaticData } from '@/app/_lib/static_data.js';
import { useEffect, useState } from 'react';
import Translate from '../_utils/Translator';
import be from '../_utils/Api';
import CompLoader from '../_components/mainComponents/compLoader';

export default function ProjectsComponent() {

    const { language } = useLanguageContext();

    const [translated, setTranslated] = useState(null);
    const [translatedStaticData, setTranslatedStaticData] = useState(Translate({ data: projectsStaticData, language: language }));

    const getProjectsData = async () => {
        const projectsData = await be.get('projects/');
        if (projectsData && projectsData.data && projectsData.data.succeed) {
            const translatedProjects = Translate({ data: projectsData.data.data, language });
            setTranslated(translatedProjects);
        } else {
            console.log(projectsData.message);
            setTranslated(null);
        }
    };

    useEffect(() => {
        setTranslatedStaticData(Translate({ data: projectsStaticData, language: language }));
        getProjectsData();
    }, [language]);

    return (
        <>
        {translated ?
            <div className='relative py-12'>
                <section className='grid grid-cols-1 xl:grid-cols-2 gap-16 px-8 xl:px-24 2xl:px-40'>
                    {translated.map((project) => (
                        <ProjectCard key={project.project_id} project={project} staticData={translatedStaticData} language={language} />
                    ))}
                </section>
            </div>
            : <CompLoader />
        }
        </>
    );
}