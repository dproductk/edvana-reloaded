import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Upload, CheckCircle2, AlertTriangle, FileSpreadsheet, ArrowRight, ArrowLeft } from "lucide-react";
import { SectionCard } from "@/components/common/SectionCard";
import { DataTable, type Column } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { adminService } from "@/services/admin.service";
import { EXAM_SESSIONS } from "@/mock/admin";
import type { ColumnMapping, ImportValidationIssue } from "@/types/admin";

export const Route = createFileRoute("/admin/results/import")({
  head: () => ({
    meta: [{ title: "Result Import Wizard — Admin · EDVANA" }],
  }),
  component: ResultImportWizardPage,
});

function ResultImportWizardPage() {
  const [step, setStep] = useState(1);
  const [session, setSession] = useState("SUMMER 2026");
  const [fileSelected, setFileSelected] = useState(false);

  const { data: mappings = [] } = useQuery<ColumnMapping[]>({
    queryKey: ["admin", "import-mapping"],
    queryFn: () => adminService.getImportMapping(),
  });

  const { data: issues = [] } = useQuery<ImportValidationIssue[]>({
    queryKey: ["admin", "import-issues"],
    queryFn: () => adminService.getImportIssues(),
  });

  const mappingColumns: Column<ColumnMapping>[] = [
    { header: "Source Excel Column", cell: (r) => <span className="font-mono font-bold text-foreground">{r.sourceColumn}</span> },
    { header: "Destination Field", cell: (r) => <span className="font-semibold text-primary">{r.destinationField || "—"}</span> },
    { header: "Sample Value", cell: (r) => <span className="font-mono text-xs">{r.sampleValue}</span> },
    {
      header: "Status",
      cell: (r) => (
        <span className={`rounded px-2 py-0.5 text-xs font-semibold ${r.status === "Mapped" ? "bg-emerald-100 text-emerald-800" : "bg-muted text-muted-foreground"}`}>
          {r.status}
        </span>
      ),
    },
  ];

  const issueColumns: Column<ImportValidationIssue>[] = [
    { header: "Row #", cell: (r) => `Row ${r.row}` },
    { header: "Field", cell: (r) => <span className="font-mono font-bold">{r.field}</span> },
    { header: "Validation Issue Message", cell: (r) => r.message },
    {
      header: "Severity",
      cell: (r) => (
        <span className={`rounded px-2 py-0.5 text-xs font-semibold ${r.severity === "Error" ? "bg-destructive/15 text-destructive" : "bg-amber-100 text-amber-800"}`}>
          {r.severity}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Result & Marks Import Wizard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Import external marks sheets, course evaluation results, or historical backlog ledgers into the MIS.
        </p>
      </div>

      {/* Wizard Step Indicator */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        {[
          { step: 1, title: "1. Select Session & File" },
          { step: 2, title: "2. Column Mapping" },
          { step: 3, title: "3. Validation & Preview" },
          { step: 4, title: "4. Execution Summary" },
        ].map((s) => (
          <div key={s.step} className={`flex items-center gap-2 text-sm font-semibold ${step === s.step ? "text-primary" : step > s.step ? "text-emerald-600" : "text-muted-foreground"}`}>
            <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${step === s.step ? "bg-primary text-primary-foreground" : step > s.step ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"}`}>
              {s.step}
            </span>
            <span>{s.title}</span>
          </div>
        ))}
      </div>

      {/* Step 1: Select Session & File */}
      {step === 1 && (
        <SectionCard title="Upload Source File">
          <div className="space-y-4 max-w-lg">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold">Target Examination Session</label>
              <Select value={session} onValueChange={setSession}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {EXAM_SESSIONS.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div
              className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
                fileSelected ? "border-emerald-500 bg-emerald-50/50" : "border-border hover:border-primary/50"
              }`}
              onClick={() => setFileSelected(true)}
            >
              <FileSpreadsheet className={`h-10 w-10 mb-2 ${fileSelected ? "text-emerald-600" : "text-muted-foreground"}`} />
              <p className="text-sm font-semibold text-foreground">
                {fileSelected ? "Result_Summer2026_Final.xlsx selected" : "Click to select CSV / XLS / XLSX result file"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Maximum file size: 25 MB</p>
            </div>

            <Button disabled={!fileSelected} onClick={() => setStep(2)} className="w-full">
              Proceed to Column Mapping <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
        </SectionCard>
      )}

      {/* Step 2: Column Mapping */}
      {step === 2 && (
        <div className="space-y-4">
          <SectionCard title="Auto-Detected Column Mapping">
            <DataTable columns={mappingColumns} rows={mappings} rowKey={(r) => r.sourceColumn} />
          </SectionCard>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}><ArrowLeft className="mr-1.5 h-4 w-4" /> Back</Button>
            <Button onClick={() => setStep(3)}>Validate & Preview Data <ArrowRight className="ml-1.5 h-4 w-4" /></Button>
          </div>
        </div>
      )}

      {/* Step 3: Validation & Preview */}
      {step === 3 && (
        <div className="space-y-4">
          <SectionCard title="Pre-Import Validation Results">
            <DataTable columns={issueColumns} rows={issues} rowKey={(r, i) => `${r.row}-${i}`} />
          </SectionCard>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)}><ArrowLeft className="mr-1.5 h-4 w-4" /> Back</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => {
              toast.success("Result dataset imported into staging table!");
              setStep(4);
            }}>
              Confirm & Execute Import <CheckCircle2 className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Summary */}
      {step === 4 && (
        <SectionCard title="Import Execution Completed">
          <div className="space-y-4 text-center py-6">
            <CheckCircle2 className="h-16 w-16 text-emerald-600 mx-auto" />
            <h2 className="text-xl font-bold text-foreground">940 Records Successfully Imported</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Result records for {session} have been populated into the staging & processing ledgers.
            </p>
            <Button onClick={() => setStep(1)} variant="outline">Import Another File</Button>
          </div>
        </SectionCard>
      )}
    </div>
  );
}
