"use server"

import mongoose, { Schema, type Document } from "mongoose"
import { ensureServerOnly } from "../server-only"

// Ensure this code only runs on the server
ensureServerOnly()

export interface IStaff extends Document {
  name: string
  role: string
  bio: string
  image?: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

const StaffSchema = new Schema<IStaff>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String, required: true },
    image: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
)

// Check if the model already exists to prevent recompilation error
const Staff = mongoose.models.Staff || mongoose.model<IStaff>("Staff", StaffSchema)

export default Staff

