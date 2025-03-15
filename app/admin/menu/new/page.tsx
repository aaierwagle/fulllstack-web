import type { Metadata } from "next"
import { MenuItemForm } from "@/components/admin/menu-item-form"
import { AdminNav } from "@/components/admin-nav"

export const metadata: Metadata = {
  title: "Add Menu Item | Admin",
  description: "Add a new menu item",
}

export default function NewMenuItemPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Add Menu Item</h1>

      <AdminNav />

      <MenuItemForm />
    </div>
  )
}

