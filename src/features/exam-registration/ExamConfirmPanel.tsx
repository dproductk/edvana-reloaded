import { useQuery } from "@tanstack/react-query";
import { ConfirmPanel } from "@/features/shared/ConfirmPanel";
import { SectionCard } from "@/components/common/SectionCard";
import { Skeleton } from "@/components/ui/skeleton";
import { studentService } from "@/services/student.service";

export function ExamConfirmPanel() {
  const { data } = useQuery({
    queryKey: ["student", "exam-status"],
    queryFn: () => studentService.getExamStatus(),
  });

  if (!data) {
    return (
      <SectionCard title="Confirm Exam Form">
        <Skeleton className="h-56 w-full" />
      </SectionCard>
    );
  }

  return (
    <ConfirmPanel
      title="Confirm Exam Form"
      applicationNo={data.applicationNo}
      term={data.term}
      program={data.program}
      semester={data.semester}
      note="Once confirmed, the examination form cannot be modified. Please verify the selected subjects before proceeding."
    />
  );
}
