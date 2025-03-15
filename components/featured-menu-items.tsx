"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { fetchData } from "@/lib/client-fetch"
import { Button } from "@/components/ui/button"

interface MenuItem {
  _id: string
  name: string
  price: number
  image?: string | null
}

export function FeaturedMenuItems() {
  const [mounted, setMounted] = useState(false)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    async function loadFeaturedItems() {
      try {
        const response = await fetchData<{ success: boolean; data: MenuItem[] }>("/api/menu")

        if (response.success && Array.isArray(response.data)) {
          const validItems = response.data
            .filter((item): item is MenuItem => 
              Boolean(item && typeof item === "object" && item._id && item.name)
            )
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)

          setMenuItems(validItems)
        } else {
          setError("Failed to load featured items")
        }
      } catch (err) {
        console.error("Error loading featured items:", err)
        setError("An error occurred while loading featured items")
      } finally {
        setLoading(false)
      }
    }

    if (mounted) {
      loadFeaturedItems()
    }
  }, [mounted])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading featured items...</span>
      </div>
    )
  }

  if (error || !menuItems.length) {
    // Fallback to static content
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: "Signature Latte", price: 4.5, image: "/placeholder.svg?height=400&width=400" },
          { name: "Caramel Macchiato", price: 5.0, image: "/placeholder.svg?height=400&width=400" },
          { name: "Avocado Toast", price: 8.5, image: "/placeholder.svg?height=400&width=400" },
          { name: "Blueberry Muffin", price: 3.75, image: "/placeholder.svg?height=400&width=400" },
        ].map((item, index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg">
            <div className="aspect-square relative">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={`${item.name} - a featured menu item at Brew Haven Coffee`}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}

        <div className="mt-12 text-center col-span-full">
          <Button asChild size="lg">
            <Link href="/menu">View Full Menu</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {menuItems.map((item) => {
        // Safely handle potentially undefined or null values
        const { _id = "", name = "", price = 0, image = null } = item || {}

        return (
          <div key={_id} className="group relative overflow-hidden rounded-lg">
            <div className="aspect-square relative">
              <Image
                src={image || "/placeholder.svg?height=400&width=400"}
                alt={`${name} - a featured menu item at Brew Haven Coffee`}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white">
              <h3 className="font-bold text-lg">{name}</h3>
              <p>${typeof price === "number" ? price.toFixed(2) : "0.00"}</p>
            </div>
          </div>
        )
      })}

      <div className="mt-12 text-center col-span-full">
        <Button asChild size="lg">
          <Link href="/menu">View Full Menu</Link>
        </Button>
      </div>
    </div>
  )
}

