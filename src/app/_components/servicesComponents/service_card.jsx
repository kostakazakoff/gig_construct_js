import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({ service }) {
    return (
        <Link key={service.id} href={`/services/${service.id}`} passHref>
            <article className="relative group w-96 h-96 transition duration-300 ease-in-outhover:translate-y-1 hover:scale-105 shadow-md hover:shadow-xl rounded-md overflow-hidden dark:text-slate-200 bg-gig-blue/20 dark:bg-slate-800/90" lang="bg">
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
                    <h2 className="font-bold uppercase text-2xl text-center absolute top-1/2 left-1/2 -translate-1/2 px-2 text-wrap">
                        {service.name}
                    </h2>
                </div>
                <div className="absolute w-96 h-24 bottom-0 bg-gig-blue dark:backdrop-blur-md text-justify text-slate-200 hyphens-auto flex flex-col justify-center px-4 text-base/6 indent-8 opacity-0 transition-opacity duration-400 group-hover:opacity-100 group-hover:border-t-1 border-slate-400">
                    <p>Ценообразуването на услугата се изчислява на контактна точка и линеен метър</p>
                </div>
            </article>
        </Link>
    );
}