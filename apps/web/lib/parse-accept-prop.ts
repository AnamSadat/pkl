export function parseAcceptProp(accept?: string): {
  extensions: string[];
  mimeTypes: Record<string, string[]>;
} {
  if (!accept) return { extensions: [], mimeTypes: {} };

  const extensions = accept
    .split(",")
    .map((ext) => ext.trim().toLowerCase().replace(".", ""));

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
