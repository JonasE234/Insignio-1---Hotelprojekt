"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RoomData {
  id: number;
  name: string;
  description: string;
  features: string[];
  price: number;
  rating?: number;
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/rooms");
        if (!response.ok) {
          throw new Error("Failed to fetch room data");
        }
        const data: RoomData[] = await response.json();
        setRooms(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) return <div className="text-center py-16 text-gray-600 text-xl">Loading rooms...</div>;
  if (error) return <div className="text-center py-16 text-red-500 text-xl font-semibold">Error: {error}</div>;

  return (
      <div className="font-sans bg-gray-50 min-h-screen">
        <section className="relative h-[10vh] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent"></div>
        </section>
        <section className="container mx-auto px-4 md:px-8 pt-4 pb-8">
          <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {rooms.map((room) => (
                <Link
                    href={`/rooms/${room.id}`}
                    key={room.id}
                    className="focus:outline-none"
                >
                  <Card
                      className="flex flex-col rounded-xl overflow-hidden shadow transition-shadow hover:shadow-lg bg-white h-full"
                  >
                    {/* Image */}
                    <div className="relative h-48 w-full">
                      <img
                          src={`/images/rooms/${room.id}.jpg`}
                          alt={room.name}
                          className="absolute inset-0 w-full h-full object-cover rounded-t-xl"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      {/* Title and Rating */}
                      <div>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg font-semibold text-gray-900">
                            {room.name}
                          </CardTitle>
                          {room.rating && (
                              <div className="flex items-center text-gray-800">
                                <span className="text-yellow-500 text-md mr-1">⭐</span>
                                <span className="text-sm font-medium">{room.rating}</span>
                              </div>
                          )}
                        </div>
                        <CardDescription className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {room.description}
                        </CardDescription>
                      </div>

                      {/* Features */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {room.features.slice(0, 3).map((feature, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200"
                            >
                              {feature}
                            </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <CardFooter className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                      <div>
                        <span className="text-lg font-bold text-gray-900">${room.price}</span>
                        <span className="text-sm text-gray-500"> / night</span>
                      </div>
                      <Button
                          size="sm"
                          className="rounded-full border border-gray-300 text-gray-700 px-4 py-2 transition-all duration-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
            ))}
          </div>
        </section>
      </div>
  );
}
