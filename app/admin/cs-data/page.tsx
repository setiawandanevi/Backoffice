"use client"

import { useState } from "react"
import AdminLayout from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Users, Edit, Star, StarOff } from "lucide-react"
import { mockCSData } from "@/lib/mock-data"

export default function CSDataPage() {
  const [csData, setCSData] = useState(mockCSData)
  const { toast } = useToast()

  const togglePIC = (id: number) => {
    setCSData(csData.map((cs) => (cs.id === id ? { ...cs, isPIC: !cs.isPIC } : cs)))

    const cs = csData.find((cs) => cs.id === id)
    toast({
      title: "Berhasil",
      description: `${cs?.name} ${cs?.isPIC ? "bukan lagi" : "sekarang menjadi"} PIC`,
    })
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Customer Service</h1>
          <p className="text-gray-600 mt-2">Kelola data dan status customer service</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Daftar CS Active
            </CardTitle>
            <CardDescription>Semua customer service yang terdaftar dalam sistem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Shift</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>PIC</TableHead>
                    <TableHead>Tanggal Bergabung</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {csData.map((cs) => (
                    <TableRow key={cs.id}>
                      <TableCell className="font-medium">{cs.name}</TableCell>
                      <TableCell>{cs.email}</TableCell>
                      <TableCell>{cs.shift}</TableCell>
                      <TableCell>
                        <Badge variant={cs.status === "Active" ? "default" : "secondary"}>{cs.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {cs.isPIC && <Badge variant="outline">PIC</Badge>}
                          <Button size="sm" variant="ghost" onClick={() => togglePIC(cs.id)} className="p-1">
                            {cs.isPIC ? (
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            ) : (
                              <StarOff className="w-4 h-4 text-gray-400" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{cs.joinDate}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total CS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{csData.length}</div>
              <p className="text-sm text-gray-600 mt-1">Customer Service aktif</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">PIC Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{csData.filter((cs) => cs.isPIC).length}</div>
              <p className="text-sm text-gray-600 mt-1">Person in Charge</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Online Now</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{Math.floor(csData.length * 0.7)}</div>
              <p className="text-sm text-gray-600 mt-1">CS sedang online</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
