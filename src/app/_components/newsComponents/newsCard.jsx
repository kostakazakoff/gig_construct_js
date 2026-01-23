import { API_PATH } from "@/app/_lib/api_paths";
import Image from "next/image";
import { formatDate } from "@/app/_utils/DateFormatter.js";

export default function NewsCard({ newsItem }) {

    const addImage = (imageSrc) => {
        if (!imageSrc) {
            return "/GIG_Logo_white.png";
        } else if (imageSrc.startsWith('http')) {
            return imageSrc;
        }
        return API_PATH.BACKEND_URL + imageSrc;
    }

    return (
        <div className="max-w-6xl py-4">
            <section className="relative sticky z-20 top-20 flex justify-between items-start gap-24 mb-6">
                <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-slate-800 dark:text-slate-200 px-8 py-4 bg-slate-100 dark:bg-slate-700 rounded-br-xl shadow-md/20">
                    {newsItem.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 whitespace-nowrap bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-bl-xl shadow-md/20">
                    {formatDate(newsItem.created_at)}
                </p>
                <div className="absolute -z-2 w-full h-1 bg-slate-100 dark:bg-slate-700 shadow-md/20" />
            </section>
            <section className="bg-slate-100 dark:bg-slate-700 p-8 sm:p-12">
            <div className="relative sm:mb-1 overflow-hidden h-48 w-64 rounded-sm shrink-0 shadow-md border-2 float-left mr-4 border-slate-400">
                <Image
                    src={addImage(newsItem.image_src)}
                    alt={newsItem.title}
                    width={96}
                    height={48}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-cover"
                />
            </div>
            <p className="mt-1 text-sm text-justify indent-8 md:text-base hyphens-auto">
                {newsItem.content}
            </p>
            </section>
        </div>
    );
}

