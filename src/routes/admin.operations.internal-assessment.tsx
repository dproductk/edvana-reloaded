import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { ACADEMIC_YEARS, SEMESTER_NAMES } from "@/mock/admin";

export const Route = createFileRoute("/admin/operations/internal-assessment")({
  head: () => ({
    meta: [{ title: "Internal Assessment Settings — Admin · EDVANA" }],
  }),
  component: InternalAssessmentSettingsPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Course", cell: (r) => <span className="font-bold text-foreground">{String(r.course)}</span> },
  { header: "Academic Year", cell: (r) => String(r.academicYear) },
  { header: "Semester", cell: (r) => String(r.semester) },
  { header: "Assessment Pattern", cell: (r) => <span className="font-mono text-xs">{String(r.pattern)}</span> },
  { header: "Max Marks", cell: (r) => String(r.maximumMarks) },
  { header: "Passing", cell: (r) => String(r.passingMarks) },
  { header: "Deadline", cell: (r) => String(r.submissionDeadline) },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  {
    name: "academicYear",
    label: "Academic Year",
    type: "select",
    required: true,
    options: ACADEMIC_YEARS.map((y) => ({ label: y, value: y })),
  },
  {
    name: "semester",
    label: "Semester",
    type: "select",
    required: true,
    options: SEMESTER_NAMES.map((s) => ({ label: s, value: s })),
  },
  { name: "course", label: "Course Code & Name", required: true, placeholder: "ITH301 — Data Structures" },
  { name: "pattern", label: "Assessment Pattern", required: true, placeholder: "UT1 + UT2 + FA-PR + SA-PR" },
  { name: "maximumMarks", label: "Maximum Marks", type: "number", required: true, defaultValue: 30 },
  { name: "passingMarks", label: "Passing Marks", type: "number", required: true, defaultValue: 12 },
  { name: "submissionDeadline", label: "Submission Deadline", type: "date", required: true },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    defaultValue: "Active",
    options: [
      { label: "Active", value: "Active" },
      { label: "Locked", value: "Locked" },
    ],
  },
];

function InternalAssessmentSettingsPage() {
  return (
    <AdminCrudPage
      title="Internal Assessment Configurations"
      description="Configure Unit Tests (UT1, UT2), Formative (FA), and Summative (SA) internal assessment weighting patterns."
      resource="internal-assessment"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search internal assessment patterns..."
    />
  );
}
