import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SectionCard } from "@/components/common/SectionCard";
import { DetailGrid } from "@/components/common/DetailGrid";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminService } from "@/services/admin.service";
import { ACADEMIC_YEARS } from "@/mock/admin";

export const Route = createFileRoute("/admin/fees/reconciliation")({
  head: () => ({
    meta: [{ title: "Payment Reconciliation — Admin · EDVANA" }],
  }),
  component: PaymentReconciliationPage,
});

function PaymentReconciliationPage() {
  const [academicYear, setAcademicYear] = useState("2026-27");
  const [paymentType, setPaymentType] = useState("Admission Fee");
  const [from, setFrom] = useState("2026-07-01");
  const [to, setTo] = useState("2026-08-15");

  const { data: rec, isLoading } = useQuery({
    queryKey: ["admin", "reconciliation", academicYear, paymentType, from, to],
    queryFn: () => adminService.getReconciliation({ academicYear, paymentType, from, to }),
  });

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Payment Reconciliation Engine</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Audit gateway collections against student fee ledger records.
        </p>
      </div>

      <SectionCard title="Filter Criteria">
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="space-y-1">
            <Label className="text-xs">Academic Year</Label>
            <Select value={academicYear} onValueChange={setAcademicYear}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {ACADEMIC_YEARS.map((y) => (
                  <SelectItem key={y} value={y}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Payment Type</Label>
            <Select value={paymentType} onValueChange={setPaymentType}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Admission Fee">Admission Fee</SelectItem>
                <SelectItem value="Examination Fee">Examination Fee</SelectItem>
                <SelectItem value="Duplicate ID Card Fee">Duplicate ID Card Fee</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">From Date</Label>
            <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">To Date</Label>
            <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
        </div>
      </SectionCard>

      {rec && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <span className="text-xs text-muted-foreground">Expected Amount</span>
              <p className="mt-1 text-2xl font-bold text-foreground">₹{rec.expected.toLocaleString()}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <span className="text-xs text-muted-foreground">Gateway Received</span>
              <p className="mt-1 text-2xl font-bold text-emerald-600">₹{rec.received.toLocaleString()}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <span className="text-xs text-muted-foreground">Variance</span>
              <p className="mt-1 text-2xl font-bold text-amber-600">₹{rec.variance.toLocaleString()}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <span className="text-xs text-muted-foreground">Unmatched Transactions</span>
              <p className="mt-1 text-2xl font-bold text-destructive">{rec.unmatched}</p>
            </div>
          </div>

          <SectionCard title="Reconciliation Summary">
            <DetailGrid
              items={[
                { label: "Matched Transactions", value: `${rec.matched.toLocaleString()} records` },
                { label: "Unmatched / Exception Rows", value: `${rec.unmatched} records` },
                { label: "Gateway Status", value: "Reconciled with 99.5% accuracy" },
                { label: "Audit Log Reference", value: "AUD-REC-20260813-09" },
              ]}
            />
          </SectionCard>
        </>
      )}
    </div>
  );
}
