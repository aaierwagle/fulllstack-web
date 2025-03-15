import Link from "next/link"
import { Coffee, Facebook, Instagram, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Coffee className="h-6 w-6" />
              <span className="font-bold inline-block">Brew Haven</span>
            </div>
            <p className="text-sm text-muted-foreground">Artisanal coffee and delicious treats in a cozy atmosphere.</p>
          </div>

          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-muted-foreground hover:text-foreground transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/offers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Offers
                </Link>
              </li>
              <li>
                <Link href="/staff" className="text-muted-foreground hover:text-foreground transition-colors">
                  Staff
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Contact</h3>
            <address className="not-italic text-sm text-muted-foreground space-y-2">
              <p>123 Coffee Street</p>
              <p>Brewville, BV 12345</p>
              <p>Phone: (555) 123-4567</p>
              <p>Email: hello@brewhaven.com</p>
            </address>
          </div>

          <div>
            <h3 className="font-medium mb-4">Hours</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Monday - Friday: 7am - 7pm</li>
              <li>Saturday: 8am - 8pm</li>
              <li>Sunday: 8am - 6pm</li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Brew Haven Coffee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

