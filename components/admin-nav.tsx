"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AdminNav() {
  const pathname = usePathname()

  // Define the navigation links based on the current section
  const getNavLinks = () => {
    if (pathname.startsWith("/admin/menu")) {
      return [
        { name: "All Menu Items", href: "/admin/menu" },
        { name: "Add Menu Item", href: "/admin/menu/new" },
      ]
    } else if (pathname.startsWith("/admin/offers")) {
      return [
        { name: "All Offers", href: "/admin/offers" },
        { name: "Add Offer", href: "/admin/offers/new" },
      ]
    } else if (pathname.startsWith("/admin/staff")) {
      return [
        { name: "All Staff", href: "/admin/staff" },
        { name: "Add Staff", href: "/admin/staff/new" },
      ]
    } else if (pathname.startsWith("/admin/users")) {
      return [
        { name: "All Users", href: "/admin/users" },
        { name: "Add User", href: "/admin/users/new" },
      ]
    }
    return []
  }

  const navLinks = getNavLinks()

  // If there are no navigation links for this section, don't render anything
  if (navLinks.length === 0) return null

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {navLinks.map((link) => (
        <Button key={link.href} variant={pathname === link.href ? "default" : "outline"} size="sm" asChild>
          <Link href={link.href}>
            {link.name.includes("Add") && <Plus className="mr-1 h-4 w-4" />}
            {link.name}
          </Link>
        </Button>
      ))}
    </div>
  )
}

