'use client';

import { contactStaticData } from "@/app/_lib/static_data";
import { useState, useEffect } from "react";
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import useLanguageContext from "@/app/_hooks/useLanguageContext";
import CompLoader from "./compLoader";

export default function ContactForm({ handleSubmit }) {

    const { language } = useLanguageContext();
    const [contactData, setContactData] = useState(null);

    useEffect(() => {
        setContactData(contactStaticData[language]);
    }, [language]);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Премахване на персонализирано съобщение за грешка при промяна
        e.target.setCustomValidity('');

        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleInvalid = (e) => {
        const { name } = e.target;
        e.target.setCustomValidity(contactData?.errors?.[name] || '');
    }
    return (
        contactData ? (
        <section className="bg-slate-50 dark:bg-slate-700 px-6 py-12 sm:py-20 lg:px-8 max-w-xl rounded-b-lg">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight text-balance">{contactData.title}</h2>
                <p className="mt-2">{contactData.description}</p>
            </div>
            <form
                // action="#"
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
                                onChange={handleInputChange}
                                onInvalid={handleInvalid}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name" className="block text-sm/6 font-semibold">
                            {contactData.lastName} *
                        </label>
                        <div className="mt-2.5">
                            <input
                                required
                                id="last-name"
                                name="last_name"
                                type="text"
                                autoComplete="family-name"
                                title={contactData?.hints?.last_name}
                                className="block w-full rounded-md bg-white dark:bg-slate-600 px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
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
                                onChange={handleInputChange}
                                onInvalid={handleInvalid}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="phone-number" className="block text-sm/6 font-semibold">
                            {contactData.phone} *
                        </label>
                        <div className="mt-2.5">
                            <div className="flex rounded-md bg-white dark:bg-slate-600 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                {/* <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country"
                                            aria-label="Country"
                                            className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pr-7 pl-3.5 text-base text-gray-500 placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        >
                                            <option>US</option>
                                            <option>CA</option>
                                            <option>EU</option>
                                        </select>
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                        />
                                    </div> */}
                                <input
                                    required
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    title={contactData?.hints?.phone}
                                    className="block min-w-0 grow py-2 pr-3 px-3.5 text-base placeholder:text-slate-400 focus:outline-none sm:text-sm/6"
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
                                defaultValue={''}
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
                                    onInvalid={handleInvalid}
                                    title={contactData?.hints?.agree}
                                />
                            </div>
                        </div>
                        <label htmlFor="agree-to-policies" className="text-sm/6 ">
                            {contactData.privacyPolicy}
                            <a href="privacy" className="font-semibold whitespace-nowrap text-indigo-600">
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
        ) : <CompLoader />
    );
}