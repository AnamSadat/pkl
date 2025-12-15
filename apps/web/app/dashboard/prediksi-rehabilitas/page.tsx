"use client";

import { useState } from "react";
import {
  DataTable,
  Header,
  InvoiceData,
  TablePagination,
  UploadDialog,
} from "@/components/molecules";

const initialData: InvoiceData[] = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default function PrediksiRehabilitasi() {
  const [data] = useState<InvoiceData[]>(initialData);

  const handleFileSave = (files: File[]) => {
    console.log("Saved files:", files);
    // TODO: Process uploaded files and update data
  };

  return (
    <div className="space-y-6 px-4 py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Header
          title="Prediksi Rehabilitasi"
          description="Kelola dan prediksi data rehabilitasi peserta."
        />
        <UploadDialog onSave={handleFileSave} />
      </div>

      <div className="rounded-lg border bg-card">
        <DataTable data={data} />
        <TablePagination totalItems={data.length} />
      </div>
    </div>
  );
}
