import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({ service, language }) {
    return (
        <Link key={service.id} href={`/services/${service.id}`} passHref>
            <article className="relative group w-96 h-96 transition duration-300 ease-in-outhover:translate-y-1 hover:scale-105 shadow-md hover:shadow-xl rounded-md overflow-hidden dark:text-slate-200 bg-gig-blue/20 dark:bg-slate-800/90" lang={language.toLowerCase()}>
                <div className="group-hover:overflow-hidden align-middle text-slate-200">
                    <div>
                        <div className="absolute inset-0 bg-gig-blue/80 " />
                    </div>
                    <Image
                        alt=""
                        src={service.src ? service.src : "/photo.svg"}
                        width={96}
                        height={48}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="size-96 object-cover"
                    />
                    <h2 className="absolute col-span-2 font-bold uppercase text-2xl text-center top-1/2 left-1/2 -translate-1/2 px-2 opacity-100 transition-opacity duration-400 group-hover:opacity-0">
                        {service.name}
                    </h2>
                    <h2 className="absolute w-82 h-82 flex justify-center items-center font-bold text-xl bottom-12 left-1/2 -translate-x-1/2 px-2 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                        {service.description}
                    </h2>
                </div>
                <div className="absolute w-96 h-30 grid grid-rows-2 grid-cols-3 bottom-0 bg-slate-800/80 dark:backdrop-blur-md text-slate-200 text-base/6 opacity-0 transition-opacity duration-400 group-hover:opacity-100 group-hover:border-t-1 border-slate-400 group-hover:shadow-lg/30">
                    <div className="col-span-3 border-t border-b flex justify-center items-center text-center p-2">{service.note}</div>
                    <div className="border-r flex justify-center items-center text-center p-2">Линеен метър</div>
                    <div className="border-r flex justify-center items-center text-center p-2">Контактна точка</div>
                    <div className="flex justify-center items-center text-center p-2"></div>
                </div>
            </article>
        </Link>
    );
}