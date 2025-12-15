"use client";

import { useRef, useState, useCallback } from "react";
import { Upload, FileText, X, CheckCircle2 } from "lucide-react";
import { Card } from "@repo/ui/components/card";
import { cn } from "@repo/ui/utils";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { ClassNameProps } from "@/types";

export type DragDropProps = ClassNameProps & {
  onFilesChange?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  classNameCard?: string;
};

type FileWithProgress = {
  file: File;
  progress: number;
  uploadedSize: number;
  status: "uploading" | "completed";
};

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export function DragDropUpload({
  onFilesChange,
  accept,
  multiple = true,
  className,
  classNameCard,
}: DragDropProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<FileWithProgress[]>([]);
  const [completedFiles, setCompletedFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = useCallback((fileWithProgress: FileWithProgress) => {
    const totalSize = fileWithProgress.file.size;
    const steps = 20;
    const increment = totalSize / steps;
    let currentSize = 0;
    let currentProgress = 0;

    const interval = setInterval(() => {
      currentSize += increment;
      currentProgress += 5;

      if (currentProgress >= 100) {
        clearInterval(interval);
        setUploadingFiles((prev) =>
          prev.filter((f) => f.file.name !== fileWithProgress.file.name)
        );
        setCompletedFiles((prev) => {
          const updated = [...prev, fileWithProgress.file];
          return updated;
        });
      } else {
        setUploadingFiles((prev) =>
          prev.map((f) =>
            f.file.name === fileWithProgress.file.name
              ? {
                  ...f,
                  progress: currentProgress,
                  uploadedSize: Math.min(currentSize, totalSize),
                }
              : f
          )
        );
      }
    }, 100);
  }, []);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const fileArray = Array.from(newFiles);

    const newUploadingFiles: FileWithProgress[] = fileArray.map((file) => ({
      file,
      progress: 0,
      uploadedSize: 0,
      status: "uploading" as const,
    }));

    setUploadingFiles((prev) =>
      multiple ? [...prev, ...newUploadingFiles] : newUploadingFiles
    );

    newUploadingFiles.forEach((f) => simulateUpload(f));
    onFilesChange?.([...completedFiles, ...fileArray]);
  };

  const removeFile = (index: number) => {
    setCompletedFiles((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      onFilesChange?.(updated);
      return updated;
    });
  };

  const cancelUpload = (fileName: string) => {
    setUploadingFiles((prev) => prev.filter((f) => f.file.name !== fileName));
  };

  const completedCount = completedFiles.length;
  const totalCount = uploadingFiles.length + completedFiles.length;

  const styleSucces = "border-green-500 bg-green-100 dark:bg-green-950/30";
  const acceptFormated = `Supported formates: ${accept}`;

  return (
    <div className={cn("space-y-4", className)}>
      <Card
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-3 border-2 border-dashed p-6 text-center transition",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/30",
          classNameCard
        )}
      >
        <Upload className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm">
          <span className="font-medium">Click to upload</span> atau drag & drop
        </p>
        <p className="text-xs text-muted-foreground">
          {acceptFormated || "Any file"}
        </p>
      </Card>

      <Input
        ref={inputRef}
        type="file"
        hidden
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
      />

      {uploadingFiles.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium">
            Uploading - {completedCount}/{totalCount} files
          </p>
          {uploadingFiles.map((item) => (
            <div
              key={item.file.name}
              className="space-y-2 rounded-md border p-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate max-w-[200px]">
                    {item.file.name}
                  </span>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6"
                  onClick={() => cancelUpload(item.file.name)}
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
          ))}
        </div>
      )}

      {completedFiles.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium">Uploaded</p>
          {completedFiles.map((file, index) => (
            // NOTE: Review where is the best on beetwen using styleSucces or not using
            <div
              key={index}
              className={cn(
                "flex items-center justify-between rounded-md border p-3"
                // styleSucces
              )}
            >
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
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
