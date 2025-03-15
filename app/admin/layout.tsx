import type { ReactNode } from "react"
import type { Metadata } from "next"
import { AdminSidebar } from "@/components/admin-sidebar"
import { getCurrentUser } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Admin Dashboard | Brew Haven Coffee",
  description: "Admin dashboard for Brew Haven Coffee",
}

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  // Check if we're on the login page
  const isLoginPage = children.props?.childProp?.segment === "login"

  // For login page, just render the children without the admin layout
  if (isLoginPage) {
    return children
  }

  // For all other admin pages, get the current user and show the admin layout
  const user = await getCurrentUser()

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-background">
      {user && <AdminSidebar user={user} />}
      <div className="flex-1 md:ml-64">
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}

