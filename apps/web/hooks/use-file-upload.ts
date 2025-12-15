"use client";

import { useCallback, useState } from "react";
import { FileRejection } from "react-dropzone";
import toast from "react-hot-toast";
import { FileWithProgress } from "@/types/components/type-drag-drop-upload";
import { parseAcceptProp } from "@/lib";
import { createFileSchema } from "@/validator";

interface UseFileUploadOptions {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  onFilesChange?: (files: File[]) => void;
}

export function useFileUpload({
  accept,
  multiple = true,
  maxSize = 10 * 1024 * 1024,
  onFilesChange,
}: UseFileUploadOptions) {
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

  const removeFile = useCallback(
    (index: number) => {
      const updated = completedFiles.filter((_, i) => i !== index);
      setCompletedFiles(updated);
      setTimeout(() => onFilesChange?.(updated), 0);
    },
    [completedFiles, onFilesChange]
  );

  const cancelUpload = useCallback((fileName: string) => {
    setUploadingFiles((prev) => prev.filter((f) => f.file.name !== fileName));
  }, []);

  return {
    uploadingFiles,
    completedFiles,
    mimeTypes,
    onDrop,
    removeFile,
    cancelUpload,
  };
}
