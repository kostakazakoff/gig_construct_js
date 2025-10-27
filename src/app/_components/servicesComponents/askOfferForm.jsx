"use client";

import { EnvelopeOpenIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import SubmitButton from "@/app/_components/buttonsComponents/submitButton";

export default function AskOfferForm({
    serviceId,
    translated,
    setFormSubmitted, // function to set form submission state in parent
    closeWrapper, // closing function passed from Modal wrapper
}) {

    const formRef = useRef();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (formData) {
            formRef.current.style.opacity = 0;
            formRef.current.style.display = 'none';
            // TODO: Logic to send the data to your server or API
        } else {
            formRef.current.style.opacity = 1;
        }
    }, [formData]);

    const [inputValues, setInputValues] = useState({
        id: serviceId,
        name: "",
        email: "",
        message: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues((oldState) => ({
            ...oldState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation
        if (setFormData) {
            setFormData(inputValues);
            if (setFormSubmitted) {
                setFormSubmitted(true); // Notify parent about form submission
            }
        }
    };

    return (
        <div ref={formRef} className="opacity-100 transition-opacity duration-300 ease-in-out display-block">
            <div className="w-sm sm:w-96 lg:w-128 xl:w-160 p-4 text-slate-700 dark:text-slate-300">
                <div className="flex items-center mb-8 space-x-6 border-b border-slate-900 dark:border-slate-200 py-4">
                    <EnvelopeOpenIcon className="h-8 w-8" />

                    <h2 className="text-2xl font-bold uppercase text-center">{translated.title}</h2>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium dark:text-slate-300">
                            {translated.nameLabel}
                            <span className="text-red-500 text-2xl">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder={translated.namePlaceholder}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-100"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            {translated.phoneLabel}
                            <span className="text-red-500 text-2xl">*</span>
                        </label>
                        <input
                            type="phone"
                            id="phone"
                            name="phone"
                            placeholder={translated.phonePlaceholder}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-100"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            {translated.emailLabel}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder={translated.emailPlaceholder}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-100"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            {translated.messageLabel}
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            placeholder={translated.messagePlaceholder}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-100"
                        ></textarea>
                    </div>

                    <div className="pt-4 mt-12 border-t flex justify-end">
                        <SubmitButton type="submit">Изпрати{/* TODO: /Send */}</SubmitButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
