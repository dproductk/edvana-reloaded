import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";

export const Route = createFileRoute("/admin/data/import")({
  head: () => ({
    meta: [{ title: "Import Data — Admin · EDVANA" }],
  }),
  component: DataImportPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Filename", cell: (r) => <span className="font-mono font-bold text-foreground">{String(r.filename)}</span> },
  { header: "Import Type", cell: (r) => <span className="font-semibold text-primary">{String(r.importType)}</span> },
  { header: "Total Rows", cell: (r) => Number(r.totalRows).toLocaleString() },
  { header: "Imported", cell: (r) => <span className="font-bold text-emerald-600">{Number(r.imported).toLocaleString()}</span> },
  { header: "Errors", cell: (r) => <span className="font-semibold text-destructive">{String(r.errors)}</span> },
  { header: "Uploaded By", cell: (r) => String(r.uploadedBy) },
  { header: "Timestamp", cell: (r) => String(r.timestamp) },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  { name: "filename", label: "Filename", required: true },
  { name: "importType", label: "Import Type", required: true },
  { name: "totalRows", label: "Total Rows", type: "number", required: true },
  { name: "imported", label: "Imported Count", type: "number", required: true },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Completed", value: "Completed" },
      { label: "Pending", value: "Pending" },
      { label: "Completed with Errors", value: "Completed with Errors" },
    ],
  },
];

function DataImportPage() {
  return (
    <AdminCrudPage
      title="Data Import Jobs Ledger"
      description="Track bulk data imports for student admission sheets, academic history, and result registers."
      resource="import-jobs"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search import jobs by filename or type..."
    />
  );
}
