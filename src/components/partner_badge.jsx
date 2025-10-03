import Image from "next/image";
import Link from "next/link";


export default function PartnerBadge(partner) {
    return (
        <Link
            href={partner.websiteUrl ? partner.websiteUrl : "#"}
            target={partner.websiteUrl ? "_blank" : "_self"}
            className="relative text-center align-middle rounded-xl overflow-hidden shadow-sm transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-xl uppercase">

            <Image
                src={partner.logoUrl}
                width={24}
                height={24}
                alt={partner.name}
                className="h-24 w-24 bg-slate align-middle object-contain bg-gray-200 p-2" />

        </Link>
    );
}