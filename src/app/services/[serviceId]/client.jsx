'use client';

import { services } from '@/app/_mock_data/service_details.js';
import { notFound, useParams, usePathname } from 'next/navigation';
import useLanguageContext from '@/app/_hooks/useLanguageContext.jsx';
import ServiceDetailsCard from '@/app/_components/service_details_card.jsx';
import { servicesStaticData } from '@/app/_lib/static_data.js';
import Translate from '@/app/_utils/Translator.js';
import { useEffect } from 'react';

export default function ServiceDetailsComponent() {

    const { language } = useLanguageContext();

    const translatedData = Translate({ data: servicesStaticData, language: language });

    const params = useParams();

    const id = Number(params.serviceId);
    const service = services.filter(s => s.id === id)[0];

    if (!service) {
        notFound();
    }

    const translated = language === 'BG' ? service.BG : service.EN;
    const servicesStaticDataTranslated = language === 'BG' ? servicesStaticData.BG : servicesStaticData.EN;

    const path = usePathname();

    useEffect(() => {
        const servicesName = translated[0].pathname;
        console.log('servicesName', servicesName);
        const pathnameParts = path.split('/');
        console.log('pathnameParts', pathnameParts);
    }, [language]);

    return (
        <div className='relative my-4 px-4'>
            <section className="flex flex-col md:grid xl:grid-cols-3 lg:grid-cols-2 gap-8">
                {translated.map((detail, index) => (
                    <ServiceDetailsCard key={index} service={detail} servicesStaticData={servicesStaticDataTranslated} />
                ))}
            </section>

            <section className='w-96 xl:w-128 mt-12 p-4 bg-slate-300 dark:bg-slate-800/80 dark:backdrop-blur-md sticky bottom-16 left-1/2 text-center rounded-full shadow-lg z-1 lg:-translate-x-1/2'>
                <p className="text-xs text-slate-800 dark:text-slate-300 italic">{translatedData.legend}</p>
            </section>
        </div>
    );
}