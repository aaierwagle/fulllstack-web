import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import Offer from "@/lib/models/offer"
import { getUser } from "@/lib/auth"

export async function GET() {
  try {
    // Check authentication
    const user = await getUser()
    console.log(user)
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const offers = await Offer.find().sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      data: JSON.parse(JSON.stringify(offers)),
    })
  } catch (error) {
    console.error("Error fetching offers:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch offers" }, { status: 500 })
  }
}

