import Image from "next/image";
import Link from "next/link";

export default function ProjectImageCard({ imgSrc, altText }) {
    return (
        <Link
            className="overflow-hidden rounded-md flex justify-center items-center h-full"
            href={`/projects/galery?modal=true`}
            passHref
        >
            <Image
                alt={altText}
                src={imgSrc}
                width={96}
                height={48}
                className="size-96 object-cover self-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </Link>
    );
}