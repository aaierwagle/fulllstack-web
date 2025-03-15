"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { CalendarDays, Loader2 } from "lucide-react"
import { fetchData } from "@/lib/client-fetch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Offer {
  _id: string
  title: string
  description: string
  validUntil: string
  image?: string
  badge?: string
  active: boolean
}

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadOffers() {
      try {
        setLoading(true)
        const response = await fetchData<{ success: boolean; data: Offer[] }>("/api/offers")

        if (response.success) {
          setOffers(response.data)
        } else {
          setError("Failed to load offers")
        }
      } catch (err) {
        console.error("Error loading offers:", err)
        setError("An error occurred while loading offers")
      } finally {
        setLoading(false)
      }
    }

    loadOffers()
  }, [])

  if (loading) {
    return (
      <div className="container py-20 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading offers...</span>
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
        <h1 className="text-4xl font-bold mb-4">Offers & Discounts</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Check out our latest promotions and special deals to enjoy your favorite coffee and treats for less.
        </p>
      </div>

      {offers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No offers available at the moment. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <Card key={offer._id} className="overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src={offer.image || "/placeholder.svg?height=400&width=600"}
                  alt={offer.title}
                  fill
                  className="object-cover"
                />
                {offer.badge && <Badge className="absolute top-2 right-2 bg-primary">{offer.badge}</Badge>}
              </div>
              <CardHeader>
                <CardTitle>{offer.title}</CardTitle>
                <CardDescription>{offer.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarDays className="mr-1 h-4 w-4" />
                  <span>Valid until: {offer.validUntil}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

