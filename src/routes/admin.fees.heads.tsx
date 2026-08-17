import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";

export const Route = createFileRoute("/admin/fees/heads")({
  head: () => ({
    meta: [{ title: "Fee Heads — Admin · EDVANA" }],
  }),
  component: FeeHeadsPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Fee Head Code", cell: (r) => <span className="font-mono font-bold text-foreground">{String(r.feeHeadCode)}</span> },
  { header: "Fee Head Name", cell: (r) => String(r.feeHeadName) },
  { header: "Category", cell: (r) => String(r.category) },
  { header: "Accounting Code", cell: (r) => <span className="font-mono text-xs">{String(r.accountingCode)}</span> },
  { header: "Description", cell: (r) => String(r.description || "—") },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  { name: "feeHeadCode", label: "Fee Head Code", required: true, placeholder: "e.g. FH-ADM" },
  { name: "feeHeadName", label: "Fee Head Name", required: true, placeholder: "e.g. Admission Fee" },
  {
    name: "category",
    label: "Category",
    type: "select",
    required: true,
    options: [
      { label: "Admission", value: "Admission" },
      { label: "Examination", value: "Examination" },
      { label: "Penalty", value: "Penalty" },
      { label: "Service", value: "Service" },
    ],
  },
  { name: "accountingCode", label: "Accounting Ledger Code", required: true, placeholder: "e.g. 4001" },
  { name: "description", label: "Description", type: "textarea" },
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

function FeeHeadsPage() {
  return (
    <AdminCrudPage
      title="Fee Heads Configuration"
      description="Define global fee heads (Admission Fee, Exam Fee, Late Fee, Duplicate ID Card Fee) and ledger codes."
      resource="fee-heads"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search fee heads..."
    />
  );
}
