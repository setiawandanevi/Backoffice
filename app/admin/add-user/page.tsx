"use client"

import type React from "react"

import { useState } from "react"
import AdminLayout from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { UserPlus } from "lucide-react"
import { mockShifts } from "@/lib/mock-data"

export default function AddUserPage() {
  const [formData, setFormData] = useState({
    picName: "",
    userName: "",
    email: "",
    password: "",
    shift: "",
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate adding user
    toast({
      title: "Berhasil",
      description: `User ${formData.userName} berhasil ditambahkan`,
    })

    // Reset form
    setFormData({
      picName: "",
      userName: "",
      email: "",
      password: "",
      shift: "",
    })
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tambah User Baru</h1>
          <p className="text-gray-600 mt-2">Tambahkan customer service atau admin baru ke sistem</p>
        </div>

        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Form Tambah User
              </CardTitle>
              <CardDescription>Isi semua informasi yang diperlukan untuk menambahkan user baru</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="picName">Nama PIC (Opsional)</Label>
                  <Input
                    id="picName"
                    placeholder="Nama Person in Charge"
                    value={formData.picName}
                    onChange={(e) => setFormData({ ...formData, picName: e.target.value })}
                  />
                  <p className="text-sm text-gray-500">Kosongkan jika user bukan PIC</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userName">Nama User *</Label>
                  <Input
                    id="userName"
                    placeholder="Nama lengkap user"
                    value={formData.userName}
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Minimal 8 karakter"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    minLength={8}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shift">Shift *</Label>
                  <Select
                    value={formData.shift}
                    onValueChange={(value) => setFormData({ ...formData, shift: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih shift kerja" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockShifts.map((shift) => (
                        <SelectItem key={shift.id} value={shift.name}>
                          {shift.name} ({shift.startTime} - {shift.endTime})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1">
                    Tambah User
                  </Button>
                  <Button type="button" variant="outline" className="flex-1 bg-transparent">
                    Reset Form
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informasi Penting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p>User yang ditambahkan akan mendapat email konfirmasi untuk aktivasi akun</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p>PIC memiliki akses tambahan untuk mengelola tiket dan laporan</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <p>Password default akan dikirim melalui email dan harus diganti saat login pertama</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
