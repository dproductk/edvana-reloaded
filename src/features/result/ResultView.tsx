import { useQuery } from "@tanstack/react-query";
import { SectionCard } from "@/components/common/SectionCard";
import { DataTable, type Column } from "@/components/common/DataTable";
import { StatusBadge, toneForStatus } from "@/components/common/StatusBadge";
import { DetailGrid } from "@/components/common/DetailGrid";
import { Skeleton } from "@/components/ui/skeleton";
import { studentService } from "@/services/student.service";
import type { ResultSubject } from "@/types/student-modules";

interface ResultViewProps {
  scope: "current" | "fy" | "sy";
  title: string;
}

export function ResultView({ scope, title }: ResultViewProps) {
  const { data } = useQuery({
    queryKey: ["student", "result", scope],
    queryFn: () => studentService.getResult(scope),
  });

  if (!data) {
    return (
      <SectionCard title={title}>
        <Skeleton className="h-56 w-full" />
      </SectionCard>
    );
  }

  const columns: Column<ResultSubject>[] = [
    { header: "Code", cell: (r) => <span className="font-mono text-xs">{r.code}</span> },
    { header: "Subject", cell: (r) => <span className="font-medium">{r.name}</span> },
    { header: "Credits", cell: (r) => r.credits, align: "center" },
    { header: "Theory", cell: (r) => r.theoryMarks ?? "—", align: "center" },
    { header: "Practical", cell: (r) => r.practicalMarks ?? "—", align: "center" },
    { header: "Total", cell: (r) => r.total, align: "center" },
    { header: "Grade", cell: (r) => <span className="font-semibold">{r.grade}</span>, align: "center" },
    {
      header: "Result",
      cell: (r) => <StatusBadge label={r.result} tone={toneForStatus(r.result)} />,
      align: "center",
    },
  ];

  return (
    <div className="space-y-6">
      <SectionCard title={title} description={`${data.term} · ${data.semester}`}>
        <DetailGrid
          items={[
            { label: "SGPA", value: data.sgpa.toFixed(2) },
            { label: "CGPA", value: data.cgpa.toFixed(2) },
            { label: "Total Credits", value: String(data.totalCredits) },
            { label: "Overall Status", value: data.status },
          ]}
        />
      </SectionCard>

      <SectionCard title="Subject-wise Marks">
        <DataTable columns={columns} rows={data.subjects} rowKey={(r) => r.code} />
      </SectionCard>
    </div>
  );
}
