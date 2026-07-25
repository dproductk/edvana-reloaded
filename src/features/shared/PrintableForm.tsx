import { useQuery } from "@tanstack/react-query";
import { PrintDocument } from "@/features/shared/PrintDocument";
import { SectionCard } from "@/components/common/SectionCard";
import { DetailGrid } from "@/components/common/DetailGrid";
import { Skeleton } from "@/components/ui/skeleton";
import { studentService } from "@/services/student.service";
import { formatINR } from "@/lib/format";

interface Props {
  variant: "exam" | "photocopy";
  kind: "form" | "receipt";
}

/** Printable exam / photocopy form and receipt-cum-acknowledgement. */
export function PrintableForm({ variant, kind }: Props) {
  const { data: profile } = useQuery({
    queryKey: ["student", "profile"],
    queryFn: () => studentService.getProfile(),
  });
  const { data: status } = useQuery({
    queryKey: ["student", variant === "exam" ? "exam-status" : "photocopy-status"],
    queryFn: () =>
      variant === "exam" ? studentService.getExamStatus() : studentService.getPhotocopyStatus(),
  });
  const { data: subjects } = useQuery({
    queryKey: ["student", "exam-subjects"],
    queryFn: () => studentService.getExamSubjects(),
  });

  if (!profile || !status || !subjects) {
    return (
      <SectionCard title="Loading document">
        <Skeleton className="h-72 w-full" />
      </SectionCard>
    );
  }

  const label =
    variant === "exam"
      ? kind === "form"
        ? "Examination Form"
        : "Exam Form Receipt Cum Acknowledgement"
      : kind === "form"
        ? "Photocopy & Verification Form"
        : "Photocopy & Verification Receipt Cum Acknowledgement";

  return (
    <PrintDocument
      cardTitle={`Print ${label}`}
      documentTitle={label}
      subtitle={`${status.term} · ${status.semester}`}
    >
      <DetailGrid
        columns={2}
        items={[
          { label: "Application No", value: status.applicationNo },
          { label: "Enrollment No", value: profile.enrollmentNo },
          { label: "Student Name", value: profile.fullName },
          { label: "Program", value: profile.program },
          { label: "Fee Paid", value: formatINR(status.feeAmount) },
          { label: "Payment Status", value: status.paid ? "Paid" : "Pending" },
        ]}
      />

      {kind === "form" ? (
        <table className="mt-8 w-full border-collapse text-sm">
          <thead>
            <tr>
              {["Sr.", "Subject Code", "Subject Name", "Type"].map((h) => (
                <th key={h} className="border border-border px-3 py-2 text-left text-xs font-bold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subjects.map((s, i) => (
              <tr key={s.code}>
                <td className="border border-border px-3 py-2">{i + 1}</td>
                <td className="border border-border px-3 py-2 font-mono text-xs">{s.code}</td>
                <td className="border border-border px-3 py-2">{s.name}</td>
                <td className="border border-border px-3 py-2">{s.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="mt-8 rounded-lg border border-border p-5 text-sm">
          <p className="font-semibold text-foreground">Acknowledgement</p>
          <p className="mt-2 text-muted-foreground">
            Received {formatINR(status.feeAmount)} towards {label.replace(" Receipt Cum Acknowledgement", "")} of{" "}
            {profile.fullName} (Enrollment No. {profile.enrollmentNo}) for {status.term}. This is a
            computer-generated acknowledgement and does not require a physical seal.
          </p>
        </div>
      )}
    </PrintDocument>
  );
}
