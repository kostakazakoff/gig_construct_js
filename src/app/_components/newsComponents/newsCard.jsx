import { API_PATH } from "@/app/_lib/api_paths";
import Image from "next/image";

export default function NewsCard({ newsItem }) {

    const addImage = (imageSrc) => {
        if (!imageSrc) {
            return "/gig_logo.svg";
        } else if (imageSrc.startsWith('http')) {
            return imageSrc;
        }
        return API_PATH.BACKEND_URL + imageSrc;
    }

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    return (
        <div className="max-w-6xl pl-8 py-4 border-l-4 border-gig-blue">
            <div className="flex justify-between items-start gap-24 mb-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-slate-200 px-8 py-4 bg-slate-100 dark:bg-slate-700 border-b-2 border-slate-300 dark:border-slate-700">
                    {newsItem.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 whitespace-nowrap underline decoration-dotted">
                    {formatDate(newsItem.created_at)}
                </p>
            </div>
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
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum corporis expedita at architecto consectetur. Porro, laborum? Adipisci incidunt ipsa aut iusto ullam, blanditiis maiores? Alias consequatur, doloribus, corporis porro vitae modi in natus eaque hic eveniet reiciendis magni eligendi optio, soluta illo illum aspernatur maiores atque similique nisi mollitia voluptatem. Incidunt laborum eaque dolore explicabo cum, odio sit dicta rerum voluptate totam unde debitis sint officia nihil at magnam vero beatae aliquid laboriosam? Unde, quos soluta provident iste, enim fugit ut at quia doloribus veritatis facilis fuga? Repudiandae, sapiente nesciunt voluptatum sunt aspernatur laborum velit similique sint dolore ab necessitatibus neque atque quasi eveniet alias ut exercitationem libero! Sequi commodi asperiores illo, perspiciatis unde qui deserunt accusantium tenetur optio nemo repellendus! Earum asperiores iusto praesentium beatae odio ad veritatis soluta, quod fugiat voluptas hic reprehenderit dignissimos alias nisi corporis sit molestiae aliquid repudiandae, omnis et. Excepturi, minima, pariatur labore et fuga possimus natus debitis, placeat omnis reprehenderit aut officiis sunt! Soluta aperiam ut perspiciatis voluptates inventore odio tenetur praesentium ad natus! Voluptates voluptas, harum cupiditate quod, nisi ad modi natus iure ab magni ex mollitia laborum, sint eligendi numquam? Optio vitae corporis nisi error quasi tempore laudantium voluptate, dolorum consequatur.
            </p>
        </div>
    );
}

