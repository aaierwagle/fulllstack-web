import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { MenuItemForm } from "@/components/admin/menu-item-form"
import { connectToDatabase } from "@/lib/db"
import MenuItem from "@/lib/models/menu-item"
import { AdminNav } from "@/components/admin-nav"

export const metadata: Metadata = {
  title: "Edit Menu Item | Admin",
  description: "Edit a menu item",
}

export default async function EditMenuItemPage({ params }: { params: { id: string } }) {
  await connectToDatabase()
  const menuItem = await MenuItem.findById(params.id)

  if (!menuItem) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Menu Item</h1>

      <AdminNav />

      <MenuItemForm item={JSON.parse(JSON.stringify(menuItem))} />
    </div>
  )
}

