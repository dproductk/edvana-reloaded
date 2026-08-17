import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ShieldCheck, Lock } from "lucide-react";
import { SectionCard } from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/results/finalization")({
  head: () => ({
    meta: [{ title: "Result Finalization — Admin · EDVANA" }],
  }),
  component: ResultFinalizationPage,
});

function ResultFinalizationPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Result Finalization & Declaration</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Freeze examination scores, generate marksheets, and update student academic history.
        </p>
      </div>

      <SectionCard title="Pre-Declaration Audit Checklist">
        <div className="space-y-3">
          {[
            "Result Processing: 1,104 candidates calculated",
            "Verification Desk: 0 critical errors remaining (8 warnings reviewed)",
            "Course-Scheme Mappings: Validated against K-2024 scheme",
            "Backlog Master: Synchronized with 236 active backlog updates",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-panel p-3 text-sm">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <span className="font-semibold text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="flex items-center justify-between rounded-xl border border-border bg-card p-6 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-foreground">Finalize SUMMER 2026 Results</h3>
          <p className="text-xs text-muted-foreground">This action is irreversible and locks marks permanently.</p>
        </div>
        <Button
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
          onClick={() => toast.success("SUMMER 2026 Examination Results Finalized & Published!")}
        >
          <Lock className="mr-1.5 h-4 w-4" /> Finalize & Publish Results
        </Button>
      </div>
    </div>
  );
}
