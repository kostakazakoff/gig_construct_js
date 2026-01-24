"use client";

import { useState, useEffect } from "react"
import { aboutStaticData } from "../_lib/static_data.js"
import useLanguageContext from "../_hooks/useLanguageContext.jsx"
import { partners } from "../_mock_data/partners.js";
import PartnerBadge from "@/app/_components/partnerBadge.jsx";
import Translate from "../_utils/Translator.js";
import be from "../_utils/Api.js";
import { API_PATH } from "../_lib/api_paths.js";

export default function AboutComponent() {
    const { language } = useLanguageContext();
    const defaultLanguage = 'bg';
    const [aboutText, setAboutText] = useState(Translate({ data: aboutStaticData, language: defaultLanguage }));
    const [clients, setClients] = useState([]);

    useEffect(() => {
        setAboutText(Translate({ data: aboutStaticData, language: language }));
    }, [language]);

    useEffect(() => {
        be.get(API_PATH.PARTNERS)
            .then(response => response.data)
            .then(data => {
                if (data.succeed) {
                    setClients(data.data);
                }
            })
            .catch(error => {
                console.error("Error fetching clients data:", error);
            });
    }, []);

    return (
        <section className="flex flex-col items-center justify-start align-strech px-8 pt-24 w-full">
            <h2 className="text-3xl font-bold uppercase">{aboutText.title}</h2>
            <div className="mt-4 max-w-3xl text-center">
                {aboutText.aboutText.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="mt-2 lg:text-lg max-w-3xl text-center">
                        {paragraph}
                    </p>
                ))}
            </div>

            <div className="w-screen bg-slate-300 dark:bg-slate-800 mt-12 border-t-1 pb-4">
                <div className="flex flex-col items-center justify-start py-12 px-4 max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold uppercase mb-12 text-center">{aboutText.partnersTitle}</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {clients && clients.map((client) => (
                            <PartnerBadge key={client.id} {...client} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}