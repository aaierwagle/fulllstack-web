"use server"
import { redirect } from "next/navigation"

import { connectToDatabase } from "@/lib/db"
import User from "@/lib/models/user"
import { comparePassword, createToken, setTokenCookie, logout as logoutUser } from "@/lib/auth"

// Login action
export async function login({ username, password }: { username: string; password: string }) {
  try {
    if (!username || !password) {
      return { success: false, error: "Username and password are required" }
    }

    await connectToDatabase()

    // Find user by username
    const user = await User.findOne({ username })

    if (!user) {
      return { success: false, error: "Invalid username or password" }
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password)

    if (!isPasswordValid) {
      return { success: false, error: "Invalid username or password" }
    }

    // Create token
    const token = await createToken({
      id: user._id.toString(),
      username: user.username,
      role: user.role,
    })

    // Set token cookie
    await setTokenCookie(token)

    return { success: true }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "An error occurred during login" }
  }
}

// Logout action
export async function logout() {
  try {
    await logoutUser()
    redirect("/admin/login")
  } catch (error) {
    console.error("Logout error:", error)
    // Still redirect even if there's an error
    redirect("/admin/login")
  }
}

