import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";

export const Route = createFileRoute("/admin/academic/programs")({
  head: () => ({
    meta: [{ title: "Academic Programs — Admin · EDVANA" }],
  }),
  component: ProgramsPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Program Code", cell: (r) => <span className="font-semibold text-foreground">{String(r.programCode)}</span> },
  { header: "Program Name", cell: (r) => String(r.programName) },
  { header: "Type", cell: (r) => String(r.programType) },
  { header: "Duration", cell: (r) => String(r.duration) },
  { header: "Total Semesters", cell: (r) => String(r.totalSemesters) },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  { name: "programCode", label: "Program Code", required: true, placeholder: "e.g. DIP" },
  { name: "programName", label: "Program Name", required: true, placeholder: "e.g. Diploma in Engineering" },
  {
    name: "programType",
    label: "Program Type",
    type: "select",
    required: true,
    options: [
      { label: "Diploma", value: "Diploma" },
      { label: "Post Diploma", value: "Post Diploma" },
      { label: "Certificate", value: "Certificate" },
    ],
  },
  { name: "duration", label: "Duration", required: true, placeholder: "e.g. 3 Years" },
  { name: "totalSemesters", label: "Total Semesters", type: "number", required: true, defaultValue: 6 },
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

function ProgramsPage() {
  return (
    <AdminCrudPage
      title="Academic Programs"
      description="Configure core academic programs offered by Government Polytechnic Kolhapur."
      resource="programs"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search programs..."
    />
  );
}
