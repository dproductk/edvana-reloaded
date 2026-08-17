import { createFileRoute } from "@tanstack/react-router";
import { AdminCrudPage, type FieldConfig } from "@/components/common/AdminCrudPage";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Column } from "@/components/common/DataTable";
import type { AdminRecord } from "@/types/admin";

export const Route = createFileRoute("/admin/fees/payments")({
  head: () => ({
    meta: [{ title: "Payment Monitoring — Admin · EDVANA" }],
  }),
  component: PaymentMonitoringPage,
});

const columns: Column<AdminRecord>[] = [
  { header: "Transaction ID", cell: (r) => <span className="font-mono font-bold text-foreground">{String(r.transactionId)}</span> },
  { header: "Enrollment No", cell: (r) => <span className="font-mono text-xs">{String(r.enrollNo)}</span> },
  { header: "Student Name", cell: (r) => String(r.studentName) },
  { header: "Payment Type", cell: (r) => String(r.paymentType) },
  { header: "Amount", cell: (r) => <span className="font-semibold text-emerald-600">₹{Number(r.amount).toLocaleString()}</span> },
  { header: "Method", cell: (r) => String(r.paymentMethod) },
  { header: "Payment Date", cell: (r) => String(r.paymentDate) },
  { header: "Reference", cell: (r) => <span className="font-mono text-xs text-muted-foreground">{String(r.referenceId)}</span> },
  { header: "Status", cell: (r) => <StatusBadge status={String(r.status)} /> },
];

const fields: FieldConfig[] = [
  { name: "transactionId", label: "Transaction ID", required: true },
  { name: "enrollNo", label: "Enrollment Number", required: true },
  { name: "studentName", label: "Student Name", required: true },
  { name: "paymentType", label: "Payment Type", required: true },
  { name: "amount", label: "Amount (₹)", type: "number", required: true },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Successful", value: "Successful" },
      { label: "Pending", value: "Pending" },
      { label: "Failed", value: "Failed" },
      { label: "Refunded", value: "Refunded" },
    ],
  },
];

function PaymentMonitoringPage() {
  return (
    <AdminCrudPage
      title="Payment Monitoring Hub"
      description="Centralized audit table for admission, exam, and service fee transactions."
      resource="payments"
      columns={columns}
      fields={fields}
      searchPlaceholder="Search by transaction ID, enrollment or reference..."
      filters={[
        {
          key: "status",
          label: "Status",
          options: [
            { label: "Successful", value: "Successful" },
            { label: "Pending", value: "Pending" },
            { label: "Failed", value: "Failed" },
          ],
        },
      ]}
    />
  );
}
