'use client';

import { contactStaticData, offerConfirmationStaticData } from "@/app/_lib/static_data";
import { useState, useEffect, useRef } from "react";
import useLanguageContext from "@/app/_hooks/useLanguageContext";
import ComponentLoader from "./componentLoader";
import Modal from "./modal/modal";
import OfferConfirmation from "../servicesComponents/offerConfirmation";
import ErrorMessage from "./errorMessage";
import Translate from "@/app/_utils/Translator";
import be from "@/app/_utils/Api";
import { API_PATH } from "@/app/_lib/api_paths";

export default function ContactForm() {

    const { language } = useLanguageContext();
    const [contactData, setContactData] = useState(null);
    const [modalIsActive, setModalIsActive] = useState(false);
    const [translated, setTranslated] = useState(Translate({ data: offerConfirmationStaticData, language: language }));
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formError, setFormError] = useState(null);
    const formRef = useRef();

    const [formData, setFormData] = useState({
        gender: '',
        first_name: '',
        last_name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
        agree: false,
    });

    useEffect(() => {
        setTranslated(offerConfirmationStaticData[language]);
    }, [language]);

    useEffect(() => {
        if (formSubmitted) {
            setFormError(null);
            setModalIsActive(true);
        }
    }, [formSubmitted]);

    useEffect(() => {
        if (formError) {
            setFormSubmitted(false);
            setModalIsActive(true);
        }
    }, [formError]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Премахване на персонализирано съобщение за грешка при промяна
        e.target.setCustomValidity('');

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    }

    const handleInvalid = (e) => {
        const { name } = e.target;
        e.target.setCustomValidity(contactData?.errors?.[name] || '');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        be.post(API_PATH.INQUIRY, formData)
            .then(response => {
                if (response.data.succeed) {
                    setFormSubmitted(true);
                    setModalIsActive(true);
                    // Reset form
                    setFormData({
                        gender: '',
                        first_name: '',
                        last_name: '',
                        company: '',
                        email: '',
                        phone: '',
                        message: '',
                        agree: false,
                        language: language,
                    });
                    if (formRef.current) {
                        formRef.current.reset();
                    }
                } else {
                    setFormError(response.data.message || 'An error occurred while processing your request');
                    setModalIsActive(true);
                }
            })
            .catch(error => {
                setFormError(error.message);
                setModalIsActive(true);
            });
    }

    return (
        contactData ? (
            <>
                <Modal active={modalIsActive} setActive={setModalIsActive}>
                    <OfferConfirmation
                        translated={translated}
                        formSubmitted={formSubmitted}
                        closeWrapper={() => setModalIsActive(false)}
                    />
                    <ErrorMessage formError={formError} closeWrapper={() => setModalIsActive(false)} />
                </Modal>
        <section className="bg-slate-50 dark:bg-slate-700 px-6 py-12 sm:py-20 lg:px-8 max-w-xl rounded-b-lg">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight text-balance">{contactData.title}</h2>
                <p className="mt-2">{contactData.description}</p>
            </div>
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                method="POST"
                className="mx-auto mt-12 max-w-xl sm:mt-16"
            >
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="first-name" className="block text-sm/6 font-semibold ">
                            {contactData.firstName} *
                        </label>
                        <div className="mt-2.5">
                            <input
                                required
                                id="first-name"
                                name="first_name"
                                type="text"
                                autoComplete="given-name"
                                title={contactData?.hints?.first_name}
                                className="block w-full rounded-md bg-white dark:bg-slate-600 px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                onInvalid={handleInvalid}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name" className="block text-sm/6 font-semibold">
                            {contactData.lastName} 
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="last-name"
                                name="last_name"
                                type="text"
                                autoComplete="family-name"
                                title={contactData?.hints?.last_name}
                                className="block w-full rounded-md bg-white dark:bg-slate-600 px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                onInvalid={handleInvalid}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="company" className="block text-sm/6 font-semibold">
                            {contactData.company}
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="company"
                                name="company"
                                type="text"
                                autoComplete="organization"
                                title={contactData?.hints?.company}
                                className="block w-full rounded-md bg-white dark:bg-slate-600 px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                value={formData.company}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm/6 font-semibold">
                            {contactData.email} *
                        </label>
                        <div className="mt-2.5">
                            <input
                                required
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                title={contactData?.hints?.email}
                                className="block w-full rounded-md bg-white dark:bg-slate-600 px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                value={formData.email}
                                onChange={handleInputChange}
                                onInvalid={handleInvalid}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="phone" className="block text-sm/6 font-semibold">
                            {contactData.phone}
                        </label>
                        <div className="mt-2.5">
                            <div className="flex rounded-md bg-white dark:bg-slate-600 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                <input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    title={contactData?.hints?.phone}
                                    className="block min-w-0 grow py-2 pr-3 px-3.5 text-base placeholder:text-slate-400 focus:outline-none sm:text-sm/6"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    onInvalid={handleInvalid}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm/6 font-semibold">
                            {contactData.message} *
                        </label>
                        <div className="mt-2.5">
                            <textarea
                                required
                                id="message"
                                name="message"
                                rows={4}
                                title={contactData?.hints?.message}
                                className="block w-full rounded-md bg-white dark:bg-slate-600 px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                value={formData.message}
                                onChange={handleInputChange}
                                onInvalid={handleInvalid}
                            />
                        </div>
                    </div>
                    <div className="flex gap-x-4 sm:col-span-2">
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
                                    checked={formData.agree}
                                    onChange={handleInputChange}
                                    onInvalid={handleInvalid}
                                    title={contactData?.hints?.agree}
                                />
                            </div>
                        </div>
                        <label htmlFor="agree-to-policies" className="text-sm/6 ">
                            {contactData.privacyPolicy}
                            <a href="privacy" className="font-semibold text-indigo-600">
                                {contactData.privacyPolicyLink} *
                            </a>
                        </label>
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {contactData.sendButton}
                    </button>
                </div>
            </form>
        </section>
            </>
        ) : <ComponentLoader />
    );
}