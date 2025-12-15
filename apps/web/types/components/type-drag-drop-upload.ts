import { ClassNameProps } from "@/types";

export type DragDropProps = ClassNameProps & {
  onFilesChange?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  classNameCard?: string;
  maxSize?: number; // in bytes
};

export type FileWithProgress = {
  file: File;
  progress: number;
  uploadedSize: number;
};
