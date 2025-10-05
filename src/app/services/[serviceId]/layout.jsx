import PageTitle from "@/app/_components/page_title";

export default function ServicesLayout({ children }) {
    return (
        <>
            <PageTitle />
            <section className="pt-16">
                {children}
            </section>
        </>
    )
}
