// Mock data for the application

export const mockShifts = [
  { id: 1, name: "Shift Pagi", startTime: "08:00", endTime: "16:00", description: "Shift pagi hari" },
  { id: 2, name: "Shift Siang", startTime: "16:00", endTime: "00:00", description: "Shift siang hari" },
  { id: 3, name: "Shift Malam", startTime: "00:00", endTime: "08:00", description: "Shift malam hari" },
]

export const mockCSData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@company.com",
    shift: "Shift Pagi",
    isPIC: true,
    status: "Active",
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@company.com",
    shift: "Shift Siang",
    isPIC: false,
    status: "Active",
    joinDate: "2024-02-01",
  },
  {
    id: 3,
    name: "Bob Wilson",
    email: "bob@company.com",
    shift: "Shift Malam",
    isPIC: false,
    status: "Active",
    joinDate: "2024-01-20",
  },
]

export const mockChatLogs = [
  {
    id: 1,
    date: "2024-01-15",
    customer: "Ahmad Rizki",
    topic: "Masalah Login",
    status: "Resolved by AI",
    messages: [
      { sender: "customer", message: "Saya tidak bisa login ke akun saya", time: "09:00" },
      {
        sender: "ai",
        message: "Baik, saya akan membantu Anda. Apakah Anda sudah mencoba reset password?",
        time: "09:01",
      },
      { sender: "customer", message: "Sudah, tapi masih tidak bisa", time: "09:02" },
      { sender: "ai", message: "Coba clear cache browser Anda dan login kembali", time: "09:03" },
      { sender: "customer", message: "Berhasil! Terima kasih", time: "09:05" },
    ],
  },
  {
    id: 2,
    date: "2024-01-15",
    customer: "Siti Nurhaliza",
    topic: "Pembayaran Gagal",
    status: "Escalated to Human",
    messages: [
      { sender: "customer", message: "Pembayaran saya gagal terus", time: "10:00" },
      { sender: "ai", message: "Maaf atas ketidaknyamanannya. Bisa tolong berikan detail transaksi?", time: "10:01" },
      { sender: "customer", message: "Ini masalah kompleks, saya butuh bicara dengan manusia", time: "10:02" },
    ],
  },
  {
    id: 3,
    date: "2024-01-14",
    customer: "Budi Santoso",
    topic: "Pertanyaan Produk",
    status: "Resolved by AI",
    messages: [
      { sender: "customer", message: "Apa saja fitur premium?", time: "14:00" },
      {
        sender: "ai",
        message: "Fitur premium meliputi: Analytics advanced, Priority support, Custom branding",
        time: "14:01",
      },
      { sender: "customer", message: "Berapa harganya?", time: "14:02" },
      { sender: "ai", message: "Harga premium adalah Rp 299.000/bulan", time: "14:03" },
    ],
  },
]

export const mockTickets = [
  {
    id: "TKT-001",
    date: "2024-01-15",
    customer: "Siti Nurhaliza",
    topic: "Pembayaran Gagal",
    status: "Antrian",
    csIssued: null,
    priority: "High",
    chatHistory: [
      { sender: "customer", message: "Pembayaran saya gagal terus", time: "10:00" },
      { sender: "ai", message: "Maaf atas ketidaknyamanannya. Bisa tolong berikan detail transaksi?", time: "10:01" },
      { sender: "customer", message: "Ini masalah kompleks, saya butuh bicara dengan manusia", time: "10:02" },
    ],
  },
  {
    id: "TKT-002",
    date: "2024-01-15",
    customer: "Andi Wijaya",
    topic: "Akun Terkunci",
    status: "On Proses",
    csIssued: "John Doe",
    priority: "Medium",
    chatHistory: [
      { sender: "customer", message: "Akun saya terkunci, bagaimana cara membukanya?", time: "11:00" },
      { sender: "ai", message: "Saya akan membantu Anda membuka akun yang terkunci", time: "11:01" },
      { sender: "customer", message: "Sudah coba berbagai cara tapi tidak berhasil", time: "11:02" },
      { sender: "cs", message: "Halo, saya John dari tim CS. Saya akan membantu Anda", time: "11:30" },
    ],
  },
  {
    id: "TKT-003",
    date: "2024-01-14",
    customer: "Maya Sari",
    topic: "Refund Request",
    status: "Selesai",
    csIssued: "Jane Smith",
    priority: "Low",
    chatHistory: [
      { sender: "customer", message: "Saya ingin refund untuk pembelian kemarin", time: "09:00" },
      { sender: "ai", message: "Baik, saya akan proses permintaan refund Anda", time: "09:01" },
      { sender: "customer", message: "Kapan refund akan diproses?", time: "09:02" },
      { sender: "cs", message: "Refund sudah diproses dan akan masuk dalam 3-5 hari kerja", time: "09:30" },
      { sender: "customer", message: "Terima kasih!", time: "09:31" },
    ],
  },
  {
    id: "TKT-004",
    date: "2024-01-15",
    customer: "Rudi Hartono",
    topic: "Bug Report",
    status: "Antrian",
    csIssued: null,
    priority: "High",
    chatHistory: [
      { sender: "customer", message: "Ada bug di aplikasi, fitur X tidak berfungsi", time: "12:00" },
      { sender: "ai", message: "Terima kasih atas laporannya. Bisa dijelaskan lebih detail?", time: "12:01" },
      { sender: "customer", message: "Ini bug yang kompleks, perlu penanganan khusus", time: "12:02" },
    ],
  },
]

export const getTicketsByStatus = (status: string) => {
  return mockTickets.filter((ticket) => ticket.status === status)
}

export const getTicketsByCS = (csName: string) => {
  return mockTickets.filter((ticket) => ticket.csIssued === csName)
}

export const mockReports = [
  {
    date: "2024-01-15",
    totalChats: 25,
    resolvedByAI: 18,
    escalatedToHuman: 7,
    avgResponseTime: "2.5 min",
    customerSatisfaction: 4.2,
  },
  {
    date: "2024-01-14",
    totalChats: 32,
    resolvedByAI: 24,
    escalatedToHuman: 8,
    avgResponseTime: "3.1 min",
    customerSatisfaction: 4.0,
  },
  {
    date: "2024-01-13",
    totalChats: 28,
    resolvedByAI: 21,
    escalatedToHuman: 7,
    avgResponseTime: "2.8 min",
    customerSatisfaction: 4.3,
  },
]
