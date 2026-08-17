import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { BRANCH_NAMES, SEMESTER_NAMES } from "@/mock/admin";

export const Route = createFileRoute("/admin/admissions/eligible")({
  head: () => ({
    meta: [{ title: "Eligible Students — Admission · EDVANA" }],
  }),
  component: EligibleStudentsPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Enrollment No", cell: (r) => <span className="font-mono font-bold text-foreground">{String(r.enrollNo)}</span> },
  { header: "Student Name", cell: (r) => String(r.studentName) },
  { header: "Branch", cell: (r) => String(r.branch) },
  { header: "Semester", cell: (r) => String(r.semester) },
  { header: "Eligibility", cell: (r) => <StatusBadge status={String(r.eligibilityStatus)} /> },
  { header: "Reason / Rule Detail", cell: (r) => <span className="text-xs text-muted-foreground">{String(r.eligibilityReason)}</span> },
  { header: "Fee Status", cell: (r) => <StatusBadge status={String(r.feeStatus)} /> },
  { header: "Admission Status", cell: (r) => <StatusBadge status={String(r.admissionStatus)} /> },
];

const fields: FieldConfig[] = [
  { name: "enrollNo", label: "Enrollment Number", required: true },
  { name: "studentName", label: "Student Name", required: true },
  {
    name: "eligibilityStatus",
    label: "Eligibility Status",
    type: "select",
    required: true,
    options: [
      { label: "Eligible", value: "Eligible" },
      { label: "Not Eligible", value: "Not Eligible" },
    ],
  },
  { name: "eligibilityReason", label: "Reason", type: "textarea" },
];

function EligibleStudentsPage() {
  return (
    <AdminCrudPage
      title="Eligible Students Directory"
      description="Evaluated student eligibility pool for the active admission cycle based on academic rules."
      resource="eligible-students"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search eligible candidates..."
      filters={[
        { key: "branch", label: "Branch", options: BRANCH_NAMES.map((b) => ({ label: b, value: b })) },
        { key: "semester", label: "Semester", options: SEMESTER_NAMES.map((s) => ({ label: s, value: s })) },
      ]}
    />
  );
}
