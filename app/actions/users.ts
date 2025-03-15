"use server"

import { revalidatePath } from "next/cache"

import { connectToDatabase } from "@/lib/db"
import User from "@/lib/models/user"
import { requireAuth, hashPassword } from "@/lib/auth"

// Get all admin users
export async function getAdminUsers() {
  const user = await requireAuth()

  // Only admin users can view the user list
  if (user.role !== "admin") {
    return { success: false, error: "Unauthorized" }
  }

  await connectToDatabase()

  try {
    // Only return username and role, exclude password
    const users = await User.find().select("username role createdAt updatedAt").sort({ createdAt: -1 })
    return { success: true, data: JSON.parse(JSON.stringify(users)) }
  } catch (error) {
    console.error("Error fetching admin users:", error)
    return { success: false, error: "Failed to fetch admin users" }
  }
}

// Create a new admin user
export async function createAdminUser(formData: FormData) {
  const currentUser = await requireAuth()

  // Only admin users can create new users
  if (currentUser.role !== "admin") {
    return { success: false, error: "Unauthorized" }
  }

  await connectToDatabase()

  try {
    const username = formData.get("username") as string
    const password = formData.get("password") as string
    const role = formData.get("role") as "admin" | "staff"

    // Check if username already exists
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return { success: false, error: "Username already exists" }
    }

    // Hash the password
    const hashedPassword = await hashPassword(password)

    // Create the user
    await User.create({
      username,
      password: hashedPassword,
      role,
    })

    revalidatePath("/admin/users")
    return { success: true }
  } catch (error) {
    console.error("Error creating admin user:", error)
    return { success: false, error: "Failed to create admin user" }
  }
}

// Update an admin user
export async function updateAdminUser(id: string, formData: FormData) {
  const currentUser = await requireAuth()

  // Only admin users can update users
  if (currentUser.role !== "admin") {
    return { success: false, error: "Unauthorized" }
  }

  await connectToDatabase()

  try {
    const username = formData.get("username") as string
    const password = formData.get("password") as string
    const role = formData.get("role") as "admin" | "staff"

    // Check if username already exists (excluding the current user)
    const existingUser = await User.findOne({ username, _id: { $ne: id } })
    if (existingUser) {
      return { success: false, error: "Username already exists" }
    }

    // Prepare update data
    const updateData: any = {
      username,
      role,
    }

    // Only update password if provided
    if (password) {
      updateData.password = await hashPassword(password)
    }

    // Update the user
    await User.findByIdAndUpdate(id, updateData)

    revalidatePath("/admin/users")
    return { success: true }
  } catch (error) {
    console.error("Error updating admin user:", error)
    return { success: false, error: "Failed to update admin user" }
  }
}

// Delete an admin user
export async function deleteAdminUser(id: string) {
  const currentUser = await requireAuth()

  // Only admin users can delete users
  if (currentUser.role !== "admin") {
    return { success: false, error: "Unauthorized" }
  }

  await connectToDatabase()

  try {
    // Get the current user count
    const userCount = await User.countDocuments({ role: "admin" })

    // Don't allow deleting the last admin
    if (userCount <= 1) {
      const user = await User.findById(id)
      if (user && user.role === "admin") {
        return { success: false, error: "Cannot delete the last admin user" }
      }
    }

    // Don't allow users to delete themselves
    if (id === currentUser.id) {
      return { success: false, error: "You cannot delete your own account" }
    }

    await User.findByIdAndDelete(id)

    revalidatePath("/admin/users")
    return { success: true }
  } catch (error) {
    console.error("Error deleting admin user:", error)
    return { success: false, error: "Failed to delete admin user" }
  }
}

// Get a single admin user
export async function getAdminUser(id: string) {
  const currentUser = await requireAuth()

  // Only admin users can view user details
  if (currentUser.role !== "admin") {
    return { success: false, error: "Unauthorized" }
  }

  await connectToDatabase()

  try {
    // Only return username and role, exclude password
    const user = await User.findById(id).select("username role")
    if (!user) {
      return { success: false, error: "User not found" }
    }
    return { success: true, data: JSON.parse(JSON.stringify(user)) }
  } catch (error) {
    console.error("Error fetching admin user:", error)
    return { success: false, error: "Failed to fetch admin user" }
  }
}

