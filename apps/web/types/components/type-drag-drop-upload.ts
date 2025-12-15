import { ClassNameProps } from "@/types";

export type DragDropProps = ClassNameProps & {
  onFilesChange?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  classNameCard?: string;
  maxSize?: number; // in bytes
  maxListHeight?: string; // e.g. "200px", "max-h-48"
};

export type FileWithProgress = {
  file: File;
  progress: number;
  uploadedSize: number;
};
