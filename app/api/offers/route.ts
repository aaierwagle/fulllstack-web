import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import Offer from "@/lib/models/offer"

export async function GET() {
  try {
    await connectToDatabase()
    const offers = await Offer.find({ active: true }).sort({ createdAt: -1 })

    // Convert MongoDB documents to plain objects and ensure consistent structure
    const serializedOffers = offers.map((offer) => ({
      _id: offer._id.toString(),
      title: offer.title || "",
      description: offer.description || "",
      validUntil: offer.validUntil || "Ongoing",
      image: offer.image || null,
      badge: offer.badge || null,
      active: !!offer.active,
    }))

    return NextResponse.json({
      success: true,
      data: serializedOffers,
    })
  } catch (error) {
    console.error("Error fetching offers:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch offers" }, { status: 500 })
  }
}

