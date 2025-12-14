"use client";

import { useState } from "react";
import {
  Header,
  SummaryCards,
  type SummaryCardItem,
} from "@/components/molecules";
import {
  RiskTable,
  type ParticipantRisk,
  type RiskLevel,
} from "@/components/molecules/analisis-risiko";
import { Button } from "@repo/ui/components/button";
import {
  Activity,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

const mockData: ParticipantRisk[] = [
  {
    id: 1,
    name: "Andi Setiawan",
    facility: "Rehab A",
    riskScore: 82,
    riskLevel: "tinggi",
    lastUpdated: "2025-11-30",
    status: "Perlu Tindak Lanjut",
  },
  {
    id: 2,
    name: "Budi Santoso",
    facility: "Rehab B",
    riskScore: 63,
    riskLevel: "sedang",
    lastUpdated: "2025-11-28",
    status: "Dipantau",
  },
  {
    id: 3,
    name: "Sari Lestari",
    facility: "Rehab A",
    riskScore: 32,
    riskLevel: "rendah",
    lastUpdated: "2025-11-25",
    status: "Stabil",
  },
];

export default function AnalisisRisiko() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [facilityFilter, setFacilityFilter] = useState<string>("all");

  const filteredData = mockData.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.facility.toLowerCase().includes(search.toLowerCase());
    const matchRisk =
      riskFilter === "all"
        ? true
        : item.riskLevel === (riskFilter as RiskLevel);
    const matchFacility =
      facilityFilter === "all" ? true : item.facility === facilityFilter;
    return matchSearch && matchRisk && matchFacility;
  });

  const avgRisk =
    mockData.reduce((acc, cur) => acc + cur.riskScore, 0) / mockData.length;
  const highRiskCount = mockData.filter((i) => i.riskLevel === "tinggi").length;
  const mediumRiskCount = mockData.filter(
    (i) => i.riskLevel === "sedang"
  ).length;
  const lowRiskCount = mockData.filter((i) => i.riskLevel === "rendah").length;

  const summaryItems: SummaryCardItem[] = [
    {
      title: "Rata-rata Skor Risiko",
      value: `${avgRisk.toFixed(1)}/100`,
      borderColor: "border-l-blue-500",
      icon: <TrendingDown className="h-4 w-4 text-emerald-500" />,
      trend: { value: "-2.3%", label: "dari bulan lalu", type: "positive" },
    },
    {
      title: "Risiko Tinggi",
      value: `${highRiskCount} peserta`,
      borderColor: "border-l-red-500",
      icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
      trend: { value: "+1", label: "perlu tindak lanjut", type: "negative" },
    },
    {
      title: "Risiko Sedang",
      value: `${mediumRiskCount} peserta`,
      borderColor: "border-l-yellow-500",
      icon: <Minus className="h-4 w-4 text-yellow-500" />,
      trend: { value: "", label: "Pemantauan rutin", type: "neutral" },
    },
    {
      title: "Risiko Rendah",
      value: `${lowRiskCount} peserta`,
      borderColor: "border-l-emerald-500",
      icon: <TrendingUp className="h-4 w-4 text-emerald-500" />,
      trend: { value: "+3", label: "kondisi membaik", type: "positive" },
    },
  ];

  const handleResetFilter = () => {
    setSearch("");
    setRiskFilter("all");
    setFacilityFilter("all");
  };

  return (
    <div className="space-y-6 px-4 py-5">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <Header
          title="Analisis Risiko Peserta"
          description="Pantau skor risiko peserta rehabilitasi untuk membantu pengambilan keputusan dan tindak lanjut."
        />
        <Button variant="outline" size="sm" className="gap-2">
          <Activity className="h-4 w-4" />
          Lihat Ringkasan Model
        </Button>
      </div>

      <SummaryCards items={summaryItems} columns={4} />

      <RiskTable
        data={filteredData}
        search={search}
        onSearchChange={setSearch}
        riskFilter={riskFilter}
        onRiskFilterChange={setRiskFilter}
        facilityFilter={facilityFilter}
        onFacilityFilterChange={setFacilityFilter}
        onResetFilter={handleResetFilter}
      />
    </div>
  );
}
