import { useEffect, useRef } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import SubmitButton from "../buttonsComponents/submit_button";

export default function OfferConfirmation({ service, formSubmitted, closeWrapper }) {

    const confirmRef = useRef();

    useEffect(() => {
        if (confirmRef.current) {
            if (formSubmitted) {
                confirmRef.current.style.opacity = 1;
                confirmRef.current.style.display = 'block';
            } else {
                confirmRef.current.style.opacity = 0;
                confirmRef.current.style.display = 'none';
            }
        }
    }, [formSubmitted]);

    const closeModal = () => {
        if (closeWrapper) {
            closeWrapper();
        }
    };

    return (
        <div ref={confirmRef} className="opacity-0 transition-opacity duration-300 ease-in-out display-none">
            <div className="w-sm sm:w-96 lg:w-128 xl:w-160 p-4 text-slate-700 dark:text-slate-300">
                <div className="flex items-center mb-4 space-x-6 border-b border-slate-900 dark:border-slate-200 py-4">
                    <CheckCircleIcon className="h-8 w-8 text-green-500" />
                    <h2 className="text-2xl font-bold uppercase text-center">Потвърждение</h2>
                </div>

                <div className="space-y-4">
                    <div className="text-center py-6">
                        <p className="text-lg mb-4">
                            Вашата заявка за услугата <strong className="text-indigo-600 dark:text-indigo-400">{service?.name}</strong> беше изпратена успешно!
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Ще се свържем с вас в най-скоро време.
                        </p>
                    </div>

                    {/* Close бутон */}
                    <div className="pt-4 border-t pt-2 flex justify-end">
                        <SubmitButton type="button" onClick={closeModal}>
                            Затвори
                        </SubmitButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
