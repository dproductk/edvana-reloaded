import { useEffect, useState } from "react";
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

export function ExamFormFill() {
  const { data: status } = useQuery({
    queryKey: ["student", "exam-status"],
    queryFn: () => studentService.getExamStatus(),
  });
  const { data: subjects } = useQuery({
    queryKey: ["student", "exam-subjects"],
    queryFn: () => studentService.getExamSubjects(),
  });

  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (subjects) setSelected(subjects.filter((s) => s.selected).map((s) => s.code));
  }, [subjects]);

  const submit = useMutation({
    mutationFn: () => studentService.submitExamForm(selected),
    onSuccess: () => toast.success("Exam form saved. Proceed to online payment."),
    onError: () => toast.error("Could not save the exam form."),
  });

  if (!status || !subjects) {
    return (
      <SectionCard title="Fill Exam Form">
        <Skeleton className="h-56 w-full" />
      </SectionCard>
    );
  }

  const toggle = (code: string) =>
    setSelected((s) => (s.includes(code) ? s.filter((c) => c !== code) : [...s, code]));

  const total = subjects.filter((s) => selected.includes(s.code)).length;

  return (
    <SectionCard
      title="Fill Exam Form"
      description="Select the subjects you wish to appear for in the current term."
    >
      <DetailGrid
        items={[
          { label: "Term", value: status.term },
          { label: "Program", value: status.program },
          { label: "Semester", value: status.semester },
          { label: "Exam Fee", value: formatINR(status.feeAmount) },
        ]}
      />

      <div className="mt-6 overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-panel">
              {["Select", "Subject Code", "Subject Name", "Type", "Credits"].map((h) => (
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
            {subjects.map((s) => (
              <tr key={s.code} className="odd:bg-background even:bg-panel/40">
                <td className="border-b border-border px-4 py-3">
                  <Checkbox
                    checked={selected.includes(s.code)}
                    onCheckedChange={() => toggle(s.code)}
                    aria-label={`Select ${s.name}`}
                  />
                </td>
                <td className="border-b border-border px-4 py-3 font-mono text-xs">{s.code}</td>
                <td className="border-b border-border px-4 py-3 font-medium">{s.name}</td>
                <td className="border-b border-border px-4 py-3">{s.type}</td>
                <td className="border-b border-border px-4 py-3">{s.credits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <Button size="lg" disabled={total === 0 || submit.isPending} onClick={() => submit.mutate()}>
          {submit.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save exam form
        </Button>
        <span className="text-sm text-muted-foreground">{total} subject(s) selected</span>
      </div>
    </SectionCard>
  );
}
