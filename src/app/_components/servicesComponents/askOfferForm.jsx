"use client";

import { EnvelopeOpenIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import SubmitButton from "@/app/_components/buttonsComponents/submitButton";
import useLanguageContext from "@/app/_hooks/useLanguageContext";
import be from "@/app/_utils/Api";
import { API_PATH } from "@/app/_lib/api_paths";

export default function AskOfferForm({
    serviceId,
    translated,
    setFormSubmitted, // function to set form submission state in parent
    setFormErrored, // function to set form error state in parent
}) {

    const formRef = useRef();
    const [formData, setFormData] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const { language } = useLanguageContext();

    useEffect(() => {
        if (formData) {
            sendMessageToServer(formData);
        }
    }, [formData]);

    const sendMessageToServer = (data) => {
        be.post(API_PATH.CLIENT_REQUEST, data)
            .then(response => {
                if (response.data.succeed) {
                    setIsVisible(false);
                    if (setFormSubmitted) {
                        setFormSubmitted(true); // Notify parent about form submission
                    }
                    setFormData(null);
                } else {
                    // Server responded but with succeed: false
                    setIsVisible(false);
                    if (setFormSubmitted) {
                        setFormSubmitted(false);
                    }
                    if (setFormErrored) {
                        setFormErrored(response.data.message || 'An error occurred while processing your request');
                    }
                }
                console.log("Server response:", response.data);
            })
            .catch(error => {
                setIsVisible(false);
                if (setFormSubmitted) {
                    setFormSubmitted(false); // Notify parent about form submission
                }
                if (setFormErrored) {
                    setFormErrored(error.message); // Notify parent about form error
                }
            });
    };

    const [inputValues, setInputValues] = useState({
        id: serviceId,
        first_name: "",
        last_name: "",
        company: "",
        phone: "",
        email: "",
        message: "",
        language: language,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Премахване на персонализирано съобщение за грешка при промяна
        e.target.setCustomValidity('');

        setInputValues((oldState) => ({
            ...oldState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleInvalid = (e) => {
        const { name } = e.target;
        e.target.setCustomValidity(translated?.errors?.[name] || '');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (setFormData) {
            setFormData(inputValues);
        }
    };

    return (
        <div ref={formRef} className={`transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
            <div className="w-sm sm:w-96 lg:w-128 xl:w-160 p-4 text-slate-700 dark:text-slate-300">
                <div className="flex items-center mb-8 space-x-6 border-b border-slate-900 dark:border-slate-200 py-4">
                    <EnvelopeOpenIcon className="h-8 w-8" />

                    <h2 className="text-2xl font-bold uppercase text-center">{translated.title}</h2>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label htmlFor="first_name" className="block text-sm font-medium dark:text-slate-300">
                                {translated.firstName}
                                <span className="text-red-500 text-2xl"> *</span>
                            </label>
                            <input
                                required
                                type="text"
                                id="first_name"
                                name="first_name"
                                placeholder={translated.firstNamePlaceholder}
                                title={translated?.hints?.first_name}
                                onChange={handleInputChange}
                                onInvalid={handleInvalid}
                                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-100"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="last_name" className="block text-sm font-medium dark:text-slate-300">
                                {translated.lastName}
                                <span className="text-red-500 text-2xl"> *</span>
                            </label>
                            <input
                                required
                                type="text"
                                id="last_name"
                                name="last_name"
                                placeholder={translated.lastNamePlaceholder}
                                title={translated?.hints?.last_name}
                                onChange={handleInputChange}
                                onInvalid={handleInvalid}
                                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-100"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="company" className="block text-sm font-medium dark:text-slate-300">
                            {translated.companyLabel}
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            placeholder={translated.companyPlaceholder}
                            title={translated?.hints?.company}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-100"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            {translated.phoneLabel}
                            <span className="text-red-500 text-2xl"> *</span>
                        </label>
                        <input
                            required
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder={translated.phonePlaceholder}
                            title={translated?.hints?.phone}
                            onChange={handleInputChange}
                            onInvalid={handleInvalid}
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
                            title={translated?.hints?.email}
                            onChange={handleInputChange}
                            onInvalid={handleInvalid}
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
                            rows="2"
                            placeholder={translated.messagePlaceholder}
                            title={translated?.hints?.message}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-100"
                        ></textarea>
                    </div>

                    <div className="flex gap-x-4">
                        <div className="flex h-6 items-center">
                            <div className="group relative inline-flex w-8 shrink-0 rounded-full bg-gray-200 p-px inset-ring inset-ring-gray-900/5 outline-offset-2 outline-indigo-600 transition-colors duration-200 ease-in-out has-checked:bg-indigo-600 has-focus-visible:outline-2">
                                <span className="size-4 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5" />
                                <input
                                    required
                                    id="agree-to-policies"
                                    name="agree"
                                    type="checkbox"
                                    aria-label="Agree to policies"
                                    className="absolute inset-0 appearance-none focus:outline-hidden"
                                    onChange={handleInputChange}
                                    onInvalid={handleInvalid}
                                    title={translated?.hints?.agree}
                                />
                            </div>
                        </div>
                        <label htmlFor="agree-to-policies" className="text-sm/6">
                            {translated.privacyPolicy}{' '}
                            <a href="/privacy" className="font-semibold whitespace-nowrap text-indigo-600">
                                {translated.privacyPolicyLink}
                            </a>
                            <span className="text-red-500 text-2xl"> *</span>
                        </label>
                    </div>

                    <div className="pt-4 mt-8 border-t flex justify-end">
                        <SubmitButton type="submit">{language === "BG" ? "Изпрати" : "Send"}</SubmitButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
