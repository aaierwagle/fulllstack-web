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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { createOffer, updateOffer } from "@/app/actions/offers"
import { Alert, AlertDescription } from "@/components/ui/alert"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  validUntil: z.string(),
  image: z.string().optional(),
  badge: z.string().optional(),
  active: z.boolean().default(true),
})

type Offer = {
  _id: string
  title: string
  description: string
  validUntil: string | Date
  image?: string
  badge?: string
  active: boolean
}

interface OfferFormProps {
  offer?: Offer
}

export function OfferForm({ offer }: OfferFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: offer?.title || "",
      description: offer?.description || "",
      validUntil: offer?.validUntil
        ? typeof offer.validUntil === "string"
          ? offer.validUntil
          : new Date(offer.validUntil).toISOString().split("T")[0]
        : "Ongoing",
      image: offer?.image || "",
      badge: offer?.badge || "",
      active: offer?.active ?? true,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const formData = new FormData()
      formData.append("title", values.title)
      formData.append("description", values.description)
      formData.append("validUntil", values.validUntil)
      formData.append("image", values.image || "")
      formData.append("badge", values.badge || "")
      formData.append("active", values.active.toString())

      let result
      if (offer?._id) {
        result = await updateOffer(offer._id, formData)
      } else {
        result = await createOffer(formData)
      }

      if (result.success) {
        setSuccess("Offer saved successfully!")
        setTimeout(() => {
          router.push("/admin/offers")
          router.refresh()
        }, 1000)
      } else {
        setError(result.error || "Failed to save offer")
      }
    } catch (error) {
      console.error("Error saving offer:", error)
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Happy Hour" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="validUntil"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valid Until</FormLabel>
                <FormControl>
                  <Input placeholder="Ongoing or YYYY-MM-DD" {...field} disabled={isLoading} />
                </FormControl>
                <FormDescription>Enter "Ongoing" or a date (YYYY-MM-DD)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="badge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Badge (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Popular" {...field} disabled={isLoading} />
                </FormControl>
                <FormDescription>E.g., "Popular", "Limited Time", etc.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Active</FormLabel>
                  <FormDescription>Mark this offer as active</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enjoy 20% off all coffee drinks from 2pm to 4pm, Monday to Friday."
                  className="min-h-[120px]"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} disabled={isLoading} />
              </FormControl>
              <FormDescription>Enter a URL for the offer image</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {offer ? "Update Offer" : "Create Offer"}
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/offers">Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  )
}

