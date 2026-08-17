import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { ACADEMIC_YEARS, EXAM_SESSIONS, SEMESTER_NAMES } from "@/mock/admin";

export const Route = createFileRoute("/admin/exams/timetable-settings")({
  head: () => ({
    meta: [{ title: "Timetable Settings — Admin · EDVANA" }],
  }),
  component: TimetableSettingsPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Exam Session", cell: (r) => <span className="font-bold text-foreground">{String(r.examSession)}</span> },
  { header: "Academic Year", cell: (r) => String(r.academicYear) },
  { header: "Semester", cell: (r) => String(r.semester) },
  { header: "Exam Window", cell: (r) => `${r.startDate} to ${r.endDate}` },
  { header: "Default Slot", cell: (r) => `${r.defaultStartTime} - ${r.defaultEndTime}` },
  { header: "Break Rules", cell: (r) => String(r.breakRules) },
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
  { name: "startDate", label: "Start Date", type: "date", required: true },
  { name: "endDate", label: "End Date", type: "date", required: true },
  { name: "defaultStartTime", label: "Default Start Time", required: true, defaultValue: "10:00" },
  { name: "defaultEndTime", label: "Default End Time", required: true, defaultValue: "12:30" },
  { name: "breakRules", label: "Gap & Break Rules", type: "textarea", placeholder: "e.g. Minimum 1 day gap between theory papers" },
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

function TimetableSettingsPage() {
  return (
    <AdminCrudPage
      title="Timetable Global Settings"
      description="Configure session start/end windows, standard exam time slots, and minimum gap rules between theory papers."
      resource="timetable-settings"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search timetable settings..."
    />
  );
}
