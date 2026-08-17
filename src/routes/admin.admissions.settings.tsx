import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";
import { ACADEMIC_YEARS } from "@/mock/admin";

export const Route = createFileRoute("/admin/admissions/settings")({
  head: () => ({
    meta: [{ title: "Admission Settings — Admin · EDVANA" }],
  }),
  component: AdmissionSettingsPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Academic Year", cell: (r) => <span className="font-bold text-foreground">{String(r.academicYear)}</span> },
  { header: "Admission Window", cell: (r) => `${r.admissionStartDate} to ${r.admissionEndDate}` },
  { header: "Late Window", cell: (r) => `${r.lateAdmissionStartDate} to ${r.lateAdmissionEndDate}` },
  { header: "Fee Required", cell: (r) => String(r.feeRequired) },
  { header: "Auto Admit", cell: (r) => String(r.autoAdmissionAfterPayment) },
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
  { name: "admissionStartDate", label: "Admission Start Date", type: "date", required: true },
  { name: "admissionEndDate", label: "Admission End Date", type: "date", required: true },
  { name: "lateAdmissionStartDate", label: "Late Admission Start Date", type: "date", required: true },
  { name: "lateAdmissionEndDate", label: "Late Admission End Date", type: "date", required: true },
  {
    name: "feeRequired",
    label: "Fee Required",
    type: "select",
    required: true,
    defaultValue: "Yes",
    options: [
      { label: "Yes", value: "Yes" },
      { label: "No", value: "No" },
    ],
  },
  {
    name: "autoAdmissionAfterPayment",
    label: "Auto Admission After Fee Payment",
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

function AdmissionSettingsPage() {
  return (
    <AdminCrudPage
      title="Admission Cycle Settings"
      description="Configure admission windows, late fee grace periods, and auto-admission triggers after fee payment."
      resource="admission-settings"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search admission settings..."
    />
  );
}
