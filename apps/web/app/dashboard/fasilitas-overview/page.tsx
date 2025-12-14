"use client";

import { useState } from "react";
import {
  Header,
  SummaryCards,
  type SummaryCardItem,
} from "@/components/molecules";
import {
  FacilityFilterBar,
  FacilityCardGrid,
  type Facility,
} from "@/components/molecules/fasilitas-overview";
import { Building2, Users, CheckCircle2, AlertTriangle } from "lucide-react";

const facilities: Facility[] = [
  {
    id: 1,
    name: "Pusat Rehabilitasi A",
    region: "Jakarta",
    activeParticipants: 54,
    completedThisYear: 120,
    successRate: 82,
    highRiskParticipants: 7,
  },
  {
    id: 2,
    name: "Pusat Rehabilitasi B",
    region: "Bandung",
    activeParticipants: 38,
    completedThisYear: 90,
    successRate: 76,
    highRiskParticipants: 5,
  },
  {
    id: 3,
    name: "Pusat Rehabilitasi C",
    region: "Surabaya",
    activeParticipants: 29,
    completedThisYear: 65,
    successRate: 88,
    highRiskParticipants: 3,
  },
];

export default function FasilitasOverview() {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState<string>("all");

  const filtered = facilities.filter((f) => {
    const matchSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.region.toLowerCase().includes(search.toLowerCase());
    const matchRegion =
      regionFilter === "all" ? true : f.region === regionFilter;
    return matchSearch && matchRegion;
  });

  const totalFacilities = facilities.length;
  const totalActive = facilities.reduce(
    (acc, cur) => acc + cur.activeParticipants,
    0
  );
  const avgSuccess =
    facilities.reduce((acc, cur) => acc + cur.successRate, 0) /
    facilities.length;
  const totalHighRisk = facilities.reduce(
    (acc, cur) => acc + cur.highRiskParticipants,
    0
  );

  const regions = Array.from(new Set(facilities.map((f) => f.region)));

  const summaryItems: SummaryCardItem[] = [
    {
      title: "Jumlah Fasilitas",
      value: totalFacilities,
      description: "Terdaftar dalam sistem saat ini.",
      icon: <Building2 className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Peserta Aktif",
      value: totalActive,
      description: "Peserta yang sedang menjalani rehabilitasi.",
      icon: <Users className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Rata-rata Keberhasilan",
      value: `${avgSuccess.toFixed(1)}%`,
      description: "Berdasarkan data keberhasilan per fasilitas.",
      icon: <CheckCircle2 className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Peserta Risiko Tinggi",
      value: totalHighRisk,
      description: "Perlu pemantauan dan tindak lanjut lebih intensif.",
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
    },
  ];

  const handleReset = () => {
    setSearch("");
    setRegionFilter("all");
  };

  return (
    <div className="space-y-6 px-4 py-5">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <Header
          title="Ringkasan Fasilitas Rehabilitasi"
          description="Lihat performa dan kapasitas tiap fasilitas rehabilitasi untuk pemantauan di tingkat pusat."
        />
      </div>

      <SummaryCards items={summaryItems} columns={4} />

      <FacilityFilterBar
        search={search}
        onSearchChange={setSearch}
        regionFilter={regionFilter}
        onRegionFilterChange={setRegionFilter}
        regions={regions}
        onReset={handleReset}
      />

      <FacilityCardGrid facilities={filtered} />
    </div>
  );
}
