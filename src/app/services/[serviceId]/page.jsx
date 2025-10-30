import ServiceDetailsComponent from "./clientComponent";

export const metadata = {
    title: 'Service Details',
    description: 'Details about a specific service',
}

export default async function ServiceDetailsPage() {

    return (
        <div className="py-8">
            <ServiceDetailsComponent />
        </div>
    )
}