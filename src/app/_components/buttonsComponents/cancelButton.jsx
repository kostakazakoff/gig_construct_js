'use client';

export default function CancelButton({ onClick, children, type = "button", closeWrapper, className = "", ...props }) {
    // Filter out non-HTML props that shouldn't be passed to DOM element
    const {
        // Remove any other custom props here if needed
        ...htmlProps
    } = props;

    return (
        <button
            type={type}
            className={`ml-2 bg-slate-500 text-white px-4 py-2 rounded cursor-pointer hover:scale-105 hover:shadow-md/30 transition-transform duration-200 ${className}`}
            onClick={onClick}
            {...htmlProps}
        >
            {children}
        </button>
    );
}
