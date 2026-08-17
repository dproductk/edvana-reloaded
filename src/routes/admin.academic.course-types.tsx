import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";

export const Route = createFileRoute("/admin/academic/course-types")({
  head: () => ({
    meta: [{ title: "Course Types — Admin · EDVANA" }],
  }),
  component: CourseTypesPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Type Code", cell: (r) => <span className="font-bold font-mono">{String(r.courseTypeCode)}</span> },
  { header: "Course Type Name", cell: (r) => String(r.courseTypeName) },
  { header: "Category", cell: (r) => String(r.category) },
  { header: "Max Credits Allowed", cell: (r) => String(r.creditsAllowed) },
  { header: "Assessment Type", cell: (r) => String(r.assessmentType) },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  { name: "courseTypeCode", label: "Type Code", required: true, placeholder: "e.g. THE" },
  { name: "courseTypeName", label: "Course Type Name", required: true, placeholder: "e.g. Theory" },
  {
    name: "category",
    label: "Category",
    type: "select",
    required: true,
    options: [
      { label: "Core", value: "Core" },
      { label: "Optional", value: "Optional" },
      { label: "Audit", value: "Audit" },
    ],
  },
  { name: "creditsAllowed", label: "Credits Allowed", type: "number", defaultValue: 4 },
  { name: "assessmentType", label: "Assessment Type", required: true, placeholder: "e.g. Internal + Theory" },
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

function CourseTypesPage() {
  return (
    <AdminCrudPage
      title="Course Types Configuration"
      description="Manage subject categories (Theory, Practical, Project, Workshop, Audit, Skill, Elective)."
      resource="course-types"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search course types..."
    />
  );
}
