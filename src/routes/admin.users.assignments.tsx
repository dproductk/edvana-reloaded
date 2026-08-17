import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { ACADEMIC_YEARS, DEPARTMENTS } from "@/mock/admin";

export const Route = createFileRoute("/admin/users/assignments")({
  head: () => ({
    meta: [{ title: "Scoped Role Assignments — Admin · EDVANA" }],
  }),
  component: RoleAssignmentsPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "User", cell: (r) => <span className="font-mono font-bold text-foreground">{String(r.user)}</span> },
  { header: "Assigned Role", cell: (r) => <span className="font-semibold text-primary">{String(r.role)}</span> },
  { header: "Department Scope", cell: (r) => String(r.department) },
  { header: "Academic Year Scope", cell: (r) => String(r.academicYear) },
  { header: "Effective Window", cell: (r) => `${r.effectiveFrom} to ${r.effectiveTo}` },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  { name: "user", label: "Username", required: true, placeholder: "e.g. faculty01" },
  { name: "role", label: "Assigned Role", required: true, placeholder: "e.g. HOD" },
  {
    name: "department",
    label: "Department Scope",
    type: "select",
    required: true,
    options: DEPARTMENTS.map((d) => ({ label: d, value: d })),
  },
  {
    name: "academicYear",
    label: "Academic Year Scope",
    type: "select",
    required: true,
    options: ACADEMIC_YEARS.map((y) => ({ label: y, value: y })),
  },
  { name: "effectiveFrom", label: "Effective From", type: "date", required: true },
  { name: "effectiveTo", label: "Effective To", type: "date", required: true },
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

function RoleAssignmentsPage() {
  return (
    <AdminCrudPage
      title="Scoped User Role Assignments"
      description="Assign roles scoped by department and academic year (UserRole many-to-many relationship)."
      resource="role-assignments"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search role assignments..."
    />
  );
}
