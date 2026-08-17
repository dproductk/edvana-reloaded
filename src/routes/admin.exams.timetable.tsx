import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { BRANCH_NAMES, EXAM_SESSIONS, SEMESTER_NAMES } from "@/mock/admin";

export const Route = createFileRoute("/admin/exams/timetable")({
  head: () => ({
    meta: [{ title: "Timetable Schedule — Admin · EDVANA" }],
  }),
  component: TimetablePage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Exam Date", cell: (r) => <span className="font-bold text-foreground">{String(r.examDate)} ({String(r.day)})</span> },
  { header: "Time Slot", cell: (r) => `${r.startTime} - ${r.endTime}` },
  { header: "Course Code", cell: (r) => <span className="font-mono font-bold text-primary">{String(r.courseCode)}</span> },
  { header: "Course Name", cell: (r) => String(r.courseName) },
  { header: "Branch / Sem", cell: (r) => `${r.branch} (${r.semester})` },
  { header: "Venue Block", cell: (r) => String(r.venue) },
  { header: "Registered Candidates", cell: (r) => <span className="font-semibold text-emerald-600">{String(r.registered)} Students (R:{String(r.rCount)}, R+RR:{String(r.rRrCount)}, RR:{String(r.rrCount)})</span> },
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
  { name: "examDate", label: "Exam Date", type: "date", required: true },
  { name: "day", label: "Day of Week", required: true, placeholder: "e.g. Monday" },
  { name: "startTime", label: "Start Time", required: true, placeholder: "10:00" },
  { name: "endTime", label: "End Time", required: true, placeholder: "12:30" },
  { name: "courseCode", label: "Course Code", required: true, placeholder: "e.g. ITH401" },
  { name: "courseName", label: "Course Name", required: true, placeholder: "e.g. Object Oriented Programming" },
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
  { name: "venue", label: "Venue Block", required: true, placeholder: "e.g. Block A — Room 101" },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    defaultValue: "Published",
    options: [
      { label: "Draft", value: "Draft" },
      { label: "Published", value: "Published" },
    ],
  },
];

function TimetablePage() {
  return (
    <AdminCrudPage
      title="Exam Timetable Schedule"
      description="Manage exam dates, morning/afternoon time slots, venue allocations, and candidate verifications."
      resource="timetable"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search timetable by course, date or venue..."
      filters={[
        { key: "examSession", label: "Session", options: EXAM_SESSIONS.map((s) => ({ label: s, value: s })) },
        { key: "semester", label: "Semester", options: SEMESTER_NAMES.map((s) => ({ label: s, value: s })) },
      ]}
    />
  );
}
