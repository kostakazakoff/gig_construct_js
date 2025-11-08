'use client';

import PrivacyPolicyDisplay from "@/app/_components/mainComponents/PrivacyPolicyDisplay.jsx";
import useLanguageContext from "../_hooks/useLanguageContext"

export const PrivacyPolicyTranslator = () => {
    const { language } = useLanguageContext();

    return (
        <div className="max-w-6xl my-12 p-12 sm:p-24 bg-slate-100 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-200 indent-8 rounded-lg shadow-md mx-8">
            <PrivacyPolicyDisplay language={language} />
        </div>
    );
}