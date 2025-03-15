import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import Staff from "@/lib/models/staff"

export async function GET() {
  try {
    await connectToDatabase()
    const staff = await Staff.find({ active: true }).sort({ name: 1 })

    // Convert MongoDB documents to plain objects and ensure consistent structure
    const serializedStaff = staff.map((person) => ({
      _id: person._id.toString(),
      name: person.name || "",
      role: person.role || "",
      bio: person.bio || "",
      image: person.image || null,
      active: !!person.active,
    }))

    return NextResponse.json({
      success: true,
      data: serializedStaff,
    })
  } catch (error) {
    console.error("Error fetching staff:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch staff" }, { status: 500 })
  }
}

