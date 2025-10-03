"use client";

import { useState, useEffect } from "react"
import { aboutStaticData } from "../_lib/static_data.js"
import useLanguageContext from "../_hooks/useLanguageContext.jsx"
import { partners } from "../_mock_data/partners.js";
import PartnerBadge from "@/components/partner_badge.jsx";

export default function AboutComponent() {
    const { language } = useLanguageContext()
    const [about, setAbout] = useState(aboutStaticData.BG)

    useEffect(() => {
        if (language === "BG") {
            setAbout(aboutStaticData.BG)
        } else {
            setAbout(aboutStaticData.EN)
        }
    }, [language])

    return (
        <section className="flex flex-col items-center justify-start align-strech mt-8 px-4 w-full">
            <h2 className="text-3xl font-semibold uppercase">{about.title}</h2>
            <div className="mt-4 max-w-3xl text-center">
                {about.aboutText.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="mt-2 lg:text-lg max-w-3xl text-center">
                        {paragraph}
                    </p>
                ))}
            </div>

            <div className="w-full bg-slate-300 dark:bg-slate-800 mt-12 border-t-1 pb-8">
                <div className="flex flex-col items-center justify-start py-12 px-4 max-w-5xl mx-auto">
                    <h2 className="text-2xl font-semibold uppercase mb-12">{about.partnersTitle}</h2>
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