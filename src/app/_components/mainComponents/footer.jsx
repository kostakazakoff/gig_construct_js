"use client";

import { useState, useEffect } from "react";
import { footerStaticData } from "@/app/_lib/static_data";
import Translate from "@/app/_utils/Translator";
import useLanguageContext from "@/app/_hooks/useLanguageContext.jsx";
import { FacebookIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Footer() {
    const { language } = useLanguageContext();
    const [translatedStaticData, setTranslatedStaticData] = useState(footerStaticData.BG);

    useEffect(() => {
        const translated = Translate({ data: footerStaticData, language });
        setTranslatedStaticData(translated);
    }, [language]);

    return (
        <footer className="bg-gray-200/80 dark:bg-slate-900/90 backdrop-blur-md text-slate-700 dark:text-white py-4 mt-8 fixed bottom-0 w-full text-sm z-10">
            <div className="container mx-auto text-center flex justify-center items-center gap-2 flex-wrap sm:divide-x-3 divide-2xl divide-slate-500">
                <div className="pr-2">
                    &copy; {new Date().getFullYear()} GIG Construct. {translatedStaticData.rightsReserved}
                </div>
                <div>
                    <a href="https://facebook.com" className="flex content-center items-center gap-2">
                        <Image
                            src="/facebookIcon.svg"
                            alt="Facebook"
                            width={20}
                            height={20}
                            className="inline-block bg-slate-200 rounded-full"
                            target="_blank"
                        />
                        <p className="text-sm">{translatedStaticData.followUs}</p>
                    </a>
                </div>
            </div>
        </footer>
    );
}
