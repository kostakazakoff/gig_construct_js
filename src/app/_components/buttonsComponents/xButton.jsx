'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';

export default function XButton({ onClick }) {
    return (
        <button onClick={onClick} aria-label="Close">
            <XMarkIcon aria-hidden="true" className="size-5 text-slate-200" />
        </button>
    );
}
