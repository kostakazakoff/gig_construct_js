import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function ServiceDetailsCard({ serviceId, service, servicesStaticData, modalQueryParams }) {
    if (!service) {
        notFound();
    }

    return (
        <Link key={service.id} href={`/services/${serviceId}?modal=true`} passHref>
            <article className="group w-96 h-64 grid grid-rows-5 transition duration-300 ease-in-outhover:translate-y-1 hover:scale-105 shadow-md/30 hover:shadow-xl/40 rounded-sm relative overflow-hidden bg-gig-blue/20 dark:bg-slate-800/90 text-slate-200">
                <div className="relative row-span-3 overflow-hidden object-cover align-middle w-full h-full">
                    <div>
                        <div className="absolute inset-0 bg-gig-blue/80" />
                    </div>
                    <Image
                        src={service.imageSrc}
                        alt={service.title}
                        width={96}
                        height={48}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="size-96 object-cover"
                    />
                    <div className="font-bold uppercase text-center absolute -top-1/2 group-hover:top-1/2 left-1/2 -translate-1/2 px-4 text-wrap opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                        {servicesStaticData.askOfferText}
                    </div>
                    <h2 className="font-bold uppercase text-center absolute top-1/2 left-1/2 -translate-1/2 px-2 text-wrap opacity-100 transition-opacity duration-400 group-hover:opacity-0">
                        {service.title}
                    </h2>
                </div>
                <div className="row-span-2 grid grid-cols-4 grid-rows-2 relative z-1 bg-gig-blue/60 border-gig-blue/20">
                    <p className="flex justify-center items-center border-t border-r p-2">
                        BGN
                    </p>
                    <p className="flex justify-center items-center border-t border-r p-2 col-span-2">
                        100 - 200
                    </p>
                    <p className="flex justify-center items-center border-t p-2 row-span-2">
                        к. точка
                    </p>
                    <p className="flex justify-center items-center border-t border-r p-2">
                        EU
                    </p>
                    <p className="flex justify-center items-center border-t border-r p-2 col-span-2">
                        50 - 100
                    </p>

                </div>
            </article>
        </Link>
    );
}
