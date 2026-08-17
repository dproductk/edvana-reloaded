import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { SEMESTER_NAMES } from "@/mock/admin";

export const Route = createFileRoute("/admin/results/verification")({
  head: () => ({
    meta: [{ title: "Result Verification — Admin · EDVANA" }],
  }),
  component: ResultVerificationPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Issue Description", cell: (r) => <span className="font-semibold text-foreground">{String(r.message)}</span> },
  {
    header: "Severity",
    cell: (r) => (
      <span className={`rounded px-2 py-0.5 text-xs font-semibold ${r.severity === "Error" ? "bg-destructive/15 text-destructive" : "bg-amber-100 text-amber-800"}`}>
        {String(r.severity)}
      </span>
    ),
  },
  { header: "Course Code", cell: (r) => <span className="font-mono">{String(r.courseCode)}</span> },
  { header: "Enrollment No", cell: (r) => <span className="font-mono text-xs">{String(r.enrollNo)}</span> },
  { header: "Branch / Sem", cell: (r) => `${r.branch} (${r.semester})` },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  { name: "message", label: "Issue Message", required: true },
  { name: "courseCode", label: "Course Code", required: true },
  { name: "enrollNo", label: "Enrollment Number", required: true },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Open", value: "Open" },
      { label: "Reviewed", value: "Reviewed" },
    ],
  },
];

function ResultVerificationPage() {
  return (
    <AdminCrudPage
      title="Result Verification & Exception Desk"
      description="Inspect calculation discrepancies, missing internal marks, and grace mark applications before final declaration."
      resource="result-verification"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search verification issues..."
      filters={[{ key: "semester", label: "Semester", options: SEMESTER_NAMES.map((s) => ({ label: s, value: s })) }]}
    />
  );
}
