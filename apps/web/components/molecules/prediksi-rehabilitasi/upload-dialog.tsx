"use client";

import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { FileUp, Plus } from "lucide-react";
import { AppDragDropUpload } from "@/components/organism";

interface UploadDialogProps {
  onSave: (files: File[]) => void;
}

export function UploadDialog({ onSave }: UploadDialogProps) {
  const [tempFiles, setTempFiles] = useState<File[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    onSave(tempFiles);
    setIsOpen(false);
    setTempFiles([]);
  };

  const handleCancel = () => {
    setTempFiles([]);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <Plus className="h-4 w-4" />
          Tambah Data
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg max-h-[calc(100vh-2.5rem)] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileUp className="h-5 w-5" />
            Upload Dokumen
          </DialogTitle>
          <DialogDescription>
            Upload file CSV atau XLSX untuk menambahkan data prediksi.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden py-10">
          <AppDragDropUpload
            accept=".csv, .xlsx"
            multiple={false}
            onFilesChange={setTempFiles}
            classNameCard="py-20"
          />
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="cursor-pointer"
          >
            Batal
          </Button>
          <Button
            onClick={handleSave}
            disabled={tempFiles.length === 0}
            className="cursor-pointer"
          >
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
