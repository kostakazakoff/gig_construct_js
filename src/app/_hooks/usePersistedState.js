import { useState, useEffect } from "react";

export default function usePersistedState(key, defaultState) {
    const [state, setState] = useState(defaultState);

    useEffect(() => {
        const persistedState = localStorage.getItem(key);
        if (persistedState) {
            setState(JSON.parse(persistedState));
        }
    }, [key]);

    const setPersistedState = (value) => {
        setState(value);
        
        if (typeof window !== 'undefined') {
            const serializedValue = JSON.stringify(
                typeof value === "function"
                    ? (value)(state)
                    : value
            );

            localStorage.setItem(key, serializedValue);
        }
    }

    return [state, setPersistedState];
}