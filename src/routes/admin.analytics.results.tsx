import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SectionCard } from "@/components/common/SectionCard";
import { DataTable, type Column } from "@/components/common/DataTable";
import { Skeleton } from "@/components/ui/skeleton";
import { adminService } from "@/services/admin.service";

export const Route = createFileRoute("/admin/analytics/results")({
  head: () => ({
    meta: [{ title: "Result Analytics & Performance — Admin · EDVANA" }],
  }),
  component: ResultAnalyticsPage,
});

function ResultAnalyticsPage() {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ["admin", "result-analysis"],
    queryFn: () => adminService.getResultAnalysis(),
  });

  if (isLoading || !analytics) {
    return <Skeleton className="h-64 w-full rounded-xl p-6" />;
  }

  const courseColumns: Column<(typeof analytics.courseWise)[0]>[] = [
    { header: "Course Code", cell: (r) => <span className="font-mono font-bold">{String(r.courseCode)}</span> },
    { header: "Course Name", cell: (r) => String(r.courseName) },
    { header: "Appeared", cell: (r) => String(r.appeared) },
    { header: "Passed", cell: (r) => <span className="font-bold text-emerald-600">{String(r.passed)}</span> },
    { header: "Failed", cell: (r) => <span className="font-semibold text-destructive">{String(r.failed)}</span> },
    { header: "Pass %", cell: (r) => <span className="font-bold text-primary">{String(r.passPercent)}%</span> },
    { header: "Avg Marks", cell: (r) => String(r.average) },
    { header: "Highest", cell: (r) => String(r.highest) },
  ];

  const branchColumns: Column<(typeof analytics.branchWise)[0]>[] = [
    { header: "Branch", cell: (r) => <span className="font-semibold">{String(r.branch)}</span> },
    { header: "Appeared", cell: (r) => String(r.appeared) },
    { header: "Passed", cell: (r) => <span className="font-bold text-emerald-600">{String(r.passed)}</span> },
    { header: "Failed", cell: (r) => <span className="font-semibold text-destructive">{String(r.failed)}</span> },
    { header: "Pass %", cell: (r) => <span className="font-bold text-primary">{String(r.passPercent)}%</span> },
  ];

  const gradeColumns: Column<(typeof analytics.gradeDistribution)[0]>[] = [
    { header: "Grade", cell: (r) => <span className="font-bold text-primary">{r.grade}</span> },
    { header: "Student Count", cell: (r) => r.students.toLocaleString() },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Result Analytics & Grade Distribution</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Academic performance metrics, course pass rates, branch comparisons, and grade breakdown.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
        {analytics.kpis.map((kpi, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-3 text-center shadow-sm">
            <span className="text-[10px] text-muted-foreground uppercase font-semibold">{kpi.label}</span>
            <p className="mt-1 text-xl font-bold text-foreground">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Course-wise Analysis */}
      <SectionCard title="Course-wise Performance Breakdown">
        <DataTable columns={courseColumns} rows={analytics.courseWise} rowKey={(r) => r.id} />
      </SectionCard>

      {/* Branch-wise & Grade Distribution */}
      <div className="grid gap-6 md:grid-cols-2">
        <SectionCard title="Branch Comparison">
          <DataTable columns={branchColumns} rows={analytics.branchWise} rowKey={(r) => r.id} />
        </SectionCard>

        <SectionCard title="Grade Distribution Matrix">
          <DataTable columns={gradeColumns} rows={analytics.gradeDistribution} rowKey={(r) => r.id} />
        </SectionCard>
      </div>
    </div>
  );
}
