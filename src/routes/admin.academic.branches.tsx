import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { DEPARTMENTS } from "@/mock/admin";

export const Route = createFileRoute("/admin/academic/branches")({
  head: () => ({
    meta: [{ title: "Academic Branches — Admin · EDVANA" }],
  }),
  component: BranchesPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Branch Code", cell: (r) => <span className="font-semibold text-foreground">{String(r.branchCode)}</span> },
  { header: "Branch Name", cell: (r) => String(r.branchName) },
  { header: "Program", cell: (r) => String(r.program) },
  { header: "Department", cell: (r) => String(r.department) },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  { name: "branchCode", label: "Branch Code", required: true, placeholder: "e.g. IT" },
  { name: "branchName", label: "Branch Name", required: true, placeholder: "e.g. Information Technology" },
  { name: "shortName", label: "Short Name", required: true, placeholder: "e.g. IT" },
  {
    name: "department",
    label: "Department",
    type: "select",
    required: true,
    options: DEPARTMENTS.map((d) => ({ label: d, value: d })),
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

function BranchesPage() {
  return (
    <AdminCrudPage
      title="Academic Branches"
      description="Manage diploma specialization branches and department associations."
      resource="branches"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search branches..."
    />
  );
}
