import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({ service }) {
  return (
    <Link
      href={`/services/${service.id}`}
      passHref
      className="group flex-column md:flex m-6 justify-between space-x-6 p-4 transition duration-300 ease-in-outhover:translate-y-1 hover:scale-105 shadow-md hover:shadow-xl rounded-sm bg-gig-blue/10 dark:bg-gray-800 border-1 border-gray-300 dark:border-gray-700 hover:border-gig-blue dark:hover:border-blue-400">
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
      <div className="min-w-0 flex-auto">
        <p className="text-base underline lg:text-lg font-semibold uppercase mb-2 mt-4 md:mt-0 text-gig-blue leading-none dark:group-hover:text-blue-400 dark:text-slate-300">
          {service.name}
        </p>
        <p className="mt-1 lg:text-lg italic">{service.description}</p>
      </div>
    </Link>

  );
}