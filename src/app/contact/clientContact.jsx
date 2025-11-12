'use client';

import { useState, useEffect } from 'react';
import CompLoader from '../_components/mainComponents/compLoader';
import useLanguageContext from '../_hooks/useLanguageContext';
import { contactStaticData } from '../_lib/static_data';
import ContactForm from '../_components/mainComponents/contactForm';
import VizitCard from '../_components/mainComponents/contact/vizitCard';

export default function ClientContact() {

    const { language } = useLanguageContext();
    const [contactData, setContactData] = useState(null);

    useEffect(() => {
        setContactData(contactStaticData[language]);
    }, [language]);

    return (
        contactData ? (
            <>
                <VizitCard contactData={contactData} />
                <ContactForm />
            </>
        ) : (
            <CompLoader />
        )
    )
};