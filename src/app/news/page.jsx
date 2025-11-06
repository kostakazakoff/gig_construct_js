import CompLoader from "../_components/mainComponents/compLoader";
import NewsCard from "../_components/newsComponents/newsCard";
import be from "../_utils/Api";

export const metadata = {
    title: 'News',
    description: 'Latest news and updates from GIG Construct.',
    tags: ['news', 'updates', 'construction', 'renovation'],
}

export default async function NewsPage() {
    let news = null;
    
    try {
        const newsResponse = await be.get('news/');
        if (newsResponse && newsResponse.data && newsResponse.data.succeed) {
            news = newsResponse.data.data;
        } else {
            console.log('Failed to fetch news:', newsResponse?.message);
        }
    } catch (error) {
        console.error('Error fetching news:', error);
    }

    return (
        news ? (
            <div className="flex flex-col gap-8 px-8 py-8">
                {news.map((item) => (
                    <NewsCard key={item.id} newsItem={item} />
                ))}
            </div>
        ) : (
            <div>
                <CompLoader />
            </div>
        )
    );
}