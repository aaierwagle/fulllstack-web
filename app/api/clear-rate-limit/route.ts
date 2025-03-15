import { NextResponse } from "next/server"
import { clearRateLimitStore } from "@/lib/rate-limiter"

// This endpoint is for development purposes only
export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV !== "production") {
    clearRateLimitStore()
    return NextResponse.json({ success: true, message: "Rate limit store cleared (stub function)" })
  }

  return NextResponse.json({ success: false, message: "Not allowed in production" }, { status: 403 })
}

