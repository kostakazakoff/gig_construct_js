'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import be from '@/app/_utils/Api';
import useLanguageContext from '@/app/_hooks/useLanguageContext';
import ComponentLoader from '@/app/_components/mainComponents/componentLoader';
import Translate from '@/app/_utils/Translator';
import { API_PATH } from '@/app/_lib/api_paths';

export default function ProjectLayout({ children }) {
    const { language } = useLanguageContext();
    const { serviceId } = useParams();
    const [serviceTitle, setServiceTitle] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (serviceId) {
            be.get(`${API_PATH.SERVICES}${serviceId}`)
                .then(response => response?.data)
                .then(data => {
                    if (data && data.succeed && data.data && data.data.length > 0) {
                        const fetchedData = data.data;
                        const serviceData = Array.isArray(fetchedData) ? fetchedData[0] : fetchedData;
                        setServiceTitle(serviceData.category?.name || `${serviceId} services`);
                    } else {
                        setServiceTitle(null);
                        router.push(`/services#${serviceId}`);
                    }
                })
                .catch(error => {
                    console.error('Error fetching service title:', error);
                });
        }
    }, [serviceId, language]);

    return (
        serviceTitle ? (
            <section>
                <div className="w-full bg-slate-900 dark:bg-slate-800 text-slate-200 py-4 fixed left-0 z-50">
                    <div className="flex items-center justify-between max-w-7xl mx-auto px-8">
                        <h1 className="lg:text-3xl font-semibold">{serviceTitle}</h1>
                        <Link
                            href={`/services#${serviceId}`}
                            className="flex-none rounded-full bg-slate-900 dark:bg-slate-800 px-3.5 py-1 text-sm font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                            scroll={true}
                        >
                            <span aria-hidden="true">&larr;</span> {language === 'EN' ? 'Back to all services' : 'Назад към всички услуги'}
                        </Link>
                    </div>
                </div>

                <div className="py-24">
                    {children}
                </div>
            </section>
        ) : <ComponentLoader />
    );
}