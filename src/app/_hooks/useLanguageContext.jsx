'use client';

import React, { useContext, createContext, useEffect } from "react"
import usePersistedState from "./usePersistedState.js";
import { setCurrentLanguage } from "@/app/_utils/Api.js";

const LanguageContext = createContext({
    language: 'bg',
    setLanguage: () => { },
});

export function LanguageProvider({ children }) {
    const [language, setLanguage] = usePersistedState(
        'language',
        'bg', {
        useCookies: true,
        cookieExpireDays: 365
    });

    // Update Api.js with current language
    useEffect(() => {
        setCurrentLanguage(language);
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

const useLanguageContext = () => useContext(LanguageContext);

export default useLanguageContext;