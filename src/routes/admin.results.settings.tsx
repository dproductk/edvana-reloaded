import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { ACADEMIC_YEARS, EXAM_SESSIONS, SCHEME_CODES, SEMESTER_NAMES } from "@/mock/admin";

export const Route = createFileRoute("/admin/results/settings")({
  head: () => ({
    meta: [{ title: "Result Settings — Admin · EDVANA" }],
  }),
  component: ResultSettingsPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Exam Session", cell: (r) => <span className="font-bold text-foreground">{String(r.examSession)}</span> },
  { header: "Academic Year", cell: (r) => String(r.academicYear) },
  { header: "Semester", cell: (r) => String(r.semester) },
  { header: "Scheme", cell: (r) => String(r.scheme) },
  { header: "Rule Version", cell: (r) => <span className="font-mono text-xs rounded bg-muted px-1.5 py-0.5">{String(r.resultRuleVersion)}</span> },
  { header: "Passing Rule", cell: (r) => String(r.passingRule) },
  { header: "Condonation Rule", cell: (r) => String(r.condonationRule) },
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
  {
    name: "scheme",
    label: "Scheme",
    type: "select",
    required: true,
    options: SCHEME_CODES.map((s) => ({ label: s, value: s })),
  },
  { name: "resultRuleVersion", label: "Result Rule Version", required: true, placeholder: "e.g. v3.0" },
  { name: "passingRule", label: "Passing Rule", required: true, placeholder: "e.g. 40% External + 40% Aggregate" },
  { name: "condonationRule", label: "Condonation Grace Rule", placeholder: "e.g. Up to 2 marks in one course" },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    defaultValue: "Active",
    options: [
      { label: "Active", value: "Active" },
      { label: "Archived", value: "Archived" },
    ],
  },
];

function ResultSettingsPage() {
  return (
    <AdminCrudPage
      title="Result Evaluation Rules & Versioning"
      description="Configure passing thresholds, condonation rules, and versioned grade calculation rules per session."
      resource="result-settings"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search result settings..."
    />
  );
}
