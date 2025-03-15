import { NextResponse } from "next/server"
import { seedAdminUser } from "@/lib/seed"

// This route will be called automatically when the app starts
export async function GET() {
  try {
    // Run the seed function
    await seedAdminUser()

    // Return a success response
    return NextResponse.json({ message: "Initialization complete" }, { status: 200 })
  } catch (error) {
    console.error("Initialization error:", error)
    return NextResponse.json({ error: "Initialization failed" }, { status: 500 })
  }
}

