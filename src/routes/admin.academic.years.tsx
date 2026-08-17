import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";

export const Route = createFileRoute("/admin/academic/years")({
  head: () => ({
    meta: [{ title: "Academic Years — Admin · EDVANA" }],
  }),
  component: AcademicYearsPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Academic Year", cell: (r) => <span className="font-semibold text-foreground">{String(r.academicYear)}</span> },
  { header: "Display Name", cell: (r) => String(r.displayName) },
  { header: "Start Date", cell: (r) => String(r.startDate) },
  { header: "End Date", cell: (r) => String(r.endDate) },
  {
    header: "Current",
    cell: (r) => (r.isCurrent ? <StatusBadge status="Active" label="Current Year" /> : <span className="text-xs text-muted-foreground">—</span>),
  },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  { name: "academicYear", label: "Academic Year", required: true, placeholder: "e.g. 2026-27" },
  { name: "displayName", label: "Display Name", required: true, placeholder: "e.g. Academic Year 2026-27" },
  { name: "startDate", label: "Start Date", type: "date", required: true },
  { name: "endDate", label: "End Date", type: "date", required: true },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    defaultValue: "Active",
    options: [
      { label: "Active", value: "Active" },
      { label: "Draft", value: "Draft" },
      { label: "Closed", value: "Closed" },
    ],
  },
  { name: "description", label: "Description", type: "textarea", placeholder: "Optional notes..." },
];

function AcademicYearsPage() {
  return (
    <AdminCrudPage
      title="Academic Years"
      description="Configure academic calendar sessions, start/end dates, and active operational terms."
      resource="academic-years"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search academic years..."
    />
  );
}
