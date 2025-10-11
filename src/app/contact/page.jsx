import CompLoader from '../_components/mainComponents/compLoader';

export const metadata = {
    title: 'Contact',
    description: 'Get in touch with GIG Construct for inquiries and quotes.',
    tags: ['contact', 'inquiries', 'construction', 'renovation'],
}

export default function ContactPage() {
    return (
        <div className='flex justify-center items-center'>
            <CompLoader />
        </div>
    );
}