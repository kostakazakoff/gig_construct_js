import axios from "axios";
import { API_PATH } from "@/app/_lib/api_paths.js";

// Global variable to store language - will be updated by components
let currentLanguage = 'bg';

export const setCurrentLanguage = (language) => {
    currentLanguage = language;
};

const be = axios.create({
    baseURL: `http://${API_PATH.ORIGIN}/`,
    withXSRFToken: true,
    headers: {
        'Accept': "application/json",
        "Content-Type": "application/json",
    },
});

// Add interceptor to inject locale header on every request
be.interceptors.request.use((config) => {
    const locale = currentLanguage === 'bg' ? 'bg' : 'en';

    // Ensure headers object exists and set X-Locale per request
    config.headers = {
        ...(config.headers || {}),
        'X-Locale': locale,
    };

    return config;
});

export default be;
