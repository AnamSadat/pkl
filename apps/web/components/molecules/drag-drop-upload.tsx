"use client";

import { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Upload, FileText, X, CheckCircle2 } from "lucide-react";
import { Card } from "@repo/ui/components/card";
import { cn } from "@repo/ui/utils";
import { Button } from "@repo/ui/components/button";
import { ClassNameProps } from "@/types";
import toast from "react-hot-toast";
import { z } from "zod";

export type DragDropProps = ClassNameProps & {
  onFilesChange?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  classNameCard?: string;
  maxSize?: number; // in bytes
};

type FileWithProgress = {
  file: File;
  progress: number;
  uploadedSize: number;
};

// Zod schema for file validation
const createFileSchema = (
  acceptedExtensions: string[],
  maxSize: number = 10 * 1024 * 1024
) =>
  z.object({
    name: z.string().refine(
      (name) => {
        if (acceptedExtensions.length === 0) return true;
        const ext = name.split(".").pop()?.toLowerCase() || "";
        return acceptedExtensions.includes(ext);
      },
      { message: "Format file tidak didukung" }
    ),
    size: z
      .number()
      .max(maxSize, `Ukuran file maksimal ${formatFileSize(maxSize)}`),
  });

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function parseAcceptProp(accept?: string): {
  extensions: string[];
  mimeTypes: Record<string, string[]>;
} {
  if (!accept) return { extensions: [], mimeTypes: {} };

  const extensions = accept
    .split(",")
    .map((ext) => ext.trim().toLowerCase().replace(".", ""));

  // Map extensions to MIME types for react-dropzone
  const mimeMap: Record<string, string> = {
    csv: "text/csv",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    doc: "application/msword",
    pdf: "application/pdf",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    xls: "application/vnd.ms-excel",
    txt: "text/plain",
    json: "application/json",
  };

  const mimeTypes: Record<string, string[]> = {};
  extensions.forEach((ext) => {
    const mime = mimeMap[ext];
    if (mime) {
      mimeTypes[mime] = [`.${ext}`];
    }
  });

  return { extensions, mimeTypes };
}

export function DragDropUpload({
  onFilesChange,
  accept,
  multiple = true,
  className,
  classNameCard,
  maxSize = 10 * 1024 * 1024, // 10MB default
}: DragDropProps) {
  const [uploadingFiles, setUploadingFiles] = useState<FileWithProgress[]>([]);
  const [completedFiles, setCompletedFiles] = useState<File[]>([]);

  const { extensions, mimeTypes } = parseAcceptProp(accept);
  const fileSchema = createFileSchema(extensions, maxSize);

  const simulateUpload = useCallback((file: File) => {
    const totalSize = file.size;
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
          prev.filter((f) => f.file.name !== file.name)
        );
        setCompletedFiles((prev) => [...prev, file]);
      } else {
        setUploadingFiles((prev) =>
          prev.map((f) =>
            f.file.name === file.name
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

  const validateFiles = useCallback(
    (files: File[]): { valid: File[]; errors: string[] } => {
      const valid: File[] = [];
      const errors: string[] = [];

      files.forEach((file) => {
        const result = fileSchema.safeParse({
          name: file.name,
          size: file.size,
        });
        if (result.success) {
          valid.push(file);
        } else {
          const errorMsg = result.error.issues
            .map((issue) => issue.message)
            .join(", ");
          errors.push(`${file.name}: ${errorMsg}`);
        }
      });

      return { valid, errors };
    },
    [fileSchema]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // Handle rejected files from react-dropzone
      if (rejectedFiles.length > 0) {
        const errorMessages = rejectedFiles.map((rejection) => {
          const errors = rejection.errors.map((e) => {
            if (e.code === "file-too-large") return `Ukuran file terlalu besar`;
            if (e.code === "file-invalid-type") return `Format tidak didukung`;
            return e.message;
          });
          return `${rejection.file.name}: ${errors.join(", ")}`;
        });
        toast.error(errorMessages.join("\n"));
      }

      // Additional Zod validation
      const { valid, errors } = validateFiles(acceptedFiles);

      if (errors.length > 0) {
        toast.error(errors.join("\n"));
      }

      if (valid.length === 0) return;

      const newUploadingFiles: FileWithProgress[] = valid.map((file) => ({
        file,
        progress: 0,
        uploadedSize: 0,
      }));

      setUploadingFiles((prev) =>
        multiple ? [...prev, ...newUploadingFiles] : newUploadingFiles
      );

      newUploadingFiles.forEach((f) => simulateUpload(f.file));
      onFilesChange?.([...completedFiles, ...valid]);
    },
    [completedFiles, multiple, onFilesChange, simulateUpload, validateFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: Object.keys(mimeTypes).length > 0 ? mimeTypes : undefined,
    multiple,
    maxSize,
  });

  const removeFile = (index: number) => {
    const updated = completedFiles.filter((_, i) => i !== index);
    setCompletedFiles(updated);
    // Call onFilesChange outside of setState to avoid render-phase update
    setTimeout(() => onFilesChange?.(updated), 0);
  };

  const cancelUpload = (fileName: string) => {
    setUploadingFiles((prev) => prev.filter((f) => f.file.name !== fileName));
  };

  const completedCount = completedFiles.length;
  const totalCount = uploadingFiles.length + completedFiles.length;
  const acceptFormatted = accept ? `Supported formats: ${accept}` : "Any file";

  return (
    <div className={cn("space-y-4", className)}>
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
        <input {...getInputProps()} />
        <Upload className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm">
          <span className="font-medium">Click to upload</span> atau drag & drop
        </p>
        <p className="text-xs text-muted-foreground">{acceptFormatted}</p>
        <p className="text-xs text-muted-foreground">
          Max size: {formatFileSize(maxSize)}
        </p>
      </Card>

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
                  onClick={(e) => {
                    e.stopPropagation();
                    cancelUpload(item.file.name);
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
          ))}
        </div>
      )}

      {completedFiles.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium">Uploaded</p>
          {completedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-md border p-3"
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
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
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
