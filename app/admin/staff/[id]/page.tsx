import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { StaffForm } from "@/components/admin/staff-form"
import { connectToDatabase } from "@/lib/db"
import Staff from "@/lib/models/staff"
import { AdminNav } from "@/components/admin-nav"

export const metadata: Metadata = {
  title: "Edit Staff Member | Admin",
  description: "Edit a staff member",
}

export default async function EditStaffPage({ params }: { params: { id: string } }) {
  await connectToDatabase()
  const staff = await Staff.findById(params.id)

  if (!staff) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Staff Member</h1>

      <AdminNav />

      <StaffForm staff={JSON.parse(JSON.stringify(staff))} />
    </div>
  )
}

