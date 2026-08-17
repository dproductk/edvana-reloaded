import { createFileRoute } from "@tanstack/react-router";
import { SectionCard } from "@/components/common/SectionCard";
import { DataTable, type Column } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { toast } from "sonner";
import { DEPARTMENTS } from "@/mock/admin";

export const Route = createFileRoute("/admin/reports/academic")({
  head: () => ({
    meta: [{ title: "Academic Operations Reports — Admin · EDVANA" }],
  }),
  component: AcademicReportsPage,
});

interface AcademicReportRow {
  department: string;
  assignedCourses: number;
  marksEntered: number;
  marksPending: number;
  detainedStudents: number;
}

function AcademicReportsPage() {
  const rows: AcademicReportRow[] = DEPARTMENTS.map((d, i) => ({
    department: d,
    assignedCourses: 14 + i * 2,
    marksEntered: 12 + i * 2,
    marksPending: 2,
    detainedStudents: 4 + (i % 3),
  }));

  const columns: Column<AcademicReportRow>[] = [
    { header: "Department", cell: (r) => <span className="font-semibold text-foreground">{r.department}</span> },
    { header: "Assigned Courses", cell: (r) => r.assignedCourses },
    { header: "Marks Finalized", cell: (r) => <span className="font-semibold text-emerald-600">{r.marksEntered}</span> },
    { header: "Marks Pending", cell: (r) => <span className="font-semibold text-amber-600">{r.marksPending}</span> },
    { header: "Detained Candidates", cell: (r) => <span className="font-semibold text-destructive">{r.detainedStudents}</span> },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Academic Operations Register</h1>
          <p className="mt-1 text-sm text-muted-foreground">Departmental internal assessment entry status and detention figures.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Exported academic report to CSV")}>
            <Download className="mr-1.5 h-4 w-4" /> Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="mr-1.5 h-4 w-4" /> Print
          </Button>
        </div>
      </div>

      <SectionCard title="Departmental Assessment Progress">
        <DataTable columns={columns} rows={rows} rowKey={(r) => r.department} />
      </SectionCard>
    </div>
  );
}
