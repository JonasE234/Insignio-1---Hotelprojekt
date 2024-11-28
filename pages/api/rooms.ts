import { NextApiRequest, NextApiResponse } from "next";

const rooms = [
    {
        id: 1,
        name: "Deluxe King Room",
        description: "A luxurious room with a king bed and city view.",
        image: "/rooms/images/deluxe_king_room.jpg",
        features: ["King Bed", "City View", "Free Wi-Fi", "Mini Bar"],
        price: 250,
        rating: 4.8,
    },
    {
        id: 2,
        name: "Twin Room",
        description: "A cozy room with two single beds and modern amenities.",
        image: "/rooms/images/twin_room.jpg",
        features: ["Two Single Beds", "Work Desk", "Free Wi-Fi", "Tea/Coffee Maker"],
        price: 200,
        rating: 4.2,
    },
    {
        id: 3,
        name: "Family Suite",
        description: "Spacious suite perfect for families, with separate living area.",
        image: "/rooms/images/family_suite.jpg",
        features: ["King Bed", "Sofa Bed", "Living Area", "Kitchenette"],
        price: 400,
        rating: 4.7,
    },
    {
        id: 4,
        name: "Executive Suite",
        description: "Luxurious suite with panoramic views and executive lounge access.",
        image: "/rooms/images/executive_suite.jpg",
        features: ["King Bed", "Panoramic Views", "Jacuzzi", "Lounge Access"],
        price: 500,
        rating: 4.9,
    },
    {
        id: 5,
        name: "Budget Room",
        description: "Affordable comfort for budget travelers.",
        image: "/rooms/images/budget_room.jpg",
        features: ["Single Bed", "Free Wi-Fi", "Shared Bathroom"],
        price: 100,
        rating: 3.8,
    },
    {
        id: 6,
        name: "Couple's Retreat",
        description: "A romantic suite designed for couples.",
        image: "/rooms/images/couples_retreat.jpg",
        features: ["King Bed", "Private Balcony", "Jacuzzi", "Romantic Lighting"],
        price: 350,
        rating: 4.5,
    },
    {
        id: 7,
        name: "Eco-Friendly Room",
        description: "Stay green with our eco-friendly rooms.",
        image: "/rooms/images/eco_friendly_room.jpg",
        features: ["Recycled Materials", "Solar Power", "Water-Saving Fixtures"],
        price: 220,
        rating: 4.3,
    },
    {
        id: 8,
        name: "Luxury Penthouse",
        description: "Experience ultimate luxury with a private rooftop pool and terrace.",
        image: "/rooms/images/luxury_penthouse.jpg",
        features: ["Private Pool", "Rooftop Terrace", "Panoramic City Views", "Smart Home System"],
        price: 1500,
        rating: 5.0,
    },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === "GET") {
        if (id) {
            const room = rooms.find((r) => r.id === Number(id));
            if (room) {
                res.status(200).json(room);
            } else {
                res.status(404).json({ error: "Room not found" });
            }
        } else {
            res.status(200).json(rooms);
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
