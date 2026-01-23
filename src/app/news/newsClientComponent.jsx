'use client';

import { useEffect, useState } from "react";
import useLanguageContext from "../_hooks/useLanguageContext";
import NewsCard from "@/app/_components/newsComponents/newsCard.jsx";
import ComponentLoader from "../_components/mainComponents/componentLoader";
import be from "../_utils/Api";
import { API_PATH } from "../_lib/api_paths";

export default function NewsClientComponent() {
    const { language } = useLanguageContext();
    const [news, setNews] = useState(null);

    useEffect(() => {
        be.get(API_PATH.NEWS)
            .then(response => response.data)
            .then(data => {
                if (data && data.succeed) {
                    console.log("Fetched news data:", data.data);
                    setNews(data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
                } else {
                    setNews(null);
                }
            })
            .catch(error => {
                setNews(null);
            });
    }, [language]);

    return (
        news ? (
            <div className="flex flex-col gap-16 py-12 px-6 w-full" lang={language.toLowerCase()}>
                {news.map((item) => (
                    <NewsCard key={item.id} newsItem={item} />
                ))}
            </div>
        ) : (
            <ComponentLoader />
        )
    );
}
