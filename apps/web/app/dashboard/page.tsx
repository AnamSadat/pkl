import {
  ChartAreaInteractive,
  DonutChart,
  SummaryCardItem,
  SummaryCards,
} from "@/components/molecules";
import { AlertTriangle, Building2, CheckCircle2, Users } from "lucide-react";

export default function Home() {
  const summaryItems: SummaryCardItem[] = [
    {
      title: "Jumlah Fasilitas",
      value: "20",
      borderColor: "border-l-blue-500",
      description: "Terdaftar dalam sistem saat ini.",
      icon: <Building2 className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Peserta Aktif",
      value: "20",
      borderColor: "border-l-red-500",
      description: "Peserta yang sedang menjalani rehabilitasi.",
      icon: <Users className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Rata-rata Keberhasilan",
      value: "20",
      borderColor: "border-l-yellow-500",
      description: "Berdasarkan data keberhasilan per fasilitas.",
      icon: <CheckCircle2 className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Peserta Risiko Tinggi",
      value: "20",
      borderColor: "border-l-emerald-500",
      description: "Perlu pemantauan dan tindak lanjut lebih intensif.",
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
    },
  ];

  return (
    <div className="space-y-6 px-4 py-5">
      <SummaryCards items={summaryItems} columns={4} />

      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <DonutChart />
        <ChartAreaInteractive />
      </div>
    </div>
  );
}
