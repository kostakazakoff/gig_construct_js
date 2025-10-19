export default function CompLoader() {
    return (
        <div
            className="fixed inset-0 bg-slate-300/80 dark:bg-slate-800/80 backdrop-blur-xs z-40"
        >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-2 animate-pulse">
                <div className="w-4 h-4 bg-gig-blue dark:bg-slate-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-4 h-4 bg-gig-blue dark:bg-slate-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-4 h-4 bg-gig-blue dark:bg-slate-600 rounded-full animate-bounce"></div>
                {/* <div className="h-10 w-10 border-4 border-gig-blue/80 border-t-transparent border-b-transparent rounded-full animate-spin"></div> */}
            </div>
        </div>
    );
}