import Image from "next/image";
import Link from "next/link";

export default function ProjectImageCard({ img, id }) {
    return (
        <Link
            className="overflow-hidden rounded-md flex justify-center items-center h-full"
            href={`/projects/${id}?modal=true`}
            passHref
        >
            {img &&
            <Image
                alt=''
                src={img}
                width={384}
                height={256}
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            }
        </Link>
    );
}