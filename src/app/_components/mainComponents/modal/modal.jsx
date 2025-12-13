'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import React from "react";
import XButton from "../../buttonsComponents/xButton";
import ModalPropsProvider from "./modalPropsProvider";

export default function Modal({ active, setActive, children }) {

    const router = useRouter();
    const searchParams = useSearchParams();
    const open = searchParams.get('modal') === 'true' || active;
    const modalRef = useRef(null);

    const handleClose = () => {
        modalRef.current?.close();
        // Remove modal parameter from URL
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.delete('modal');
        const newUrl = `${window.location.pathname}${currentParams.toString() ? '?' + currentParams.toString() : ''}`;
        router.push(newUrl);

        setActive(false);
    };

    // Open or close the modal based on the 'open' state
    useEffect(() => {
        if (open) {
            modalRef.current?.showModal();
            setActive(true);
        } else {
            modalRef.current?.close();
            setActive(false);
        }
    }, [open]);

    if (!open) {
        return null;
    }

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
                className="fixed inset-0 bg-black/60 backdrop-blur-md z-60"
                onClick={handleClose}
            ></div>

            {/* Modal dialog */}
            <dialog
                ref={modalRef}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-70 bg-transparent p-0 border-0 max-h-screen overflow-y-auto"
                onClick={handleBackdropClick}
            >
                <div className="bg-slate-200 dark:bg-slate-900 dark:text-slate-300 overflow-hidden shadow-2xl rounded-lg relative">
                    <div className="absolute top-2 right-2 z-10">
                        <XButton onClick={handleClose} />
                    </div>

                    <div className="p-4 pt-12">
                        {/* Use ModalPropsProvider to elegantly pass props to a multiple children */}
                        <ModalPropsProvider closeWrapper={handleClose}>
                            {children}
                        </ModalPropsProvider>
                    </div>
                </div>
            </dialog>
        </>
    );
}
