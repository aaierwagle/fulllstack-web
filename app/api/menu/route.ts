import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import MenuItem from "@/lib/models/menu-item"

export async function GET() {
  try {
    await connectToDatabase()
    const menuItems = await MenuItem.find({ available: true }).sort({ category: 1 })

    // Convert MongoDB documents to plain objects and ensure consistent structure
    const serializedItems = menuItems.map((item) => ({
      _id: item._id.toString(),
      name: item.name || "",
      description: item.description || "",
      price: typeof item.price === "number" ? item.price : 0,
      category: item.category || "coffee",
      image: item.image || null,
      available: !!item.available,
    }))

    return NextResponse.json({
      success: true,
      data: serializedItems,
    })
  } catch (error) {
    console.error("Error fetching menu items:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch menu items" }, { status: 500 })
  }
}

