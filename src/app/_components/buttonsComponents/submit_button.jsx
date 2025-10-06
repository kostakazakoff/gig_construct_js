'use client';

export default function SubmitButton({ onClick, children, type = "button", ...props }) {
    return (
        <button
            type={type}
            className="ml-2 bg-gig-blue text-white px-4 py-2 rounded cursor-pointer hover:scale-105 hover:shadow-md transition-transform duration-200"
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}
