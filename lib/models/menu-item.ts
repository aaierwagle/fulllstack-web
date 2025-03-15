"use server"

import mongoose, { Schema, type Document } from "mongoose"
import { ensureServerOnly } from "../server-only"

// Ensure this code only runs on the server
ensureServerOnly()

export interface IMenuItem extends Document {
  name: string
  description: string
  price: number
  category: "coffee" | "food" | "pastry"
  image?: string
  available: boolean
  createdAt: Date
  updatedAt: Date
}

const MenuItemSchema = new Schema<IMenuItem>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: ["coffee", "food", "pastry"],
    },
    image: { type: String },
    available: { type: Boolean, default: true },
  },
  { timestamps: true },
)

// Check if the model already exists to prevent recompilation error
const MenuItem = mongoose.models.MenuItem || mongoose.model<IMenuItem>("MenuItem", MenuItemSchema)

export default MenuItem

