"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Headphones } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Email dan password harus diisi",
        variant: "destructive",
      })
      return
    }

    // Auto-detect role based on email and validate credentials
    let userRole = ""
    let userName = ""

    // Admin credentials
    if (email === "admin@demo.com" && password === "admin123") {
      userRole = "admin"
      userName = "Admin User"
    }
    // CS credentials
    else if (email === "cs@demo.com" && password === "cs123") {
      userRole = "cs"
      userName = "CS User"
    } else {
      toast({
        title: "Login Gagal",
        description: "Email atau password salah",
        variant: "destructive",
      })
      return
    }

    // Store user data in localStorage
    const userData = {
      email,
      role: userRole,
      name: userName,
      loginTime: new Date().toISOString(),
    }

    localStorage.setItem("user", JSON.stringify(userData))

    toast({
      title: "Login Berhasil",
      description: `Selamat datang, ${userData.name}!`,
    })

    // Redirect based on detected role
    if (userRole === "admin") {
      router.push("/admin/dashboard")
    } else {
      router.push("/cs/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <Headphones className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">CS Dashboard</CardTitle>
          <CardDescription>Masuk ke sistem manajemen customer service</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Masuk
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p className="font-medium mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs">
              <p>
                <strong>Admin:</strong> admin@demo.com / admin123
              </p>
              <p>
                <strong>CS:</strong> cs@demo.com / cs123
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
