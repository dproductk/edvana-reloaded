import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { ACADEMIC_YEARS, SEMESTER_NAMES } from "@/mock/admin";

export const Route = createFileRoute("/admin/admissions/eligibility")({
  head: () => ({
    meta: [{ title: "Admission Eligibility Rules — Admin · EDVANA" }],
  }),
  component: AdmissionEligibilityRulesPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Rule Name", cell: (r) => <span className="font-bold text-foreground">{String(r.ruleName)}</span> },
  { header: "Academic Year", cell: (r) => String(r.academicYear) },
  { header: "Target Semester", cell: (r) => String(r.semester) },
  { header: "Req. Credits", cell: (r) => String(r.requiredCredits) },
  { header: "Backlog Limit", cell: (r) => String(r.backlogLimit) },
  { header: "Admission Type", cell: (r) => String(r.admissionType) },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  { name: "ruleName", label: "Rule Name", required: true, placeholder: "e.g. Standard Promotion Rule" },
  {
    name: "academicYear",
    label: "Academic Year",
    type: "select",
    required: true,
    options: ACADEMIC_YEARS.map((y) => ({ label: y, value: y })),
  },
  {
    name: "semester",
    label: "Semester",
    type: "select",
    required: true,
    options: SEMESTER_NAMES.map((s) => ({ label: s, value: s })),
  },
  { name: "requiredCredits", label: "Required Credits", type: "number", defaultValue: 40 },
  { name: "backlogLimit", label: "Backlog Limit", type: "number", defaultValue: 4 },
  {
    name: "admissionType",
    label: "Admission Type",
    type: "select",
    required: true,
    options: [
      { label: "Regular", value: "Regular" },
      { label: "Direct Second Year", value: "Direct Second Year" },
    ],
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    defaultValue: "Active",
    options: [
      { label: "Active", value: "Active" },
      { label: "Draft", value: "Draft" },
    ],
  },
];

function AdmissionEligibilityRulesPage() {
  return (
    <AdminCrudPage
      title="Admission Eligibility Rules"
      description="Configure minimum credit requirements, backlog thresholds, and semester promotion conditions."
      resource="admission-eligibility"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search eligibility rules..."
    />
  );
}
