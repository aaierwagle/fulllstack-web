"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
})

export function LoginForm() {
  // Define all state variables at the top level - never conditionally
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false)

  // Initialize form with useForm hook - must be called unconditionally
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  // Define submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.username || !values.password) {
      setError("Username and password are required")
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSuccess("Login successful! Redirecting...")
        // Use window.location for a full page refresh to clear any stale state
        setTimeout(() => {
          window.location.href = "/admin"
        }, 1000)
      } else {
        setError(data.error || "Login failed. Please check your credentials.")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Define admin user creation handler
  async function createAdminUser() {
    setIsCreatingAdmin(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/seed")

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to create admin user")
      }

      const data = await response.json()

      setSuccess("Default admin user created successfully!")
      // Pre-fill the form with admin credentials
      form.setValue("username", "admin")
      form.setValue("password", "admin123")
    } catch (error) {
      console.error("Error creating admin user:", error)
      setError(
        typeof error === "object" && error !== null && "message" in error
          ? String(error.message)
          : "An unexpected error occurred. Please try again.",
      )
    } finally {
      setIsCreatingAdmin(false)
    }
  }

  // Render the form - no early returns in the component body
  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="admin" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">First time setup</span>
          </div>
        </div>

        <Button variant="outline" onClick={createAdminUser} disabled={isCreatingAdmin} className="w-full">
          {isCreatingAdmin && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Default Admin User
        </Button>
        <p className="mt-2 text-xs text-muted-foreground">
          This will create an admin user with username "admin" and password "admin123"
        </p>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/" className="hover:underline">
          Back to website
        </Link>
      </p>
    </div>
  )
}

