"use client";

import { Button } from "@repo/ui/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { Filter } from "lucide-react";
import { InputSearch } from "@/components/molecules";

interface FacilityFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  regionFilter: string;
  onRegionFilterChange: (value: string) => void;
  regions: string[];
  onReset: () => void;
}

export function FacilityFilterBar({
  search,
  onSearchChange,
  regionFilter,
  onRegionFilterChange,
  regions,
  onReset,
}: FacilityFilterBarProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <InputSearch
        search={search}
        onSearchChange={onSearchChange}
        placeholder="Cari nama fasilitas atau kota..."
      />
      <div className="flex flex-wrap gap-2 md:justify-end">
        <Select value={regionFilter} onValueChange={onRegionFilterChange}>
          <SelectTrigger className="h-9 w-[180px]">
            <SelectValue placeholder="Semua wilayah" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Wilayah</SelectItem>
            {regions.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={onReset}
        >
          <Filter className="h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  );
}
