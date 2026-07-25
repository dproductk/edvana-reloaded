import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { IdCard, Loader2 } from "lucide-react";
import { SectionCard } from "@/components/common/SectionCard";
import { DetailGrid } from "@/components/common/DetailGrid";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { studentService } from "@/services/student.service";
import { formatINR } from "@/lib/format";

const REASONS = ["Lost", "Damaged", "Stolen", "Name/Details correction"];
const FEE = 150;

export function DuplicateIdForm() {
  const { data: profile } = useQuery({
    queryKey: ["student", "profile"],
    queryFn: () => studentService.getProfile(),
  });
  const [reason, setReason] = useState("");
  const [remarks, setRemarks] = useState("");
  const [requestNo, setRequestNo] = useState<string | null>(null);

  const submit = useMutation({
    mutationFn: () => studentService.requestDuplicateId(),
    onSuccess: (r) => {
      setRequestNo(r.requestNo);
      toast.success("Duplicate ID card request submitted");
    },
    onError: () => toast.error("Could not submit the request."),
  });

  if (!profile) {
    return (
      <SectionCard title="Duplicate ID Card">
        <Skeleton className="h-40 w-full" />
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Duplicate ID Card"
      description="Apply for a replacement identity card. Fee is payable at the accounts section."
    >
      <DetailGrid
        items={[
          { label: "Enrollment No", value: profile.enrollmentNo },
          { label: "Student Name", value: profile.fullName },
          { label: "Program", value: profile.program },
          { label: "Applicable Fee", value: formatINR(FEE) },
        ]}
      />

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Reason for duplicate card</Label>
          <Select value={reason} onValueChange={setReason}>
            <SelectTrigger>
              <SelectValue placeholder="Select reason" />
            </SelectTrigger>
            <SelectContent>
              {REASONS.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="dup-remarks">Remarks</Label>
          <Textarea
            id="dup-remarks"
            rows={3}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Briefly describe the circumstances"
          />
        </div>
      </div>

      {requestNo ? (
        <div className="mt-6 rounded-lg border border-success/30 bg-success/10 p-4 text-sm text-foreground">
          Request submitted. Your request number is <span className="font-semibold">{requestNo}</span>.
        </div>
      ) : (
        <Button
          className="mt-6"
          size="lg"
          disabled={!reason || submit.isPending}
          onClick={() => submit.mutate()}
        >
          {submit.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <IdCard className="mr-2 h-4 w-4" />
          )}
          Submit request
        </Button>
      )}
    </SectionCard>
  );
}
