import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { UserForm } from "@/components/admin/user-form"
import { getAdminUser } from "@/app/actions/users"
import { AdminNav } from "@/components/admin-nav"

export const metadata: Metadata = {
  title: "Edit User | Admin",
  description: "Edit an admin user",
}

export default async function EditUserPage({ params }: { params: { id: string } }) {
  const result = await getAdminUser(params.id)

  if (!result.success) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit User</h1>

      <AdminNav />

      <UserForm user={result.data} />
    </div>
  )
}

