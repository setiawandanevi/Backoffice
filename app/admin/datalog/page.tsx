"use client"

import { useState } from "react"
import AdminLayout from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Eye, MessageSquare } from "lucide-react"
import { mockChatLogs } from "@/lib/mock-data"

export default function DatalogPage() {
  const [chatLogs, setChatLogs] = useState(mockChatLogs)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedChat, setSelectedChat] = useState<any>(null)

  const filteredLogs = chatLogs.filter((log) => {
    const matchesSearch =
      log.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.topic.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || log.status.toLowerCase().includes(statusFilter.toLowerCase())

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    if (status.includes("Resolved")) {
      return (
        <Badge variant="default" className="bg-green-500">
          Resolved by AI
        </Badge>
      )
    } else if (status.includes("Escalated")) {
      return <Badge variant="destructive">Escalated to Human</Badge>
    }
    return <Badge variant="secondary">{status}</Badge>
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Datalog Chat AI Agent</h1>
          <p className="text-gray-600 mt-2">Riwayat semua interaksi chat dengan AI Agent</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Filter & Pencarian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Cari berdasarkan customer atau topik..."
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
                  <SelectItem value="resolved">Resolved by AI</SelectItem>
                  <SelectItem value="escalated">Escalated to Human</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Riwayat Chat</CardTitle>
            <CardDescription>
              Menampilkan {filteredLogs.length} dari {chatLogs.length} total chat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Topik Chat</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.date}</TableCell>
                      <TableCell className="font-medium">{log.customer}</TableCell>
                      <TableCell>{log.topic}</TableCell>
                      <TableCell>{getStatusBadge(log.status)}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => setSelectedChat(log)}>
                              <Eye className="w-4 h-4 mr-2" />
                              Lihat
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Detail Chat - {log.customer}</DialogTitle>
                              <DialogDescription>
                                Topik: {log.topic} | Status: {log.status}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              {log.messages.map((message, idx) => (
                                <div
                                  key={idx}
                                  className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
                                >
                                  <div
                                    className={`max-w-[80%] p-3 rounded-lg ${
                                      message.sender === "customer"
                                        ? "bg-blue-500 text-white"
                                        : message.sender === "ai"
                                          ? "bg-gray-100 text-gray-900"
                                          : "bg-green-100 text-green-900"
                                    }`}
                                  >
                                    <div className="text-sm font-medium mb-1">
                                      {message.sender === "customer"
                                        ? "Customer"
                                        : message.sender === "ai"
                                          ? "AI Agent"
                                          : "CS"}
                                    </div>
                                    <div>{message.message}</div>
                                    <div className="text-xs opacity-70 mt-1">{message.time}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </DialogContent>
                        </Dialog>
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
              <CardTitle className="text-lg">Total Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{chatLogs.length}</div>
              <p className="text-sm text-gray-600 mt-1">Total interaksi chat</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resolved by AI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {chatLogs.filter((log) => log.status.includes("Resolved")).length}
              </div>
              <p className="text-sm text-gray-600 mt-1">Diselesaikan AI</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Escalated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {chatLogs.filter((log) => log.status.includes("Escalated")).length}
              </div>
              <p className="text-sm text-gray-600 mt-1">Dialihkan ke CS</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
