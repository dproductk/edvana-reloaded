import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { BRANCH_NAMES, SEMESTER_NAMES } from "@/mock/admin";

export const Route = createFileRoute("/admin/exams/final-registration")({
  head: () => ({
    meta: [{ title: "Final Registration Lock — Admin · EDVANA" }],
  }),
  component: FinalRegistrationPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Final Reg No", cell: (r) => <span className="font-mono font-bold text-primary">{String(r.finalRegistrationNo || "UNLOCKED")}</span> },
  { header: "Enrollment No", cell: (r) => <span className="font-mono text-xs">{String(r.enrollNo)}</span> },
  { header: "Student Name", cell: (r) => String(r.studentName) },
  { header: "Branch", cell: (r) => String(r.branch) },
  { header: "Semester", cell: (r) => String(r.semester) },
  { header: "Type", cell: (r) => String(r.registrationType) },
  { header: "Finalized On", cell: (r) => String(r.finalizedOn || "—") },
  { header: "Finalized By", cell: (r) => String(r.finalizedBy || "—") },
  { header: "Lock State", cell: (r) => <StatusBadge status={String(r.finalizationStatus)} /> },
];

const fields: FieldConfig[] = [
  { name: "enrollNo", label: "Enrollment Number", required: true },
  { name: "studentName", label: "Student Name", required: true },
  { name: "finalRegistrationNo", label: "Final Registration Number", required: true, placeholder: "FR/SU26/1001" },
  {
    name: "finalizationStatus",
    label: "Lock Status",
    type: "select",
    required: true,
    options: [
      { label: "Finalized", value: "Finalized" },
      { label: "Pending", value: "Pending" },
    ],
  },
];

function FinalRegistrationPage() {
  return (
    <AdminCrudPage
      title="Final Exam Registration Lock"
      description="Lock finalized registrations, assign final registration numbers, and freeze candidate course lists."
      resource="registrations"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search locked registrations..."
      filters={[
        { key: "branch", label: "Branch", options: BRANCH_NAMES.map((b) => ({ label: b, value: b })) },
        { key: "semester", label: "Semester", options: SEMESTER_NAMES.map((s) => ({ label: s, value: s })) },
      ]}
    />
  );
}
