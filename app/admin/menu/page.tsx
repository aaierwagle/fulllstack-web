"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Loader2 } from "lucide-react"
import { fetchData } from "@/lib/client-fetch"
import { Button } from "@/components/ui/button"
import { MenuItemsTable } from "@/components/admin/menu-items-table"

interface MenuItem {
  _id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
  available: boolean
}

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadMenuItems() {
      try {
        setLoading(true)
        // Use the admin-specific endpoint that returns all items
        const response = await fetchData<{ success: boolean; data: MenuItem[] }>("/api/admin/menu")

        if (response.success) {
          setMenuItems(response.data)
        } else {
          setError("Failed to load menu items")
        }
      } catch (err) {
        console.error("Error loading menu items:", err)
        setError("An error occurred while loading menu items")
      } finally {
        setLoading(false)
      }
    }

    loadMenuItems()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading menu items...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-lg">
        <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Menu Items</h1>
        <Button asChild>
          <Link href="/admin/menu/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Item
          </Link>
        </Button>
      </div>

      <MenuItemsTable items={menuItems} />
    </div>
  )
}

