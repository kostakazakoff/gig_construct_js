'use client';

import { projectsData } from '@/app/_mock_data/projects.js';
import useLanguageContext from '@/app/_hooks/useLanguageContext.jsx';
import ProjectCard from '@/app/_components/projects_card.jsx';
import { projectsStaticData } from '@/app/_lib/static_data.js';
import { use, useEffect, useState } from 'react';
import Translate from '../_utils/Translator';

export default function ProjectsComponent() {

    const { language } = useLanguageContext();
    const defaultLanguage = 'BG';
    const [translated, setTranslated] = useState(Translate({ data: projectsData, language: defaultLanguage }));
    const [translatedStaticData, setTranslatedStaticData] = useState(Translate({ data: projectsStaticData, language: defaultLanguage }));

    useEffect(() => {
        setTranslated(Translate(Translate({ data: projectsData, language: language })));
        setTranslatedStaticData(Translate({ data: projectsStaticData, language: language }));
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