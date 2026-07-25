import { useQuery } from "@tanstack/react-query";
import { SectionCard } from "@/components/common/SectionCard";
import { DataTable, type Column } from "@/components/common/DataTable";
import { StatusBadge, toneForStatus } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { studentService } from "@/services/student.service";
import type { OnlineExamRow } from "@/types/student-modules";

export function OnlineExamList() {
  const { data } = useQuery({
    queryKey: ["student", "online-exams"],
    queryFn: () => studentService.getOnlineExams(),
  });

  const columns: Column<OnlineExamRow>[] = [
    { header: "#", cell: (_r, i) => i + 1, className: "w-12" },
    { header: "Subject", cell: (r) => <span className="font-medium">{r.subject}</span> },
    { header: "Date", cell: (r) => r.date },
    { header: "Time", cell: (r) => r.time },
    { header: "Duration", cell: (r) => `${r.durationMin} min`, align: "center" },
    {
      header: "Status",
      cell: (r) => <StatusBadge label={r.status} tone={toneForStatus(r.status)} />,
    },
    {
      header: "Action",
      cell: (r) => (
        <Button size="sm" variant={r.status === "Live" ? "default" : "outline"} disabled={r.status !== "Live"}>
          {r.status === "Completed" ? "View" : "Start exam"}
        </Button>
      ),
      align: "right",
    },
  ];

  if (!data) {
    return (
      <SectionCard title="Online Exam">
        <Skeleton className="h-40 w-full" />
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Online Exam" description="Scheduled online examinations for the current term.">
      <DataTable columns={columns} rows={data} rowKey={(r) => r.id} />
    </SectionCard>
  );
}
