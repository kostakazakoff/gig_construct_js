'use client';

import React, { useContext, createContext } from "react"
import usePersistedState from "./usePersistedState.js";

const ThemeContext = createContext({
    theme: 'light',
    setTheme: (theme) => { },
})

export function ThemeProvider({ children }) {
    const [theme, setTheme] = usePersistedState(
        'theme',
        'light', {
        useCookies: true,
        cookieExpireDays: 365
    })
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

const useTheme = () => useContext(ThemeContext);

export default useTheme;