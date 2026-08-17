import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { EXAM_SESSIONS } from "@/mock/admin";

export const Route = createFileRoute("/admin/exams/settings")({
  head: () => ({
    meta: [{ title: "Registration Settings — Admin · EDVANA" }],
  }),
  component: RegistrationSettingsPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Exam Session", cell: (r) => <span className="font-bold text-foreground">{String(r.examSession)}</span> },
  { header: "Registration Window", cell: (r) => `${r.registrationStart} to ${r.registrationEnd}` },
  { header: "R Allowed", cell: (r) => String(r.rAllowed) },
  { header: "R+RR Allowed", cell: (r) => String(r.rRrAllowed) },
  { header: "RR Allowed", cell: (r) => String(r.rrAllowed) },
  { header: "Max Backlogs", cell: (r) => String(r.maximumBacklogs) },
  { header: "Fee Required", cell: (r) => String(r.feeRequired) },
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
  { name: "registrationStart", label: "Registration Start", type: "date", required: true },
  { name: "registrationEnd", label: "Registration End", type: "date", required: true },
  { name: "maximumBacklogs", label: "Maximum Backlogs Allowed", type: "number", defaultValue: 6 },
  {
    name: "feeRequired",
    label: "Fee Payment Required",
    type: "select",
    required: true,
    defaultValue: "Yes",
    options: [
      { label: "Yes", value: "Yes" },
      { label: "No", value: "No" },
    ],
  },
  {
    name: "feedbackRequired",
    label: "Faculty Feedback Required Gate",
    type: "select",
    required: true,
    defaultValue: "Yes",
    options: [
      { label: "Yes", value: "Yes" },
      { label: "No", value: "No" },
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

function RegistrationSettingsPage() {
  return (
    <AdminCrudPage
      title="Exam Registration Settings"
      description="Configure eligibility rules, maximum backlog limits, and gating conditions (fee dues, feedback)."
      resource="registration-settings"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search registration settings..."
    />
  );
}
