import { useQuery } from "@tanstack/react-query";
import { SectionCard } from "@/components/common/SectionCard";
import { DataTable, type Column } from "@/components/common/DataTable";
import { StatusBadge, toneForStatus } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { studentService } from "@/services/student.service";
import { formatINR } from "@/lib/format";
import type { FeeRow } from "@/types/student-modules";

export function AdmissionFeeTable() {
  const { data } = useQuery({
    queryKey: ["student", "admission-fees"],
    queryFn: () => studentService.getAdmissionFees(),
  });

  const columns: Column<FeeRow>[] = [
    { header: "#", cell: (_r, i) => i + 1, className: "w-12" },
    { header: "Particulars", cell: (r) => <span className="font-medium">{r.particulars}</span> },
    { header: "Academic Year", cell: (r) => r.academicYear },
    { header: "Amount", cell: (r) => formatINR(r.amount), align: "right" },
    { header: "Paid On", cell: (r) => r.paidOn ?? "—" },
    { header: "Receipt No.", cell: (r) => r.receiptNo ?? "—" },
    {
      header: "Status",
      cell: (r) => <StatusBadge label={r.status} tone={toneForStatus(r.status)} />,
    },
    {
      header: "Action",
      cell: (r) =>
        r.status === "Paid" ? (
          <Button variant="outline" size="sm">
            Receipt
          </Button>
        ) : (
          <Button size="sm">Pay now</Button>
        ),
      align: "right",
    },
  ];

  if (!data) {
    return (
      <SectionCard title="Admission Fee">
        <Skeleton className="h-48 w-full" />
      </SectionCard>
    );
  }

  const pending = data.filter((f) => f.status === "Pending").reduce((s, f) => s + f.amount, 0);

  return (
    <SectionCard
      title="Admission Fee"
      description="Fee particulars and payment status for your program."
      actions={
        <span className="text-sm font-semibold text-foreground">
          Outstanding: <span className="text-destructive">{formatINR(pending)}</span>
        </span>
      }
    >
      <DataTable columns={columns} rows={data} rowKey={(r) => r.id} />
    </SectionCard>
  );
}
