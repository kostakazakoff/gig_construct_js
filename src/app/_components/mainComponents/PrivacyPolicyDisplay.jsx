'use client';

import useLanguageContext from "@/app/_hooks/useLanguageContext";
import { privacyPolicyStaticData } from "@/app/_lib/static_data";
import CompLoader from "./compLoader";
import { useEffect, useState } from "react";

export default function PrivacyPolicyDisplay() {
    const { language } = useLanguageContext();
    const [data, setData] = useState(privacyPolicyStaticData[language]);

    useEffect(() => {
        setData(privacyPolicyStaticData[language]);
    }, [language]);

    // Функция за обработка на текста - преобразува markdown-подобен синтаксис в HTML
    const renderContent = (text) => {
        return text.split('\n').map((line, index) => {
            // Премахване на bullet point символ ако има
            const cleanLine = line.trim().startsWith('•') 
                ? line.trim().substring(1).trim() 
                : line;

            // Обработка на **bold** текст
            const boldRegex = /\*\*(.*?)\*\*/g;
            const parts = [];
            let lastIndex = 0;
            let match;

            while ((match = boldRegex.exec(cleanLine)) !== null) {
                if (match.index > lastIndex) {
                    parts.push(cleanLine.substring(lastIndex, match.index));
                }
                parts.push(<strong key={`bold-${index}-${match.index}`}>{match[1]}</strong>);
                lastIndex = match.index + match[0].length;
            }

            if (lastIndex < cleanLine.length) {
                parts.push(cleanLine.substring(lastIndex));
            }

            // Проверка за списък (започва с •)
            if (line.trim().startsWith('•')) {
                return (
                    <li key={index} className="ml-12 indent-2">
                        {parts.length > 0 ? parts : cleanLine}
                    </li>
                );
            }

            // Празен ред
            if (line.trim() === '') {
                return <br key={index} />;
            }

            // Обикновен текст
            return (
                <p key={index}>
                    {parts.length > 0 ? parts : cleanLine}
                </p>
            );
        });
    };

    return (
        data ? (
        <div lang={language.toLowerCase()} className="text-justify hyphens-auto flex flex-col gap-4 max-w-4xl mx-auto">
            <h2 className="text-lg md:text-2xl underline text-center mb-12 font-bold">
                {data.title}
            </h2>

            {data.sections.map((section, index) => (
                <div key={index}>
                    <h3 className="font-bold text-lg mt-4 mb-2">{section.heading}</h3>
                    <div className="flex flex-col gap-2">
                        {renderContent(section.content)}
                    </div>
                </div>
            ))}
        </div>
        ) : <CompLoader />
    );
}
