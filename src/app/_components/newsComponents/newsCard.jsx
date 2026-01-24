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
        <div className="max-w-6xl flex flex-col gap-16">
            <section className="relative sticky z-20 top-20 flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4 md:gap-24 w-full">
                <h2 className="text-base sm:text-2xl lg:text-4xl font-bold text-slate-800 dark:text-slate-200 px-4 sm:px-8 py-2 sm:py-4 bg-slate-100 dark:bg-slate-700 rounded-br-xl shadow-md/20 break-words min-w-0">
                    {newsItem.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 sm:whitespace-nowrap bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-bl-xl shadow-md/20">
                    {formatDate(newsItem.created_at)}
                </p>
                <div className="absolute -z-20 w-full h-1 bg-slate-100 dark:bg-slate-700 shadow-md/20 w-full max-sm:hidden" />
            </section>
            <section className="bg-slate-100 dark:bg-slate-700 p-4 sm:p-8 md:p-12 flex flex-col sm:flex-row">
                <div className="relative mb-2 overflow-hidden h-48 w-full max-w-xs sm:w-64 rounded-sm shrink-0 shadow-md border-2 float-left mr-4 border-slate-400">
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

