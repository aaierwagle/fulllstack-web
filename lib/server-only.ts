// This file contains utilities to ensure code only runs on the server

// Use this to mark a file as server-only
export const dynamic = "force-dynamic"

// Use this function to ensure code only runs on the server
export function ensureServerOnly() {
  if (typeof window !== "undefined") {
    throw new Error("This code should only run on the server")
  }
}

// Export a marker that can be used to check if we're on the server
export const isServer = typeof window === "undefined"

