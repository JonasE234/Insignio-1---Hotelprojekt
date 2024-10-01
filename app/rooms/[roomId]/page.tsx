"use client";

import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
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
import { Separator } from "@/components/ui/separator";
import { Star, Wifi, Parking, Coffee, Utensils, Tv } from "lucide-react";
import { Key, useEffect, useState } from "react";
import { useParams } from "next/navigation";

const mockRoomData = {
  id: 1,
  name: "Deluxe Ocean View Suite",
  description:
    "Spacious suite with breathtaking ocean views, perfect for a luxurious getaway.",
  price: 299,
  capacity: 2,
  size: "45 m²",
  bed: "1 King Bed",
  rating: 4.8,
  reviews: 124,
  amenities: [
    "Free Wi-Fi",
    "Parking",
    "Coffee Maker",
    "Mini Kitchen",
    "Smart TV",
  ],
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
};

async function fetchRoomData(id: string) {
  if (id === "1") {
    return mockRoomData;
  }
  throw new Error("Not Found");
}

export default function RoomDetailPage() {
  const [roomData, setRoomData] = useState<typeof mockRoomData | null>(null);
  const [error, setError] = useState<unknown | null>(null);
  const params = useParams<{ roomId: string }>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRoomData(params.roomId);
        setRoomData(data);
      } catch (error: unknown) {
        setError(error);
      }
    };
    fetchData();
  }, [params.roomId]);

  if (error) {
    return <div>Fehler: {error.message}</div>;
  }

  if (!roomData) {
    return <div>Lade Daten...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{roomData.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="relative h-[400px] mb-4 rounded-lg overflow-hidden">
            <Image
              src={roomData.images[0]}
              alt={roomData.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {roomData.images.slice(1).map((image, index) => (
              <div
                key={index}
                className="relative h-[200px] rounded-lg overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`${roomData.name} - Image ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Room Details</CardTitle>
              <CardDescription>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{roomData.rating}</span>
                  <span className="text-muted-foreground">
                    ({roomData.reviews} reviews)
                  </span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{roomData.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="font-semibold">Capacity:</span>{" "}
                  {roomData.capacity} guests
                </div>
                <div>
                  <span className="font-semibold">Size:</span> {roomData.size}
                </div>
                <div>
                  <span className="font-semibold">Bed:</span> {roomData.bed}
                </div>
              </div>
              <Separator className="my-4" />
              <h3 className="font-semibold mb-2">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {roomData.amenities.map((amenity: string, index: Key) => (
                  <Badge key={index} variant="secondary">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold">${roomData.price}</span>
                  <span className="text-muted-foreground">per night</span>
                </div>
                <Button className="w-full">Book Now</Button>
              </div>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Check Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar mode="range" className="rounded-md border" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
