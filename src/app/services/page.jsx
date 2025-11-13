import TranslatedServices from "./translated_services";

export const metadata = {
    title: 'Services',
    description: 'Our services showcasing our expertise in construction and renovation services.',
    tags: ['services', 'construction', 'renovation', 'portfolio', 'строителство', 'ремонт', 'услуги', 'портфолио'],
}

export default function Home() {

    return (
        <div className=" py-8">
            <TranslatedServices />
        </div>
    );
}
