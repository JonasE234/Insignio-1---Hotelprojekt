"use client";
import { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full relative overflow-hidden">
                <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors bg-gray-100 rounded-full p-2"
                >
                    ✕
                </button>
                <div className="p-8 space-y-6 overflow-y-auto max-h-[80vh] text-gray-800 text-base leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
}
