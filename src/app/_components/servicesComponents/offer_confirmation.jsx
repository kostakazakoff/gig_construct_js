import { useEffect, useRef } from "react";
import SubmitButton from "../buttonsComponents/submit_button";

export default function OfferConfirmation({ service, formSubmitted, closeWrapper }) {

    const confirmRef = useRef();

    useEffect(() => {
        if (confirmRef.current) {
            if (formSubmitted) {
                confirmRef.current.style.opacity = 1;
            } else {
                confirmRef.current.style.opacity = 0;
            }
        }
    }, [formSubmitted]);

    const closeModal = () => {
        if (closeWrapper) {
            closeWrapper();
        }
    };

    return (
        <div ref={confirmRef} className="opacity-0 transition-opacity duration-300">
            <div className="flex flex-col items-center justify-center p-6 bg-green-100 border border-green-400 text-green-700 rounded">
                <h2 className="text-lg font-bold">Offer Confirmation</h2>
                <p>Your offer for the service <strong>{service.name}</strong> has been submitted successfully!</p>
            </div>
            <SubmitButton type="button" onClick={closeModal}>Close</SubmitButton>
        </div>
    );
}
