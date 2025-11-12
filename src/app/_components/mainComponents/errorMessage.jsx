import useLanguageContext from "@/app/_hooks/useLanguageContext";
import { useEffect, useRef } from "react";

export default function ErrorMessage({ formError }) {

    const confirmRef = useRef();
    const { language } = useLanguageContext();

    useEffect(() => {
        if (confirmRef.current) {
            if (formError) {
                console.log("Displaying error message:", formError);
                confirmRef.current.style.opacity = 1;
                confirmRef.current.style.display = 'block';
            } else {
                confirmRef.current.style.opacity = 0;
                confirmRef.current.style.display = 'none';
            }
        }
    }, [formError]);

    return (
        <div ref={confirmRef} className="opacity-0 transition-opacity duration-300 ease-in-out bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>{formError}
        </div>
    );
}