import { useEffect, useRef } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import SubmitButton from "../buttonsComponents/submitButton";
import useLanguageContext from "@/app/_hooks/useLanguageContext";

export default function OfferConfirmation({ translated, formSubmitted, closeWrapper }) {

    const confirmRef = useRef();
    const { language } = useLanguageContext();

    const closeModal = () => {
        if (closeWrapper) {
            closeWrapper();
        }
    };

    return (
        <div ref={confirmRef} className={`transition-opacity duration-300 ease-in-out ${formSubmitted ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
            <div className="w-sm sm:w-96 lg:w-128 xl:w-160 p-4 text-slate-700 dark:text-slate-300">
                <div className="flex items-center justify-center mb-4 space-x-2 lg:space-x-6 border-b border-slate-900 dark:border-slate-200 py-4">
                    <CheckCircleIcon className="h-8 w-8 text-green-500" />
                    <h2 className="text-lg font-bold uppercase text-center">{translated?.thankYou}</h2>
                </div>

                <div className="space-y-6">
                    <div className="flex flex-col items-center text-center gap-8 py-6">
                        <div className="text-md mb-4">
                            <p>{translated?.orderRecieved}</p>
                            <p>{translated?.weWillContactYou}</p>
                        </div>
                        <div className="text-md">
                            <p className="font-bold text-red-800 dark:text-red-500">{translated?.important}</p>
                            <p>{translated?.importantNote}</p>
                        </div>
                    </div>

                    {/* Close бутон */}
                    <div className="pt-4 border-t flex justify-end">
                        <SubmitButton type="button" onClick={closeModal}>
                            {language === "BG" ? "Затвори" : "Close"}
                        </SubmitButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
