"use client";

import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { ArrowUpDown, Filter } from "lucide-react";
import { InputSearch } from "@/components/molecules";

type RiskLevel = "rendah" | "sedang" | "tinggi";

interface ParticipantRisk {
  id: number;
  name: string;
  facility: string;
  riskScore: number;
  riskLevel: RiskLevel;
  lastUpdated: string;
  status: "Dipantau" | "Stabil" | "Perlu Tindak Lanjut";
}

interface RiskTableProps {
  data: ParticipantRisk[];
  search: string;
  onSearchChange: (value: string) => void;
  riskFilter: string;
  onRiskFilterChange: (value: string) => void;
  facilityFilter: string;
  onFacilityFilterChange: (value: string) => void;
  onResetFilter: () => void;
}

function getRiskBadge(level: RiskLevel) {
  switch (level) {
    case "tinggi":
      return (
        <Badge className="bg-red-500/15 text-red-600 hover:bg-red-500/20">
          Risiko Tinggi
        </Badge>
      );
    case "sedang":
      return (
        <Badge className="bg-yellow-500/15 text-yellow-600 hover:bg-yellow-500/20">
          Risiko Sedang
        </Badge>
      );
    case "rendah":
    default:
      return (
        <Badge className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/20">
          Risiko Rendah
        </Badge>
      );
  }
}

export function RiskTable({
  data,
  search,
  onSearchChange,
  riskFilter,
  onRiskFilterChange,
  facilityFilter,
  onFacilityFilterChange,
  onResetFilter,
}: RiskTableProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
        <div>
          <CardTitle className="text-base">Daftar Peserta</CardTitle>
          <CardDescription>
            Filter dan analisis peserta berdasarkan skor risiko.
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={onResetFilter}
        >
          <Filter className="h-4 w-4" />
          Reset Filter
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filter bar */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <InputSearch
            search={search}
            onSearchChange={onSearchChange}
            placeholder="Cari nama atau fasilitas..."
          />
          <div className="flex flex-wrap gap-2 md:justify-end">
            <Select value={riskFilter} onValueChange={onRiskFilterChange}>
              <SelectTrigger className="h-9 w-[150px]">
                <SelectValue placeholder="Semua risiko" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Risiko</SelectItem>
                <SelectItem value="tinggi">Risiko Tinggi</SelectItem>
                <SelectItem value="sedang">Risiko Sedang</SelectItem>
                <SelectItem value="rendah">Risiko Rendah</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={facilityFilter}
              onValueChange={onFacilityFilterChange}
            >
              <SelectTrigger className="h-9 w-[160px]">
                <SelectValue placeholder="Semua fasilitas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Fasilitas</SelectItem>
                <SelectItem value="Rehab A">Rehab A</SelectItem>
                <SelectItem value="Rehab B">Rehab B</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabel */}
        <ScrollArea className="h-[380px] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">#</TableHead>
                <TableHead>Nama Peserta</TableHead>
                <TableHead>Fasilitas</TableHead>
                <TableHead className="whitespace-nowrap">
                  <button className="inline-flex items-center gap-1 text-xs font-medium">
                    Skor Risiko
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="whitespace-nowrap">
                  Diupdate Terakhir
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-sm">
                    Tidak ada data yang sesuai filter.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item, index) => (
                  <TableRow key={item.id} className="hover:bg-muted/50">
                    <TableCell className="text-xs text-muted-foreground">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-sm">{item.facility}</TableCell>
                    <TableCell className="text-sm">{item.riskScore}</TableCell>
                    <TableCell>{getRiskBadge(item.riskLevel)}</TableCell>
                    <TableCell className="text-xs">
                      <Badge variant="outline">{item.status}</Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {item.lastUpdated}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export type { ParticipantRisk, RiskLevel };
