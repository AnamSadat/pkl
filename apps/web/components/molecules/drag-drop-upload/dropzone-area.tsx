"use client";

import { Upload } from "lucide-react";
import { Card } from "@repo/ui/components/card";
import { cn } from "@repo/ui/utils";
import { formatFileSize } from "@/utils";
import { Input } from "@repo/ui/components/input";

interface DropzoneAreaProps {
  getRootProps: () => Record<string, unknown>;
  getInputProps: () => Record<string, unknown>;
  isDragActive: boolean;
  accept?: string;
  maxSize: number;
  classNameCard?: string;
}

export function DropzoneArea({
  getRootProps,
  getInputProps,
  isDragActive,
  accept,
  maxSize,
  classNameCard,
}: DropzoneAreaProps) {
  const acceptFormatted = accept ? `Supported formats: ${accept}` : "Any file";

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-3 border-2 border-dashed p-6 text-center transition",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/30",
        classNameCard
      )}
    >
      <Input {...getInputProps()} />
      <Upload className="h-8 w-8 text-muted-foreground" />
      <p className="text-sm">
        <span className="font-medium">Click to upload</span> atau drag & drop
      </p>
      <p className="text-xs text-muted-foreground">{acceptFormatted}</p>
      <p className="text-xs text-muted-foreground">
        Max size: {formatFileSize(maxSize)}
      </p>
    </Card>
  );
}
