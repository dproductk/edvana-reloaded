import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { ACADEMIC_YEARS, BRANCH_NAMES, SCHEME_CODES, SEMESTER_NAMES } from "@/mock/admin";

export const Route = createFileRoute("/admin/fees/structures")({
  head: () => ({
    meta: [{ title: "Fee Structures — Admin · EDVANA" }],
  }),
  component: FeeStructuresPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Academic Year", cell: (r) => String(r.academicYear) },
  { header: "Scheme", cell: (r) => String(r.scheme) },
  { header: "Branch", cell: (r) => String(r.branch) },
  { header: "Semester", cell: (r) => String(r.semester) },
  { header: "Fee Head", cell: (r) => <span className="font-semibold">{String(r.feeHead)}</span> },
  { header: "Amount", cell: (r) => <span className="font-bold text-primary">₹{Number(r.amount).toLocaleString()}</span> },
  { header: "Mandatory", cell: (r) => String(r.mandatory) },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  {
    name: "academicYear",
    label: "Academic Year",
    type: "select",
    required: true,
    options: ACADEMIC_YEARS.map((y) => ({ label: y, value: y })),
  },
  {
    name: "scheme",
    label: "Scheme",
    type: "select",
    required: true,
    options: SCHEME_CODES.map((s) => ({ label: s, value: s })),
  },
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
  { name: "feeHead", label: "Fee Head", required: true, placeholder: "e.g. Admission Fee" },
  { name: "amount", label: "Amount (₹)", type: "number", required: true, defaultValue: 9850 },
  {
    name: "mandatory",
    label: "Mandatory",
    type: "select",
    required: true,
    defaultValue: "Yes",
    options: [
      { label: "Yes", value: "Yes" },
      { label: "No", value: "No" },
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
      { label: "Inactive", value: "Inactive" },
    ],
  },
];

function FeeStructuresPage() {
  return (
    <AdminCrudPage
      title="Fee Structures Configuration"
      description="Configure scheme-wise, program-wise, and semester-wise fee amounts and validity rules."
      resource="fee-structures"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search fee structures..."
      filters={[
        { key: "semester", label: "Semester", options: SEMESTER_NAMES.map((s) => ({ label: s, value: s })) },
        { key: "scheme", label: "Scheme", options: SCHEME_CODES.map((s) => ({ label: s, value: s })) },
      ]}
    />
  );
}
