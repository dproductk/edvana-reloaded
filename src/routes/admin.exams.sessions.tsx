import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { ACADEMIC_YEARS, SEMESTER_NAMES } from "@/mock/admin";

export const Route = createFileRoute("/admin/exams/sessions")({
  head: () => ({
    meta: [{ title: "Exam Sessions — Admin · EDVANA" }],
  }),
  component: ExamSessionsPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Exam Session", cell: (r) => <span className="font-bold text-foreground">{String(r.examSessionName)}</span> },
  { header: "Academic Year", cell: (r) => String(r.academicYear) },
  { header: "Semester", cell: (r) => String(r.semester) },
  { header: "Exam Type", cell: (r) => String(r.examType) },
  { header: "Exam Dates", cell: (r) => `${r.startDate} to ${r.endDate}` },
  { header: "Reg. Dates", cell: (r) => `${r.registrationStartDate} to ${r.registrationEndDate}` },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  { name: "examSessionName", label: "Exam Session Name", required: true, placeholder: "e.g. SUMMER 2026" },
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
    name: "examType",
    label: "Exam Type",
    type: "select",
    required: true,
    options: [
      { label: "Regular", value: "Regular" },
      { label: "Regular + Backlog", value: "Regular + Backlog" },
      { label: "Backlog", value: "Backlog" },
      { label: "Repeater", value: "Repeater" },
    ],
  },
  { name: "startDate", label: "Exam Start Date", type: "date", required: true },
  { name: "endDate", label: "Exam End Date", type: "date", required: true },
  { name: "registrationStartDate", label: "Reg Start Date", type: "date", required: true },
  { name: "registrationEndDate", label: "Reg End Date", type: "date", required: true },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    defaultValue: "Open",
    options: [
      { label: "Draft", value: "Draft" },
      { label: "Open", value: "Open" },
      { label: "Registration Closed", value: "Registration Closed" },
      { label: "Completed", value: "Completed" },
    ],
  },
];

function ExamSessionsPage() {
  return (
    <AdminCrudPage
      title="Examination Sessions"
      description="Manage exam session periods, registration dates, and active session statuses."
      resource="exam-sessions"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search exam sessions..."
    />
  );
}
