import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({ service }) {
    return (
        <Link
            href={`/services/${service.id}`}
            passHref
            className="group overflow-hidden md:h-34 hover:h-auto flex-column md:flex md:justify-start m-6 justify-between space-x-6 p-4 transition duration-300 ease-in-outhover:translate-y-1 hover:scale-105 shadow-md hover:shadow-xl rounded-sm bg-gig-blue/10 dark:bg-gray-800 border-1 border-gig-blue dark:border-blue-400 hover:border-0">

            <div className="flex items-center relative overflow-hidden h-26 w-full md:w-48 rounded-sm bg-slate-300 shrink-0 shadow-md">
                <Image
                    width={48}
                    height={48}
                    alt=""
                    src={service.src ? service.src : "/photo.svg"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="size-auto md:size-48 flex-none bg-slate-300 dark:bg-gray-800 dark:outline-white/10 object-cover"
                />
            </div>
            <div className="min-w-0">
                <p className="text-base leading-tight lg:line-clamp-1 group-hover:line-clamp-3 underline lg:text-lg font-bold uppercase mb-2 mt-4 md:mt-0 text-gig-blue leading-none dark:group-hover:text-blue-400 dark:text-slate-300">
                    {service.name}
                </p>
                <p className="mt-1 lg:text-lg md:text-ellipsis lg:line-clamp-3 md:group-hover:line-clamp-8">
                    {service.description}
                </p>
            </div>
        </Link>
    );
}