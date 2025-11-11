'use client';

import { useState, useEffect } from 'react';
import CompLoader from '../_components/mainComponents/compLoader';
import useLanguageContext from '../_hooks/useLanguageContext';
import { contactStaticData } from '../_lib/static_data';
import ContactForm from '../_components/mainComponents/contactForm';

export default function ClientContact() {

    const { language } = useLanguageContext();
    const [contactData, setContactData] = useState(null);

    useEffect(() => {
        setContactData(contactStaticData[language]);
    }, [language]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
        // Handle form submission logic here
    }

    return (
        contactData ? (
            <>
                <section className="w-full py-12 mb-6 px-12 isolate border border-slate-800 dark:border-slate-200 rounded-t-lg">
                    <h2 className="text-xl lg:text-2xl font-bold mb-6">{contactData.companyName}</h2>
                    <p className="mt-2">{contactData.companyAddress}</p>
                    <p className="mt-2">{contactData.companyPhone}</p>
                    <p className="mt-2">{contactData.companyEmail}</p>
                </section>

                <ContactForm
                    contactData={contactData}
                    handleSubmit={handleSubmit}
                />
            </>

        ) : (
            <CompLoader />
        )
    )
};