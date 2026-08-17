import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { DIVISIONS, SEMESTER_NAMES } from "@/mock/admin";

export const Route = createFileRoute("/admin/academic/batches")({
  head: () => ({
    meta: [{ title: "Batches — Admin · EDVANA" }],
  }),
  component: BatchesPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Batch Code", cell: (r) => <span className="font-bold text-foreground">{String(r.batchCode)}</span> },
  { header: "Batch Name", cell: (r) => String(r.batchName) },
  { header: "Division", cell: (r) => `Division ${String(r.division)}` },
  { header: "Semester", cell: (r) => String(r.semester) },
  { header: "Capacity", cell: (r) => String(r.capacity) },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  { name: "batchCode", label: "Batch Code", required: true, placeholder: "e.g. C1" },
  { name: "batchName", label: "Batch Name", required: true, placeholder: "e.g. Batch C1" },
  {
    name: "division",
    label: "Division",
    type: "select",
    required: true,
    options: DIVISIONS.map((d) => ({ label: `Division ${d}`, value: d })),
  },
  {
    name: "semester",
    label: "Semester",
    type: "select",
    required: true,
    options: SEMESTER_NAMES.map((s) => ({ label: s, value: s })),
  },
  { name: "capacity", label: "Capacity", type: "number", required: true, defaultValue: 20 },
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

function BatchesPage() {
  return (
    <AdminCrudPage
      title="Practical Batches"
      description="Manage practical/lab batches (e.g. C1, C2, C3) within a division. Distinct from class divisions."
      resource="batches"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search batches..."
    />
  );
}
