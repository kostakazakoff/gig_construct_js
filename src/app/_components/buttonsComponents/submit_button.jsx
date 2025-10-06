'use client';

export default function SubmitButton({ onClick, children }) {
    return (
        <button
            className="ml-2 bg-gig-blue text-white px-4 py-2 rounded cursor-pointer hover:scale-105 hover:shadow-md transition-transform duration-200"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
