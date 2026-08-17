import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { EXAM_SESSIONS, SEMESTER_NAMES } from "@/mock/admin";

export const Route = createFileRoute("/admin/exams/courses")({
  head: () => ({
    meta: [{ title: "Exam Courses — Admin · EDVANA" }],
  }),
  component: ExamCoursesPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Exam Session", cell: (r) => String(r.examSession) },
  { header: "Course Code", cell: (r) => <span className="font-mono font-bold text-foreground">{String(r.courseCode)}</span> },
  { header: "Course Name", cell: (r) => String(r.courseName) },
  { header: "Semester", cell: (r) => String(r.semester) },
  { header: "Scheme", cell: (r) => String(r.scheme) },
  { header: "Max Marks", cell: (r) => String(r.maximumMarks) },
  { header: "Passing Marks", cell: (r) => String(r.passingMarks) },
  { header: "Exam Mode", cell: (r) => String(r.examMode) },
  { header: "Duration", cell: (r) => String(r.examDuration) },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  {
    name: "examSession",
    label: "Exam Session",
    type: "select",
    required: true,
    options: EXAM_SESSIONS.map((s) => ({ label: s, value: s })),
  },
  { name: "courseCode", label: "Course Code", required: true, placeholder: "e.g. ITH401" },
  { name: "courseName", label: "Course Name", required: true, placeholder: "e.g. Object Oriented Programming" },
  {
    name: "semester",
    label: "Semester",
    type: "select",
    required: true,
    options: SEMESTER_NAMES.map((s) => ({ label: s, value: s })),
  },
  { name: "maximumMarks", label: "Maximum Marks", type: "number", required: true, defaultValue: 70 },
  { name: "passingMarks", label: "Passing Marks", type: "number", required: true, defaultValue: 28 },
  { name: "examDuration", label: "Exam Duration", required: true, placeholder: "e.g. 150 min" },
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

function ExamCoursesPage() {
  return (
    <AdminCrudPage
      title="Exam Course Configurations"
      description="Configure session-specific examination parameters, maximum marks, passing cutoffs, and paper durations."
      resource="exam-courses"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search exam courses..."
      filters={[{ key: "examSession", label: "Session", options: EXAM_SESSIONS.map((s) => ({ label: s, value: s })) }]}
    />
  );
}
