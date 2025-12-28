'use client';

import { useEffect, useState } from "react";
import useLanguageContext from "../_hooks/useLanguageContext";
import NewsCard from "@/app/_components/newsComponents/newsCard.jsx";
import CompLoader from "../_components/mainComponents/compLoader";
import be from "../_utils/Api";
import Translate from "../_utils/Translator";

export default function NewsClientComponent() {
    const { language } = useLanguageContext();
    const [news, setNews] = useState(null);

    useEffect(() => {
        be.get('news/')
            .then(response => response.data)
            .then(data => {
                if (data && data.succeed && data.length > 0) {
                    const translatedNews = Translate({ data: data.data, language });
                    setNews(translatedNews);
                } else {
                console.log('News data received:', data);
                    console.log('Failed to fetch news:', data?.message);
                    setNews(null);
                }
            })
            .catch(error => {
                console.log('Error fetching news:', error.response?.data?.message || error.message);
                setNews(null);
            });
    }, [language]);

    return (
        news ? (
            <div className="flex flex-col gap-16 py-12 px-6" lang={language.toLowerCase()}>
                {news.map((item) => (
                    <NewsCard key={item.id} newsItem={item} />
                ))}
            </div>
        ) : (
            <CompLoader />
        )
    );
}
