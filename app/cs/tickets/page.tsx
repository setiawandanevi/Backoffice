"use client"

import { useState } from "react"
import CSLayout from "@/components/layout/cs-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Search, MessageCircle, Send } from "lucide-react"
import { mockTickets, getTicketsByStatus, getTicketsByCS } from "@/lib/mock-data"

export default function CSTicketsPage() {
  const [tickets, setTickets] = useState(mockTickets)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [replyMessage, setReplyMessage] = useState("")
  const { toast } = useToast()

  const currentCS = "John Doe" // This would come from auth context
  const antrianTickets = getTicketsByStatus("Antrian")
  const myTickets = getTicketsByCS(currentCS)
  const selesaiTickets = getTicketsByStatus("Selesai")

  const handleTakeTicket = (ticketId: string) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: "On Proses", csIssued: currentCS } : ticket,
      ),
    )

    toast({
      title: "Berhasil",
      description: `Tiket ${ticketId} berhasil diambil`,
    })
  }

  const handleSendReply = () => {
    if (!replyMessage.trim()) return

    const updatedTicket = {
      ...selectedTicket,
      chatHistory: [
        ...selectedTicket.chatHistory,
        {
          sender: "cs",
          message: replyMessage,
          time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        },
      ],
    }

    setSelectedTicket(updatedTicket)
    setReplyMessage("")

    toast({
      title: "Pesan Terkirim",
      description: "Balasan Anda telah dikirim ke customer",
    })
  }

  const handleCompleteTicket = (ticketId: string) => {
    setTickets(tickets.map((ticket) => (ticket.id === ticketId ? { ...ticket, status: "Selesai" } : ticket)))

    toast({
      title: "Berhasil",
      description: `Tiket ${ticketId} telah diselesaikan`,
    })
  }

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

  return (
    <CSLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Management Tiket</h1>
          <p className="text-gray-600 mt-2">Kelola tiket customer service Anda</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Pencarian Tiket
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari berdasarkan nomor tiket, customer, atau topik..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="antrian" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="antrian">Tiket Antrian ({antrianTickets.length})</TabsTrigger>
            <TabsTrigger value="saya">Tiket Saya ({myTickets.length})</TabsTrigger>
            <TabsTrigger value="selesai">Tiket Terselesaikan ({selesaiTickets.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="antrian">
            <Card>
              <CardHeader>
                <CardTitle>Tiket Antrian</CardTitle>
                <CardDescription>Tiket yang menunggu untuk diambil</CardDescription>
              </CardHeader>
              <CardContent>
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
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {antrianTickets.map((ticket) => (
                        <TableRow key={ticket.id}>
                          <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                          <TableCell>{ticket.date}</TableCell>
                          <TableCell className="font-medium">{ticket.customer}</TableCell>
                          <TableCell>{ticket.topic}</TableCell>
                          <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                          <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              onClick={() => handleTakeTicket(ticket.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Ambil Tiket
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saya">
            <Card>
              <CardHeader>
                <CardTitle>Tiket Saya</CardTitle>
                <CardDescription>Tiket yang sedang Anda tangani</CardDescription>
              </CardHeader>
              <CardContent>
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
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {myTickets.map((ticket) => (
                        <TableRow key={ticket.id}>
                          <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                          <TableCell>{ticket.date}</TableCell>
                          <TableCell className="font-medium">{ticket.customer}</TableCell>
                          <TableCell>{ticket.topic}</TableCell>
                          <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                          <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="outline" onClick={() => setSelectedTicket(ticket)}>
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Balas Chat
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                                  <DialogHeader>
                                    <DialogTitle>Chat - {ticket.customer}</DialogTitle>
                                    <DialogDescription>
                                      Tiket: {ticket.id} | Topik: {ticket.topic}
                                    </DialogDescription>
                                  </DialogHeader>

                                  <div className="flex-1 flex flex-col min-h-0">
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg">
                                      {(selectedTicket?.chatHistory || []).map((message: any, idx: number) => (
                                        <div
                                          key={idx}
                                          className={`flex ${
                                            message.sender === "customer" ? "justify-end" : "justify-start"
                                          }`}
                                        >
                                          <div
                                            className={`max-w-[80%] p-3 rounded-lg ${
                                              message.sender === "customer"
                                                ? "bg-blue-500 text-white"
                                                : message.sender === "ai"
                                                  ? "bg-gray-200 text-gray-900"
                                                  : "bg-green-500 text-white"
                                            }`}
                                          >
                                            <div className="text-sm font-medium mb-1">
                                              {message.sender === "customer"
                                                ? "Customer"
                                                : message.sender === "ai"
                                                  ? "AI Agent"
                                                  : "CS (Anda)"}
                                            </div>
                                            <div>{message.message}</div>
                                            <div className="text-xs opacity-70 mt-1">{message.time}</div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>

                                    <div className="mt-4 flex gap-2">
                                      <Textarea
                                        placeholder="Ketik balasan Anda..."
                                        value={replyMessage}
                                        onChange={(e) => setReplyMessage(e.target.value)}
                                        className="flex-1"
                                        rows={3}
                                      />
                                      <div className="flex flex-col gap-2">
                                        <Button onClick={handleSendReply} size="sm">
                                          <Send className="w-4 h-4 mr-2" />
                                          Kirim
                                        </Button>
                                        <Button
                                          onClick={() => handleCompleteTicket(ticket.id)}
                                          size="sm"
                                          variant="outline"
                                          className="text-green-600 border-green-600 hover:bg-green-50"
                                        >
                                          Selesai
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="selesai">
            <Card>
              <CardHeader>
                <CardTitle>Tiket Terselesaikan</CardTitle>
                <CardDescription>Tiket yang sudah diselesaikan</CardDescription>
              </CardHeader>
              <CardContent>
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
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selesaiTickets.map((ticket) => (
                        <TableRow key={ticket.id}>
                          <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                          <TableCell>{ticket.date}</TableCell>
                          <TableCell className="font-medium">{ticket.customer}</TableCell>
                          <TableCell>{ticket.topic}</TableCell>
                          <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                          <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                          <TableCell>{ticket.csIssued}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CSLayout>
  )
}
