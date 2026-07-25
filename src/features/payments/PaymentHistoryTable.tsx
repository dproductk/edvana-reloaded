import { useQuery } from "@tanstack/react-query";
import { SectionCard } from "@/components/common/SectionCard";
import { DataTable, type Column } from "@/components/common/DataTable";
import { StatusBadge, toneForStatus } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { studentService } from "@/services/student.service";
import { formatINR } from "@/lib/format";
import type { PaymentRow } from "@/types/student-modules";

export function PaymentHistoryTable() {
  const { data } = useQuery({
    queryKey: ["student", "payments"],
    queryFn: () => studentService.getPayments(),
  });

  const columns: Column<PaymentRow>[] = [
    { header: "#", cell: (_r, i) => i + 1, className: "w-12" },
    { header: "Purpose", cell: (r) => <span className="font-medium">{r.purpose}</span> },
    { header: "Transaction ID", cell: (r) => <span className="font-mono text-xs">{r.transactionId}</span> },
    { header: "Date", cell: (r) => r.date },
    { header: "Mode", cell: (r) => r.mode },
    { header: "Amount", cell: (r) => formatINR(r.amount), align: "right" },
    {
      header: "Status",
      cell: (r) => <StatusBadge label={r.status} tone={toneForStatus(r.status)} />,
    },
    {
      header: "Receipt",
      cell: (r) => (
        <Button size="sm" variant="outline" disabled={r.status !== "Success"}>
          Download
        </Button>
      ),
      align: "right",
    },
  ];

  if (!data) {
    return (
      <SectionCard title="Payment History">
        <Skeleton className="h-48 w-full" />
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Payment History" description="All online payments made through the portal.">
      <DataTable columns={columns} rows={data} rowKey={(r) => r.id} />
    </SectionCard>
  );
}
