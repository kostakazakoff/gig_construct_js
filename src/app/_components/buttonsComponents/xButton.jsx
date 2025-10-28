'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';

export default function XButton({ onClick }) {
    return (
        <button className="text-white bg-red-800 p-1 rounded-full cursor-pointer" onClick={onClick} aria-label="Close">
            <XMarkIcon className="h-6 w-6" />
        </button>
    );
}
