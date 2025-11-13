import ServiceDetailsComponent from "./clientComponent";

export const metadata = {
    title: 'Service Details',
    description: 'Details about a specific service',
    tags: ['service details', 'construction services', 'renovation services', 'строителни услуги', 'ремонтни услуги'],
}

export default async function ServiceDetailsPage() {

    return (
        <div className="py-2">
            <ServiceDetailsComponent />
        </div>
    )
}