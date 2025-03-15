"use server"

import mongoose, { Schema, type Document } from "mongoose"
import { ensureServerOnly } from "../server-only"

// Ensure this code only runs on the server
ensureServerOnly()

export interface IOffer extends Document {
  title: string
  description: string
  validUntil: Date | "Ongoing"
  image?: string
  badge?: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

const OfferSchema = new Schema<IOffer>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    validUntil: { type: Schema.Types.Mixed, required: true },
    image: { type: String },
    badge: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
)

// Check if the model already exists to prevent recompilation error
const Offer = mongoose.models.Offer || mongoose.model<IOffer>("Offer", OfferSchema)

export default Offer

