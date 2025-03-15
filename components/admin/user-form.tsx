"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createAdminUser, updateAdminUser } from "@/app/actions/users"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Schema for creating a new user
const createUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["admin", "staff"]),
})

// Schema for updating an existing user
const updateUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters").optional().or(z.literal("")),
  role: z.enum(["admin", "staff"]),
})

type User = {
  _id: string
  username: string
  role: "admin" | "staff"
}

interface UserFormProps {
  user?: User
}

export function UserForm({ user }: UserFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Use different schema based on whether we're creating or updating
  const formSchema = user ? updateUserSchema : createUserSchema

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.username || "",
      password: "", // Don't prefill password
      role: user?.role || "staff",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const formData = new FormData()
      formData.append("username", values.username)

      // Only append password if it's provided (for updates) or required (for new users)
      if (values.password || !user) {
        formData.append("password", values.password || "")
      }

      formData.append("role", values.role)

      let result
      if (user?._id) {
        result = await updateAdminUser(user._id, formData)
      } else {
        result = await createAdminUser(formData)
      }

      if (result.success) {
        setSuccess("User saved successfully!")
        setTimeout(() => {
          router.push("/admin/users")
          router.refresh()
        }, 1000)
      } else {
        setError(result.error || "Failed to save user")
      }
    } catch (error) {
      console.error("Error saving user:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="admin2" {...field} disabled={isLoading} />
                </FormControl>
                <FormDescription>The username used to log in</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Admins have full access, staff have limited access</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{user ? "New Password (leave blank to keep current)" : "Password"}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={user ? "••••••••" : "Enter password"}
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormDescription>
                {user ? "Leave blank to keep the current password" : "Password must be at least 6 characters"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {user ? "Update User" : "Create User"}
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/users">Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  )
}

