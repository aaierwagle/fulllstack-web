"use server"

import mongoose, { Schema, type Document } from "mongoose"
import { ensureServerOnly } from "../server-only"

// Ensure this code only runs on the server
ensureServerOnly()

export interface IUser extends Document {
  username: string
  password: string
  role: "admin" | "staff"
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["admin", "staff"],
      default: "staff",
    },
  },
  { timestamps: true },
)

// Check if the model already exists to prevent recompilation error
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)

export default User

