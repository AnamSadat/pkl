"use client";

import { FormDemo } from "@/components/demo/form-demo";
import { DragDropUpload } from "@/components/molecules/drag-drop-upload";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { useState } from "react";

export default function Demo() {
  // 1. file sementara (di modal)
  const [tempFiles, setTempFiles] = useState<File[]>([]);

  // 2. file yang sudah di-save
  const [savedFiles, setSavedFiles] = useState<File[]>([]);

  const handleSave = () => {
    setSavedFiles(tempFiles); // resmi disimpan
    console.log("Saved files:", tempFiles);
  };

  const handleCancel = () => {
    setTempFiles([]); // buang perubahan
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center h-screen">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Upload File</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload Dokumen</DialogTitle>
          </DialogHeader>

          {/* Drag & Drop */}
          <DragDropUpload
            accept=".pdf,.docx"
            multiple
            onFilesChange={(files) => setTempFiles(files)}
          />

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contoh hasil setelah Save */}
      {/* {savedFiles.length > 0 && (
        <div className="mt-6 space-y-2">
          <h3 className="text-sm font-medium">Saved Files</h3>
          <ul className="text-sm text-muted-foreground">
            {savedFiles.map((file, i) => (
              <li key={i}>{file.name}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
}
