"use client"

import CSLayout from "@/components/layout/cs-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Ticket, Clock, CheckCircle } from "lucide-react"
import { getTicketsByStatus, getTicketsByCS } from "@/lib/mock-data"

export default function CSDashboard() {
  const antrianTickets = getTicketsByStatus("Antrian")
  const myTickets = getTicketsByCS("John Doe") // Assuming current CS is John Doe
  const selesaiTickets = getTicketsByStatus("Selesai")

  const stats = [
    {
      title: "Tiket Antrian",
      value: antrianTickets.length.toString(),
      description: "Tiket menunggu diambil",
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Tiket Saya",
      value: myTickets.length.toString(),
      description: "Tiket yang saya tangani",
      icon: Ticket,
      color: "text-blue-600",
    },
    {
      title: "Chat Hari Ini",
      value: "24",
      description: "Total chat yang ditangani",
      icon: MessageSquare,
      color: "text-green-600",
    },
    {
      title: "Selesai Hari Ini",
      value: "18",
      description: "Tiket yang diselesaikan",
      icon: CheckCircle,
      color: "text-purple-600",
    },
  ]

  return (
    <CSLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard CS</h1>
          <p className="text-gray-600 mt-2">Selamat datang di panel customer service</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Terbaru</CardTitle>
              <CardDescription>Aktivitas terkini dalam sistem</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Tiket TKT-002 sedang diproses</p>
                    <p className="text-xs text-gray-600">5 menit yang lalu</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Chat baru dari customer</p>
                    <p className="text-xs text-gray-600">15 menit yang lalu</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Tiket baru masuk antrian</p>
                    <p className="text-xs text-gray-600">30 menit yang lalu</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Hari Ini</CardTitle>
              <CardDescription>Ringkasan performa Anda hari ini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Response Time</span>
                  <span className="text-sm font-medium">1.8 min</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Resolution Rate</span>
                  <span className="text-sm font-medium">95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "95%" }}></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Customer Rating</span>
                  <span className="text-sm font-medium">4.8/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: "96%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CSLayout>
  )
}
