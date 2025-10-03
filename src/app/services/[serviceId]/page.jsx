import ServiceDetailsComponent from "./client";

export const metadata = {
    title: 'Service Details',
    description: 'Details about a specific service',
}

export default async function ServiceDetailsPage() {

    return (
        <div>
            <ServiceDetailsComponent />
        </div>
    )
}