import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";

export const Route = createFileRoute("/admin/results/processing")({
  head: () => ({
    meta: [{ title: "Result Processing — Admin · EDVANA" }],
  }),
  component: ResultProcessingPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Enrollment No", cell: (r) => <span className="font-mono font-bold text-foreground">{String(r.enrollNo)}</span> },
  { header: "Student Name", cell: (r) => String(r.studentName) },
  { header: "Course Code", cell: (r) => <span className="font-mono font-bold">{String(r.courseCode)}</span> },
  { header: "Internal", cell: (r) => String(r.internal) },
  { header: "External", cell: (r) => String(r.external) },
  { header: "Total", cell: (r) => <span className="font-bold">{String(r.total)}</span> },
  { header: "Credits", cell: (r) => String(r.credits) },
  { header: "Result", cell: (r) => <StatusBadge status={String(r.result)} /> },
  { header: "Attempt", cell: (r) => `Attempt ${r.attempt}` },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  { name: "enrollNo", label: "Enrollment Number", required: true },
  { name: "studentName", label: "Student Name", required: true },
  { name: "courseCode", label: "Course Code", required: true },
  { name: "internal", label: "Internal Marks", type: "number", required: true },
  { name: "external", label: "External Marks", type: "number", required: true },
  {
    name: "result",
    label: "Result",
    type: "select",
    required: true,
    options: [
      { label: "Pass", value: "Pass" },
      { label: "Fail", value: "Fail" },
    ],
  },
];

function ResultProcessingPage() {
  return (
    <AdminCrudPage
      title="Result Calculation & Processing Engine"
      description="Evaluate candidate aggregate scores, credit awards, pass/fail status, and attempt numbers."
      resource="result-processing"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search result processing records..."
    />
  );
}
