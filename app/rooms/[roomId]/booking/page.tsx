"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface RoomData {
    id: number;
    name: string;
    description: string;
    price: number;
}

export default function BookingPage() {
    const router = useRouter();
    const params = useParams<{ roomId: string }>();
    const roomId = params?.roomId;

    const [roomData, setRoomData] = useState<RoomData | null>(null);
    const [selectedDates, setSelectedDates] = useState<DateRange | undefined>();
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!roomId) {
            setFetchError("Room ID is missing.");
            return;
        }
        const fetchRoomData = async () => {
            try {
                const response = await fetch(`/api/rooms?id=${roomId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch room data.");
                }
                const data = await response.json();
                setRoomData(data);
            } catch (err) {
                setFetchError(
                    err instanceof Error ? err.message : "An unknown error occurred."
                );
            }
        };

        fetchRoomData();
    }, [roomId]);

    const handleBooking = async () => {
        setValidationError(null);

        if (!selectedDates?.from || !selectedDates?.to) {
            setValidationError("Please select both a check-in and a check-out date.");
            return;
        }

        // Placeholder: database handling
        // use isLoading to prevent multiple submissions
        router.push(`/rooms/${roomData?.id}/booking/confirmation?from=${selectedDates.from.toISOString()}&to=${selectedDates.to.toISOString()}`);

    };

    if (fetchError && !roomData) {
        return (
            <div className="text-center py-16 text-red-500 text-xl font-semibold">
                {fetchError}
            </div>
        );
    }

    if (!roomData) {
        return (
            <div className="text-center py-16 text-gray-600 text-xl">
                Loading room details...
            </div>
        );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
        <div className="font-sans bg-gray-50 min-h-screen transition-colors duration-300 ease-out">
            <section className="relative h-[60vh] w-full overflow-hidden">
                <Image
                    src={`/images/rooms/${roomData.id}.jpg`}
                    alt={roomData.name}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
                    <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
                        {roomData.name}
                    </h1>
                </div>
            </section>

            <section className="container mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Date Selection */}
                    <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                            Select Your Dates
                        </h2>
                        {validationError && (
                            <p className="text-red-500 text-center mb-4">{validationError}</p>
                        )}
                        <div className="w-full max-w-lg mx-auto">
                            <DayPicker
                                mode="range"
                                selected={selectedDates}
                                onSelect={setSelectedDates}
                                disabled={{ before: today }}
                                className="mx-auto"
                            />
                        </div>
                    </div>

                    {/* Room Details */}
                    <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col justify-between">
                        <div>
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                {roomData.description}
                            </p>
                            <div className="flex items-baseline space-x-2 mb-8">
                                <span className="text-3xl font-bold text-gray-900">
                                    ${roomData.price}
                                </span>
                                <span className="text-lg text-gray-500">/ night</span>
                            </div>
                        </div>
                        <div className="flex justify-center mt-auto">
                            <Button
                                className="py-4 px-10 text-lg font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-lg disabled:opacity-60"
                                onClick={handleBooking}
                                disabled={isLoading}
                            >
                                {isLoading ? "Confirming..." : "Confirm Booking"}
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Additional Information */}
            <section className="container mx-auto px-4 md:px-8 py-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Why Choose This Room?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-xl transition-shadow">
                        <span className="inline-block mb-4 text-blue-600 text-3xl">🛏</span>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Luxurious Comfort
                        </h3>
                        <p className="text-gray-600">
                            Experience world-class bedding and plush furnishings for a restful stay.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-xl transition-shadow">
                        <span className="inline-block mb-4 text-blue-600 text-3xl">🌐</span>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            High-Speed Wi-Fi
                        </h3>
                        <p className="text-gray-600">
                            Stay connected with complimentary high-speed internet throughout your stay.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-xl transition-shadow">
                        <span className="inline-block mb-4 text-blue-600 text-3xl">🍽</span>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Room Service
                        </h3>
                        <p className="text-gray-600">
                            Indulge in gourmet meals delivered straight to your door, day or night.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
