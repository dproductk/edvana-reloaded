import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { BRANCH_NAMES, DIVISIONS, SEMESTER_NAMES } from "@/mock/admin";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export const Route = createFileRoute("/admin/master/students")({
  head: () => ({
    meta: [{ title: "Student Master — Admin · EDVANA" }],
  }),
  component: StudentsMasterPage,
});

const columns: Column<AdminRecord>[] = [
  {
    header: "Enrollment No",
    cell: (r) => (
      <Link to="/admin/master/students/$id" params={{ id: r.id }} className="font-mono font-bold text-primary hover:underline">
        {String(r.enrollNo)}
      </Link>
    ),
  },
  { header: "Student Name", cell: (r) => String(r.studentName) },
  { header: "Roll No", cell: (r) => String(r.rollNo) },
  { header: "Branch", cell: (r) => String(r.branch) },
  { header: "Semester", cell: (r) => String(r.semester) },
  { header: "Div / Batch", cell: (r) => `${r.division || "-"} / ${r.batch || "-"}` },
  { header: "Admission", cell: (r) => <StatusBadge status={String(r.admissionStatus)} /> },
  { header: "Fee", cell: (r) => <StatusBadge status={String(r.feeStatus)} /> },
  { header: "Exam Reg", cell: (r) => <StatusBadge status={String(r.registrationStatus)} /> },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  { name: "enrollNo", label: "Enrollment Number", required: true, placeholder: "e.g. 2IT24001" },
  { name: "studentName", label: "Full Name", required: true, placeholder: "LAST FIRST MIDDLE" },
  { name: "rollNo", label: "Roll Number", required: true, placeholder: "e.g. 001" },
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
  {
    name: "division",
    label: "Division",
    type: "select",
    required: true,
    options: DIVISIONS.map((d) => ({ label: `Division ${d}`, value: d })),
  },
  { name: "mobile", label: "Mobile Number", required: true },
  { name: "email", label: "Email Address", required: true },
  {
    name: "admissionStatus",
    label: "Admission Status",
    type: "select",
    required: true,
    defaultValue: "Admitted",
    options: [
      { label: "Eligible", value: "Eligible" },
      { label: "Fee Pending", value: "Fee Pending" },
      { label: "Fee Paid", value: "Fee Paid" },
      { label: "Admitted", value: "Admitted" },
      { label: "Cancelled", value: "Cancelled" },
    ],
  },
];

function StudentsMasterPage() {
  return (
    <AdminCrudPage
      title="Student Master Directory"
      description="View, manage, and inspect complete student profiles, admission states, and academic histories."
      resource="students"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search by enrollment no, name or roll no..."
      filters={[
        { key: "branch", label: "Branch", options: BRANCH_NAMES.map((b) => ({ label: b, value: b })) },
        { key: "semester", label: "Semester", options: SEMESTER_NAMES.map((s) => ({ label: s, value: s })) },
      ]}
      customActions={(row) => (
        <Button asChild variant="ghost" size="icon" className="h-8 w-8" title="View Full Profile">
          <Link to="/admin/master/students/$id" params={{ id: row.id }}>
            <Eye className="h-4 w-4 text-primary" />
          </Link>
        </Button>
      )}
    />
  );
}
