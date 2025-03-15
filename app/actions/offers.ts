"use server"

import { revalidatePath } from "next/cache"

import { connectToDatabase } from "@/lib/db"
import Offer from "@/lib/models/offer"
import { requireAuth } from "@/lib/auth"

// Create a new offer
export async function createOffer(formData: FormData) {
  await requireAuth()
  await connectToDatabase()

  try {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const validUntil = formData.get("validUntil") as string
    const image = formData.get("image") as string
    const badge = formData.get("badge") as string
    const active = formData.get("active") === "true"

    await Offer.create({
      title,
      description,
      validUntil,
      image,
      badge,
      active,
    })

    revalidatePath("/admin/offers")
    revalidatePath("/offers")
    return { success: true }
  } catch (error) {
    console.error("Error creating offer:", error)
    return { success: false, error: "Failed to create offer" }
  }
}

// Update an offer
export async function updateOffer(id: string, formData: FormData) {
  await requireAuth()
  await connectToDatabase()

  try {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const validUntil = formData.get("validUntil") as string
    const image = formData.get("image") as string
    const badge = formData.get("badge") as string
    const active = formData.get("active") === "true"

    await Offer.findByIdAndUpdate(id, {
      title,
      description,
      validUntil,
      image,
      badge,
      active,
    })

    revalidatePath("/admin/offers")
    revalidatePath("/offers")
    return { success: true }
  } catch (error) {
    console.error("Error updating offer:", error)
    return { success: false, error: "Failed to update offer" }
  }
}

// Delete an offer
export async function deleteOffer(id: string) {
  await requireAuth()
  await connectToDatabase()

  try {
    await Offer.findByIdAndDelete(id)

    revalidatePath("/admin/offers")
    revalidatePath("/offers")
    return { success: true }
  } catch (error) {
    console.error("Error deleting offer:", error)
    return { success: false, error: "Failed to delete offer" }
  }
}

// Get all offers
export async function getOffers() {
  await connectToDatabase()

  try {
    const offers = await Offer.find().sort({ createdAt: -1 })
    return { success: true, data: JSON.parse(JSON.stringify(offers)) }
  } catch (error) {
    console.error("Error fetching offers:", error)
    return { success: false, error: "Failed to fetch offers" }
  }
}

// Get a single offer
export async function getOffer(id: string) {
  await connectToDatabase()

  try {
    const offer = await Offer.findById(id)
    if (!offer) {
      return { success: false, error: "Offer not found" }
    }
    return { success: true, data: JSON.parse(JSON.stringify(offer)) }
  } catch (error) {
    console.error("Error fetching offer:", error)
    return { success: false, error: "Failed to fetch offer" }
  }
}

