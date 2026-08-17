import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";

export const Route = createFileRoute("/admin/users/")({
  head: () => ({
    meta: [{ title: "User Management — Admin · EDVANA" }],
  }),
  component: UsersPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Username", cell: (r) => <span className="font-mono font-bold text-foreground">{String(r.username)}</span> },
  { header: "Employee / Student ID", cell: (r) => <span className="font-mono text-xs">{String(r.employeeId)}</span> },
  { header: "Full Name", cell: (r) => String(r.name) },
  { header: "Base Profile", cell: (r) => <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">{String(r.baseProfile)}</span> },
  { header: "Email", cell: (r) => String(r.email) },
  { header: "Last Login", cell: (r) => String(r.lastLogin) },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  { name: "username", label: "Username", required: true, placeholder: "e.g. staff02" },
  { name: "employeeId", label: "Employee / Student ID", required: true, placeholder: "e.g. EMP1010" },
  { name: "name", label: "Full Name", required: true, placeholder: "e.g. Patil Sayali" },
  { name: "email", label: "Email Address", required: true },
  { name: "mobile", label: "Mobile Number", required: true },
  {
    name: "baseProfile",
    label: "Base Profile",
    type: "select",
    required: true,
    options: [
      { label: "Student", value: "Student" },
      { label: "Faculty", value: "Faculty" },
      { label: "Administrative", value: "Administrative" },
      { label: "Admin", value: "Admin" },
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

function UsersPage() {
  return (
    <AdminCrudPage
      title="User Accounts Management"
      description="Manage user login identities, base profile categories, and account activations."
      resource="users"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search users by username, ID or name..."
      filters={[
        {
          key: "baseProfile",
          label: "Profile",
          options: [
            { label: "Student", value: "Student" },
            { label: "Faculty", value: "Faculty" },
            { label: "Administrative", value: "Administrative" },
            { label: "Admin", value: "Admin" },
          ],
        },
      ]}
    />
  );
}
