"use client";

import { services } from "@/app/_mock_data/service_details.js";
import { notFound, useParams } from "next/navigation";
import useLanguageContext from "@/app/_hooks/useLanguageContext.jsx";
import ServiceDetailsCard from "@/app/_components/servicesComponents/service_details_card.jsx";
import { servicesStaticData } from "@/app/_lib/static_data.js";
import { offerConfirmationStaticData } from "@/app/_lib/static_data";
import { offerNoteStaticData } from "@/app/_lib/static_data.js";
import Translate from "@/app/_utils/Translator.js";
import Modal from "@/app/_components/mainComponents/modal/modal";
import AskOfferForm from "@/app/_components/servicesComponents/ask_offer_form";
import OfferConfirmation from "@/app/_components/servicesComponents/offer_confirmation";
import { useEffect, useState } from "react";

export default function ServiceDetailsComponent() {
    const { language } = useLanguageContext();
    const params = useParams();

    const id = Number(params.serviceId);
    const service = services.filter((s) => s.id === id)[0];

    const [translatedData, setTranslatedData] = useState(Translate({ data: servicesStaticData, language: language }));
    const [offerNoteTranslated, setOfferNoteTranslated] = useState(Translate({ data: offerNoteStaticData, language: language }));
    const [translatedOfferConfirmation, setTranslatedOfferConfirmation] = useState(Translate({ data: offerConfirmationStaticData, language: language }));
    const [translatedService, setTranslatedService] = useState(Translate({ data: service, language: language }));

    useEffect(() => {
        setTranslatedData(Translate({ data: servicesStaticData, language: language }));
        setOfferNoteTranslated(Translate({ data: offerNoteStaticData, language: language }));
        setTranslatedOfferConfirmation(Translate({ data: offerConfirmationStaticData, language: language }));
        setTranslatedService(Translate({ data: service, language: language }));
    }, [language]);

    if (!service) {
        notFound();
    }
    // State to track if the form has been submitted
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        if (formSubmitted) {
            console.log("Form submitted for service ID:", service.id);
            // Logic to handle after form submission, send data to server, etc.
        }
    }, [formSubmitted]);

    const [modalIsActive, setModalIsActive] = useState(false);

    useEffect(() => {
        if (modalIsActive) {
            setFormSubmitted(false);
        }
    }, [modalIsActive]);

    return (
        <div className="relative my-4 px-4">
            <Modal active={modalIsActive} setActive={setModalIsActive}>
                <AskOfferForm
                    serviceId={service.id}
                    translated={offerNoteTranslated}
                    setFormSubmitted={setFormSubmitted}
                />
                <OfferConfirmation
                    service={service}
                    translated={translatedOfferConfirmation}
                    formSubmitted={formSubmitted}
                    setFormSubmitted={setFormSubmitted}
                />
            </Modal>

            <section className="flex flex-col md:grid xl:grid-cols-3 lg:grid-cols-2 gap-8 py-2">
                {translatedService.map((detail, index) => (
                    <ServiceDetailsCard
                        key={index}
                        serviceId={service.id}
                        service={detail}
                        servicesStaticData={translatedData}
                    />
                ))}
            </section>

            <section className="w-96 xl:w-128 mt-12 py-4 px-8 bg-slate-300 dark:bg-slate-800/80 dark:backdrop-blur-md sticky bottom-24 sm:bottom-16 left-1/2 text-center rounded-sm shadow-lg/20 z-5 lg:-translate-x-1/2">
                <p className="text-xs text-slate-700 dark:text-slate-300">{translatedData.legend}</p>
            </section>
        </div>
    );
}
