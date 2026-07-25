import { useQuery } from "@tanstack/react-query";
import { PaymentPanel } from "@/features/shared/PaymentPanel";
import { SectionCard } from "@/components/common/SectionCard";
import { Skeleton } from "@/components/ui/skeleton";
import { studentService } from "@/services/student.service";

export function ExamPaymentPanel() {
  const { data } = useQuery({
    queryKey: ["student", "exam-status"],
    queryFn: () => studentService.getExamStatus(),
  });

  if (!data) {
    return (
      <SectionCard title="Online Payment">
        <Skeleton className="h-56 w-full" />
      </SectionCard>
    );
  }

  return (
    <PaymentPanel
      title="Exam Form — Online Payment"
      applicationNo={data.applicationNo}
      term={data.term}
      amount={data.feeAmount}
    />
  );
}
