import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { DEPARTMENTS } from "@/mock/admin";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export const Route = createFileRoute("/admin/master/faculty")({
  head: () => ({
    meta: [{ title: "Faculty Master — Admin · EDVANA" }],
  }),
  component: FacultyMasterPage,
});

const columns: Column<AdminRecord>[] = [
  {
    header: "Faculty ID",
    cell: (r) => (
      <Link to="/admin/master/faculty/$id" params={{ id: r.id }} className="font-mono font-bold text-primary hover:underline">
        {String(r.facultyId)}
      </Link>
    ),
  },
  { header: "Faculty Name", cell: (r) => String(r.facultyName) },
  { header: "Department", cell: (r) => String(r.department) },
  { header: "Designation", cell: (r) => String(r.designation) },
  { header: "Qualification", cell: (r) => String(r.qualification) },
  { header: "Experience", cell: (r) => String(r.experience) },
  { header: "Mobile", cell: (r) => String(r.mobile) },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  { name: "facultyId", label: "Faculty ID", required: true, placeholder: "e.g. DTESBM9001" },
  { name: "employeeId", label: "Employee ID", required: true, placeholder: "e.g. EMP1201" },
  { name: "facultyName", label: "Full Name", required: true, placeholder: "Prof. S. S. Bhosale" },
  {
    name: "department",
    label: "Department",
    type: "select",
    required: true,
    options: DEPARTMENTS.map((d) => ({ label: d, value: d })),
  },
  {
    name: "designation",
    label: "Designation",
    type: "select",
    required: true,
    options: [
      { label: "Lecturer", value: "Lecturer" },
      { label: "Senior Lecturer", value: "Senior Lecturer" },
      { label: "HOD", value: "HOD" },
      { label: "Workshop Superintendent", value: "Workshop Superintendent" },
    ],
  },
  { name: "mobile", label: "Mobile Number", required: true },
  { name: "email", label: "Email Address", required: true },
  { name: "qualification", label: "Qualification", required: true, placeholder: "e.g. M.Tech (IT)" },
  { name: "experience", label: "Experience", required: true, placeholder: "e.g. 10 years" },
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

function FacultyMasterPage() {
  return (
    <AdminCrudPage
      title="Faculty Directory"
      description="Manage teaching & administrative faculty, designations, qualifications, and AICTE format biodata."
      resource="faculty"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search faculty by ID, name or department..."
      filters={[{ key: "department", label: "Department", options: DEPARTMENTS.map((d) => ({ label: d, value: d })) }]}
      customActions={(row) => (
        <Button asChild variant="ghost" size="icon" className="h-8 w-8" title="View AICTE Biodata">
          <Link to="/admin/master/faculty/$id" params={{ id: row.id }}>
            <Eye className="h-4 w-4 text-primary" />
          </Link>
        </Button>
      )}
    />
  );
}
