'use client';

import ServiceCard from "@/app/_components/servicesComponents/serviceCard.jsx";
import useLanguageContext from '@/app/_hooks/useLanguageContext.jsx'
import { use, useEffect, useState } from "react";
import Translate from "@/app/_utils/Translator.js";
import { API_PATH } from "../_lib/api_paths";
import ComponentLoader from "../_components/mainComponents/componentLoader";
import be from "../_utils/Api";
import { usePathname } from "next/navigation";
import Modal from "../_components/mainComponents/modal/modal";
import ErrorMessage from "../_components/mainComponents/errorMessage";
import { useErrorModal } from "../_utils/ActivateErrorModal";

export default function TranslatedServices() {

    const pathname = usePathname();
    const { language } = useLanguageContext();
    const [translation, setTranslation] = useState(null);
    const { modalIsActive, setModalIsActive, formError, activateErrorModal } = useErrorModal();

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            setTimeout(() => {
                const el = document.getElementById(hash.substring(1));
                if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 500);
        }
    }, [pathname]);

    useEffect(() => {
        be.get(`${API_PATH.CATEGORIES}`)
            .then(response => response.data)
            .then(receivedData => {
                if (receivedData && receivedData.succeed) {
                    setTranslation(receivedData.data);
                } else {
                    activateErrorModal(receivedData?.message || 'An error occurred while loading services');
                    setTranslation(null);
                }
            })
            .catch(response => {
                activateErrorModal(response.response.data.message || 'Failed to fetch service categories');
                setTranslation(null);
            });
    }, [language]);

    if (!translation || translation.length === 0) {
        return (
            <>
                <ComponentLoader />
                <Modal active={modalIsActive} setActive={setModalIsActive}>
                    <ErrorMessage formError={formError} closeWrapper={() => setModalIsActive(false)} />
                </Modal>
            </>
        );
    }

    return (
        <>
            <div className="flex flex-col xl:grid-cols-3 lg:grid-cols-2 gap-8">
                <section role="list" className="flex flex-col md:grid xl:grid-cols-3 lg:grid-cols-2 gap-8">
                    {translation.map((category) => (
                        <ServiceCard key={category.id} service={category} language={language} />
                    ))}
                </section>
            </div>
            <Modal active={modalIsActive} setActive={setModalIsActive}>
                <ErrorMessage formError={formError} closeWrapper={() => setModalIsActive(false)} />
            </Modal>
        </>
    );
}