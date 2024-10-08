import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET() {
  try {
    const featuredBikes = await prisma.featuredItem.findMany({
      where: { bikeId: { not: null } },
      include: {
        bike: true, // Fetch the full bike details
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(featuredBikes);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching featured bikes" },
      { status: 500 }
    );
  }
}
