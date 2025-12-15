"use client";

import { useDropzone } from "react-dropzone";
import { cn } from "@repo/ui/utils";
import { DragDropProps } from "@/types/components/type-drag-drop-upload";
import { useFileUpload } from "@/hooks";
import {
  DropzoneArea,
  FileCompletedItem,
  FileUploadItem,
} from "@/components/molecules";

export function AppDragDropUpload({
  onFilesChange,
  accept,
  multiple = true,
  className,
  classNameCard,
  maxSize = 10 * 1024 * 1024,
}: DragDropProps) {
  const {
    uploadingFiles,
    completedFiles,
    mimeTypes,
    onDrop,
    removeFile,
    cancelUpload,
  } = useFileUpload({ accept, multiple, maxSize, onFilesChange });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: Object.keys(mimeTypes).length > 0 ? mimeTypes : undefined,
    multiple,
    maxSize,
  });

  const completedCount = completedFiles.length;
  const totalCount = uploadingFiles.length + completedFiles.length;

  return (
    <div className={cn("space-y-4", className)}>
      <DropzoneArea
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        isDragActive={isDragActive}
        accept={accept}
        maxSize={maxSize}
        classNameCard={classNameCard}
      />

      {uploadingFiles.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium">
            Uploading - {completedCount}/{totalCount} files
          </p>
          <div
            className="space-y-3 overflow-y-auto pr-1"
            style={{ maxHeight: "95px" }}
          >
            {uploadingFiles.map((item) => (
              <FileUploadItem
                key={item.file.name}
                item={item}
                onCancel={cancelUpload}
              />
            ))}
          </div>
        </div>
      )}

      {completedFiles.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium">Uploaded</p>
          <div
            className="space-y-3 overflow-y-auto pr-1"
            style={{ maxHeight: "160px" }}
          >
            {completedFiles.map((file, index) => (
              <FileCompletedItem
                key={index}
                file={file}
                onRemove={() => removeFile(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// export type { DragDropProps, FileWithProgress } from "./types";
