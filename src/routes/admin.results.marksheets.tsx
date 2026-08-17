import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export const Route = createFileRoute("/admin/results/marksheets")({
  head: () => ({
    meta: [{ title: "Marksheet UI & Printing — Admin · EDVANA" }],
  }),
  component: MarksheetsPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Enrollment No", cell: (r) => <span className="font-mono font-bold text-foreground">{String(r.enrollNo)}</span> },
  { header: "Student Name", cell: (r) => String(r.studentName) },
  { header: "Branch", cell: (r) => String(r.branch) },
  { header: "Semester", cell: (r) => String(r.semester) },
  { header: "Exam Session", cell: (r) => String(r.examSession) },
  { header: "Earned / Total Credits", cell: (r) => `${r.earnedCredits} / ${r.totalCredits}` },
  { header: "Semester Result", cell: (r) => <StatusBadge status={String(r.semesterResult)} /> },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  { name: "enrollNo", label: "Enrollment Number", required: true },
  { name: "studentName", label: "Student Name", required: true },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Finalized", value: "Finalized" },
      { label: "Verification Pending", value: "Verification Pending" },
    ],
  },
];

function MarksheetsPage() {
  return (
    <AdminCrudPage
      title="Marksheets & Grade Cards"
      description="Inspect generated semester marksheets, grade cards, and cumulative credit summaries."
      resource="marksheets"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search marksheets..."
      customActions={() => (
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => window.print()} title="Print Marksheet">
          <Printer className="h-4 w-4 text-primary" />
        </Button>
      )}
    />
  );
}
