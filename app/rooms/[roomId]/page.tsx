"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RoomData {
  id: number;
  name: string;
  description: string;
  features: string[];
  price: number;
  rating?: number;
}

export default function RoomDetailPage() {
  const params = useParams<{ roomId: string }>();
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
        const response = await fetch(`/api/rooms?id=${roomId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch room data");
        }
        const data = await response.json();
        setRoomData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [roomId]);

  if (loading) return <div className="text-center py-8">Loading room details...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!roomData) return <div className="text-center py-8">No room data available</div>;

  return (
      <div className="container mx-auto px-6 py-12">
        {/* Image */}
        <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-md mb-8">
          <Image
              src={`/images/rooms/${roomId}.jpg`}
              alt={roomData.name}
              fill
              className="object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{roomData.name}</h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {roomData.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-2">
              {roomData.features.map((feature, index) => (
                  <Badge
                      key={index}
                      variant="secondary"
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg transition-all hover:bg-gray-200 hover:shadow-sm"
                  >
                    {feature}
                  </Badge>
              ))}
            </div>
          </div>

          {/* Price and booking */}
          <div className="md:col-span-1">
            <div className="bg-white border rounded-lg shadow-md p-6">
              {/* Price */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-3xl font-bold text-gray-900">${roomData.price}</span>
                  <span className="text-sm text-gray-500"> / night</span>
                </div>
                <div className="flex items-center text-gray-600">
                  {roomData.rating && (
                      <>
                        <span className="text-lg font-semibold mr-1">{roomData.rating}</span>
                        <span>⭐</span>
                      </>
                  )}
                </div>
              </div>

              {/* Booking details */}
              <div className="mb-4 text-sm text-gray-600">
                <p>This price includes taxes and fees.</p>
                <p>Free cancellation available until 24 hours before check-in.</p>
              </div>

              {/* Button */}
              <Button className="w-full py-4 text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all">
                Book Now
              </Button>
            </div>
          </div>
        </div>

        {/* Additional information */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why You'll Love This Room</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            This room offers everything you need for a memorable stay. From luxurious
            furnishings to modern amenities, every detail has been designed to ensure your
            comfort. Whether you're relaxing with a stunning view or enjoying the premium
            facilities, you'll find this room is perfect for both business and leisure
            travelers.
          </p>
        </div>
      </div>
  );
}
