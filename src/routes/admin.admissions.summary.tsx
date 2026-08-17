import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SectionCard } from "@/components/common/SectionCard";
import { DataTable, type Column } from "@/components/common/DataTable";
import { Skeleton } from "@/components/ui/skeleton";
import { adminService } from "@/services/admin.service";
import { BRANCH_NAMES } from "@/mock/admin";

export const Route = createFileRoute("/admin/admissions/summary")({
  head: () => ({
    meta: [{ title: "Admission Summary Report — Admin · EDVANA" }],
  }),
  component: AdmissionSummaryPage,
});

interface BranchSummaryRow {
  branch: string;
  eligible: number;
  feeMarked: number;
  feePaid: number;
  admitted: number;
  pending: number;
}

function AdmissionSummaryPage() {
  const { data: db, isLoading } = useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: () => adminService.getDashboard(),
  });

  const branchSummary: BranchSummaryRow[] = BRANCH_NAMES.map((b, i) => ({
    branch: b,
    eligible: 210 + i * 15,
    feeMarked: 200 + i * 14,
    feePaid: 195 + i * 12,
    admitted: 195 + i * 12,
    pending: 15 + i * 3,
  }));

  const columns: Column<BranchSummaryRow>[] = [
    { header: "Branch", cell: (r) => <span className="font-semibold text-foreground">{r.branch}</span> },
    { header: "Eligible Pool", cell: (r) => r.eligible.toLocaleString() },
    { header: "Fee Marked", cell: (r) => r.feeMarked.toLocaleString() },
    { header: "Fee Paid", cell: (r) => <span className="font-semibold text-emerald-600">{r.feePaid.toLocaleString()}</span> },
    { header: "Final Admitted", cell: (r) => <span className="font-bold text-primary">{r.admitted.toLocaleString()}</span> },
    { header: "Pending / Incomplete", cell: (r) => <span className="text-amber-600">{r.pending.toLocaleString()}</span> },
  ];

  if (isLoading || !db) {
    return <Skeleton className="h-64 w-full rounded-xl p-6" />;
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Admission Funnel Summary</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Branch-wise admission conversion statistics for Academic Year {db.academicYear}.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {db.admission.map((item, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <span className="text-xs text-muted-foreground">{item.label}</span>
            <p className="mt-1 text-2xl font-bold text-foreground">{item.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <SectionCard title="Branch-wise Conversion Breakdown">
        <DataTable columns={columns} rows={branchSummary} rowKey={(r) => r.branch} />
      </SectionCard>
    </div>
  );
}
