import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { SEMESTER_NAMES } from "@/mock/admin";

export const Route = createFileRoute("/admin/operations/marks-monitoring")({
  head: () => ({
    meta: [{ title: "Marks Monitoring — Admin · EDVANA" }],
  }),
  component: MarksMonitoringPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Course", cell: (r) => <span className="font-bold text-foreground">{String(r.course)}</span> },
  { header: "Assigned Faculty", cell: (r) => String(r.faculty) },
  { header: "Semester", cell: (r) => String(r.semester) },
  { header: "Students", cell: (r) => String(r.studentCount) },
  { header: "Entered", cell: (r) => <span className="font-semibold text-emerald-600">{String(r.entered)}</span> },
  { header: "Pending", cell: (r) => <span className="font-semibold text-amber-600">{String(r.pending)}</span> },
  { header: "Deadline", cell: (r) => String(r.submissionDeadline) },
  { header: "Lock Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  { name: "course", label: "Course", required: true },
  { name: "faculty", label: "Assigned Faculty", required: true },
  { name: "submissionDeadline", label: "Submission Deadline", type: "date", required: true },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "In Progress", value: "In Progress" },
      { label: "Finalized", value: "Finalized" },
      { label: "Not Started", value: "Not Started" },
    ],
  },
];

function MarksMonitoringPage() {
  return (
    <AdminCrudPage
      title="Faculty Marks Entry Monitoring"
      description="Track progress of internal mark entries across departments and enforce submission lock deadlines."
      resource="marks-monitoring"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search by course or faculty name..."
      filters={[{ key: "semester", label: "Semester", options: SEMESTER_NAMES.map((s) => ({ label: s, value: s })) }]}
    />
  );
}
