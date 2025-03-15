"use server"

import { revalidatePath } from "next/cache"

import { connectToDatabase } from "@/lib/db"
import MenuItem from "@/lib/models/menu-item"
import { requireAuth } from "@/lib/auth"

// Create a new menu item
export async function createMenuItem(formData: FormData) {
  await requireAuth()
  await connectToDatabase()

  try {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const category = formData.get("category") as string
    const image = formData.get("image") as string
    const available = formData.get("available") === "true"

    await MenuItem.create({
      name,
      description,
      price,
      category,
      image,
      available,
    })

    revalidatePath("/admin/menu")
    revalidatePath("/menu")
    return { success: true }
  } catch (error) {
    console.error("Error creating menu item:", error)
    return { success: false, error: "Failed to create menu item" }
  }
}

// Update a menu item
export async function updateMenuItem(id: string, formData: FormData) {
  await requireAuth()
  await connectToDatabase()

  try {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const category = formData.get("category") as string
    const image = formData.get("image") as string
    const available = formData.get("available") === "true"

    await MenuItem.findByIdAndUpdate(id, {
      name,
      description,
      price,
      category,
      image,
      available,
    })

    revalidatePath("/admin/menu")
    revalidatePath("/menu")
    return { success: true }
  } catch (error) {
    console.error("Error updating menu item:", error)
    return { success: false, error: "Failed to update menu item" }
  }
}

// Delete a menu item
export async function deleteMenuItem(id: string) {
  await requireAuth()
  await connectToDatabase()

  try {
    await MenuItem.findByIdAndDelete(id)

    revalidatePath("/admin/menu")
    revalidatePath("/menu")
    return { success: true }
  } catch (error) {
    console.error("Error deleting menu item:", error)
    return { success: false, error: "Failed to delete menu item" }
  }
}

// Get all menu items
export async function getMenuItems() {
  await connectToDatabase()

  try {
    const items = await MenuItem.find().sort({ createdAt: -1 })
    return { success: true, data: JSON.parse(JSON.stringify(items)) }
  } catch (error) {
    console.error("Error fetching menu items:", error)
    return { success: false, error: "Failed to fetch menu items" }
  }
}

// Get a single menu item
export async function getMenuItem(id: string) {
  await connectToDatabase()

  try {
    const item = await MenuItem.findById(id)
    if (!item) {
      return { success: false, error: "Menu item not found" }
    }
    return { success: true, data: JSON.parse(JSON.stringify(item)) }
  } catch (error) {
    console.error("Error fetching menu item:", error)
    return { success: false, error: "Failed to fetch menu item" }
  }
}

