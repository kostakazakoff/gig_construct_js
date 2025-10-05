import { XMarkIcon } from '@heroicons/react/24/solid';

export default function XButton({ onClick }) {
    return (
        <button className="text-white bg-red-800 p-1 rounded-full cursor-pointer" onClick={onClick} aria-label="Close">
            <XMarkIcon className="h-4 w-4" />
        </button>
    );
}
