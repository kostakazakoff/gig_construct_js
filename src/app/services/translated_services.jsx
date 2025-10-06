'use client';

import ServiceCard from "@/app/_components/service/service_card.jsx";
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
    <div className="max-w-7xl w-full sm:px-6 lg:px-8">
      <ul role="list" className="divide-y divide-white/5 flex flex-col md:grid lg:grid-cols-2">
        {Object.values(services).map((service) => (
            <ServiceCard key={service.id} service={service} />
        ))}
      </ul>
    </div>
  );
}