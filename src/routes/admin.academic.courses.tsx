import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { COURSE_TYPES, SEMESTER_NAMES } from "@/mock/admin";

export const Route = createFileRoute("/admin/academic/courses")({
  head: () => ({
    meta: [{ title: "Subjects / Courses — Admin · EDVANA" }],
  }),
  component: CoursesPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Course Code", cell: (r) => <span className="font-bold text-foreground">{String(r.courseCode)}</span> },
  { header: "Course Name", cell: (r) => String(r.courseName) },
  { header: "Short", cell: (r) => <span className="text-xs font-mono">{String(r.shortName)}</span> },
  { header: "Type", cell: (r) => String(r.courseType) },
  { header: "Semester", cell: (r) => String(r.semester) },
  { header: "Credits", cell: (r) => String(r.credits) },
  { header: "Marks (T+P+I=Total)", cell: (r) => `${r.theoryMarks || 0} + ${r.practicalMarks || 0} + ${r.internalMarks || 0} = ${r.totalMarks}` },
  { header: "Passing", cell: (r) => String(r.passingMarks) },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  { name: "courseCode", label: "Course Code", required: true, placeholder: "e.g. ITH301" },
  { name: "courseName", label: "Course Name", required: true, placeholder: "e.g. Data Structures Using C" },
  { name: "shortName", label: "Short Name", required: true, placeholder: "e.g. DSU" },
  {
    name: "courseType",
    label: "Course Type",
    type: "select",
    required: true,
    options: COURSE_TYPES.map((t) => ({ label: t, value: t })),
  },
  {
    name: "semester",
    label: "Semester",
    type: "select",
    required: true,
    options: SEMESTER_NAMES.map((s) => ({ label: s, value: s })),
  },
  { name: "credits", label: "Credits", type: "number", required: true, defaultValue: 4 },
  { name: "theoryMarks", label: "Theory Marks", type: "number", defaultValue: 70 },
  { name: "practicalMarks", label: "Practical Marks", type: "number", defaultValue: 0 },
  { name: "internalMarks", label: "Internal Marks", type: "number", defaultValue: 30 },
  { name: "passingMarks", label: "Passing Marks", type: "number", required: true, defaultValue: 40 },
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

function CoursesPage() {
  return (
    <AdminCrudPage
      title="Subjects & Courses Master"
      description="Configure subject codes, course types, credit allocations, and passing mark rules."
      resource="courses"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search by course code or name..."
      filters={[
        { key: "semester", label: "Semester", options: SEMESTER_NAMES.map((s) => ({ label: s, value: s })) },
        { key: "courseType", label: "Course Type", options: COURSE_TYPES.map((t) => ({ label: t, value: t })) },
      ]}
    />
  );
}
