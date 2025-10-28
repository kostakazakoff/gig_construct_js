'use client';

import ServiceCard from "@/app/_components/servicesComponents/serviceCard.jsx";
import useLanguageContext from '@/app/_hooks/useLanguageContext.jsx'
import { useEffect, useState } from "react";
import Translate from "@/app/_utils/Translator.js";
import { API_PATH } from "../_lib/api_paths";
import CompLoader from "../_components/mainComponents/compLoader";
import be from "../_utils/Api";

export default function TranslatedServices() {
    const { language } = useLanguageContext();
    const [translation, setTranslation] = useState(null);

    useEffect(() => {
        be.get(`${API_PATH.SERVICE_CATEGORIES}`)
            .then(response => response.json())
            .then(recievedData => {
                if (recievedData && recievedData.succeed) {
                    const translatedServices = Translate({ data: recievedData.data, language });
                    setTranslation(translatedServices);
                } else {
                    setTranslation(null);
                }
            });
    }, [language]);

    if (!translation) {
        return <CompLoader />;
    }

    return (
        <div className="flex flex-col xl:grid-cols-3 lg:grid-cols-2 gap-8">
            <section role="list" className="flex flex-col md:grid xl:grid-cols-3 lg:grid-cols-2 gap-8 py-6">
                {translation.map((service) => (
                    <ServiceCard key={service.id} service={service} language={language} />
                ))}
            </section>
        </div>
    );
}