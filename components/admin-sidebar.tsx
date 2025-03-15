"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Coffee, Package, Tag, Users, Plus, Home, LogOut, MenuIcon, X, UserCog } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { logout } from "@/app/actions/auth"

type User = {
  id: string
  username: string
  role: string
}

export function AdminSidebar({ user }: { user: User }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Update the navigation items to better organize the admin sections

  // Define navigation items with clear, direct links and grouping
  const navigation = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Menu Items", href: "/admin/menu", icon: Package, group: "menu" },
    { name: "Add Menu Item", href: "/admin/menu/new", icon: Plus, group: "menu" },
    { name: "Offers", href: "/admin/offers", icon: Tag, group: "offers" },
    { name: "Add Offer", href: "/admin/offers/new", icon: Plus, group: "offers" },
    { name: "Staff", href: "/admin/staff", icon: Users, group: "staff" },
    { name: "Add Staff", href: "/admin/staff/new", icon: Plus, group: "staff" },
    { name: "User Management", href: "/admin/users", icon: UserCog, group: "users" },
    { name: "Add User", href: "/admin/users/new", icon: Plus, group: "users" },
  ]

  // Group navigation items for better organization
  const groupedNavigation = navigation.reduce(
    (acc, item) => {
      // Dashboard doesn't have a group
      if (!item.group) {
        acc.push(item)
        return acc
      }

      // Only show the first item of each group in the sidebar
      if (!acc.some((navItem) => navItem.group === item.group)) {
        acc.push(item)
      }

      return acc
    },
    [] as typeof navigation,
  )

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-4 bg-background border-b md:hidden">
        <div className="flex items-center">
          <Coffee className="h-6 w-6 mr-2" />
          <span className="font-bold">Admin</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="fixed inset-y-0 left-0 z-40 w-64 bg-background p-4 border-r overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center mb-6">
              <Coffee className="h-6 w-6 mr-2" />
              <span className="font-bold">Admin Dashboard</span>
            </div>
            <nav className="flex flex-col gap-2">
              {groupedNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    pathname.startsWith(item.href) || (item.group && pathname.includes(`/${item.group}`))
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 px-3 py-2 text-sm">
                  <div className="flex-1 truncate">
                    <p className="font-medium">{user.username}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full justify-start" onClick={() => logout()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/">
                    <Coffee className="mr-2 h-4 w-4" />
                    View Website
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar - ALWAYS VISIBLE */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-background border-r">
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b">
            <Coffee className="h-6 w-6 mr-2" />
            <span className="font-bold">Admin Dashboard</span>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
            <nav className="flex-1 px-2 space-y-2">
              {groupedNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    pathname.startsWith(item.href) || (item.group && pathname.includes(`/${item.group}`))
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex flex-col gap-2 p-4 border-t">
            <div className="flex items-center">
              <div className="flex-1 truncate">
                <p className="font-medium">{user.username}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full justify-start" onClick={() => logout()}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/">
                <Coffee className="mr-2 h-4 w-4" />
                View Website
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

