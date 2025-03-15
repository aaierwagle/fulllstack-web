import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Coffee, Tag, Users } from "lucide-react"
import Script from "next/script"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FeaturedMenuItems } from "@/components/featured-menu-items"

export default function Home() {
  // Structured data for the coffee shop
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: "Brew Haven Coffee",
    image: "https://brewhaven.vercel.app/og-image.jpg",
    url: "https://brewhaven.vercel.app",
    telephone: "+15551234567",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Coffee Street",
      addressLocality: "Brewville",
      addressRegion: "BV",
      postalCode: "12345",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.7128,
      longitude: -74.006,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "08:00",
        closes: "18:00",
      },
    ],
    menu: "https://brewhaven.vercel.app/menu",
    servesCuisine: ["Coffee", "Breakfast", "Pastries"],
    priceRange: "$$",
  }

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative w-full h-[600px]">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Brew Haven Coffee Shop Interior"
            fill
            className="object-cover brightness-[0.7]"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Brew Haven Coffee</h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl">
              Artisanal coffee and delicious treats in a cozy atmosphere
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/menu">View Our Menu</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20"
              >
                <Link href="/about">Our Story</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Section */}
        <section className="py-16 px-4 md:px-6 bg-muted/50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Discover Brew Haven</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Coffee className="h-12 w-12 text-primary mb-2" aria-hidden="true" />
                  <CardTitle>Specialty Coffee</CardTitle>
                  <CardDescription>Expertly roasted beans from around the world</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Our coffee is sourced from sustainable farms and roasted in small batches to ensure the freshest cup
                    every time.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" asChild className="w-full">
                    <Link href="/menu" className="flex items-center justify-between w-full">
                      View Menu <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <Tag className="h-12 w-12 text-primary mb-2" aria-hidden="true" />
                  <CardTitle>Special Offers</CardTitle>
                  <CardDescription>Deals and discounts for our loyal customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    From happy hour specials to seasonal promotions, we love to reward our customers with great deals.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" asChild className="w-full">
                    <Link href="/offers" className="flex items-center justify-between w-full">
                      View Offers <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-12 w-12 text-primary mb-2" aria-hidden="true" />
                  <CardTitle>Our Team</CardTitle>
                  <CardDescription>Meet the passionate people behind your coffee</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Our baristas are trained in the art of coffee making and are dedicated to creating the perfect cup
                    for you.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" asChild className="w-full">
                    <Link href="/staff" className="flex items-center justify-between w-full">
                      Meet Our Staff <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Menu Items</h2>

            <FeaturedMenuItems />
          </div>
        </section>
      </div>
    </>
  )
}

