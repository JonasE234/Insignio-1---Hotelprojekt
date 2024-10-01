import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Rooms() {
  const rooms = [
    {
      name: "Deluxe King Room",
      description: "Spacious room with a king-size bed and city view",
      image: "/placeholder.svg?height=300&width=400",
      features: ["King Bed", "City View", "Free Wi-Fi", "Mini Bar"],
      price: 250,
    },
    {
      name: "Twin Room",
      description: "Comfortable room with two single beds",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "Two Single Beds",
        "Work Desk",
        "Free Wi-Fi",
        "Tea/Coffee Maker",
      ],
      price: 200,
    },
    {
      name: "Family Suite",
      description:
        "Large suite perfect for families, with separate living area",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "King Bed + Sofa Bed",
        "Living Area",
        "Kitchenette",
        "2 Bathrooms",
      ],
      price: 400,
    },
    {
      name: "Executive Suite",
      description:
        "Luxurious suite with panoramic views and executive lounge access",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "King Bed",
        "Panoramic View",
        "Executive Lounge Access",
        "Jacuzzi",
      ],
      price: 500,
    },
  ];

  return (
    <>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-8">
              Our Rooms
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {rooms.map((room, index) => (
                <Card key={index} className="flex flex-col">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <CardHeader>
                    <CardTitle>{room.name}</CardTitle>
                    <CardDescription>{room.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="secondary">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <span className="text-2xl font-bold">${room.price}</span>
                    <span className="text-sm text-gray-500">per night</span>
                    <Button>Book Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
