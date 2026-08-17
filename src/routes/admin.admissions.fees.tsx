import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";

export const Route = createFileRoute("/admin/admissions/fees")({
  head: () => ({
    meta: [{ title: "Admission Fee Status — Admin · EDVANA" }],
  }),
  component: AdmissionFeeStatusPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Enrollment No", cell: (r) => <span className="font-mono font-bold text-foreground">{String(r.enrollNo)}</span> },
  { header: "Student Name", cell: (r) => String(r.studentName) },
  { header: "Applicable Fee", cell: (r) => `₹${Number(r.applicableFee).toLocaleString()}` },
  { header: "Fee Marked", cell: (r) => String(r.feeMarked) },
  { header: "Amount Paid", cell: (r) => <span className="font-semibold text-emerald-600">₹{Number(r.amountPaid).toLocaleString()}</span> },
  { header: "Pending", cell: (r) => <span className="font-semibold text-amber-600">₹{Number(r.amountPending).toLocaleString()}</span> },
  { header: "Payment Status", cell: (r) => <StatusBadge status={String(r.paymentStatus)} /> },
  { header: "Last Pay Date", cell: (r) => String(r.lastPaymentDate || "—") },
  { header: "Reference", cell: (r) => <span className="font-mono text-xs">{String(r.paymentReference || "—")}</span> },
];

const fields: FieldConfig[] = [
  { name: "enrollNo", label: "Enrollment Number", required: true },
  { name: "studentName", label: "Student Name", required: true },
  { name: "applicableFee", label: "Applicable Fee (₹)", type: "number", required: true },
  { name: "amountPaid", label: "Amount Paid (₹)", type: "number", required: true },
  {
    name: "paymentStatus",
    label: "Payment Status",
    type: "select",
    required: true,
    options: [
      { label: "Successful", value: "Successful" },
      { label: "Pending", value: "Pending" },
      { label: "Failed", value: "Failed" },
    ],
  },
];

function AdmissionFeeStatusPage() {
  return (
    <AdminCrudPage
      title="Admission Fee Status"
      description="Track fee allocations, collected amounts, pending balances, and transaction references for candidate admissions."
      resource="admission-fees"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search fee status by enrollment or name..."
    />
  );
}
