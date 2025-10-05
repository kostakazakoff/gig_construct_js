'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Modal({ onOK, onClose, children }) {

    const router = useRouter();
    const searchParams = useSearchParams();
    const open = searchParams.get('modal') === 'true';
    const modalRef = useRef(null);

    // Open or close the modal based on the 'open' state
    useEffect(() => {
        if (open) {
            modalRef.current?.showModal();
        } else {
            modalRef.current?.close();
        }
    }, [open]);

    if (!open) {
        return null;
    }

    const handleClose = () => {
        modalRef.current?.close();

        // Remove modal parameter from URL
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.delete('modal');
        const newUrl = `${window.location.pathname}${currentParams.toString() ? '?' + currentParams.toString() : ''}`;
        router.push(newUrl);

        // Call the onClose callback if provided
        if (onClose) {
            onClose();
        }
    };

    const handleOK = () => {
        if (onOK) {
            onOK();
        }
        handleClose();
    };

    // Handle clicking outside the modal
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return (
        <dialog
            ref={modalRef}
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={handleBackdropClick}
        >
            <div className="absolute inset-0 bg-black opacity-50" onClick={handleClose}></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg z-10 relative">
                <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold">Modal Title</h2>
                </div>
                <div className="p-4">
                    {children}
                </div>
                <div className="p-4 border-t">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleClose}>Close</button>
                    <button className="ml-2 bg-gray-500 text-white px-4 py-2 rounded" onClick={handleOK}>Submit</button>
                </div>
            </div>
        </dialog>
    );
}
