"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Loader2 } from "lucide-react"
import { fetchData } from "@/lib/client-fetch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface StaffMember {
  _id: string
  name: string
  role: string
  bio: string
  image?: string
  active: boolean
}

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadStaff() {
      try {
        setLoading(true)
        const response = await fetchData<{ success: boolean; data: StaffMember[] }>("/api/staff")

        if (response.success) {
          setStaff(response.data)
        } else {
          setError("Failed to load staff information")
        }
      } catch (err) {
        console.error("Error loading staff:", err)
        setError("An error occurred while loading staff information")
      } finally {
        setLoading(false)
      }
    }

    loadStaff()
  }, [])

  if (loading) {
    return (
      <div className="container py-20 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading staff information...</span>
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
        <h1 className="text-4xl font-bold mb-4">Meet Our Team</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The passionate people behind your favorite coffee and treats. Our team is dedicated to providing you with the
          best cafe experience.
        </p>
      </div>

      {staff.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No staff information available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((person) => (
            <Card key={person._id} className="overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src={person.image || "/placeholder.svg?height=400&width=400"}
                  alt={person.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{person.name}</CardTitle>
                <CardDescription>{person.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{person.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

