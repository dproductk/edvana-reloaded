import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";

export const Route = createFileRoute("/admin/users/roles")({
  head: () => ({
    meta: [{ title: "Role Master — Admin · EDVANA" }],
  }),
  component: RolesPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Role Code", cell: (r) => <span className="font-mono font-bold text-foreground">{String(r.roleCode)}</span> },
  { header: "Role Name", cell: (r) => String(r.roleName) },
  { header: "Base Profile", cell: (r) => String(r.baseProfile) },
  { header: "Description", cell: (r) => String(r.description || "—") },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  { name: "roleCode", label: "Role Code", required: true, placeholder: "e.g. HOD" },
  { name: "roleName", label: "Role Name", required: true, placeholder: "e.g. Head of Department" },
  {
    name: "baseProfile",
    label: "Base Profile",
    type: "select",
    required: true,
    options: [
      { label: "Faculty", value: "Faculty" },
      { label: "Administrative", value: "Administrative" },
      { label: "Admin", value: "Admin" },
    ],
  },
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

function RolesPage() {
  return (
    <AdminCrudPage
      title="System Role Master"
      description="Configure system roles (HOD, Class Teacher, Exam Clerk, Accounts, Student Section)."
      resource="roles"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search roles..."
    />
  );
}
