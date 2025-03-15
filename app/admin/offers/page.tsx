"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Loader2 } from "lucide-react"
import { fetchData } from "@/lib/client-fetch"
import { Button } from "@/components/ui/button"
import { OffersTable } from "@/components/admin/offers-table"

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
        const response = await fetchData<{ success: boolean; data: Offer[] }>("/api/admin/offers")

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
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading offers...</span>
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
        <h1 className="text-3xl font-bold">Offers & Discounts</h1>
        <Button asChild>
          <Link href="/admin/offers/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Offer
          </Link>
        </Button>
      </div>

      <OffersTable offers={offers} />
    </div>
  )
}

