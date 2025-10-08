'use client';

import { projectsData } from '@/app/_mock_data/projects.js';
import useLanguageContext from '@/app/_hooks/useLanguageContext.jsx';
import ProjectCard from '@/app/_components/projects_card.jsx';
import { projectsStaticData } from '@/app/_lib/static_data.js';
import { useEffect, useState } from 'react';

export default function ProjectsComponent() {

    const { language } = useLanguageContext();
    const [translated, setTranslated] = useState(projectsData.BG);
    const [translatedStaticData, setTranslatedStaticData] = useState(projectsStaticData.BG);

    useEffect(() => {
        if (language === 'EN') {
            setTranslated(projectsData.EN);
            setTranslatedStaticData(projectsStaticData.EN);
        } else {
            setTranslated(projectsData.BG);
            setTranslatedStaticData(projectsStaticData.BG);
        }
    }, [language]);

    return (
        <div className='relative my-4'>
            <section className='grid grid-cols-1 xl:grid-cols-2 gap-16 px-8 xl:px-24 2xl:px-40'>
                {translated.map((details) => (
                    <ProjectCard key={details.id} project={details} staticData={translatedStaticData} language={language} />
                ))}
            </section>
        </div>
    );
}