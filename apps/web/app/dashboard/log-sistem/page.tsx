"use client";

import { useState } from "react";
import {
  Header,
  SummaryCards,
  type SummaryCardItem,
} from "@/components/molecules";
import {
  LogActivityFeed,
  type SystemLog,
} from "@/components/molecules/log-sistem";
import { Button } from "@repo/ui/components/button";
import { Download, RefreshCw } from "lucide-react";

const mockLogs: SystemLog[] = [
  {
    id: 1,
    timestamp: "2025-12-06 14:32:15",
    user: "Admin User",
    action: "create",
    level: "success",
    module: "Peserta",
    description: "Menambahkan peserta baru: Andi Setiawan",
    ipAddress: "192.168.1.100",
  },
  {
    id: 2,
    timestamp: "2025-12-06 14:28:42",
    user: "Petugas A",
    action: "update",
    level: "info",
    module: "Follow Up",
    description: "Memperbarui status follow up untuk Budi Santoso",
    ipAddress: "192.168.1.105",
  },
  {
    id: 3,
    timestamp: "2025-12-06 14:15:03",
    user: "Admin User",
    action: "delete",
    level: "warning",
    module: "Fasilitas",
    description: "Menghapus fasilitas: Pusat Rehabilitasi D",
    ipAddress: "192.168.1.100",
  },
  {
    id: 4,
    timestamp: "2025-12-06 13:45:22",
    user: "System",
    action: "export",
    level: "success",
    module: "Laporan",
    description: "Export laporan bulanan berhasil",
  },
  {
    id: 5,
    timestamp: "2025-12-06 13:30:11",
    user: "Petugas B",
    action: "login",
    level: "info",
    module: "Auth",
    description: "Login berhasil",
    ipAddress: "192.168.1.110",
  },
  {
    id: 6,
    timestamp: "2025-12-06 12:58:33",
    user: "Unknown",
    action: "login",
    level: "error",
    module: "Auth",
    description: "Percobaan login gagal - kredensial salah",
    ipAddress: "203.0.113.45",
  },
  {
    id: 7,
    timestamp: "2025-12-06 12:20:05",
    user: "Admin User",
    action: "update",
    level: "success",
    module: "Analisis Risiko",
    description: "Memperbarui model prediksi risiko",
    ipAddress: "192.168.1.100",
  },
  {
    id: 8,
    timestamp: "2025-12-06 11:45:18",
    user: "Petugas A",
    action: "view",
    level: "info",
    module: "Dashboard",
    description: "Mengakses halaman dashboard",
    ipAddress: "192.168.1.105",
  },
];

export default function LogSistem() {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [moduleFilter, setModuleFilter] = useState<string>("all");

  const filtered = mockLogs.filter((log) => {
    const matchSearch =
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.description.toLowerCase().includes(search.toLowerCase()) ||
      log.module.toLowerCase().includes(search.toLowerCase());
    const matchLevel = levelFilter === "all" ? true : log.level === levelFilter;
    const matchModule =
      moduleFilter === "all" ? true : log.module === moduleFilter;
    return matchSearch && matchLevel && matchModule;
  });

  const modules = Array.from(new Set(mockLogs.map((l) => l.module)));

  const totalLogs = mockLogs.length;
  const errorCount = mockLogs.filter((l) => l.level === "error").length;
  const warningCount = mockLogs.filter((l) => l.level === "warning").length;
  const todayCount = mockLogs.filter((l) =>
    l.timestamp.startsWith("2025-12-06")
  ).length;

  const summaryItems: SummaryCardItem[] = [
    {
      title: "Total Log Hari Ini",
      value: todayCount,
      description: `Aktivitas tercatat pada ${new Date().toLocaleDateString("id-ID")}`,
      borderColor: "border-l-blue-500",
    },
    {
      title: "Total Semua Log",
      value: totalLogs,
      description: "Riwayat aktivitas sistem",
      borderColor: "border-l-gray-500",
    },
    {
      title: "Warning",
      value: warningCount,
      description: "Aktivitas yang perlu perhatian",
      borderColor: "border-l-yellow-500",
    },
    {
      title: "Error",
      value: errorCount,
      description: "Aktivitas gagal atau bermasalah",
      borderColor: "border-l-red-500",
    },
  ];

  const handleReset = () => {
    setSearch("");
    setLevelFilter("all");
    setModuleFilter("all");
  };

  return (
    <div className="space-y-6 px-4 py-5">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <Header
          title="Log Aktivitas Sistem"
          description="Pantau semua aktivitas dan perubahan yang terjadi dalam sistem."
        />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export Log
          </Button>
        </div>
      </div>

      <SummaryCards items={summaryItems} columns={4} />

      <LogActivityFeed
        data={filtered}
        modules={modules}
        search={search}
        onSearchChange={setSearch}
        levelFilter={levelFilter}
        onLevelFilterChange={setLevelFilter}
        moduleFilter={moduleFilter}
        onModuleFilterChange={setModuleFilter}
        onReset={handleReset}
      />
    </div>
  );
}
