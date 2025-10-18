import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({ service, language }) {

    return (
        <Link key={service.id} href={`/services/${service.id}`} passHref>
            <article className="group grid grid-rows-4 w-96 h-80 transition duration-300 ease-in-outhover:translate-y-1 hover:scale-105 shadow-md/30 hover:shadow-xl/40 rounded-md overflow-hidden text-slate-200 border border-gig-blue dark:border-slate-300" lang={language.toLowerCase()}>

                <div className="row-span-1 flex flex-col justify-center items-center text-base/6 bg-gig-blue/60 p-2">
                    <div className="flex justify-center items-center text-center uppercase text-xl font-bold">{service.name}</div>
                </div>

                <div className="relative row-span-3 overflow-hidden flex text-slate-200">
                    <div>
                        <div className="absolute inset-0 bg-gig-blue/80 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    </div>
                    <Image
                        alt=""
                        src={service.image_src ? service.image_src : "/photo.svg"}
                        width={96}
                        height={48}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="size-96 object-cover self-center"
                    />
                    <h2 className="absolute w-82 h-82 flex justify-center items-center font-bold text-xl -top-1/2 group-hover:top-1/2 left-1/2 -translate-1/2 transition-translate duration-400">
                        {service.description}
                    </h2>
                </div>

            </article>
        </Link>
    );
}