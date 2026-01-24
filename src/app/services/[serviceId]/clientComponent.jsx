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
import { useEffect, useState, useRef } from "react";
import { API_PATH } from "@/app/_lib/api_paths";
import ComponentLoader from "@/app/_components/mainComponents/componentLoader";
import be from "@/app/_utils/Api";
import { useParams, useRouter } from "next/navigation";
import ErrorMessage from "@/app/_components/mainComponents/errorMessage";

export default function ServiceDetailsComponent({ initialServicesData, serviceId: propServiceId }) {
    const { language } = useLanguageContext();
    const params = useParams();
    const router = useRouter();
    const id = propServiceId || params.serviceId;
    const isFirstRender = useRef(true);
    console.log("ServiceDetailsComponent mounted with serviceId:", id);

    const [services, setServices] = useState(initialServicesData?.data || null);
    const [offerNoteTranslated, setOfferNoteTranslated] = useState(Translate({ data: contactStaticData, language: language }));
    const [translatedOfferConfirmation, setTranslatedOfferConfirmation] = useState(Translate({ data: offerConfirmationStaticData, language: language }));
    const [translatedStaticData, setTranslatedStaticData] = useState({});
    const [formError, setFormError] = useState(null);

    useEffect(() => {
        setOfferNoteTranslated(Translate({ data: contactStaticData, language: language }));
        setTranslatedOfferConfirmation(Translate({ data: offerConfirmationStaticData, language: language }));
        setTranslatedStaticData(Translate({ data: servicesStaticData, language: language }));
    }, [language]);

    useEffect(() => {
        // Пропускаме заявката при първоначално рендиране ако имаме initialServicesData
        if (isFirstRender.current && initialServicesData) {
            isFirstRender.current = false;
            return;
        }
        
        isFirstRender.current = false;

        // Презареждаме данните при промяна на език или ако нямаме начални данни
        be.get(`${API_PATH.SERVICES}/${id}`)
            .then(response => response.data)
            .then(recievedData => {
                if (recievedData && recievedData.succeed) {
                    setServices(recievedData.data);
                } else {
                    setServices(null);
                    setFormError(recievedData?.message ?? 'Unknown error occurred');
                }
            })
            .catch(error => {
                setServices(null);
                setFormError(error.message);
                router.push(`/services#${id}`);
            });
    }, [language, id]);
    
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [modalIsActive, setModalIsActive] = useState(false);

    useEffect(() => {
        if (modalIsActive) {
            setFormSubmitted(false);
            setFormError(null);
        }
    }, [modalIsActive]);

    useEffect(() => {
        console.log('Serviices data:', services);
    }, [services]);

    return (
        <>
            {services ? 
                <div className="px-4">
                    <Modal active={modalIsActive} setActive={setModalIsActive}>
                        <AskOfferForm
                            serviceId={id}
                            translated={offerNoteTranslated}
                            setFormSubmitted={setFormSubmitted}
                            setFormErrored={setFormError}
                        />
                        <OfferConfirmation
                            translated={translatedOfferConfirmation}
                            formSubmitted={formSubmitted}
                            setFormSubmitted={setFormSubmitted}
                        />
                        <ErrorMessage formError={formError} />
                    </Modal>

                    <section className="flex flex-col md:grid xl:grid-cols-3 lg:grid-cols-2 gap-8 py-2">
                        {services.map((s, index) => (
                            <ServiceDetailsCard
                                key={index}
                                serviceId={id}
                                service={s}
                                servicesStaticData={translatedStaticData}
                            />
                        ))}
                    </section>

                    <section className="w-96 xl:w-128 mt-12 py-4 px-8 bg-slate-300 dark:bg-slate-800/80 dark:backdrop-blur-md text-center rounded-sm shadow-lg/20 z-50 mx-auto">
                        <p className="text-xs text-slate-700 dark:text-slate-300">{translatedStaticData.legend}</p>
                    </section>
                </div>
                : <ComponentLoader />
            }
        </>
    );
}
