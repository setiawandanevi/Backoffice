"use client"

import { useState } from "react"
import AdminLayout from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Ticket, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { mockTickets, getTicketsByStatus } from "@/lib/mock-data"

export default function TicketsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const antrianTickets = getTicketsByStatus("Antrian")
  const onProsesTickets = getTicketsByStatus("On Proses")
  const selesaiTickets = getTicketsByStatus("Selesai")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Antrian":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Antrian
          </Badge>
        )
      case "On Proses":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            On Proses
          </Badge>
        )
      case "Selesai":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Selesai
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge variant="destructive">High</Badge>
      case "Medium":
        return (
          <Badge variant="default" className="bg-yellow-100 text-yellow-800">
            Medium
          </Badge>
        )
      case "Low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const TicketTable = ({ tickets, showActions = false }: { tickets: any[]; showActions?: boolean }) => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No Tiket</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Topik Chat</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>CS Issued</TableHead>
            {showActions && <TableHead>Aksi</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
              <TableCell>{ticket.date}</TableCell>
              <TableCell className="font-medium">{ticket.customer}</TableCell>
              <TableCell>{ticket.topic}</TableCell>
              <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
              <TableCell>{getStatusBadge(ticket.status)}</TableCell>
              <TableCell>{ticket.csIssued || "-"}</TableCell>
              {showActions && (
                <TableCell>
                  <Button size="sm" variant="outline">
                    Detail
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Management Tiket</h1>
          <p className="text-gray-600 mt-2">Kelola semua tiket customer service</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Filter & Pencarian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Cari berdasarkan nomor tiket, customer, atau topik..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="antrian">Antrian</SelectItem>
                  <SelectItem value="proses">On Proses</SelectItem>
                  <SelectItem value="selesai">Selesai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tiket</CardTitle>
              <Ticket className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockTickets.length}</div>
              <p className="text-xs text-gray-600 mt-1">Semua tiket</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Antrian</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{antrianTickets.length}</div>
              <p className="text-xs text-gray-600 mt-1">Menunggu CS</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Proses</CardTitle>
              <AlertCircle className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{onProsesTickets.length}</div>
              <p className="text-xs text-gray-600 mt-1">Sedang ditangani</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Selesai</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{selesaiTickets.length}</div>
              <p className="text-xs text-gray-600 mt-1">Terselesaikan</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="antrian" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="antrian">Tiket Antrian ({antrianTickets.length})</TabsTrigger>
            <TabsTrigger value="proses">Tiket On Proses ({onProsesTickets.length})</TabsTrigger>
            <TabsTrigger value="selesai">Tiket Selesai ({selesaiTickets.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="antrian">
            <Card>
              <CardHeader>
                <CardTitle>Tiket Antrian</CardTitle>
                <CardDescription>Tiket yang menunggu untuk diambil oleh CS</CardDescription>
              </CardHeader>
              <CardContent>
                <TicketTable tickets={antrianTickets} showActions={true} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="proses">
            <Card>
              <CardHeader>
                <CardTitle>Tiket On Proses</CardTitle>
                <CardDescription>Tiket yang sedang ditangani oleh CS</CardDescription>
              </CardHeader>
              <CardContent>
                <TicketTable tickets={onProsesTickets} showActions={true} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="selesai">
            <Card>
              <CardHeader>
                <CardTitle>Tiket Selesai</CardTitle>
                <CardDescription>Tiket yang sudah diselesaikan</CardDescription>
              </CardHeader>
              <CardContent>
                <TicketTable tickets={selesaiTickets} showActions={true} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
