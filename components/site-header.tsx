"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Coffee, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const mainNav = [
  { title: "Home", href: "/" },
  { title: "Menu", href: "/menu" },
  { title: "Offers", href: "/offers" },
  { title: "Staff", href: "/staff" },
  { title: "About", href: "/about" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle initial mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener("scroll", handleScroll)
    handleScroll() // Set initial state
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  // Check for admin page after mounting
  if (pathname?.startsWith("/admin")) {
    return null
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60",
        scrolled ? "bg-background/95" : "bg-background/80"
      )}
    >
      <div className="container flex h-16 items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <Coffee className="h-6 w-6" aria-hidden="true" />
            <span className="font-bold inline-block">Brew Haven</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="ml-auto hidden md:flex gap-6">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {item.title}
            </Link>
          ))}
          <Button asChild variant="default" size="sm">
            <Link href="/admin">Admin</Link>
          </Button>
        </nav>

        {/* Mobile menu button */}
        <div className="flex md:hidden ml-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="container py-4 grid gap-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <Button asChild variant="default" size="sm" className="mt-2">
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                Admin
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

