import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { BRANCH_NAMES, SEMESTER_NAMES } from "@/mock/admin";

export const Route = createFileRoute("/admin/operations/detention")({
  head: () => ({
    meta: [{ title: "Detention Monitoring — Admin · EDVANA" }],
  }),
  component: DetentionMonitoringPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Enrollment No", cell: (r) => <span className="font-mono font-bold text-foreground">{String(r.enrollNo)}</span> },
  { header: "Student Name", cell: (r) => String(r.studentName) },
  { header: "Branch / Sem", cell: (r) => `${r.branch} (${r.semester})` },
  { header: "Course", cell: (r) => String(r.course) },
  { header: "Attendance", cell: (r) => <span className="font-semibold text-destructive">{String(r.attendance)}</span> },
  { header: "Reason", cell: (r) => String(r.reason) },
  { header: "Detention Status", cell: (r) => <StatusBadge status={String(r.detentionStatus)} /> },
  { header: "Final Lock", cell: (r) => String(r.finalStatus) },
];

const fields: FieldConfig[] = [
  { name: "enrollNo", label: "Enrollment Number", required: true },
  { name: "studentName", label: "Student Name", required: true },
  { name: "course", label: "Course Code & Name", required: true },
  { name: "attendance", label: "Attendance %", required: true },
  { name: "reason", label: "Detention Reason", type: "textarea", required: true },
  {
    name: "detentionStatus",
    label: "Detention Status",
    type: "select",
    required: true,
    options: [
      { label: "Provisional", value: "Provisional" },
      { label: "Confirmed", value: "Confirmed" },
      { label: "Nil Detention", value: "Nil Detention" },
      { label: "Final", value: "Final" },
    ],
  },
];

function DetentionMonitoringPage() {
  return (
    <AdminCrudPage
      title="Student Detention Monitoring"
      description="Monitor attendance defaults and internal assessment failures for provisional and confirmed detention lists."
      resource="detentions"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search detention records..."
      filters={[
        { key: "branch", label: "Branch", options: BRANCH_NAMES.map((b) => ({ label: b, value: b })) },
        { key: "semester", label: "Semester", options: SEMESTER_NAMES.map((s) => ({ label: s, value: s })) },
      ]}
    />
  );
}
