"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";

export default function Footer() {
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);

    return (
        <footer className="bg-gray-900 text-white py-4 mt-12">
            <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Luxury Hotel. All rights reserved.
                </p>
                <div className="flex space-x-6">
                    <button
                        onClick={() => setShowPrivacyModal(true)}
                        className="text-sm hover:underline"
                    >
                        Privacy Policy
                    </button>
                    <button
                        onClick={() => setShowTermsModal(true)}
                        className="text-sm hover:underline"
                    >
                        Terms & Conditions
                    </button>
                </div>
            </div>

            {/* Privacy Policy Modal */}
            <Modal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)}>
                <h2 className="text-2xl font-bold text-gray-900">Privacy Policy</h2>
                <hr className="my-4"/>
                <h3 className="text-xl font-semibold text-gray-900">Your Data & Security</h3>
                <p>
                    We take your privacy seriously. Any personal information we collect is handled with the utmost care.
                    We never share your data with third parties without your explicit consent, unless required by law.
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mt-6">How We Use Your Information</h3>
                <p>
                    We collect certain information to enhance your experience, provide personalized offers, and ensure
                    high-quality customer support. By staying with us and using our services, you agree to our data practices.
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mt-6">Contact Us</h3>
                <p>
                    If you have any questions or concerns regarding your privacy, please reach out to us at:
                    <span className="block mt-1 font-semibold text-blue-600">
                        support@luxury-hotel.com
                    </span>
                </p>
            </Modal>

            {/* Terms & Conditions Modal */}
            <Modal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)}>
                <h2 className="text-2xl font-bold text-gray-900">Terms & Conditions</h2>
                <hr className="my-4"/>
                <h3 className="text-xl font-semibold text-gray-900">Acceptance of Terms</h3>
                <p>
                    By booking a stay at our hotel, you agree to abide by all the policies, rules, and regulations outlined here.
                    This includes adhering to local laws, respecting other guests, and ensuring timely payment for any services rendered.
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mt-6">Check-In & Check-Out</h3>
                <p>
                    Check-in and check-out times must be observed. Late check-outs may incur additional fees.
                    Our staff is here to assist you, but failure to comply with these guidelines may result in penalties or reservation cancellation.
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mt-6">Contact & Support</h3>
                <p>
                    Should you have any questions about these terms, feel free to contact us at:
                    <span className="block mt-1 font-semibold text-blue-600">
                        support@luxury-hotel.com
                    </span>
                </p>
            </Modal>
        </footer>
    );
}
