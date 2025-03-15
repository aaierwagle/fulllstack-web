import { NextResponse } from "next/server"
import { seedAdminUser } from "@/lib/seed"

export async function GET() {
  try {
    const result = await seedAdminUser()

    return NextResponse.json(
      {
        success: result.success,
        message: result.message,
        error: result.error,
      },
      { status: result.success ? 200 : 400 },
    )
  } catch (error) {
    console.error("Seed error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred",
      },
      { status: 500 },
    )
  }
}

