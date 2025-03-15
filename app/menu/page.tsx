"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { fetchData } from "@/lib/client-fetch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface MenuItem {
  _id: string
  name: string
  description: string
  price: number
  category: string
  image?: string | null
  available: boolean
}

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<{
    coffee: MenuItem[]
    food: MenuItem[]
    pastry: MenuItem[]
  }>({
    coffee: [],
    food: [],
    pastry: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadMenuItems() {
      try {
        setLoading(true)
        const response = await fetchData<{ success: boolean; data: MenuItem[] }>("/api/menu")

        if (response.success && Array.isArray(response.data)) {
          // Group items by category with safer type checking
          const grouped = {
            coffee: [] as MenuItem[],
            food: [] as MenuItem[],
            pastry: [] as MenuItem[],
          }

          response.data.forEach((item) => {
            if (item && typeof item === "object") {
              const category = item.category as keyof typeof grouped
              if (category && grouped[category]) {
                grouped[category].push(item)
              } else if (category === "pastries") {
                // Handle potential category name mismatch
                grouped.pastry.push({ ...item, category: "pastry" })
              }
            }
          })

          setMenuItems(grouped)
        } else {
          setError("Failed to load menu items or invalid data format")
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
      <div className="container py-20 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading menu...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-20">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Our Menu</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our selection of handcrafted coffee, delicious food, and freshly baked pastries.
        </p>
      </div>

      <Tabs defaultValue="coffee" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="coffee">Coffee</TabsTrigger>
          <TabsTrigger value="food">Food</TabsTrigger>
          <TabsTrigger value="pastry">Pastries</TabsTrigger>
        </TabsList>

        <TabsContent value="coffee">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.coffee.length > 0 ? (
              menuItems.coffee.map((item) => <MenuItemCard key={item._id} item={item} />)
            ) : (
              <p className="col-span-3 text-center py-8 text-muted-foreground">No coffee items available.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="food">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.food.length > 0 ? (
              menuItems.food.map((item) => <MenuItemCard key={item._id} item={item} />)
            ) : (
              <p className="col-span-3 text-center py-8 text-muted-foreground">No food items available.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="pastry">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.pastry.length > 0 ? (
              menuItems.pastry.map((item) => <MenuItemCard key={item._id} item={item} />)
            ) : (
              <p className="col-span-3 text-center py-8 text-muted-foreground">No pastry items available.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MenuItemCard({ item }: { item: MenuItem }) {
  // Safely handle potentially undefined or null values
  const { name = "", description = "", price = 0, image = null } = item || {}

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <Image src={image || "/placeholder.svg?height=300&width=300"} alt={name} fill className="object-cover" />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{name}</CardTitle>
          <span className="font-medium text-primary">${typeof price === "number" ? price.toFixed(2) : "0.00"}</span>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  )
}

