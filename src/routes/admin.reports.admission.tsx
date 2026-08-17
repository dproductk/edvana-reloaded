import { createFileRoute } from "@tanstack/react-router";
import { SectionCard } from "@/components/common/SectionCard";
import { DataTable, type Column } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { toast } from "sonner";
import { BRANCH_NAMES } from "@/mock/admin";

export const Route = createFileRoute("/admin/reports/admission")({
  head: () => ({
    meta: [{ title: "Admission Reports — Admin · EDVANA" }],
  }),
  component: AdmissionReportsPage,
});

interface ReportRow {
  branch: string;
  sanctionedIntake: number;
  capAdmitted: number;
  instituteAdmitted: number;
  totalAdmitted: number;
  vacancy: number;
}

function AdmissionReportsPage() {
  const rows: ReportRow[] = BRANCH_NAMES.map((b, i) => ({
    branch: b,
    sanctionedIntake: 60,
    capAdmitted: 48 + (i % 8),
    instituteAdmitted: 8 + (i % 3),
    totalAdmitted: 56 + (i % 4),
    vacancy: 4 - (i % 4),
  }));

  const columns: Column<ReportRow>[] = [
    { header: "Branch / Program", cell: (r) => <span className="font-semibold text-foreground">{r.branch}</span> },
    { header: "Sanctioned Intake", cell: (r) => r.sanctionedIntake },
    { header: "CAP Admitted", cell: (r) => r.capAdmitted },
    { header: "Institute Level", cell: (r) => r.instituteAdmitted },
    { header: "Total Admitted", cell: (r) => <span className="font-bold text-emerald-600">{r.totalAdmitted}</span> },
    { header: "Vacancy", cell: (r) => <span className="font-semibold text-amber-600">{r.vacancy}</span> },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Admission Statistics Report</h1>
          <p className="mt-1 text-sm text-muted-foreground">Official Government CAP & Institute level quota admission audit statement.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Exported report to CSV")}>
            <Download className="mr-1.5 h-4 w-4" /> Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="mr-1.5 h-4 w-4" /> Print
          </Button>
        </div>
      </div>

      <SectionCard title="Branch-wise Intake vs Admitted Statement (AY 2026-27)">
        <DataTable columns={columns} rows={rows} rowKey={(r) => r.branch} />
      </SectionCard>
    </div>
  );
}
