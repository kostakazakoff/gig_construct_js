import Image from "next/image";
import Link from "next/link";


export default function PartnerBadge(partner) {
    return (
        <Link
            href={partner.site ? partner.site : "#"}
            target={partner.site ? "_blank" : "_self"}
            className="relative text-center align-middle rounded-md border border-slate-700 overflow-hidden shadow-sm transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-xl uppercase">
            {partner.image_src ?
                <Image
                    src={partner.image_src}
                    width={24}
                    height={24}
                    sizes="96px"
                    alt={partner.email}
                    className="h-24 w-24 bg-slate align-middle object-contain bg-gray-200 p-2" />
                : <p className="h-24 w-24 flex items-center justify-center bg-gray-200 text-gray-500 p-2 text-xs">
                    {partner.first_name} {partner.last_name && partner.last_name}
                    </p>
            }
        </Link>
    );
}