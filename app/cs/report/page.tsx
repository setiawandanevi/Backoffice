"use client"

import { useState } from "react"
import CSLayout from "@/components/layout/cs-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Download, Calendar, TrendingUp, MessageSquare, Clock } from "lucide-react"
import { mockReports } from "@/lib/mock-data"

export default function CSReportPage() {
  const [dateFilter, setDateFilter] = useState("7days")
  const [statusFilter, setStatusFilter] = useState("all")

  const handleExportReport = () => {
    // Simulate export functionality
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Date,Total Chats,Resolved by AI,Escalated,Avg Response Time,Customer Satisfaction\n" +
      mockReports
        .map(
          (report) =>
            `${report.date},${report.totalChats},${report.resolvedByAI},${report.escalatedToHuman},${report.avgResponseTime},${report.customerSatisfaction}`,
        )
        .join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "cs_report.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const totalStats = {
    totalChats: mockReports.reduce((sum, report) => sum + report.totalChats, 0),
    resolvedByAI: mockReports.reduce((sum, report) => sum + report.resolvedByAI, 0),
    escalatedToHuman: mockReports.reduce((sum, report) => sum + report.escalatedToHuman, 0),
    avgResponseTime: "2.7 min",
    avgSatisfaction: 4.17,
  }

  return (
    <CSLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Report CS</h1>
            <p className="text-gray-600 mt-2">Laporan aktivitas dan performa customer service</p>
          </div>
          <Button onClick={handleExportReport}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Filter Laporan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Pilih periode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hari Ini</SelectItem>
                  <SelectItem value="7days">7 Hari Terakhir</SelectItem>
                  <SelectItem value="30days">30 Hari Terakhir</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>

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

              <div className="flex gap-2">
                <Input type="date" className="w-full md:w-auto" />
                <Input type="date" className="w-full md:w-auto" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Chat</CardTitle>
              <MessageSquare className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStats.totalChats}</div>
              <p className="text-xs text-gray-600 mt-1">Total interaksi</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved by AI</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{totalStats.resolvedByAI}</div>
              <p className="text-xs text-gray-600 mt-1">
                {Math.round((totalStats.resolvedByAI / totalStats.totalChats) * 100)}% dari total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Escalated</CardTitle>
              <BarChart3 className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{totalStats.escalatedToHuman}</div>
              <p className="text-xs text-gray-600 mt-1">
                {Math.round((totalStats.escalatedToHuman / totalStats.totalChats) * 100)}% dari total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
              <Clock className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{totalStats.avgResponseTime}</div>
              <p className="text-xs text-gray-600 mt-1">Waktu respons rata-rata</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detail Laporan Harian</CardTitle>
            <CardDescription>Breakdown aktivitas per hari dalam periode yang dipilih</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Total Chat</TableHead>
                    <TableHead>Resolved by AI</TableHead>
                    <TableHead>Escalated</TableHead>
                    <TableHead>Avg Response Time</TableHead>
                    <TableHead>Customer Satisfaction</TableHead>
                    <TableHead>Resolution Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockReports.map((report, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{report.date}</TableCell>
                      <TableCell>{report.totalChats}</TableCell>
                      <TableCell className="text-green-600 font-medium">{report.resolvedByAI}</TableCell>
                      <TableCell className="text-orange-600 font-medium">{report.escalatedToHuman}</TableCell>
                      <TableCell>{report.avgResponseTime}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span>{report.customerSatisfaction}</span>
                          <span className="text-yellow-500">★</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {Math.round((report.resolvedByAI / report.totalChats) * 100)}%
                          </span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${(report.resolvedByAI / report.totalChats) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trend</CardTitle>
              <CardDescription>Tren performa dalam 7 hari terakhir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Resolution Rate Trend</span>
                  <span className="text-sm font-medium text-green-600">↗ +5.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Response Time Trend</span>
                  <span className="text-sm font-medium text-blue-600">↘ -0.3 min</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Satisfaction Trend</span>
                  <span className="text-sm font-medium text-purple-600">↗ +0.2</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: "83%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Issues</CardTitle>
              <CardDescription>Topik yang paling sering muncul</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Masalah Login</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                    <span className="text-sm font-medium">34</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Pembayaran Gagal</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "70%" }}></div>
                    </div>
                    <span className="text-sm font-medium">28</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Pertanyaan Produk</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                    <span className="text-sm font-medium">24</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Akun Terkunci</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                    <span className="text-sm font-medium">18</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Bug Report</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                    <span className="text-sm font-medium">12</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CSLayout>
  )
}
