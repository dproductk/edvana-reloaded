import { useQuery } from "@tanstack/react-query";
import { ConfirmPanel } from "@/features/shared/ConfirmPanel";
import { SectionCard } from "@/components/common/SectionCard";
import { Skeleton } from "@/components/ui/skeleton";
import { studentService } from "@/services/student.service";

export function PhotocopyConfirmPanel() {
  const { data } = useQuery({
    queryKey: ["student", "photocopy-status"],
    queryFn: () => studentService.getPhotocopyStatus(),
  });

  if (!data) {
    return (
      <SectionCard title="Confirm Form">
        <Skeleton className="h-56 w-full" />
      </SectionCard>
    );
  }

  return (
    <ConfirmPanel
      title="Confirm Photocopy & Verification Form"
      applicationNo={data.applicationNo}
      term={data.term}
      program={data.program}
      semester={data.semester}
      note="Applications once confirmed cannot be withdrawn and the fee paid is non-refundable."
    />
  );
}
