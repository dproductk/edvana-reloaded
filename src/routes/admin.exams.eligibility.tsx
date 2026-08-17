import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { EXAM_SESSIONS } from "@/mock/admin";

export const Route = createFileRoute("/admin/exams/eligibility")({
  head: () => ({
    meta: [{ title: "Exam Eligibility Rules — Admin · EDVANA" }],
  }),
  component: ExamEligibilityRulesPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Rule Name", cell: (r) => <span className="font-bold text-foreground">{String(r.ruleName)}</span> },
  { header: "Exam Session", cell: (r) => String(r.examSession) },
  { header: "Registration Type", cell: (r) => <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">{String(r.registrationType)}</span> },
  { header: "Condition Logic", cell: (r) => <span className="font-mono text-xs text-muted-foreground">{String(r.conditions)}</span> },
  { header: "Backlog Limit", cell: (r) => String(r.backlogLimit) },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  { name: "ruleName", label: "Rule Name", required: true, placeholder: "e.g. R + RR — Regular with Backlog" },
  {
    name: "examSession",
    label: "Exam Session",
    type: "select",
    required: true,
    options: EXAM_SESSIONS.map((s) => ({ label: s, value: s })),
  },
  {
    name: "registrationType",
    label: "Registration Type",
    type: "select",
    required: true,
    options: [
      { label: "R", value: "R" },
      { label: "R + RR", value: "R + RR" },
      { label: "RR", value: "RR" },
    ],
  },
  { name: "conditions", label: "Rule Evaluation Logic", type: "textarea", required: true, placeholder: "IF Admission = Admitted AND Fee = Paid THEN Eligible" },
  { name: "backlogLimit", label: "Backlog Limit", type: "number", defaultValue: 5 },
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

function ExamEligibilityRulesPage() {
  return (
    <AdminCrudPage
      title="Exam Eligibility Rule Engine"
      description="Configure condition builders for R (Regular), R+RR (Regular + Backlog), and RR (Backlog Only) candidate pools."
      resource="exam-eligibility"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search eligibility rules..."
    />
  );
}
