import { createFileRoute } from "@tanstack/react-router";
import { SectionCard } from "@/components/common/SectionCard";
import { DataTable, type Column } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { toast } from "sonner";
import { BRANCH_NAMES } from "@/mock/admin";

export const Route = createFileRoute("/admin/reports/examination")({
  head: () => ({
    meta: [{ title: "Examination Reports — Admin · EDVANA" }],
  }),
  component: ExaminationReportsPage,
});

interface ExamReportRow {
  branch: string;
  rCount: number;
  rRrCount: number;
  rrCount: number;
  totalRegistered: number;
}

function ExaminationReportsPage() {
  const rows: ExamReportRow[] = BRANCH_NAMES.map((b, i) => ({
    branch: b,
    rCount: 140 + i * 8,
    rRrCount: 35 + i * 3,
    rrCount: 10 + i * 2,
    totalRegistered: 185 + i * 13,
  }));

  const columns: Column<ExamReportRow>[] = [
    { header: "Branch", cell: (r) => <span className="font-semibold text-foreground">{r.branch}</span> },
    { header: "R Candidates", cell: (r) => r.rCount },
    { header: "R + RR Candidates", cell: (r) => r.rRrCount },
    { header: "RR Candidates", cell: (r) => r.rrCount },
    { header: "Total Registered Candidates", cell: (r) => <span className="font-bold text-primary">{r.totalRegistered}</span> },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Examination Registration Report</h1>
          <p className="mt-1 text-sm text-muted-foreground">Registered candidate counts by category (R, R+RR, RR) for SUMMER 2026.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Exported exam report to CSV")}>
            <Download className="mr-1.5 h-4 w-4" /> Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="mr-1.5 h-4 w-4" /> Print
          </Button>
        </div>
      </div>

      <SectionCard title="Session Candidate Summary">
        <DataTable columns={columns} rows={rows} rowKey={(r) => r.branch} />
      </SectionCard>
    </div>
  );
}
