'use client';

import { services } from '@/app/_mock_data/service_details.js';
import { notFound, useParams } from 'next/navigation';
import useLanguageContext from '@/app/_hooks/useLanguageContext.jsx';
import ServiceDetailsCard from '@/app/_components/servicesComponents/service_details_card.jsx';
import { servicesStaticData } from '@/app/_lib/static_data.js';
import { offerNoteStaticData } from '@/app/_lib/static_data.js';
import Translate from '@/app/_utils/Translator.js';
import Modal from '@/app/_components/mainComponents/modal';
import AskOfferForm from '@/app/_components/servicesComponents/ask_offer_form';
import { useState } from 'react';

export default function ServiceDetailsComponent() {

    const { language } = useLanguageContext();

    const translatedData = Translate({ data: servicesStaticData, language: language });
    const offerNoteTranslated = Translate({ data: offerNoteStaticData, language: language });

    const params = useParams();

    const id = Number(params.serviceId);
    const service = services.filter(s => s.id === id)[0];

    if (!service) {
        notFound();
    }

    const translated = language === 'BG' ? service.BG : service.EN;
    const servicesStaticDataTranslated = language === 'BG' ? servicesStaticData.BG : servicesStaticData.EN;

    //TODO: modal onSubmit logic
    const modalOnSubmit = () => {
        console.log('Form data submited:', formData);
     }

    const modalOnClose = () => {
        console.log(`${service.id} Closed`);
    }

    const [formData, setFormData] = useState(null);

    return (
        <div className='relative my-4 px-4'>
            <Modal onOK={modalOnSubmit} onClose={modalOnClose}>
                <AskOfferForm serviceId={service.id} translated={offerNoteTranslated} setFormData={setFormData} />
            </Modal>
            <section className="flex flex-col md:grid xl:grid-cols-3 lg:grid-cols-2 gap-8">
                {translated.map((detail, index) => (
                    <ServiceDetailsCard key={index} serviceId={service.id} service={detail} servicesStaticData={servicesStaticDataTranslated}/>
                ))}
            </section>

            <section className='w-96 xl:w-128 mt-12 p-4 bg-slate-300 dark:bg-slate-800/80 dark:backdrop-blur-md sticky bottom-16 left-1/2 text-center rounded-full shadow-lg z-1 lg:-translate-x-1/2'>
                <p className="text-xs text-slate-800 dark:text-slate-300 italic">{translatedData.legend}</p>
            </section>
        </div>
    );
}