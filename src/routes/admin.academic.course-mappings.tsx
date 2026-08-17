import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { BRANCH_NAMES, SCHEME_CODES, SEMESTER_NAMES } from "@/mock/admin";

export const Route = createFileRoute("/admin/academic/course-mappings")({
  head: () => ({
    meta: [{ title: "Course-Scheme Mapping — Admin · EDVANA" }],
  }),
  component: CourseMappingPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Scheme", cell: (r) => <span className="font-semibold text-primary">{String(r.scheme)}</span> },
  { header: "Branch", cell: (r) => String(r.branch) },
  { header: "Semester", cell: (r) => String(r.semester) },
  { header: "Course Code", cell: (r) => <span className="font-mono font-bold">{String(r.courseCode)}</span> },
  { header: "Course Name", cell: (r) => String(r.courseName) },
  { header: "Type", cell: (r) => String(r.courseType) },
  { header: "Credits", cell: (r) => String(r.credits) },
  { header: "Effective From", cell: (r) => String(r.effectiveFrom) },
  { header: "Effective To", cell: (r) => String(r.effectiveTo || "Present") },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  {
    name: "scheme",
    label: "Curriculum Scheme",
    type: "select",
    required: true,
    options: SCHEME_CODES.map((s) => ({ label: s, value: s })),
  },
  {
    name: "branch",
    label: "Branch",
    type: "select",
    required: true,
    options: BRANCH_NAMES.map((b) => ({ label: b, value: b })),
  },
  {
    name: "semester",
    label: "Semester",
    type: "select",
    required: true,
    options: SEMESTER_NAMES.map((s) => ({ label: s, value: s })),
  },
  { name: "courseCode", label: "Course Code", required: true, placeholder: "e.g. ITH301" },
  { name: "courseName", label: "Course Name", required: true, placeholder: "e.g. Data Structures Using C" },
  { name: "credits", label: "Credits", type: "number", required: true, defaultValue: 4 },
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
];

function CourseMappingPage() {
  return (
    <AdminCrudPage
      title="Course-Scheme Mapping"
      description="Map subjects to curriculum schemes and semesters with effective date versioning."
      resource="course-mappings"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search mappings..."
      filters={[
        { key: "scheme", label: "Scheme", options: SCHEME_CODES.map((s) => ({ label: s, value: s })) },
        { key: "semester", label: "Semester", options: SEMESTER_NAMES.map((s) => ({ label: s, value: s })) },
      ]}
    />
  );
}
