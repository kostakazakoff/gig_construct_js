import NewsClientComponent from "./newsClientComponent";

export const metadata = {
    title: 'News',
    description: 'Latest news and updates from GIG Construct.',
    tags: ['news', 'updates', 'construction', 'renovation'],
}

export default function NewsPage() {
    return (
        <NewsClientComponent />
    );
}