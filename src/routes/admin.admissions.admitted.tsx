import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { BRANCH_NAMES, SEMESTER_NAMES } from "@/mock/admin";

export const Route = createFileRoute("/admin/admissions/admitted")({
  head: () => ({
    meta: [{ title: "Admitted Students — Admin · EDVANA" }],
  }),
  component: AdmittedStudentsPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Enrollment No", cell: (r) => <span className="font-mono font-bold text-foreground">{String(r.enrollNo)}</span> },
  { header: "Student Name", cell: (r) => String(r.studentName) },
  { header: "Branch", cell: (r) => String(r.branch) },
  { header: "Semester", cell: (r) => String(r.semester) },
  { header: "Admission Date", cell: (r) => String(r.admissionDate) },
  { header: "Type", cell: (r) => String(r.admissionType) },
  { header: "Fee Status", cell: (r) => <StatusBadge status={String(r.feeStatus)} /> },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.admissionStatus)} /> },
];

const fields: FieldConfig[] = [
  { name: "enrollNo", label: "Enrollment Number", required: true },
  { name: "studentName", label: "Student Name", required: true },
  {
    name: "branch",
    label: "Branch",
    type: "select",
    required: true,
    options: BRANCH_NAMES.map((b) => ({ label: b, value: b })),
  },
  {
    name: "semester",
    label: "Semester",
    type: "select",
    required: true,
    options: SEMESTER_NAMES.map((s) => ({ label: s, value: s })),
  },
  { name: "admissionDate", label: "Admission Date", type: "date", required: true },
];

function AdmittedStudentsPage() {
  return (
    <AdminCrudPage
      title="Admitted Students Directory"
      description="List of finalized admitted candidates for the current active academic term."
      resource="admitted-students"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search admitted students..."
      filters={[
        { key: "branch", label: "Branch", options: BRANCH_NAMES.map((b) => ({ label: b, value: b })) },
        { key: "semester", label: "Semester", options: SEMESTER_NAMES.map((s) => ({ label: s, value: s })) },
      ]}
    />
  );
}
