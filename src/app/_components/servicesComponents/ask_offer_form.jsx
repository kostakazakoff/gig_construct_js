export default function AskOfferForm({ serviceId }) {
    console.log(`Rendering AskOfferForm for service ID: ${serviceId}`);
    return (
        <div className="w-sm sm:w-96 lg:w-128 xl:w-160 p-4">
            <h2 className="text-2xl font-bold mb-4 uppercase text-center border-b border-slate-900">Request a Free Offer</h2>
            <form className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
                    <input type="text" id="name" name="name" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                    <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                    <textarea id="message" name="message" rows="4" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"></textarea>
                </div>
            </form>
        </div>
    );
}
