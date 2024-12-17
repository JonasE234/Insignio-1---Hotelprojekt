"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {api} from "@/components/data/api";

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
        //let data: RoomData[];
        await api.call("Rooms/getAllRooms", 'POST', setRooms, []);

        //const data: RoomData[] = await response.json();
        //setRooms(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) return <div className="text-center py-8">Loading rooms...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Explore Our Rooms</h1>
        <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            style={{
              gridAutoRows: "1fr",
            }}
        >
          {rooms.map((room) => (
              <Link
                  href={`/rooms/${room.id}`}
                  key={room.id}
                  className="hover:shadow-xl transition-shadow"
              >
                <Card className="flex flex-col rounded-lg overflow-hidden shadow-sm h-full">
                  {/* Image */}
                  <div className="relative h-48 w-full">
                    <img
                        src={`/images/rooms/${room.id}.jpg`}
                        alt={room.name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-grow flex flex-col justify-between">
                    {/* Title and rating */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg font-bold">{room.name}</CardTitle>
                        {room.rating && (
                            <div className="text-sm text-gray-600 flex items-center">
                              ⭐ {room.rating}
                            </div>
                        )}
                      </div>
                      {/* Description */}
                      <CardDescription className="text-sm text-gray-500 mt-2 line-clamp-2">
                        {room.description}
                      </CardDescription>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.features.slice(0, 3).map((feature, index) => (
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

                  {/* Footer */}
                  <CardFooter className="p-4 border-t flex justify-between items-center">
                    <div>
                      <span className="text-lg font-bold">${room.price}</span>
                      <span className="text-sm text-gray-500"> / night</span>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
          ))}
        </div>
      </div>
  );
}
