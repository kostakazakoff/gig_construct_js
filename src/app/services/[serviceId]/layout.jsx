'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import be from '@/app/_utils/Api';
import useLanguageContext from '@/app/_hooks/useLanguageContext';
import CompLoader from '@/app/_components/mainComponents/compLoader';
import Translate from '@/app/_utils/Translator';

export default function ProjectLayout({ children }) {
    const { language } = useLanguageContext();
    const { serviceId } = useParams();
    const [serviceTitle, setServiceTitle] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (serviceId) {
            be.get(`services/${serviceId}`)
                .then(response => response?.data)
                .then(data => {
                    if (!data || !data.succeed) {
                        router.push(`/services#${serviceId}`);
                    }
                    const fetchedData = data.data;
                    const serviceData = Translate({ data: fetchedData, language });
                    setServiceTitle(serviceData.category.name || `${serviceId} services`);
                })
                .catch(error => {
                    router.push(`/services#${serviceId}`);
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
        ) : <CompLoader />
    );
}