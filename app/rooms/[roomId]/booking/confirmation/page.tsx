"use client";

import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {api} from "@/components/data/api";

interface RoomData {
    id: number;
    name: string;
    description: string;
    price: number;
}

export default function BookingConfirmationPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();

    const roomId = params?.roomId;

    const [roomData, setRoomData] = useState<RoomData | null>(null);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);

    // Auslesen der Check-in und Check-out Daten aus den Query-Parametern
    const fromParam = searchParams?.get("from");
    const toParam = searchParams?.get("to");

    const checkInDate = fromParam ? new Date(fromParam) : null;
    const checkOutDate = toParam ? new Date(toParam) : null;

    // Datum formatiert darstellen
    const formattedCheckIn = checkInDate
        ? checkInDate.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })
        : "unknown";
    const formattedCheckOut = checkOutDate
        ? checkOutDate.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })
        : "unknown";

    useEffect(() => {
        const fetchRoomData = async () => {
            if (!roomId) {
                setFetchError("No roomId provided.");
                setLoading(false);
                return;
            }

            try {
                await api.call('Rooms/getRoomData', 'POST', setRoomData, [roomId]);
            } catch (err: any) {
                setFetchError(
                    err instanceof Error
                        ? err.message
                        : "An unknown error occurred."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchRoomData();
    }, [roomId]);

    if (loading) {
        return (
            <div className="text-center py-16 text-gray-600 text-xl">
                Loading confirmation details...
            </div>
        );
    }

    if (fetchError) {
        return (
            <div className="text-center py-16 text-red-500 text-xl font-semibold">
                {fetchError}
            </div>
        );
    }

    return (
        <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
            {/* Hero Section mit Zimmerbild */}
            <header className="relative h-[50vh] w-full overflow-hidden">
                <Image
                    src={`/images/rooms/${roomId}.jpg`}
                    alt={`Room ${roomId}`}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white drop-shadow-md">
                    <h1 className="text-4xl md:text-5xl font-extrabold">
                        Booking Confirmed!
                    </h1>
                </div>
            </header>

            <main className="flex-1">
                {/* Bestätigungs-Info */}
                <section className="container mx-auto px-4 md:px-8 py-12">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">
                            Thank you for your reservation
                        </h2>
                        <p className="text-gray-700 text-lg leading-relaxed mb-8">
                            We’re delighted to confirm your stay with us. You have successfully booked{" "}
                            <span className="font-semibold text-gray-900">
                                {roomData?.name ? roomData.name : `Room #${roomId}`}
                            </span>{" "}
                            from <span className="font-semibold">{formattedCheckIn}</span> to <span className="font-semibold">{formattedCheckOut}</span>.
                            A detailed booking confirmation has been sent to your email.
                            We look forward to welcoming you and hope you enjoy a relaxing and memorable experience.
                        </p>

                        <Button
                            className="py-4 px-10 text-lg font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-lg"
                            onClick={() => router.push("/")}
                        >
                            Back to Home
                        </Button>
                    </div>
                </section>

                {/* Unterstützung/Support-Infos */}
                <section className="container mx-auto px-4 md:px-8 py-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                        Need Assistance?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-xl transition-shadow">
                            <span className="inline-block mb-4 text-blue-600 text-3xl">📞</span>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                Contact Us
                            </h3>
                            <p className="text-gray-600">
                                Call our friendly support team at +1 (555) 123-4567.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-xl transition-shadow">
                            <span className="inline-block mb-4 text-blue-600 text-3xl">📧</span>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                Email Support
                            </h3>
                            <p className="text-gray-600">
                                Send us an email at support@example.com and we’ll respond promptly.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-xl transition-shadow">
                            <span className="inline-block mb-4 text-blue-600 text-3xl">💬</span>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                Live Chat
                            </h3>
                            <p className="text-gray-600">
                                Use our website’s live chat feature for instant assistance.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
