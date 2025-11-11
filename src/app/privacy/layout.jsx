'use client';

import { useRouter } from 'next/navigation';
import useLanguageContext from '@/app/_hooks/useLanguageContext';

export default function ProjectLayout({ children }) {
    const { language } = useLanguageContext();
    const router = useRouter();

    return (
        <section>
            <div className="w-full bg-slate-900 dark:bg-slate-800 text-slate-200 py-4 fixed left-0 z-50 text-center">
                    <button
                        onClick={() => router.back()}
                        className="rounded-full bg-slate-900 dark:bg-slate-800 px-3.5 py-1 text-sm font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                    >
                        <span aria-hidden="true">&larr;</span> {language === 'EN' ? 'Back' : 'Назад'}
                    </button>
            </div>

            <div className="py-24">
                {children}
            </div>
        </section>
    );
}
