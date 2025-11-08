'use client';

import { useState, useEffect } from 'react';
import CompLoader from '../_components/mainComponents/compLoader';
import useLanguageContext from '../_hooks/useLanguageContext';
import { contactStaticData } from '../_lib/static_data';
import { ChevronDownIcon } from '@heroicons/react/16/solid'

export default function ClientContact() {
    const { language } = useLanguageContext();
    const [contactData, setContactData] = useState(null);

    useEffect(() => {
        setContactData(contactStaticData[language]);
    }, [language]);

    return (
        contactData ? (
            <>
            <section className="w-full py-12 mb-6 px-12 isolate border border-slate-800 dark:border-slate-200 rounded-t-lg">
                    <h2 className="text-4xl font-bold">{contactData.companyName}</h2>
                    <p className="mt-2">{contactData.companyAddress}</p>
                    <p className="mt-2">{contactData.companyPhone}</p>
                    <p className="mt-2">{contactData.companyEmail}</p>
            </section>
            
            <section className="bg-slate-50 dark:bg-slate-700 px-6 py-24 sm:py-32 lg:px-8 max-w-xl rounded-b-lg">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{contactData.title}</h2>
                    <p className="mt-2 ">{contactData.description}</p>
                </div>
                <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="first-name" className="block text-sm/6 font-semibold ">
                                {contactData.firstName}
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="first-name"
                                    name="first-name"
                                    type="text"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
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
                                    name="last-name"
                                    type="text"
                                    autoComplete="family-name"
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="company" className="block text-sm/6 font-semibold">
                                {contactData.companyName}
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="company"
                                    name="company"
                                    type="text"
                                    autoComplete="organization"
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm/6 font-semibold">
                                {contactData.email}
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="phone-number" className="block text-sm/6 font-semibold">
                                {contactData.phone}
                            </label>
                            <div className="mt-2.5">
                                <div className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                    {/* <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country"
                                            aria-label="Country"
                                            className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pr-7 pl-3.5 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                                        id="phone-number"
                                        name="phone-number"
                                        type="text"
                                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block text-sm/6 font-semibold">
                                {contactData.message}
                            </label>
                            <div className="mt-2.5">
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                    defaultValue={''}
                                />
                            </div>
                        </div>
                        <div className="flex gap-x-4 sm:col-span-2">
                            <div className="flex h-6 items-center">
                                <div className="group relative inline-flex w-8 shrink-0 rounded-full bg-gray-200 p-px inset-ring inset-ring-gray-900/5 outline-offset-2 outline-indigo-600 transition-colors duration-200 ease-in-out has-checked:bg-indigo-600 has-focus-visible:outline-2">
                                    <span className="size-4 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5" />
                                    <input
                                        id="agree-to-policies"
                                        name="agree-to-policies"
                                        type="checkbox"
                                        aria-label="Agree to policies"
                                        className="absolute inset-0 appearance-none focus:outline-hidden"
                                    />
                                </div>
                            </div>
                            <label htmlFor="agree-to-policies" className="text-sm/6 ">
                                {contactData.privacyPolicy}{' '}
                                <a href="#" className="font-semibold whitespace-nowrap text-indigo-600">
                                    {contactData.privacyPolicyLink}
                                </a>
                                .
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

        ) : (
            <CompLoader />
        )
    )
};