'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';

export default function XButton({ onClick }) {
    return (
        <button 
            onClick={onClick} 
            aria-label="Close"
            className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-200"
        >
            <XMarkIcon 
                aria-hidden="true" 
                className="size-5 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white" 
            />
        </button>
    );
}
