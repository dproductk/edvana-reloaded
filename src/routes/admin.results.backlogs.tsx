import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";

export const Route = createFileRoute("/admin/results/backlogs")({
  head: () => ({
    meta: [{ title: "Backlog Management — Admin · EDVANA" }],
  }),
  component: BacklogManagementPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Enrollment No", cell: (r) => <span className="font-mono font-bold text-foreground">{String(r.enrollNo)}</span> },
  { header: "Student Name", cell: (r) => String(r.studentName) },
  { header: "Course Code", cell: (r) => <span className="font-mono font-bold text-primary">{String(r.courseCode)}</span> },
  { header: "Course Name", cell: (r) => String(r.courseName) },
  { header: "Original Sem", cell: (r) => String(r.originalSemester) },
  { header: "Attempt #", cell: (r) => `Attempt ${r.attemptNumber}` },
  { header: "Latest Attempt", cell: (r) => String(r.latestAttempt) },
  { header: "Result", cell: (r) => <StatusBadge status={String(r.result)} /> },
  { header: "Backlog Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  { name: "enrollNo", label: "Enrollment Number", required: true },
  { name: "studentName", label: "Student Name", required: true },
  { name: "courseCode", label: "Course Code", required: true },
  { name: "originalSemester", label: "Original Semester", required: true },
  {
    name: "status",
    label: "Backlog Status",
    type: "select",
    required: true,
    options: [
      { label: "Active Backlog", value: "Active Backlog" },
      { label: "Cleared", value: "Cleared" },
    ],
  },
];

function BacklogManagementPage() {
  return (
    <AdminCrudPage
      title="Active Backlog Master Ledger"
      description="Track un-cleared subjects, attempt counts, and historical pass/fail transitions."
      resource="backlogs"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search backlog records..."
    />
  );
}
