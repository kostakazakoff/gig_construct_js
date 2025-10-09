'use client';

import ServiceCard from "@/app/_components/servicesComponents/service_card.jsx";
import useLanguageContext from '@/app/_hooks/useLanguageContext.jsx'
import { servicesData } from '@/app/_mock_data/services.js'
import { useEffect, useState } from "react";
import Translate from "@/app/_utils/Translator.js";

export default function TranslatedServices() {
    const { language } = useLanguageContext();
    const [translation, setTranslation] = useState(servicesData.BG);

    useEffect(() => {
        const translated = Translate({ data: servicesData, language });
        setTranslation(translated);
    }, [language]);

    const services = {};
    Object.values(translation).forEach(element => {
        services[element.id] = element;
    });

    return (
        <div className="flex flex-col xl:grid-cols-3 lg:grid-cols-2 gap-8">
            <section role="list" className="flex flex-col md:grid xl:grid-cols-3 lg:grid-cols-2 gap-8 py-6">
                {Object.values(services).map((service) => (
                    <ServiceCard key={service.id} service={service} language={language} />
                ))}
            </section>
        </div>
    );
}