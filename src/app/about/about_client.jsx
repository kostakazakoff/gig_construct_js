"use client";

import { useState, useEffect } from "react"
import { aboutStaticData } from "../_lib/static_data.js"
import useLanguageContext from "../_hooks/useLanguageContext.jsx"
import { partners } from "../_mock_data/partners.js";
import PartnerBadge from "@/app/_components/partnerBadge.jsx";
import Translate from "../_utils/Translator.js";

export default function AboutComponent() {
    const { language } = useLanguageContext();
    const defaultLanguage = 'BG';
    const [aboutText, setAboutText] = useState(Translate({ data: aboutStaticData, language: defaultLanguage }));

    useEffect(() => {
        setAboutText(Translate({ data: aboutStaticData, language: language }));
    }, [language]);

    return (
        <section className="flex flex-col items-center justify-start align-strech px-4 w-full">
            <h2 className="text-3xl font-bold uppercase">{aboutText.title}</h2>
            <div className="mt-4 max-w-3xl text-center">
                {aboutText.aboutText.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="mt-2 lg:text-lg max-w-3xl text-center">
                        {paragraph}
                    </p>
                ))}
            </div>

            <div className="w-full bg-slate-300 dark:bg-slate-800 mt-12 border-t-1 pb-4">
                <div className="flex flex-col items-center justify-start py-12 px-4 max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold uppercase mb-12">{aboutText.partnersTitle}</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {partners.map((partner) => (
                            <PartnerBadge key={partner.id} {...partner} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}