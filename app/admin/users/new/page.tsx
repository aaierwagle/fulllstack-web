import type { Metadata } from "next"
import { UserForm } from "@/components/admin/user-form"
import { AdminNav } from "@/components/admin-nav"

export const metadata: Metadata = {
  title: "Add User | Admin",
  description: "Add a new admin user",
}

export default function NewUserPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Add User</h1>

      <AdminNav />

      <UserForm />
    </div>
  )
}

