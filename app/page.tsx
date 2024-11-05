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
                src="/placeholder.svg?height=550&width=550"
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Welcome to Our Amazing Product
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Discover the power of innovation. Our product is designed to
                    revolutionize your workflow and boost productivity.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button>Get Started</Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Our Features
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
        </section>

        {/* Text Paragraph Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-8">
              About Our Company
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              At Acme Inc., we believe in pushing the boundaries of what's
              possible. Founded in 2010, our company has been at the forefront
              of technological innovation, consistently delivering products that
              make a difference in people's lives. Our team of dedicated
              professionals works tirelessly to ensure that we not only meet but
              exceed our customers' expectations. We're committed to
              sustainability, ethical practices, and fostering a culture of
              continuous learning and improvement. As we look to the future,
              we're excited about the possibilities that lie ahead and the
              positive impact we can make in the world through our innovative
              solutions.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
