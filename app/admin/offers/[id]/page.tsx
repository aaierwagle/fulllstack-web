import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { OfferForm } from "@/components/admin/offer-form"
import { connectToDatabase } from "@/lib/db"
import Offer from "@/lib/models/offer"
import { AdminNav } from "@/components/admin-nav"

export const metadata: Metadata = {
  title: "Edit Offer | Admin",
  description: "Edit an offer",
}

export default async function EditOfferPage({ params }: { params: { id: string } }) {
  await connectToDatabase()
  const offer = await Offer.findById(params.id)

  if (!offer) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Offer</h1>

      <AdminNav />

      <OfferForm offer={JSON.parse(JSON.stringify(offer))} />
    </div>
  )
}

