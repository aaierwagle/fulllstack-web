import type { Metadata } from "next"
import { OfferForm } from "@/components/admin/offer-form"
import { AdminNav } from "@/components/admin-nav"

export const metadata: Metadata = {
  title: "Add Offer | Admin",
  description: "Add a new offer",
}

export default function NewOfferPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Add Offer</h1>

      <AdminNav />

      <OfferForm />
    </div>
  )
}

