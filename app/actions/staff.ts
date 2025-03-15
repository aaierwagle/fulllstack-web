"use server"

import { revalidatePath } from "next/cache"

import { connectToDatabase } from "@/lib/db"
import Staff from "@/lib/models/staff"
import { requireAuth } from "@/lib/auth"

// Create a new staff member
export async function createStaff(formData: FormData) {
  await requireAuth()
  await connectToDatabase()

  try {
    const name = formData.get("name") as string
    const role = formData.get("role") as string
    const bio = formData.get("bio") as string
    const image = formData.get("image") as string
    const active = formData.get("active") === "true"

    await Staff.create({
      name,
      role,
      bio,
      image,
      active,
    })

    revalidatePath("/admin/staff")
    revalidatePath("/staff")
    return { success: true }
  } catch (error) {
    console.error("Error creating staff member:", error)
    return { success: false, error: "Failed to create staff member" }
  }
}

// Update a staff member
export async function updateStaff(id: string, formData: FormData) {
  await requireAuth()
  await connectToDatabase()

  try {
    const name = formData.get("name") as string
    const role = formData.get("role") as string
    const bio = formData.get("bio") as string
    const image = formData.get("image") as string
    const active = formData.get("active") === "true"

    await Staff.findByIdAndUpdate(id, {
      name,
      role,
      bio,
      image,
      active,
    })

    revalidatePath("/admin/staff")
    revalidatePath("/staff")
    return { success: true }
  } catch (error) {
    console.error("Error updating staff member:", error)
    return { success: false, error: "Failed to update staff member" }
  }
}

// Delete a staff member
export async function deleteStaff(id: string) {
  await requireAuth()
  await connectToDatabase()

  try {
    await Staff.findByIdAndDelete(id)

    revalidatePath("/admin/staff")
    revalidatePath("/staff")
    return { success: true }
  } catch (error) {
    console.error("Error deleting staff member:", error)
    return { success: false, error: "Failed to delete staff member" }
  }
}

// Get all staff members
export async function getStaffMembers() {
  await connectToDatabase()

  try {
    const staff = await Staff.find().sort({ createdAt: -1 })
    return { success: true, data: JSON.parse(JSON.stringify(staff)) }
  } catch (error) {
    console.error("Error fetching staff members:", error)
    return { success: false, error: "Failed to fetch staff members" }
  }
}

// Get a single staff member
export async function getStaffMember(id: string) {
  await connectToDatabase()

  try {
    const staff = await Staff.findById(id)
    if (!staff) {
      return { success: false, error: "Staff member not found" }
    }
    return { success: true, data: JSON.parse(JSON.stringify(staff)) }
  } catch (error) {
    console.error("Error fetching staff member:", error)
    return { success: false, error: "Failed to fetch staff member" }
  }
}

