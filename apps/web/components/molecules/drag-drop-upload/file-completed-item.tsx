"use client";

import { CheckCircle2, X } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { formatFileSize } from "@/utils";

interface FileCompletedItemProps {
  file: File;
  onRemove: () => void;
}

export function FileCompletedItem({ file, onRemove }: FileCompletedItemProps) {
  return (
    <div className="flex items-center justify-between rounded-md border p-3">
      <div className="flex items-center gap-2 text-sm">
        <CheckCircle2 className="h-4 w-4 text-green-500" />
        <span className="truncate max-w-[200px]">{file.name}</span>
        <span className="text-xs text-muted-foreground">
          ({formatFileSize(file.size)})
        </span>
      </div>
      <Button
        size="icon"
        variant="ghost"
        className="h-6 w-6"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
