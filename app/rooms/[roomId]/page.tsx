"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {api} from "@/components/data/api";

interface RoomData {
  id: number;
  name: string;
  description: string;
  features: string[];
  price: number;
  rating?: number;
  long_description: string;
}

export default function RoomDetailPage() {
  const params = useParams<{ roomId: string }>();
  const router = useRouter();
  const roomId = params?.roomId;

  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!roomId) {
      setError("No room ID provided.");
      setLoading(false);
      return;
    }

    const fetchRoomData = async () => {
      try {
        await api.call('Rooms/getRoomData', 'POST', setRoomData, [roomId]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [roomId]);

  if (loading) return <div className="text-center py-16 text-gray-600 text-xl">Loading room details...</div>;
  if (error) return <div className="text-center py-16 text-red-500 text-xl font-semibold">Error: {error}</div>;
  if (!roomData) return <div className="text-center py-16 text-gray-600 text-xl">No room data available</div>;

  return (
      <div className="font-sans bg-gray-50 min-h-screen">
        <section className="relative h-[60vh] w-full overflow-hidden">
          <Image
              src={`/images/rooms/${roomData.id}.jpg`}
              alt={roomData.name}
              fill
              className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">{roomData.name}</h1>
          </div>
        </section>

        <section className="container mx-auto px-4 md:px-8 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Room Info Section */}
              <div className="md:col-span-2">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{roomData.name}</h2>
                {roomData.rating && (
                    <div className="flex items-center mb-6">
                      <span className="text-yellow-500 mr-2 text-2xl">⭐</span>
                      <span className="text-gray-800 font-semibold text-lg">{roomData.rating}/5</span>
                    </div>
                )}
                <p className="text-lg text-gray-700 leading-relaxed">{roomData.description}</p>
              </div>

              {/* Price and Booking Section */}
              <div className="md:col-span-1 flex flex-col justify-center">
                <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-8 md:pt-0 md:pl-8">
                  <div className="mb-6">
                    <div className="flex items-baseline space-x-2 mb-2">
                      <span className="text-3xl font-bold text-gray-900">${roomData.price}</span>
                      <span className="text-lg text-gray-500">/ night</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Includes taxes & fees. Free cancellation until 24 hours before check-in.
                    </p>
                  </div>
                  <Button
                      className="w-full py-4 text-lg font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-lg"
                      onClick={() => router.push(`/rooms/${roomId}/booking`)}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Why Choose This Room?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-xl transition-shadow flex flex-col items-center justify-center">
                <span className="inline-block mb-4 text-blue-600 text-3xl">🛏</span>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Luxurious Comfort</h3>
                <p className="text-gray-600">World-class bedding and plush furnishings for ultimate relaxation.</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-xl transition-shadow flex flex-col items-center justify-center">
                <span className="inline-block mb-4 text-blue-600 text-3xl">🌐</span>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">High-Speed Wi-Fi</h3>
                <p className="text-gray-600">Enjoy complimentary high-speed internet during your stay.</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-xl transition-shadow flex flex-col items-center justify-center">
                <span className="inline-block mb-4 text-blue-600 text-3xl">🍽</span>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Room Service</h3>
                <p className="text-gray-600">Gourmet meals delivered straight to your door, day or night.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}
