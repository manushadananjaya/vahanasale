"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import VehicleCard from "../app/search/components/vehicle-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { generateVehicleSlug } from "@/utils/generateSlug";

// Define the Vehicle type
type Vehicle = {
  adId: number;
  vehicleType: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  images: string[];
  user: {
    userDistrict: string;
    userCity: string;
  };
  isFeatured: boolean;
  isPromoted: boolean;
  postedAt: string;
};

export default function FeaturedAds() {
  const [featuredAds, setFeaturedAds] = useState<Vehicle[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchFeaturedAds = async () => {
      try {
        const response = await fetch("/api/featured-ads");
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setFeaturedAds(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedAds();
  }, []);

  if (error) {
    return (
      <Card className="w-full p-4">
        <h2 className="text-2xl font-bold mb-4">Featured Ads</h2>
        <div className="text-red-500">
          Failed to load featured ads. Please try again later.
        </div>
      </Card>
    );
  }

  if (loading) {
    return (
      <section className="py-11 p-3 bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Featured Ads</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-[300px] w-full rounded-lg" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-11 p-3 bg-gray-50">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {featuredAds && featuredAds.map((vehicle) => (
            <CarouselItem
              key={vehicle.adId}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <Link href={`/vehicles/${generateVehicleSlug(vehicle)}`}>
                  <VehicleCard vehicle={vehicle} isGridView={true} />
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="relative top-5">
          <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-2 z-10" />
          <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-2 z-10" />
        </div>
      </Carousel>
    </section>
  );
}
