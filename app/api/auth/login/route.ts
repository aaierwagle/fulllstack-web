import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import User from "@/lib/models/user"
import { comparePassword, createToken, setTokenCookie } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    // Parse JSON body instead of form data
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json({ success: false, error: "Username and password are required" }, { status: 400 })
    }

    await connectToDatabase()

    // Find user by username
    const user = await User.findOne({ username })

    if (!user) {
      return NextResponse.json({ success: false, error: "Invalid username or password" }, { status: 401 })
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ success: false, error: "Invalid username or password" }, { status: 401 })
    }

    // Create token
    const token = await createToken({
      id: user._id.toString(),
      username: user.username,
      role: user.role,
    })

    // Set token cookie
    await setTokenCookie(token)

    // Return success response
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, error: "An error occurred during login" }, { status: 500 })
  }
}

