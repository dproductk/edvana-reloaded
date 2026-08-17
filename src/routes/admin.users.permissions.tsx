import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";

export const Route = createFileRoute("/admin/users/permissions")({
  head: () => ({
    meta: [{ title: "Permissions Matrix — Admin · EDVANA" }],
  }),
  component: PermissionsPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Permission Code", cell: (r) => <span className="font-mono font-bold text-primary">{String(r.permissionCode)}</span> },
  { header: "Permission Name", cell: (r) => String(r.permissionName) },
  { header: "Module", cell: (r) => <span className="rounded bg-muted px-2 py-0.5 text-xs font-semibold">{String(r.module)}</span> },
  { header: "Action", cell: (r) => <span className="text-xs font-semibold">{String(r.action)}</span> },
  { header: "Description", cell: (r) => String(r.description || "—") },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  { name: "permissionCode", label: "Permission Code", required: true, placeholder: "e.g. admission.approve" },
  { name: "permissionName", label: "Permission Name", required: true, placeholder: "e.g. Approve Admission" },
  { name: "module", label: "Module", required: true, placeholder: "e.g. admission" },
  { name: "action", label: "Action", required: true, placeholder: "e.g. approve" },
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

function PermissionsPage() {
  return (
    <AdminCrudPage
      title="Fine-Grained Permissions Registry"
      description="Configure granular module permissions (view, create, edit, delete, approve, finalize, import, export)."
      resource="permissions"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search permissions..."
    />
  );
}
