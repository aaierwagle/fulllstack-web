"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Loader2 } from "lucide-react"
import { fetchData } from "@/lib/client-fetch"
import { Button } from "@/components/ui/button"
import { StaffTable } from "@/components/admin/staff-table"

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
        const response = await fetchData<{ success: boolean; data: StaffMember[] }>("/api/admin/staff")

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
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading staff information...</span>
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
        <h1 className="text-3xl font-bold">Staff Management</h1>
        <Button asChild>
          <Link href="/admin/staff/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Staff
          </Link>
        </Button>
      </div>

      <StaffTable staff={staff} />
    </div>
  )
}

