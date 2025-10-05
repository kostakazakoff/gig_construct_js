'use client';

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import SubmitButton from "../buttons/submit_button";
import XButton from "../buttons/x_button";

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
        <>
            {/* Full-screen backdrop with blur */}
            <div 
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
                onClick={handleClose}
            ></div>
            
            {/* Modal dialog */}
            <dialog
                ref={modalRef}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-transparent p-0 border-0"
                onClick={handleBackdropClick}
            >
                <div className="bg-gray-200/80 dark:bg-slate-800/80 dark:text-slate-300 overflow-hidden shadow-lg relative rounded-lg relative">
                    {/* <div className="p-4 border-b">
                        <h2 className="text-lg font-semibold">Modal Title</h2>
                    </div> */}
                    <div className="p-2 flex justify-end">
                        <XButton onClick={handleClose} />
                    </div>
                    <div className="p-4">
                        {children}
                    </div>
                    <div className="p-4 border-t flex justify-end gap-2">
                        {/* <button className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:scale-105 hover:shadow-md transition-transform duration-200" onClick={handleClose}>Cancel</button> */}
                        <SubmitButton onClick={handleOK}>Submit</SubmitButton>
                    </div>
                </div>
            </dialog>
        </>
    );
}
