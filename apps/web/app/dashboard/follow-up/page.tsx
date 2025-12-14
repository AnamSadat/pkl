"use client";

import { useMemo, useState } from "react";
import {
  Header,
  SummaryCards,
  type SummaryCardItem,
} from "@/components/molecules";
import {
  FollowUpTaskList,
  FollowUpTimeline,
  type FollowUpItem,
  type FollowUpStage,
  type FollowUpStatus,
} from "@/components/molecules/follow-up";
import { CalendarClock, AlertTriangle, Users } from "lucide-react";

const followUpData: FollowUpItem[] = [
  {
    id: 1,
    name: "Andi Setiawan",
    facility: "Pusat Rehabilitasi A",
    stage: "1_bulan",
    dueDate: "2025-12-07",
    status: "Menunggu",
    riskLevel: "tinggi",
  },
  {
    id: 2,
    name: "Budi Santoso",
    facility: "Pusat Rehabilitasi B",
    stage: "3_bulan",
    dueDate: "2025-12-05",
    status: "Terlambat",
    riskLevel: "sedang",
  },
  {
    id: 3,
    name: "Sari Lestari",
    facility: "Pusat Rehabilitasi A",
    stage: "6_bulan",
    dueDate: "2025-12-20",
    status: "Menunggu",
    riskLevel: "rendah",
  },
  {
    id: 4,
    name: "Rudi Hartono",
    facility: "Pusat Rehabilitasi C",
    stage: "3_bulan",
    dueDate: "2025-12-02",
    status: "Selesai",
    riskLevel: "sedang",
  },
];

export default function FollowUp() {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = followUpData.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.facility.toLowerCase().includes(search.toLowerCase());
    const matchStage =
      stageFilter === "all"
        ? true
        : item.stage === (stageFilter as FollowUpStage);
    const matchStatus =
      statusFilter === "all"
        ? true
        : item.status === (statusFilter as FollowUpStatus);
    return matchSearch && matchStage && matchStatus;
  });

  const totalFollowUp = followUpData.length;
  const waitingCount = followUpData.filter(
    (i) => i.status === "Menunggu"
  ).length;
  const lateCount = followUpData.filter((i) => i.status === "Terlambat").length;
  const highRiskCount = followUpData.filter(
    (i) => i.riskLevel === "tinggi"
  ).length;

  const upcomingSorted = useMemo(
    () => [...filtered].sort((a, b) => a.dueDate.localeCompare(b.dueDate)),
    [filtered]
  );

  const summaryItems: SummaryCardItem[] = [
    {
      title: "Total Peserta Follow Up",
      value: totalFollowUp,
      description: "Peserta yang masih dalam masa pemantauan.",
      icon: <Users className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Menunggu Tindak Lanjut",
      value: waitingCount,
      description: "Jadwal follow up yang belum dikerjakan.",
      icon: <CalendarClock className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Terlambat / Risiko",
      value: `${lateCount} / ${highRiskCount}`,
      description: "Terlambat follow up / peserta risiko tinggi.",
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
    },
  ];

  const handleReset = () => {
    setSearch("");
    setStageFilter("all");
    setStatusFilter("all");
  };

  return (
    <div className="space-y-6 px-4 py-5">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <Header
          title="Tindak Lanjut Pasca Rehabilitasi"
          description="Daftar tugas follow up peserta setelah selesai program rehabilitasi."
        />
      </div>

      <SummaryCards items={summaryItems} columns={3} />

      <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
        <FollowUpTaskList
          data={upcomingSorted}
          search={search}
          onSearchChange={setSearch}
          stageFilter={stageFilter}
          onStageFilterChange={setStageFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onReset={handleReset}
        />
        <FollowUpTimeline data={upcomingSorted} />
      </div>
    </div>
  );
}
