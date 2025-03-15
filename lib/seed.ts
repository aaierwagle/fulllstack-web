"use server"

import { connectToDatabase } from "@/lib/db"
import User from "@/lib/models/user"
import { hashPassword } from "@/lib/auth"
import { ensureServerOnly } from "./server-only"

// Ensure this code only runs on the server
ensureServerOnly()

export async function seedAdminUser() {
  try {
    await connectToDatabase()

    // Check if any admin user exists
    const adminExists = await User.findOne({ role: "admin" })

    if (!adminExists) {
      // Create default admin user
      const hashedPassword = await hashPassword("admin123")

      await User.create({
        username: "admin",
        password: hashedPassword,
        role: "admin",
      })

      console.log("Default admin user created successfully")
      return { success: true, message: "Default admin user created successfully" }
    }

    return { success: true, message: "Admin user already exists" }
  } catch (error) {
    console.error("Error seeding admin user:", error)
    return { success: false, error: "Failed to seed admin user" }
  }
}

