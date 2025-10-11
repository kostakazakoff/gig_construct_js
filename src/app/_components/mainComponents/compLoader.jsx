export default function CompLoader() {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-2">
            <div className="w-4 h-4 bg-gig-blue rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-4 h-4 bg-gig-blue rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-4 h-4 bg-gig-blue rounded-full animate-bounce"></div>
        </div>
    );
}