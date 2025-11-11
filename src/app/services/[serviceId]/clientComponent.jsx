"use client";

import useLanguageContext from "@/app/_hooks/useLanguageContext.jsx";
import ServiceDetailsCard from "@/app/_components/servicesComponents/serviceDetailsCard.jsx";
import { servicesStaticData } from "@/app/_lib/static_data.js";
import { offerConfirmationStaticData } from "@/app/_lib/static_data";
import { contactStaticData } from "@/app/_lib/static_data.js";
import Translate from "@/app/_utils/Translator.js";
import Modal from "@/app/_components/mainComponents/modal/modal";
import AskOfferForm from "@/app/_components/servicesComponents/askOfferForm";
import OfferConfirmation from "@/app/_components/servicesComponents/offerConfirmation";
import { useEffect, useState } from "react";
import { API_PATH } from "@/app/_lib/api_paths";
import CompLoader from "@/app/_components/mainComponents/compLoader";
import be from "@/app/_utils/Api";
import { useParams, useRouter } from "next/navigation";

export default function ServiceDetailsComponent() {
    const { language } = useLanguageContext();
    const params = useParams();
    const router = useRouter();
    const slug = params.serviceId;

    const [services, setServices] = useState(null);
    const [offerNoteTranslated, setOfferNoteTranslated] = useState(Translate({ data: contactStaticData, language: language }));
    const [translatedOfferConfirmation, setTranslatedOfferConfirmation] = useState(Translate({ data: offerConfirmationStaticData, language: language }));
    const [translatedStaticData, setTranslatedStaticData] = useState({});

    useEffect(() => {
        setOfferNoteTranslated(Translate({ data: contactStaticData, language: language }));
        setTranslatedOfferConfirmation(Translate({ data: offerConfirmationStaticData, language: language }));
        setTranslatedStaticData(Translate({ data: servicesStaticData, language: language }));
    }, [language]);

    useEffect(() => {
        be.get(`${API_PATH.SERVICE_CATEGORIES}${slug}`)
            .then(response => response.data)
            .then(recievedData => {
                if (recievedData && recievedData.succeed) {
                    const translatedData = Translate({ data: recievedData.data, language: language });
                    setServices(translatedData);
                } else {
                    console.log('Error message:', recievedData.message);
                    setServices(null);
                }
            })
            .catch(error => {
                console.log('Error fetching service data:', error);
                setServices(null);
                router.push(`/services#${slug}`);
            });
    }, [language]);
    
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        if (formSubmitted) {
            console.log("Form submitted for service slug:", slug);
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
        <>
            {services ? 
                <div className="relative px-4">
                    <Modal active={modalIsActive} setActive={setModalIsActive}>
                        <AskOfferForm
                            serviceId={slug}
                            translated={offerNoteTranslated}
                            setFormSubmitted={setFormSubmitted}
                        />
                        <OfferConfirmation
                            translated={translatedOfferConfirmation}
                            formSubmitted={formSubmitted}
                            setFormSubmitted={setFormSubmitted}
                        />
                    </Modal>

                    <section className="flex flex-col md:grid xl:grid-cols-3 lg:grid-cols-2 gap-8 py-2">
                        {services.services.map((s, index) => (
                            <ServiceDetailsCard
                                key={index}
                                serviceId={s.id}
                                service={s}
                                servicesStaticData={translatedStaticData}
                            />
                        ))}
                    </section>

                    <section className="w-96 xl:w-128 mt-12 py-4 px-8 bg-slate-300 dark:bg-slate-800/80 dark:backdrop-blur-md sticky bottom-24 sm:bottom-16 left-1/2 text-center rounded-sm shadow-lg/20 z-5 lg:-translate-x-1/2">
                        <p className="text-xs text-slate-700 dark:text-slate-300">{translatedStaticData.legend}</p>
                    </section>
                </div>
                : <CompLoader />
            }
        </>
    );
}
