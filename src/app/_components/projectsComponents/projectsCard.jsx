import Image from "next/image";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export default function ProjectsCard({ project, staticData, language }) {
    return (
        <Link className="group max-w-xl hover:shadow-xl/20 hover:scale-105 transition duration-300 ease-in-out border-l-6 border-b-1 border-r-1 hover:border-gig-blue dark:hover:border-blue-400 rounded-lg"
            href={`/projects/${project.id}`}>
            <div className="px-6 py-4 text-slate-700 font-bold font-medium rounded-t-sm bg-slate-300 dark:bg-slate-800 dark:text-slate-200 flex justify-between max-md:flex-col max-md:gap-2 max-md:items-center group-hover:bg-gig-blue dark:group-hover:bg-blue-400 group-hover:text-white transition duration-300 ease-in-out shadow-md">
                <p>{project.date}</p>
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
                            <div className="relative overflow-hidden h-48 w-64 rounded-sm bg-slate-300 shrink-0 shadow-md border-8 border-slate-100 dark:border-slate-700 group-hover:opacity-75 group-hover:grayscale-80 transition duration-400 ease-in-out:grayscale float-left max-xl:mb-4 md:mr-4">
                                <Image
                                    width={256}
                                    height={192}
                                    alt=""
                                    src={project.image_src ? BACKEND_URL + project.image_src : "/photo.svg"}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="w-full h-full object-cover bg-slate-300 dark:bg-gray-800"
                                />
                            </div>
                            <p className="mt-1 text-sm text-justify indent-8 md:text-base hyphens-auto" lang={language.toLowerCase()}>
                                {project.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
