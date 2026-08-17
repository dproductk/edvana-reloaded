import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { BRANCH_NAMES, SEMESTER_NAMES } from "@/mock/admin";

export const Route = createFileRoute("/admin/academic/divisions")({
  head: () => ({
    meta: [{ title: "Divisions — Admin · EDVANA" }],
  }),
  component: DivisionsPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Division", cell: (r) => <span className="font-bold text-foreground">Division {String(r.divisionName)}</span> },
  { header: "Branch", cell: (r) => String(r.branch) },
  { header: "Semester", cell: (r) => String(r.semester) },
  { header: "Academic Year", cell: (r) => String(r.academicYear) },
  { header: "Intake Capacity", cell: (r) => String(r.intakeCapacity) },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  { name: "divisionName", label: "Division Name", required: true, placeholder: "e.g. A" },
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
  { name: "intakeCapacity", label: "Intake Capacity", type: "number", required: true, defaultValue: 60 },
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

function DivisionsPage() {
  return (
    <AdminCrudPage
      title="Divisions"
      description="Manage class division groups (e.g. Division A, B, C) per branch and semester."
      resource="divisions"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search divisions..."
    />
  );
}
