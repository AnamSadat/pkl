import { formatFileSize } from "@/utils";
import { z } from "zod";

export const createFileSchema = (
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
