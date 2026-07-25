import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreditCard, Loader2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { SectionCard } from "@/components/common/SectionCard";
import { DetailGrid } from "@/components/common/DetailGrid";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { studentService } from "@/services/student.service";
import { formatINR } from "@/lib/format";

interface PaymentPanelProps {
  title: string;
  applicationNo: string;
  term: string;
  amount: number;
}

const MODES = ["UPI", "Net Banking", "Debit Card", "Credit Card"];

/** Shared online-payment panel used by exam form and photocopy/verification flows. */
export function PaymentPanel({ title, applicationNo, term, amount }: PaymentPanelProps) {
  const [mode, setMode] = useState("UPI");
  const [txn, setTxn] = useState<string | null>(null);

  const pay = useMutation({
    mutationFn: () => studentService.payFee(amount),
    onSuccess: (res) => {
      setTxn(res.transactionId);
      toast.success("Payment successful");
    },
    onError: () => toast.error("Payment could not be processed. Please try again."),
  });

  return (
    <SectionCard title={title} description="Complete the fee payment to proceed.">
      <DetailGrid
        items={[
          { label: "Application No", value: applicationNo },
          { label: "Term", value: term },
          { label: "Payable Amount", value: formatINR(amount) },
        ]}
      />

      <div className="mt-6 border-t border-border pt-6">
        <Label className="text-sm font-semibold">Select payment mode</Label>
        <RadioGroup value={mode} onValueChange={setMode} className="mt-3 grid gap-3 sm:grid-cols-2">
          {MODES.map((m) => (
            <label
              key={m}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm transition-colors hover:bg-panel"
            >
              <RadioGroupItem value={m} id={`mode-${m}`} />
              <span>{m}</span>
            </label>
          ))}
        </RadioGroup>
      </div>

      {txn ? (
        <div className="mt-6 flex items-start gap-3 rounded-lg border border-success/30 bg-success/10 p-4 text-sm">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-success" />
          <div>
            <p className="font-semibold text-foreground">Payment received</p>
            <p className="mt-0.5 text-muted-foreground">
              Transaction ID <span className="font-mono">{txn}</span> · {formatINR(amount)} paid via {mode}.
            </p>
          </div>
        </div>
      ) : (
        <Button className="mt-6" size="lg" disabled={pay.isPending} onClick={() => pay.mutate()}>
          {pay.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <CreditCard className="mr-2 h-4 w-4" />
          )}
          Pay {formatINR(amount)}
        </Button>
      )}
    </SectionCard>
  );
}
