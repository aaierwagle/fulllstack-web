import type { Metadata } from "next"
import { Coffee } from "lucide-react"
import { LoginForm } from "@/components/login-form"

export const metadata: Metadata = {
  title: "Admin Login | Brew Haven Coffee",
  description: "Login to the admin dashboard",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center space-x-2">
            <Coffee className="h-6 w-6" />
            <span className="font-bold inline-block">Brew Haven</span>
          </div>
          <h1 className="text-3xl font-bold">Admin Login</h1>
          <p className="text-gray-500">Enter your credentials to access the admin dashboard</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

