"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { cn } from "@repo/ui/utils";

export interface InvoiceData {
  invoice: string;
  paymentStatus: string;
  totalAmount: string;
  paymentMethod: string;
}

interface DataTableProps {
  data: InvoiceData[];
}

const statusStyles: Record<string, string> = {
  Paid: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Unpaid: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export function DataTable({ data }: DataTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-[120px] pl-5">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right pr-5">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={4}
              className="h-32 text-center text-muted-foreground"
            >
              Belum ada data. Klik &quot;Tambah Data&quot; untuk memulai.
            </TableCell>
          </TableRow>
        ) : (
          data.map((item) => (
            <TableRow key={item.invoice}>
              <TableCell className="font-medium pl-5">{item.invoice}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                    statusStyles[item.paymentStatus]
                  )}
                >
                  {item.paymentStatus}
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {item.paymentMethod}
              </TableCell>
              <TableCell className="text-right font-medium pr-5">
                {item.totalAmount}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
