import Image from "next/image";
import Link from "next/link";

export default function ProjectsCard({ project, staticData }) {

    return (
            <div className="group hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out border-l-6 border-b-1 border-r-1 hover:border-gig-blue dark:hover:border-blue-400 rounded-lg">
                <div className="px-6 py-4 text-slate-900 font-bold font-medium rounded-t-sm bg-slate-300 dark:bg-slate-800 dark:text-slate-200 flex justify-between max-md:flex-col max-md:gap-2 max-md:items-center group-hover:bg-gig-blue dark:group-hover:bg-blue-400 group-hover:text-white transition duration-300 ease-in-out shadow-md">
                    <p>
                        {project.date}
                    </p>
                    <p>
                        {staticData.value} {project.price} {staticData.currency}
                    </p>
                </div>
                <Link
                    className="flex flex-col items-strech md:flex-row md:justify-items-strech md:items-strech gap-8 p-8 transition duration-300 ease-in-outhover:translate-y-1 mt-4"
                    href={`/projects/${project.id}`}
                >
                    <div className="min-w-0 w-80 md:w-140 xl:w-160 2xl:w-200 h-auto flex flex-col justify-between">
                        <div className="min-w-0 mb-auto">
                            <p className="text-3xl lg:text-4xl font-bold uppercase mb-6 text-slate-800 leading-none group-hover:text-gig-blue dark:group-hover:text-blue-400 dark:text-slate-300">
                                {project.title}
                            </p>
                            <hr className="max-md:hidden" />
                            <div className="mt-4">
                                <div className="relative overflow-hidden h-64 w-80 rounded-sm bg-slate-300 shrink-0 shadow-md border-8 border-slate-100 dark:border-slate-700 group-hover:opacity-75 group-hover:grayscale-80 transition duration-400 ease-in-out:grayscale float-left max-xl:mb-4 md:mr-4">
                                    <Image
                                        width={64}
                                        height={64}
                                        alt=""
                                        src={project.imageSrc ? project.imageSrc : "/photo.svg"}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="size-80 flex-none bg-slate-300 dark:bg-gray-800 dark:outline-white/10 object-cover"
                                    />
                                </div>
                                <p className="mt-1 text-sm text-justify indent-8 md:text-base italic">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
    );
}