import Image from "next/image";

export default function ProjectImageCard({ imgSrc, altText }) {
    const openImage = () => {
        // Function to handle image click, e.g., open in a modal or new tab
    };

    return (
        <article className="overflow-hidden rounded-md flex justify-center items-center h-full" onClick={openImage}>
            <Image
                alt=""
                src="/images/service_details_cards/electro/Electrical-Services.jpg"
                width={96}
                height={48}
                className="size-96 object-cover self-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </article>
    );
}