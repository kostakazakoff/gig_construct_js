import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function ServiceDetailsCard({ serviceId, service, servicesStaticData, modalQueryParams }) {
    if (!service) {
        notFound();
    }

    return (
        <Link key={service.id} href={`/services/${serviceId}?modal=true`} passHref>
            <article className="group w-96 h-64 grid grid-rows-5 transition duration-300 ease-in-outhover:translate-y-1 hover:scale-105 shadow-md hover:shadow-xl rounded-sm relative overflow-hidden dark:text-slate-200 bg-gig-blue/20 dark:bg-slate-800/90 border-1 border-gig-blue hover:border-0">
                <div className="relative row-span-3 overflow-hidden object-cover align-middle w-full h-full text-slate-200">
                    <div>
                        <div className="absolute inset-0 bg-gig-blue/70 z-0" />
                    </div>
                    <Image
                        src={service.imageSrc}
                        alt={service.title}
                        width={128}
                        height={64}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="size-128 object-cover"
                    />
                    <div className="font-bold uppercase text-center absolute -top-1/2 group-hover:top-1/2 left-1/2 -translate-1/2 px-4 text-wrap opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                        {servicesStaticData.askOfferText}
                    </div>
                    <h2 className="font-bold uppercase text-center absolute top-1/2 left-1/2 -translate-1/2 px-2 text-wrap opacity-100 transition-opacity duration-400 group-hover:opacity-0">
                        {service.title}
                    </h2>
                </div>
                <div className="row-span-2 grid grid-cols-4 grid-rows-3 relative z-1">
                    <p className="text-center border-t-2 p-2 col-span-4 uppercase dark:bg-purple-900">
                        1
                    </p>
                    <p className="text-center border-1 border-t-1 p-2 dark:bg-purple-900">
                        2
                    </p>
                    <p className="text-center border-1 p-2 col-span-2 dark:bg-purple-900">
                        3
                    </p>
                    <p className="text-center border-1 p-2 row-span-2 dark:bg-purple-900">
                        4
                    </p>
                    <p className="text-center border-1 p-2 dark:bg-purple-900">
                        5
                    </p>
                    <p className="text-center border-1 p-2 col-span-2 dark:bg-purple-900">
                        6
                    </p>

                </div>
            </article>
        </Link>
    );
}
