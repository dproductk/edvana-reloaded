import { createFileRoute } from "@tanstack/react-router";
import { SectionCard } from "@/components/common/SectionCard";
import { DataTable, type Column } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { toast } from "sonner";
import { BRANCH_NAMES } from "@/mock/admin";

export const Route = createFileRoute("/admin/reports/fees")({
  head: () => ({
    meta: [{ title: "Fee Reports — Admin · EDVANA" }],
  }),
  component: FeeReportsPage,
});

interface FeeRow {
  branch: string;
  expected: number;
  collected: number;
  pending: number;
  percent: number;
}

function FeeReportsPage() {
  const rows: FeeRow[] = BRANCH_NAMES.map((b, i) => {
    const exp = 60 * 9850;
    const col = (54 + (i % 5)) * 9850;
    const pen = exp - col;
    return {
      branch: b,
      expected: exp,
      collected: col,
      pending: pen,
      percent: Number(((col / exp) * 100).toFixed(1)),
    };
  });

  const columns: Column<FeeRow>[] = [
    { header: "Branch", cell: (r) => <span className="font-semibold text-foreground">{r.branch}</span> },
    { header: "Expected Fee (₹)", cell: (r) => r.expected.toLocaleString() },
    { header: "Collected Fee (₹)", cell: (r) => <span className="font-bold text-emerald-600">₹{r.collected.toLocaleString()}</span> },
    { header: "Pending Fee (₹)", cell: (r) => <span className="font-semibold text-amber-600">₹{r.pending.toLocaleString()}</span> },
    { header: "Collection %", cell: (r) => <span className="font-semibold">{r.percent}%</span> },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Fee Collection & Revenue Report</h1>
          <p className="mt-1 text-sm text-muted-foreground">Branch-wise fee realization and pending ledger audit.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Exported fee report to CSV")}>
            <Download className="mr-1.5 h-4 w-4" /> Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="mr-1.5 h-4 w-4" /> Print
          </Button>
        </div>
      </div>

      <SectionCard title="Branch Collection Audit (AY 2026-27)">
        <DataTable columns={columns} rows={rows} rowKey={(r) => r.branch} />
      </SectionCard>
    </div>
  );
}
