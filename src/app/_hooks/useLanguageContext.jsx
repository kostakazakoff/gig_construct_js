'use client';

import React, { useContext, createContext } from "react"
import usePersistedState from "./usePersistedState.js";

const LanguageContext = createContext({
    language: 'BG',
    setLanguage: () => { },
});

export function LanguageProvider({ children }) {
    const [language, setLanguage] = usePersistedState(
        'language',
        'BG', {
        useCookies: true,
        cookieExpireDays: 365
    });
    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

const useLanguageContext = () => useContext(LanguageContext);

export default useLanguageContext;