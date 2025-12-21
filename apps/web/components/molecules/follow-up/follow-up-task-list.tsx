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
import { CalendarClock, Filter, ArrowRight } from "lucide-react";
import { InputSearch } from "@/components/molecules";

type FollowUpStage = "1_bulan" | "3_bulan" | "6_bulan";
type FollowUpStatus = "Menunggu" | "Selesai" | "Terlambat";

interface FollowUpItem {
  id: number;
  name: string;
  facility: string;
  stage: FollowUpStage;
  dueDate: string;
  status: FollowUpStatus;
  riskLevel: "rendah" | "sedang" | "tinggi";
}

interface FollowUpTaskListProps {
  data: FollowUpItem[];
  search: string;
  onSearchChange: (value: string) => void;
  stageFilter: string;
  onStageFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  onReset: () => void;
}

function formatStage(stage: FollowUpStage) {
  if (stage === "1_bulan") return "Follow up 1 bulan";
  if (stage === "3_bulan") return "Follow up 3 bulan";
  return "Follow up 6 bulan";
}

function getStatusBadge(status: FollowUpStatus) {
  switch (status) {
    case "Menunggu":
      return (
        <Badge className="bg-blue-500/15 text-blue-600 hover:bg-blue-500/20">
          Menunggu
        </Badge>
      );
    case "Selesai":
      return (
        <Badge className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/20">
          Selesai
        </Badge>
      );
    case "Terlambat":
      return (
        <Badge className="bg-red-500/15 text-red-600 hover:bg-red-500/20">
          Terlambat
        </Badge>
      );
  }
}

function getRiskBadge(level: FollowUpItem["riskLevel"]) {
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

export function FollowUpTaskList({
  data,
  search,
  onSearchChange,
  stageFilter,
  onStageFilterChange,
  statusFilter,
  onStatusFilterChange,
  onReset,
}: FollowUpTaskListProps) {
  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base">Daftar Tugas Follow Up</CardTitle>
            <CardDescription>
              Tugas yang perlu dikerjakan oleh petugas hari ini dan mendatang.
            </CardDescription>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="shrink-0 gap-2"
            onClick={onReset}
          >
            <Filter className="h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-beetwen">
          <InputSearch
            search={search}
            onSearchChange={onSearchChange}
            placeholder="Cari peserta atau fasilitas..."
            className="w-full md:flex-1 md:max-w-xs lg:max-w-sm"
          />
          <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:justify-end">
            <Select value={stageFilter} onValueChange={onStageFilterChange}>
              <SelectTrigger className="h-9 w-full md:w-[150px]">
                <SelectValue placeholder="Tahap" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tahap</SelectItem>
                <SelectItem value="1_bulan">1 Bulan</SelectItem>
                <SelectItem value="3_bulan">3 Bulan</SelectItem>
                <SelectItem value="6_bulan">6 Bulan</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={onStatusFilterChange}>
              <SelectTrigger className="h-9 w-full md:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="Menunggu">Menunggu</SelectItem>
                <SelectItem value="Selesai">Selesai</SelectItem>
                <SelectItem value="Terlambat">Terlambat</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[380px] pr-2">
          {data.length === 0 ? (
            <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
              Tidak ada tugas follow up yang sesuai filter.
            </div>
          ) : (
            <div className="space-y-3">
              {data.map((item) => (
                <Card
                  key={item.id}
                  className="border border-border/60 bg-muted/40"
                >
                  <CardContent className="flex flex-col gap-2 p-3 text-sm md:flex-row md:items-center md:justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.name}</span>
                        {getRiskBadge(item.riskLevel)}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.facility} • {formatStage(item.stage)}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <CalendarClock className="h-3 w-3" />
                          Batas waktu: {item.dueDate}
                        </span>
                        {getStatusBadge(item.status)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 md:flex-col md:items-end">
                      <Button size="sm" variant="outline" className="gap-1">
                        Detail
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export { formatStage, getStatusBadge, getRiskBadge };
export type { FollowUpItem, FollowUpStage, FollowUpStatus };
