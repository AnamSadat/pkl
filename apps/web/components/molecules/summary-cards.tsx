"use client";

import { type ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { cn } from "@repo/ui/utils";

interface SummaryCardItem {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: string;
    label: string;
    type?: "positive" | "negative" | "neutral";
  };
  borderColor?: string;
}

interface SummaryCardsProps {
  items: SummaryCardItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const gridColsMap = {
  2: "grid-cols-2",
  3: "grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

const trendColorMap = {
  positive: "text-emerald-600",
  negative: "text-red-600",
  neutral: "text-muted-foreground",
};

export function SummaryCards({
  items,
  columns = 4,
  className,
}: SummaryCardsProps) {
  return (
    <div className={cn("grid gap-3 sm:gap-4", gridColsMap[columns], className)}>
      {items.map((item, index) => (
        <Card
          key={index}
          className={cn(
            "overflow-hidden gap-0 py-0",
            item.borderColor && `border-l-4 ${item.borderColor}`
          )}
        >
          <CardHeader className="p-3 sm:p-4 md:px-6 sm:pb-2 space-y-0">
            {/* Title row with icon */}
            <div
              className={cn(
                "flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2",
                item.icon ? "justify-start" : "justify-between"
              )}
            >
              {item.icon && (
                <div className="shrink-0 [&>svg]:h-4 [&>svg]:w-4 sm:[&>svg]:h-5 sm:[&>svg]:w-5">
                  {item.icon}
                </div>
              )}
              <CardDescription className="text-xs sm:text-sm truncate">
                {item.title}
              </CardDescription>
            </div>

            {/* Value */}
            <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold truncate">
              {item.value}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-3 sm:p-4 md:px-6 pt-0">
            {item.trend ? (
              <div className="flex flex-wrap items-center gap-1 text-[10px] sm:text-xs">
                <span
                  className={cn(trendColorMap[item.trend.type || "neutral"])}
                >
                  {item.trend.value}
                </span>
                <span className="text-muted-foreground truncate">
                  {item.trend.label}
                </span>
              </div>
            ) : item.description ? (
              <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2">
                {item.description}
              </p>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export type { SummaryCardItem, SummaryCardsProps };
