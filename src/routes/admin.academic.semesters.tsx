import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { ACADEMIC_YEARS, SCHEME_CODES } from "@/mock/admin";

export const Route = createFileRoute("/admin/academic/semesters")({
  head: () => ({
    meta: [{ title: "Semesters — Admin · EDVANA" }],
  }),
  component: SemestersPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Sem #", cell: (r) => <span className="font-bold">Sem {String(r.semesterNumber)}</span> },
  { header: "Semester Name", cell: (r) => String(r.semesterName) },
  { header: "Program", cell: (r) => String(r.program) },
  { header: "Scheme", cell: (r) => String(r.scheme) },
  { header: "Academic Year", cell: (r) => String(r.academicYear) },
  { header: "Term Type", cell: (r) => <span className="text-xs font-semibold">{String(r.termType)}</span> },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  { name: "semesterNumber", label: "Semester Number", type: "number", required: true, defaultValue: 1 },
  { name: "semesterName", label: "Semester Name", required: true, placeholder: "e.g. Semester 1" },
  {
    name: "scheme",
    label: "Scheme",
    type: "select",
    required: true,
    options: SCHEME_CODES.map((s) => ({ label: s, value: s })),
  },
  {
    name: "academicYear",
    label: "Academic Year",
    type: "select",
    required: true,
    options: ACADEMIC_YEARS.map((y) => ({ label: y, value: y })),
  },
  {
    name: "termType",
    label: "Term Type",
    type: "select",
    required: true,
    options: [
      { label: "Odd", value: "Odd" },
      { label: "Even", value: "Even" },
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

function SemestersPage() {
  return (
    <AdminCrudPage
      title="Semesters"
      description="Define semester terms and curriculum scheme mappings across academic years."
      resource="semesters"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search semesters..."
    />
  );
}
