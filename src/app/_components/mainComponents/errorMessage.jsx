import useLanguageContext from "@/app/_hooks/useLanguageContext";
import { useEffect } from "react";

export default function ErrorMessage({ formError, closeWrapper }) {

    const { language } = useLanguageContext();

    useEffect(() => {
        if (formError) {
            console.log("Displaying error message:", formError);
        }
    }, [formError]);

    return (
        <div
        className={`transition-opacity duration-300 ease-in-out bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ${formError ? 'opacity-100 block' : 'opacity-0 hidden'}`} role="alert"
        onClick={closeWrapper}
        >
            <strong className="font-bold">Error: </strong>{formError}
        </div>
    );
}