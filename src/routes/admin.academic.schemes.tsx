import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { BRANCH_NAMES } from "@/mock/admin";

export const Route = createFileRoute("/admin/academic/schemes")({
  head: () => ({
    meta: [{ title: "Curriculum Schemes — Admin · EDVANA" }],
  }),
  component: SchemesPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Scheme Code", cell: (r) => <span className="font-semibold text-foreground">{String(r.schemeCode)}</span> },
  { header: "Scheme Name", cell: (r) => String(r.schemeName) },
  { header: "Version", cell: (r) => <span className="text-xs rounded bg-muted px-1.5 py-0.5 font-mono">v{String(r.version)}</span> },
  { header: "Branch", cell: (r) => String(r.branch) },
  { header: "Effective From", cell: (r) => String(r.effectiveFrom) },
  { header: "Effective To", cell: (r) => String(r.effectiveTo || "Present") },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  { name: "schemeCode", label: "Scheme Code", required: true, placeholder: "e.g. K-2024" },
  { name: "schemeName", label: "Scheme Name", required: true, placeholder: "e.g. K Scheme 2024 — IT" },
  { name: "version", label: "Version", required: true, placeholder: "e.g. 1.0" },
  {
    name: "branch",
    label: "Branch",
    type: "select",
    required: true,
    options: BRANCH_NAMES.map((b) => ({ label: b, value: b })),
  },
  { name: "effectiveFrom", label: "Effective From", type: "date", required: true },
  { name: "effectiveTo", label: "Effective To", type: "date" },
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
  { name: "description", label: "Description", type: "textarea" },
];

function SchemesPage() {
  return (
    <AdminCrudPage
      title="Curriculum Schemes"
      description="Manage versioned curriculum frameworks (e.g., K-2024, I-2018). Versioning preserves historical transcripts."
      resource="schemes"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search schemes..."
    />
  );
}
