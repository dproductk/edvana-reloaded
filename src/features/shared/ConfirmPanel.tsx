import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { SectionCard } from "@/components/common/SectionCard";
import { DetailGrid } from "@/components/common/DetailGrid";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { studentService } from "@/services/student.service";

interface ConfirmPanelProps {
  title: string;
  applicationNo: string;
  term: string;
  program: string;
  semester: string;
  note: string;
}

/** Shared "confirm form" step for exam registration and photocopy flows. */
export function ConfirmPanel({
  title,
  applicationNo,
  term,
  program,
  semester,
  note,
}: ConfirmPanelProps) {
  const [agreed, setAgreed] = useState(false);
  const [confirmedOn, setConfirmedOn] = useState<string | null>(null);

  const confirm = useMutation({
    mutationFn: () => studentService.confirmForm(),
    onSuccess: (res) => {
      setConfirmedOn(res.confirmedOn);
      toast.success("Form confirmed successfully");
    },
    onError: () => toast.error("Could not confirm the form."),
  });

  return (
    <SectionCard title={title} description="Verify the details below before final submission.">
      <DetailGrid
        items={[
          { label: "Application No", value: applicationNo },
          { label: "Term", value: term },
          { label: "Program", value: program },
          { label: "Semester", value: semester },
        ]}
      />

      <div className="mt-6 flex items-start gap-3 rounded-lg border border-warning/40 bg-warning/10 p-4 text-sm">
        <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
        <p className="text-foreground">{note}</p>
      </div>

      {confirmedOn ? (
        <div className="mt-6 flex items-start gap-3 rounded-lg border border-success/30 bg-success/10 p-4 text-sm">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
          <p className="text-foreground">
            Form confirmed on <span className="font-semibold">{confirmedOn}</span>. You can now print
            the form and the receipt cum acknowledgement.
          </p>
        </div>
      ) : (
        <>
          <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm">
            <Checkbox
              checked={agreed}
              onCheckedChange={(v) => setAgreed(v === true)}
              className="mt-0.5"
            />
            <span className="text-foreground">
              I declare that the information furnished above is correct and I accept full
              responsibility for any discrepancy.
            </span>
          </label>
          <Button
            className="mt-6"
            size="lg"
            disabled={!agreed || confirm.isPending}
            onClick={() => confirm.mutate()}
          >
            {confirm.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm form
          </Button>
        </>
      )}
    </SectionCard>
  );
}
