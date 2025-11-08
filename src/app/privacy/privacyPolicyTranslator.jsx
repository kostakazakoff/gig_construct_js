'use client';

import PrivacyPolicyEN from "@/app/_components/mainComponents/privacyPolicyEN.jsx";
import PrivacyPolicyBG from "@/app/_components/mainComponents/privacyPolicyBG.jsx";
import useLanguageContext from "../_hooks/useLanguageContext"
import { useEffect, useState } from "react";
import CompLoader from "../_components/mainComponents/compLoader";

export const PrivacyPolicyTranslator = () => {
    const { language } = useLanguageContext();
    const [privacyPolicy, setPrivacyPolicy] = useState(null);

    useEffect(() => {
        if (language === 'BG') {
            setPrivacyPolicy(<PrivacyPolicyBG language={language} />);
        } else {
            setPrivacyPolicy(<PrivacyPolicyEN language={language} />);
        }
    }, [language]);

    return (
        privacyPolicy ? (
        <div className="max-w-6xl my-12 p-24 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 indent-8 rounded-lg shadow-md mx-auto">
            {privacyPolicy}
        </div>
        ) : <CompLoader />
    );
}