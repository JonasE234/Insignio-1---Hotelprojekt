"use client"
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
import React from "react";
import {user} from "@/components/data/user";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <img
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="550"
                src="/images/landing_page/landing_page_01.jpg"
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Welcome to Luxury Hotel
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Indulge in the epitome of elegance and comfort at Luxury Hotel, where every detail is designed to redefine your idea of luxury. Our exquisite rooms and suites blend timeless sophistication with modern amenities, offering a serene escape for discerning travelers. From plush bedding to bespoke furnishings, every element is thoughtfully curated to ensure an unforgettable stay.
                  Whether you're here for leisure or business, Luxury Hotel invites you to experience unparalleled refinement in the heart of your destination. Welcome to a world where comfort meets grandeur.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button><Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="/rooms">
                  Rooms
                </Link>
                </Button>
                  <Button variant="outline"><Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="/about">Learn more about us</Link></Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Our Rooms
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Intuitive Design",
                  description:
                    "Our user-friendly interface ensures a smooth experience for all users.",
                  image: "/placeholder.svg?height=100&width=100",
                },
                {
                  title: "Powerful Analytics",
                  description:
                    "Gain valuable insights with our advanced analytics tools.",
                  image: "/placeholder.svg?height=100&width=100",
                },
                {
                  title: "Secure & Reliable",
                  description:
                    "Your data is safe with our top-notch security measures.",
                  image: "/placeholder.svg?height=100&width=100",
                },
              ].map((card, index) => (
                <Card key={index}>
                  <CardHeader>
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-16 h-16 mb-4"
                    />
                    <CardTitle>{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{card.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section> */}

        {/* Text Paragraph Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-8">
              About Our Company
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            At Luxury Hotel, we are dedicated to crafting exceptional experiences that go beyond hospitality. With a passion for excellence and a commitment to unparalleled service, we strive to create a sanctuary of comfort and sophistication for our guests.
            Our philosophy is rooted in attention to detail, where every element – from architecture to ambiance – is thoughtfully designed to deliver elegance and refinement. Guided by innovation and tradition, we aim to set new standards in luxury and hospitality.
            Welcome to a world where your satisfaction is our highest priority. Welcome to Luxury Hotel.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
