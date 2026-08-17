import { createFileRoute } from "@tanstack/react-router";
import { SectionCard } from "@/components/common/SectionCard";
import { DetailGrid } from "@/components/common/DetailGrid";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Database, Layers } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/data/migration")({
  head: () => ({
    meta: [{ title: "Government Admission Sheet ETL — Admin · EDVANA" }],
  }),
  component: DataMigrationPage,
});

function DataMigrationPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Government Admission Sheet ETL Pipeline</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Staging, normalization, and credential auto-provisioning pipeline for DTE Maharashtra Excel sheets (~58 columns).
        </p>
      </div>

      <SectionCard title="ETL Pipeline Execution Steps">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { step: "1. Staging Table", desc: "Raw columns imported verbatim into staging_admission table for auditability.", icon: Database },
            { step: "2. Data Normalization", desc: "Splits birthdate/year columns into DATE, resolves DSE lateral entry flags.", icon: Layers },
            { step: "3. Entity Population", desc: "ETL into Student, StudentAddress, StudentGuardian, and Document tables.", icon: CheckCircle2 },
            { step: "4. Login Provisioning", desc: "Auto-generates student accounts (username = password = enrollment no).", icon: ArrowRight },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="rounded-xl border border-border bg-panel p-4 space-y-2">
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="font-bold text-sm text-foreground">{item.step}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard title="Known Column Transformations">
        <DetailGrid
          items={[
            { label: "den_no", value: "Maps to dteApplicationId" },
            { label: "enroll_no", value: "Maps to Student Master enrollNo" },
            { label: "birthdate + birthmonth + birthyear", value: "Normalized into single DATE field (YYYY-MM-DD)" },
            { label: "caste / reserve", value: "Mapped to Category lookup enums for scholarship reporting" },
            { label: "DSE Flag", value: "Flagged for Direct Second Year subject exemptions" },
            { label: "Auto-Provisioning Rule", value: "First-login forced password change required" },
          ]}
        />
      </SectionCard>

      <div className="flex justify-end">
        <Button className="bg-primary text-primary-foreground" onClick={() => toast.success("Triggered DTE Admission Sheet ETL Pipeline...")}>
          Trigger Admission Migration Pipeline
        </Button>
      </div>
    </div>
  );
}
