import Image from "next/image";
import Link from "next/link";
import { API_PATH } from "@/app/_lib/api_paths.js";
<<<<<<< HEAD
import { formatDate } from "@/app/_utils/DateFormatter.js";

const resolveImageUrl = (url) => (url?.startsWith("http") ? url : `${API_PATH.BACKEND_URL}${url}`);
=======
import { useEffect, useState } from "react";
>>>>>>> new_architecture

export default function ProjectsCard({ project, staticData, language }) {

    const resolveImageUrl = (url) => (url?.startsWith("http") ? url : `${API_PATH.BACKEND_URL}${url}`);

    const [img, setImg] = useState("/GIG_logo_white.png");

    useEffect(() => {
        const resultUrl = resolveImageUrl(project.image_thumb_src);
        if (!resultUrl.endsWith("null")) {
            setImg(resultUrl);
        } else {
            setImg("/GIG_logo_white.png");
        }
    }, [project.image_thumb_src]);

    return (
        <article
            className="group max-w-xl shadow-md/20 hover:shadow-xl/20 hover:scale-105 transition duration-300 ease-in-out border-l-6 border-b-1 border-r-1 hover:border-gig-blue dark:hover:border-blue-400 rounded-lg"
            id={project.id}
        >
            <Link
                href={`/projects/${project.id}`}
                passHref
            >
                <div className="px-6 py-4 text-slate-700 font-bold font-medium rounded-t-sm bg-slate-300 dark:bg-slate-800 dark:text-slate-200 flex justify-between max-md:flex-col max-md:gap-2 max-md:items-center group-hover:bg-gig-blue dark:group-hover:bg-blue-400 group-hover:text-white transition duration-300 ease-in-out shadow-md">
                    <p>{formatDate(project.date)}</p>
                    <p>
                        {staticData.value} {project.price} {staticData.currency}
                    </p>
                </div>
                <div
                    className="flex flex-col items-strech md:flex-row md:justify-items-strech md:items-strech gap-8 p-8 transition duration-300 ease-in-outhover:translate-y-1 mt-4"

                >
                    <div className="min-w-0 w-80 md:w-140 xl:w-160 2xl:w-200 h-auto flex flex-col justify-between">
                        <div className="min-w-0 mb-auto">
                            <p className="text-3xl lg:text-4xl font-bold uppercase mb-6 text-slate-800 leading-none group-hover:text-gig-blue dark:group-hover:text-blue-400 dark:text-slate-300">
                                {project.title}
                            </p>
                            <hr className="max-md:hidden" />
                            <div className="mt-4">
                                <div className="relative overflow-hidden h-48 w-64 rounded-sm shrink-0 shadow-md border-8 border-slate-100 dark:border-slate-700 group-hover:opacity-75 group-hover:grayscale-80 transition duration-400 ease-in-out:grayscale float-left max-xl:mb-4 md:mr-4">
                                    {img &&
                                        <Image
                                            width={256}
                                            height={192}
                                            alt="project image"
                                            src={img}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="w-full h-full object-cover"
                                        />
                                    }
                                </div>
                                <p className="mt-1 text-sm text-justify indent-8 md:text-base hyphens-auto">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    );
}
