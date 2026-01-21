export default function VizitCard({ contactData }) {
    return (
        <section className="w-full py-12 mb-12 px-12 isolate border border-slate-800 dark:border-slate-200 rounded-t-lg hover:animate-pulse">
            <h2 className="text-xl lg:text-2xl font-bold mb-6">{contactData.companyName}</h2>
            <p className="mt-2">{contactData.companyAddress}</p>
            <p className="mt-2">{contactData.companyPhone}</p>
            <p className="mt-2">{contactData.companyEmail}</p>
        </section>
    );
}
