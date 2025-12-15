"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import { CalendarClock, Clock, CheckCircle } from "lucide-react";
import {
  formatStage,
  getStatusBadge,
  getRiskBadge,
  type FollowUpItem,
} from "@/components/molecules/follow-up";

interface FollowUpTimelineProps {
  data: FollowUpItem[];
}

export function FollowUpTimeline({ data }: FollowUpTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Timeline Mendatang
        </CardTitle>
        <CardDescription>
          Visualisasi jadwal follow up dalam bentuk timeline.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[380px] pr-2">
          {data.length === 0 ? (
            <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
              Tidak ada jadwal follow up aktif.
            </div>
          ) : (
            <div className="relative space-y-4 pl-6">
              {/* Timeline line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-border" />

              {data.slice(0, 8).map((item) => {
                const isLate = item.status === "Terlambat";
                const isDone = item.status === "Selesai";

                return (
                  <div key={item.id} className="relative">
                    {/* Timeline dot */}
                    <div
                      className={`absolute -left-6 top-1 h-3.5 w-3.5 rounded-full border-2 ${
                        isDone
                          ? "border-emerald-500 bg-emerald-500"
                          : isLate
                            ? "border-red-500 bg-red-500"
                            : "border-blue-500 bg-background"
                      }`}
                    >
                      {isDone && (
                        <CheckCircle className="h-2.5 w-2.5 text-white" />
                      )}
                    </div>

                    {/* Content */}
                    <div
                      className={`rounded-lg border p-3 transition-all ${
                        isLate
                          ? "border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20"
                          : isDone
                            ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20"
                            : "border-border bg-card"
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-0.5">
                            <div className="font-medium text-sm">
                              {item.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {formatStage(item.stage)}
                            </div>
                          </div>
                          {getRiskBadge(item.riskLevel)}
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <span className="inline-flex items-center gap-1 text-muted-foreground">
                            <CalendarClock className="h-3 w-3" />
                            {item.dueDate}
                          </span>
                          {getStatusBadge(item.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
