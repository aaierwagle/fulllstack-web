import type { Metadata } from "next"
import { StaffForm } from "@/components/admin/staff-form"
import { AdminNav } from "@/components/admin-nav"

export const metadata: Metadata = {
  title: "Add Staff Member | Admin",
  description: "Add a new staff member",
}

export default function NewStaffPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Add Staff Member</h1>

      <AdminNav />

      <StaffForm />
    </div>
  )
}

