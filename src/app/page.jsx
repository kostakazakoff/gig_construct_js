"use client";
import useLanguageContext from "@/app/_hooks/useLanguageContext";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import be from "@/app/_utils/Api";
import { API_PATH } from "@/app/_lib/api_paths";
import ComponentLoader from "@/app/_components/mainComponents/componentLoader";

export default function Home() {
    const { language } = useLanguageContext();
    const [services, setServices] = useState([]);
    const [servicesLoading, setServicesLoading] = useState(true);

    const content = {
        bg: {
            heroTitle: "Строителни Решения",
            heroSubtitle: "Превръщаме визиите в реалност",
            heroDescription: "Професионални строителни и ремонтни услуги с внимание към детайла и ангажираност към качеството",
            ctaServices: "Нашите услуги",
            ctaContact: "Свържете се с нас",
            whyChooseUs: "Защо да изберете нас?",
            experienceTitle: "Опит и Експертиза",
            experienceDesc: "Екип от опитни специалисти с години практика",
            qualityTitle: "Високо Качество",
            qualityDesc: "Използваме най-добрите материали и технологии",
            trustTitle: "Доверие и Надеждност",
            trustDesc: "Прозрачност и коректност във всеки проект",
            servicesTitle: "Нашите услуги",
            servicesSubtitle: "Професионални строителни решения за всеки проект",
            viewAllServices: "Виж всички услуги",
            projectsTitle: "Реализирани проекти",
            projectsSubtitle: "Вижте някои от нашите успешно завършени проекти",
            viewAllProjects: "Виж всички проекти",
            contactTitle: "Имате проект?",
            contactSubtitle: "Свържете се с нас за безплатна консултация и оферта",
            contactButton: "Свържи се сега",
        },
        en: {
            heroTitle: "Construction Solutions",
            heroSubtitle: "Turning Visions Into Reality",
            heroDescription: "Professional construction and renovation services with attention to detail and commitment to quality",
            ctaServices: "Our Services",
            ctaContact: "Contact Us",
            whyChooseUs: "Why Choose Us?",
            experienceTitle: "Experience & Expertise",
            experienceDesc: "Team of experienced professionals with years of practice",
            qualityTitle: "High Quality",
            qualityDesc: "We use the best materials and technologies",
            trustTitle: "Trust & Reliability",
            trustDesc: "Transparency and fairness in every project",
            servicesTitle: "Our Services",
            servicesSubtitle: "Professional construction solutions for every project",
            viewAllServices: "View all services",
            projectsTitle: "Completed Projects",
            projectsSubtitle: "See some of our successfully completed projects",
            viewAllProjects: "View all projects",
            contactTitle: "Have a Project?",
            contactSubtitle: "Contact us for a free consultation and quote",
            contactButton: "Contact Now",
        },
    };

    const t = content[language] || content.bg;

    // Fetch services from backend
    useEffect(() => {
        setServicesLoading(true);
        be.get(`${API_PATH.CATEGORIES}`)
            .then(response => response.data)
            .then(receivedData => {
                if (receivedData && receivedData.succeed && receivedData.data) {
                    // Take first 3 services
                    setServices(receivedData.data.slice(0, 3));
                } else {
                    setServices([]);
                }
                setServicesLoading(false);
            })
            .catch(error => {
                console.error("Error fetching services:", error);
                setServices([]);
                setServicesLoading(false);
            });
    }, [language]);

    return (
        <div className="min-h-screen w-full bg-white dark:bg-slate-900">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hiddentext-slate-900 dark:text-white -mt-16">
                {/* Background image */}
                <div className="absolute inset-0">
                    <Image
                        src="/renovation.jpg"
                        alt={language === "bg" ? "Реновация" : "Renovation"}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-slate-300/80 dark:bg-slate-900/80" />
                </div>

                <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-10"></div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-ping-once text-gig-blue dark:text-slate-200">
                        {t.heroTitle}
                    </h1>
                    <p className="text-2xl md:text-3xl mb-4 font-medium animate-slide-in-left duration-700">
                        {t.heroSubtitle}
                    </p>
                    <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto animate-slide-in-right duration-700">
                        {t.heroDescription}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/services"
                            className="px-8 py-4 bg-transparent text-slate-900 dark:text-slate-100 font-bold rounded-lg border-2 border-slate-900 dark:border-slate-100 hover:bg-slate-200 dark:hover:bg-gig-blue transition duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            {t.ctaServices}
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-transparent text-slate-900 dark:text-slate-100 font-bold rounded-lg border-2 border-slate-900 dark:border-slate-100 hover:bg-slate-200 dark:hover:bg-gig-blue transition duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            {t.ctaContact}
                        </Link>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg className="w-6 h-6 text-slate-800 dark:text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-800 dark:text-slate-200">
                        {t.whyChooseUs}
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 hover:scale-105">
                            <div className="text-gig-blue dark:text-blue-400 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-center mb-4 text-slate-800 dark:text-slate-200">
                                {t.experienceTitle}
                            </h3>
                            <p className="text-center text-slate-600 dark:text-slate-400">
                                {t.experienceDesc}
                            </p>
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 hover:scale-105">
                            <div className="text-gig-blue dark:text-blue-400 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-center mb-4 text-slate-800 dark:text-slate-200">
                                {t.qualityTitle}
                            </h3>
                            <p className="text-center text-slate-600 dark:text-slate-400">
                                {t.qualityDesc}
                            </p>
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 hover:scale-105">
                            <div className="text-gig-blue dark:text-blue-400 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-center mb-4 text-slate-800 dark:text-slate-200">
                                {t.trustTitle}
                            </h3>
                            <p className="text-center text-slate-600 dark:text-slate-400">
                                {t.trustDesc}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Preview Section */}
            <section className="py-20 px-4 bg-slate-200 dark:bg-slate-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-800 dark:text-slate-200">
                            {t.servicesTitle}
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            {t.servicesSubtitle}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {servicesLoading ? (
                            <div className="col-span-3 flex justify-center">
                                <ComponentLoader />
                            </div>
                        ) : services.length > 0 ? (
                            services.map((service) => (
                                <Link
                                    key={service.id}
                                    href={`/services/${service.id}`}
                                    className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition duration-300 h-64"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-gig-blue/80 to-blue-900/80 group-hover:from-gig-blue/90 group-hover:to-blue-900/90 transition duration-300"></div>
                                    <div className="relative h-full flex flex-col items-center justify-center p-6 text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25л3.276-3.276c.256.565.398 1.192.398 1.852Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008Z" />
                                        </svg>

                                        <h3 className="text-2xl font-bold text-center">
                                            {service.name}
                                        </h3>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-3 text-center text-slate-600 dark:text-slate-400">
                                {language === "bg" ? "Услугите не са намерени" : "No services found"}
                            </div>
                        )}
                    </div>

                    <div className="text-center">
                        <Link
                            href="/services"
                            className="inline-block px-8 py-4 bg-gig-blue text-white font-bold rounded-lg hover:bg-blue-900 transition duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            {t.viewAllServices}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Projects Preview Section */}
            <section className="py-20 px-4 bg-white dark:bg-slate-800">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-800 dark:text-slate-200">
                            {t.projectsTitle}
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            {t.projectsSubtitle}
                        </p>
                    </div>

                    <div className="text-center">
                        <Link
                            href="/projects"
                            className="inline-block px-8 py-4 bg-gig-blue text-white font-bold rounded-lg hover:bg-blue-900 transition duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            {t.viewAllProjects}
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-gig-blue to-blue-900 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        {t.contactTitle}
                    </h2>
                    <p className="text-xl mb-8 text-slate-200">
                        {t.contactSubtitle}
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block px-10 py-5 bg-white text-gig-blue font-bold text-lg rounded-lg hover:bg-slate-100 transition duration-300 shadow-xl hover:shadow-2xl hover:scale-110"
                    >
                        {t.contactButton}
                    </Link>
                </div>
            </section>
        </div>
    );
}