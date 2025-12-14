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
  Building2,
  Users,
  CheckCircle2,
  MapPin,
  ArrowUpDown,
  AlertTriangle,
} from "lucide-react";

interface Facility {
  id: number;
  name: string;
  region: string;
  activeParticipants: number;
  completedThisYear: number;
  successRate: number;
  highRiskParticipants: number;
}

interface FacilityCardGridProps {
  facilities: Facility[];
}

export function FacilityCardGrid({ facilities }: FacilityCardGridProps) {
  if (facilities.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
        <p className="text-sm text-muted-foreground">
          Tidak ada fasilitas yang sesuai filter.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[500px] pr-2">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {facilities.map((f) => (
          <Card
            key={f.id}
            className="group relative overflow-hidden transition-all hover:shadow-md"
          >
            <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/5" />
            <CardHeader className="relative pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <CardTitle className="text-base leading-tight">
                    {f.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1 text-xs">
                    <MapPin className="h-3 w-3" />
                    {f.region}
                  </CardDescription>
                </div>
                <Building2 className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Metrics grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1 rounded-lg bg-muted/50 p-2.5">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    Peserta Aktif
                  </div>
                  <div className="text-xl font-bold">
                    {f.activeParticipants}
                  </div>
                </div>
                <div className="space-y-1 rounded-lg bg-muted/50 p-2.5">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3 w-3" />
                    Selesai
                  </div>
                  <div className="text-xl font-bold">{f.completedThisYear}</div>
                </div>
              </div>

              {/* Success rate bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Tingkat Keberhasilan
                  </span>
                  <span className="font-semibold">{f.successRate}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all"
                    style={{ width: `${f.successRate}%` }}
                  />
                </div>
              </div>

              {/* Risk indicator */}
              <div className="flex items-center justify-between rounded-lg border border-border/50 bg-background p-2.5">
                <div className="flex items-center gap-2 text-xs">
                  <AlertTriangle
                    className={`h-4 w-4 ${f.highRiskParticipants > 0 ? "text-red-500" : "text-muted-foreground"}`}
                  />
                  <span className="text-muted-foreground">Risiko Tinggi</span>
                </div>
                {f.highRiskParticipants > 0 ? (
                  <Badge className="bg-red-500/15 text-red-600 hover:bg-red-500/20">
                    {f.highRiskParticipants} peserta
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-emerald-600">
                    Tidak ada
                  </Badge>
                )}
              </div>

              {/* Action button */}
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground"
              >
                Lihat Detail
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}

export type { Facility };
