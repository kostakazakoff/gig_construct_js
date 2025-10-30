'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import be from '@/app/_utils/Api';
import useLanguageContext from '@/app/_hooks/useLanguageContext';
import CompLoader from '@/app/_components/mainComponents/compLoader';
import Translate from '@/app/_utils/Translator';

export default function ProjectLayout({ children }) {
    const { language } = useLanguageContext();
    const { projectId } = useParams();
    const [projectTitle, setProjectTitle] = useState(null);

    useEffect(() => {
        if (projectId) {
            be.get(`projects/${projectId}`)
                .then(response => response.data)
                .then(data => {
                    const fetchedData = data.data;
                    console.log('Fetched project data:', fetchedData);
                    const projectData = Translate({ data: fetchedData, language });
                    setProjectTitle(projectData.title || `Project ${projectId}`);
                })
                .catch(error => {
                    console.error('Error fetching project data:', error);
                    setProjectTitle(`Project ${projectId}`);
                });
        }
    }, [projectId, language]);

    return (
        projectTitle ? (
        <section>
            <div className="w-full bg-slate-900 dark:bg-slate-800 text-slate-200 py-4 fixed left-0 z-50">
                <div className="flex items-center justify-between max-w-7xl mx-auto px-8">
                    <h1 className="lg:text-3xl font-semibold">{projectTitle}</h1>
                    <Link
                        href="/projects"
                        className="flex-none rounded-full bg-slate-900 dark:bg-slate-800 px-3.5 py-1 text-sm font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                    >
                        <span aria-hidden="true">&larr;</span> {language === 'EN' ? 'Back to projects' : 'Назад към проекти'}
                    </Link>
                </div>
            </div>

            <div className="py-24">
                {children}
            </div>
        </section>
        ) : <CompLoader />
    );
}