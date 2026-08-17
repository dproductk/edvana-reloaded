import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, AlertTriangle, ShieldCheck, XCircle } from "lucide-react";
import { SectionCard } from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/exams/registration-review")({
  head: () => ({
    meta: [{ title: "Registration Review & Approval — Admin · EDVANA" }],
  }),
  component: RegistrationReviewPage,
});

function RegistrationReviewPage() {
  const checks = [
    { label: "Admission Status", passed: true, detail: "Admitted for Academic Year 2026-27" },
    { label: "Fee Clearance", passed: true, detail: "Full term fee paid (₹9,850)" },
    { label: "Backlog Count Gate", passed: true, detail: "2 backlogs (within 6 limit)" },
    { label: "Credit Requirement", passed: true, detail: "22 total credits selected" },
    { label: "Detention Status", passed: true, detail: "Nil Detention" },
    { label: "Faculty Feedback Gate", passed: true, detail: "Midterm & Endterm feedback submitted" },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Exam Registration Audit & Review</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          System rule evaluation checklist for candidate exam registration approvals.
        </p>
      </div>

      <SectionCard title="Rule Evaluation Checklist">
        <div className="grid gap-4 sm:grid-cols-2">
          {checks.map((c, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 rounded-lg border p-4 ${
                c.passed ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/50 dark:bg-emerald-950/20" : "border-destructive/30 bg-destructive/10"
              }`}
            >
              {c.passed ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-destructive mt-0.5" />
              )}
              <div>
                <span className="font-semibold text-foreground text-sm">{c.label}</span>
                <p className="text-xs text-muted-foreground mt-0.5">{c.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="flex items-center justify-end gap-3 rounded-xl border border-border bg-card p-4">
        <Button variant="outline">Reject Registration</Button>
        <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
          <ShieldCheck className="mr-1.5 h-4 w-4" /> Approve Registration
        </Button>
      </div>
    </div>
  );
}
