import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { SectionCard } from "@/components/common/SectionCard";
import { DetailGrid } from "@/components/common/DetailGrid";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { studentService } from "@/services/student.service";
import { formatINR } from "@/lib/format";

const SERVICE_FEE: Record<string, number> = {
  Photocopy: 200,
  Verification: 200,
  Revaluation: 400,
};

export function PhotocopyFillForm() {
  const { data: status } = useQuery({
    queryKey: ["student", "photocopy-status"],
    queryFn: () => studentService.getPhotocopyStatus(),
  });
  const { data: subjects } = useQuery({
    queryKey: ["student", "exam-subjects"],
    queryFn: () => studentService.getExamSubjects(),
  });

  const [services, setServices] = useState<string[]>(["Photocopy"]);
  const [picked, setPicked] = useState<string[]>([]);

  const submit = useMutation({
    mutationFn: () => studentService.submitExamForm(picked),
    onSuccess: () => toast.success("Form saved. Proceed to online payment."),
    onError: () => toast.error("Could not save the form."),
  });

  if (!status || !subjects) {
    return (
      <SectionCard title="Fill Photocopy & Verification Form">
        <Skeleton className="h-56 w-full" />
      </SectionCard>
    );
  }

  const theory = subjects.filter((s) => s.type === "Theory");
  const total = picked.length * services.reduce((s, k) => s + (SERVICE_FEE[k] ?? 0), 0);

  const toggle = (list: string[], set: (v: string[]) => void, value: string) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  return (
    <SectionCard
      title="Fill Photocopy & Verification Form"
      description="Choose the service and the subjects you want re-checked."
    >
      <DetailGrid
        items={[
          { label: "Application No", value: status.applicationNo },
          { label: "Term", value: status.term },
          { label: "Semester", value: status.semester },
          { label: "Payable Amount", value: formatINR(total) },
        ]}
      />

      <div className="mt-6">
        <p className="mb-3 text-sm font-semibold text-foreground">Select service(s)</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {Object.keys(SERVICE_FEE).map((s) => (
            <label
              key={s}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm hover:bg-panel"
            >
              <Checkbox
                checked={services.includes(s)}
                onCheckedChange={() => toggle(services, setServices, s)}
              />
              <span>
                {s} <span className="text-muted-foreground">({formatINR(SERVICE_FEE[s])}/subject)</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-panel">
              {["Select", "Subject Code", "Subject Name", "Credits"].map((h) => (
                <th
                  key={h}
                  className="border-b border-border px-4 py-3 text-left text-[12px] font-bold uppercase tracking-wide text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {theory.map((s) => (
              <tr key={s.code} className="odd:bg-background even:bg-panel/40">
                <td className="border-b border-border px-4 py-3">
                  <Checkbox
                    checked={picked.includes(s.code)}
                    onCheckedChange={() => toggle(picked, setPicked, s.code)}
                    aria-label={`Select ${s.name}`}
                  />
                </td>
                <td className="border-b border-border px-4 py-3 font-mono text-xs">{s.code}</td>
                <td className="border-b border-border px-4 py-3 font-medium">{s.name}</td>
                <td className="border-b border-border px-4 py-3">{s.credits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button
        className="mt-6"
        size="lg"
        disabled={picked.length === 0 || services.length === 0 || submit.isPending}
        onClick={() => submit.mutate()}
      >
        {submit.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save form
      </Button>
    </SectionCard>
  );
}
