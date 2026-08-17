import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { BRANCH_NAMES, SEMESTER_NAMES } from "@/mock/admin";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export const Route = createFileRoute("/admin/exams/rr")({
  head: () => ({
    meta: [{ title: "RR Students (Backlog Only) — Admin · EDVANA" }],
  }),
  component: RRStudentsPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Enrollment No", cell: (r) => <span className="font-mono font-bold text-foreground">{String(r.enrollNo)}</span> },
  { header: "Student Name", cell: (r) => String(r.studentName) },
  { header: "Branch", cell: (r) => String(r.branch) },
  { header: "Semester", cell: (r) => String(r.semester) },
  { header: "Backlog Courses", cell: (r) => <span className="font-bold text-destructive">{String(r.backlogCount)}</span> },
  { header: "Total Credits", cell: (r) => String(r.totalCredits) },
  { header: "Fee Status", cell: (r) => <StatusBadge status={String(r.feeStatus)} /> },
  { header: "Reg Status", cell: (r) => <StatusBadge status={String(r.registrationStatus)} /> },
];

const fields: FieldConfig[] = [
  { name: "enrollNo", label: "Enrollment Number", required: true },
  { name: "studentName", label: "Student Name", required: true },
  {
    name: "registrationStatus",
    label: "Registration Status",
    type: "select",
    required: true,
    options: [
      { label: "Draft", value: "Draft" },
      { label: "Submitted", value: "Submitted" },
      { label: "Approved", value: "Approved" },
      { label: "Finalized", value: "Finalized" },
    ],
  },
];

function RRStudentsPage() {
  return (
    <AdminCrudPage
      title="RR Students — Backlog Only Pool"
      description="Repeater & backlog-only candidates (not currently registered for regular semester courses)."
      resource="registrations"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search RR candidates..."
      filters={[
        { key: "branch", label: "Branch", options: BRANCH_NAMES.map((b) => ({ label: b, value: b })) },
        { key: "semester", label: "Semester", options: SEMESTER_NAMES.map((s) => ({ label: s, value: s })) },
      ]}
      customActions={(row) => (
        <Button asChild variant="ghost" size="icon" className="h-8 w-8" title="Review Courses">
          <Link to="/admin/exams/course-registration">
            <Eye className="h-4 w-4 text-primary" />
          </Link>
        </Button>
      )}
    />
  );
}
