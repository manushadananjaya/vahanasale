import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Ensure your prisma client is setup properly in lib/prisma.ts

// Function to sanitize strings by removing NULL bytes
function sanitizeString(input: string | null): string | null {
  if (!input) return input;
  return input.replace(/\0/g, ""); // Remove all NULL bytes
}

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();

    console.log("Creating ad with body:", body);

    // Extract the data fields for the ad
    const {
      price,
      brand,
      model,
      year,
      mileage,
      type, // AdType Enum: VEHICLE or BIKE
      engineCC,
      details,
      userId, // Foreign key referencing User
      images, // Array of images (assume you send an array from frontend)
      gearType, // Only for vehicles
      fuelType, // Only for vehicles
      startType, // Only for bikes
      bikeType, // Only for bikes
    } = body;

    const parsedUserId = parseInt(userId, 10);

    // Sanitize image strings
    const sanitizedImages =
      images?.map((img: string) => sanitizeString(img)) || [];

    // Create a new ad using Prisma
    const ad = await prisma.ad.create({
      data: {
        price,
        brand: sanitizeString(brand) || "",
        model: sanitizeString(model) ?? "",
        year,
        mileage,
        vehicleType: type,
        engine: engineCC,
        details: sanitizeString(details) || null,
        posted: false,
        user: {
          connect: { userId: parsedUserId }, // Connect to an existing user by userId
        },
        images: sanitizedImages, // Store all images in the array field
        gear: type === "VEHICLE" ? gearType : null, // Only include if it's a vehicle
        fuelType: type === "VEHICLE" ? fuelType : null, // Only include if it's a vehicle
        startType: type === "BIKE" ? startType : null, // Only include if it's a bike
        bikeType: type === "BIKE" ? bikeType : null, // Only include if it's a bike
      },
    });

    // Return the newly created ad as a JSON response
    return NextResponse.json(ad, { status: 201 });
  } catch (error) {
    console.error("Error creating ad:", error);
    return NextResponse.json({ error: "Failed to create ad" }, { status: 500 });
  }
}