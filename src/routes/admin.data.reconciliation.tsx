import { createFileRoute } from "@tanstack/react-router";
import { SectionCard } from "@/components/common/SectionCard";
import { DetailGrid } from "@/components/common/DetailGrid";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/data/reconciliation")({
  head: () => ({
    meta: [{ title: "Validation & Reconciliation — Admin · EDVANA" }],
  }),
  component: DataReconciliationPage,
});

function DataReconciliationPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Data Validation & Master Reconciliation</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Audit database integrity, orphaned foreign keys, duplicate enrollment numbers, and course scheme mismatches.
        </p>
      </div>

      <SectionCard title="Master Integrity Health Checks">
        <div className="space-y-3">
          {[
            { label: "Student Master Integrity", status: "1,482 records verified — 0 duplicates", ok: true },
            { label: "Course-Scheme Mapping Integrity", status: "All active courses mapped to valid K-2024 / K-2021 schemes", ok: true },
            { label: "Fee Ledger Reconciliation", status: "1,268 payment entries matched against student admission fee heads", ok: true },
            { label: "Registration Backlog Integrity", status: "236 backlog candidates checked against historical attempt ledgers", ok: true },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-panel p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <div>
                  <span className="font-semibold text-sm text-foreground">{item.label}</span>
                  <p className="text-xs text-muted-foreground">{item.status}</p>
                </div>
              </div>
              <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Passed
              </span>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <Button variant="outline" onClick={() => toast.success("Ran full master data reconciliation audit.")}>
          Run Full Data Integrity Audit
        </Button>
      </div>
    </div>
  );
}
