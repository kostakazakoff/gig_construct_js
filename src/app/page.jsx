"use client";
import useLanguageContext from "@/app/_hooks/useLanguageContext";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
    const { language } = useLanguageContext();

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

    return (
        <div className="min-h-screen w-full bg-white dark:bg-slate-900">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gig-blue/90 via-gig-blue/80 to-blue-900/10">
                <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-10"></div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
                        {t.heroTitle}
                    </h1>
                    <p className="text-2xl md:text-3xl text-slate-200 mb-4 font-medium">
                        {t.heroSubtitle}
                    </p>
                    <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
                        {t.heroDescription}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/services"
                            className="px-8 py-4 bg-white text-gig-blue font-bold rounded-lg hover:bg-slate-100 transition duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            {t.ctaServices}
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-transparent text-white font-bold rounded-lg border-2 border-white hover:bg-white hover:text-gig-blue transition duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            {t.ctaContact}
                        </Link>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <section className="py-20 px-4 bg-white dark:bg-slate-800">
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
                        {/* Service highlights - можете да добавите конкретни услуги тук */}
                        <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition duration-300 h-64">
                            <div className="absolute inset-0 bg-gradient-to-br from-gig-blue/80 to-blue-900/80 group-hover:from-gig-blue/90 group-hover:to-blue-900/90 transition duration-300"></div>
                            <div className="relative h-full flex flex-col items-center justify-center p-6 text-white">
                                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                </svg>
                                <h3 className="text-2xl font-bold text-center">
                                    {language === "bg" ? "Боядисване" : "Painting"}
                                </h3>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition duration-300 h-64">
                            <div className="absolute inset-0 bg-gradient-to-br from-gig-blue/80 to-blue-900/80 group-hover:from-gig-blue/90 group-hover:to-blue-900/90 transition duration-300"></div>
                            <div className="relative h-full flex flex-col items-center justify-center p-6 text-white">
                                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <h3 className="text-2xl font-bold text-center">
                                    {language === "bg" ? "Електро услуги" : "Electrical Services"}
                                </h3>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition duration-300 h-64">
                            <div className="absolute inset-0 bg-gradient-to-br from-gig-blue/80 to-blue-900/80 group-hover:from-gig-blue/90 group-hover:to-blue-900/90 transition duration-300"></div>
                            <div className="relative h-full flex flex-col items-center justify-center p-6 text-white">
                                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <h3 className="text-2xl font-bold text-center">
                                    {language === "bg" ? "Ремонт и строителство" : "Renovation & Construction"}
                                </h3>
                            </div>
                        </div>
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
            <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900">
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