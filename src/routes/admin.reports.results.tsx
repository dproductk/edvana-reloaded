import { createFileRoute } from "@tanstack/react-router";
import { SectionCard } from "@/components/common/SectionCard";
import { DataTable, type Column } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { toast } from "sonner";
import { BRANCH_NAMES } from "@/mock/admin";

export const Route = createFileRoute("/admin/reports/results")({
  head: () => ({
    meta: [{ title: "Result Reports — Admin · EDVANA" }],
  }),
  component: ResultReportsPage,
});

interface ResultReportRow {
  branch: string;
  appeared: number;
  passed: number;
  failed: number;
  passPercent: number;
}

function ResultReportsPage() {
  const rows: ResultReportRow[] = BRANCH_NAMES.map((b, i) => {
    const app = 180 + i * 15;
    const pas = 145 + i * 12;
    const fai = app - pas;
    return {
      branch: b,
      appeared: app,
      passed: pas,
      failed: fai,
      passPercent: Number(((pas / app) * 100).toFixed(1)),
    };
  });

  const columns: Column<ResultReportRow>[] = [
    { header: "Branch", cell: (r) => <span className="font-semibold text-foreground">{r.branch}</span> },
    { header: "Appeared", cell: (r) => r.appeared },
    { header: "Passed", cell: (r) => <span className="font-bold text-emerald-600">{r.passed}</span> },
    { header: "Failed", cell: (r) => <span className="font-semibold text-destructive">{r.failed}</span> },
    { header: "Pass Percentage", cell: (r) => <span className="font-bold text-primary">{r.passPercent}%</span> },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Examination Result Ledger</h1>
          <p className="mt-1 text-sm text-muted-foreground">Overall branch pass/fail performance ledger for SUMMER 2026.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Exported result report to CSV")}>
            <Download className="mr-1.5 h-4 w-4" /> Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="mr-1.5 h-4 w-4" /> Print
          </Button>
        </div>
      </div>

      <SectionCard title="Session Result Summary">
        <DataTable columns={columns} rows={rows} rowKey={(r) => r.branch} />
      </SectionCard>
    </div>
  );
}
