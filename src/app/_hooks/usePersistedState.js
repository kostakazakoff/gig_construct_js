import { useState, useEffect } from "react";

// Cookie utility functions
const setCookie = (name, value, days = 365) => {
    if (typeof window === "undefined") return;

    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

const getCookie = (name) => {
    if (typeof window === "undefined") return null;

    const nameEQ = name + "=";
    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {
        let c = cookie.trim();
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
};

const deleteCookie = (name) => {
    if (typeof window === "undefined") return;

    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
};

export default function usePersistedState(key, defaultState, options = {}) {
    // Options: useCookies, cookieExpireDays
    const { useCookies = false, cookieExpireDays = 365 } = options;

    const [state, setState] = useState(defaultState);

    useEffect(() => {
        let persistedState = null;

        if (useCookies) {
            // Използваме cookies
            const cookieValue = getCookie(key);
            if (cookieValue) {
                try {
                    persistedState = JSON.parse(decodeURIComponent(cookieValue));
                } catch (error) {
                    console.warn("Failed to parse cookie value:", error);
                }
            }
        } else {
            // Използваме localStorage (default поведение)
            const localStorageValue = localStorage.getItem(key);
            if (localStorageValue) {
                try {
                    persistedState = JSON.parse(localStorageValue);
                } catch (error) {
                    console.warn("Failed to parse localStorage value:", error);
                }
            }
        }

        if (persistedState !== null) {
            setState(persistedState);
        }
    }, [key, useCookies]);

    const setPersistedState = (value) => {
        const newValue = typeof value === "function" ? value(state) : value;
        setState(newValue);

        if (typeof window !== "undefined") {
            try {
                const serializedValue = JSON.stringify(newValue);

                if (useCookies) {
                    // Запазваме в cookies
                    setCookie(key, encodeURIComponent(serializedValue), cookieExpireDays);
                } else {
                    // Запазваме в localStorage (default поведение)
                    localStorage.setItem(key, serializedValue);
                }
            } catch (error) {
                console.error("Failed to serialize state:", error);
            }
        }
    };

    // Utility функция за изтриване на запазените данни
    const clearPersistedState = () => {
        setState(defaultState);

        if (typeof window !== "undefined") {
            if (useCookies) {
                deleteCookie(key);
            } else {
                localStorage.removeItem(key);
            }
        }
    };

    return [state, setPersistedState, clearPersistedState];
}
