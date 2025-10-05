'use client';

import React, { useContext, createContext } from "react"
import usePersistedState from "./usePersistedState.js";

const TranslatedPathContext = createContext({
    translatedPath: [],
    setTranslatedPath: (path) => { },
})

export function TranslatedPathProvider({ children }) {
    const [translatedPath, setTranslatedPath] = usePersistedState('translatedPath', [])
    return (
        <TranslatedPathContext.Provider value={{ translatedPath, setTranslatedPath }}>
            {children}
        </TranslatedPathContext.Provider>
    )
}

const useTranslatedPath = () => useContext(TranslatedPathContext);

export default useTranslatedPath;