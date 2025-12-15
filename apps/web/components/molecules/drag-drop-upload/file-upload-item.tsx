"use client";

import { FileText, X } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { FileWithProgress } from "@/types/components/type-drag-drop-upload";
import { formatFileSize } from "@/utils";

interface FileUploadItemProps {
  item: FileWithProgress;
  onCancel: (fileName: string) => void;
}

export function FileUploadItem({ item, onCancel }: FileUploadItemProps) {
  return (
    <div className="space-y-2 rounded-md border p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="truncate max-w-[200px]">{item.file.name}</span>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6"
          onClick={(e) => {
            e.stopPropagation();
            onCancel(item.file.name);
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-1">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary transition-all duration-200 ease-out"
            style={{ width: `${item.progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            {formatFileSize(item.uploadedSize)} /{" "}
            {formatFileSize(item.file.size)}
          </span>
          <span>{item.progress}%</span>
        </div>
      </div>
    </div>
  );
}
