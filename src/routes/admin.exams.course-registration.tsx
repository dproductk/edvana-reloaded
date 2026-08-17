import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SectionCard } from "@/components/common/SectionCard";
import { DetailGrid } from "@/components/common/DetailGrid";
import { StatusBadge } from "@/components/common/StatusBadge";
import { DataTable, type Column } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { adminService } from "@/services/admin.service";
import type { RegisteredCourse } from "@/types/admin";

export const Route = createFileRoute("/admin/exams/course-registration")({
  head: () => ({
    meta: [{ title: "Course Registration Review — Admin · EDVANA" }],
  }),
  component: CourseRegistrationPage,
});

function CourseRegistrationPage() {
  const { data: registrations = [], isLoading } = useQuery({
    queryKey: ["admin", "registrations"],
    queryFn: () => adminService.getRegistrations(),
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  if (isLoading || registrations.length === 0) {
    return <Skeleton className="h-64 w-full rounded-xl p-6" />;
  }

  const selected = registrations[selectedIndex] ?? registrations[0]!;

  const columns: Column<RegisteredCourse>[] = [
    { header: "Course Code", cell: (r) => <span className="font-mono font-bold">{r.courseCode}</span> },
    { header: "Course Name", cell: (r) => r.courseName },
    { header: "Type", cell: (r) => r.courseType },
    { header: "Semester", cell: (r) => r.semester },
    { header: "Credits", cell: (r) => r.credits },
    {
      header: "Category",
      cell: (r) => (
        <span
          className={`rounded px-2 py-0.5 text-xs font-semibold ${
            r.category === "Regular" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
          }`}
        >
          {r.category}
        </span>
      ),
    },
    { header: "Status", cell: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Course Registration Auditor</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Inspect individual candidate course selections (R vs RR) and credit totals.
        </p>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {registrations.slice(0, 10).map((r, i) => (
          <Button
            key={r.id}
            variant={i === selectedIndex ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedIndex(i)}
            className="shrink-0"
          >
            {r.enrollNo} ({r.registrationType})
          </Button>
        ))}
      </div>

      <SectionCard title={`Candidate Header — ${selected.studentName}`}>
        <DetailGrid
          items={[
            { label: "Enrollment Number", value: selected.enrollNo },
            { label: "Candidate Name", value: selected.studentName },
            { label: "Branch", value: selected.branch },
            { label: "Semester & Div", value: `${selected.semester} (Div ${selected.division})` },
            { label: "Registration Type", value: selected.registrationType },
            { label: "Total Credits", value: `${selected.totalCredits} Credits` },
            { label: "Fee Status", value: selected.feeStatus },
            { label: "Registration Status", value: selected.registrationStatus },
          ]}
        />
      </SectionCard>

      <SectionCard title={`Selected Courses (${selected.courses.length} Courses)`}>
        <DataTable columns={columns} rows={selected.courses} rowKey={(r) => r.courseCode} />
      </SectionCard>
    </div>
  );
}
