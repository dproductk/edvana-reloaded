import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Users,
  GraduationCap,
  ClipboardCheck,
  IndianRupee,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle2,
  Clock,
  PlusCircle,
  Upload,
  BarChart2,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { SectionCard } from "@/components/common/SectionCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { adminService } from "@/services/admin.service";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — EDVANA · GP Kolhapur" },
      { name: "description", content: "System management, configuration, monitoring and analytics dashboard." },
    ],
  }),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const { data: db, isLoading } = useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: () => adminService.getDashboard(),
  });

  if (isLoading || !db) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-28 w-full rounded-xl" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Top Banner */}
      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-100">
              <span>Academic Year {db.academicYear}</span>
              <span>•</span>
              <span>{db.term}</span>
              <span>•</span>
              <span className="rounded bg-white/20 px-2 py-0.5">{db.examSession}</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              System Control & Operations Center
            </h1>
            <p className="mt-1 text-xs text-blue-100/90 sm:text-sm">
              Government Polytechnic Kolhapur — Centralized MIS Administration Panel
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm" className="bg-white text-blue-700 hover:bg-blue-50 shadow">
              <Link to="/admin/academic/years">
                <PlusCircle className="mr-1.5 h-4 w-4" /> Academic Setup
              </Link>
            </Button>
            <Button asChild size="sm" variant="secondary" className="bg-blue-800 text-white hover:bg-blue-900 border border-white/20">
              <Link to="/admin/data/import">
                <Upload className="mr-1.5 h-4 w-4" /> Import Data
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {db.kpis.map((kpi, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md"
          >
            <p className="text-xs font-medium text-muted-foreground">{kpi.label}</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-foreground">{kpi.value.toLocaleString()}</span>
              {kpi.hint && <span className="text-[10px] text-muted-foreground">{kpi.hint}</span>}
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-primary/20 group-hover:bg-primary transition-colors" />
          </div>
        ))}
      </div>

      {/* Overview Sections Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Admission Overview */}
        <SectionCard title="Admission Lifecycle">
          <div className="space-y-3">
            {db.admission.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-semibold text-foreground">{item.value.toLocaleString()}</span>
              </div>
            ))}
            <div className="pt-3 border-t border-border">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link to="/admin/admissions/eligible">
                  Manage Admissions <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </SectionCard>

        {/* Exam Registration Overview */}
        <SectionCard title="Exam Registration">
          <div className="space-y-3">
            {db.registration.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-semibold text-foreground">{item.value.toLocaleString()}</span>
              </div>
            ))}
            <div className="pt-3 border-t border-border">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link to="/admin/exams/course-registration">
                  Review Registrations <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </SectionCard>

        {/* Result Processing Overview */}
        <SectionCard title="Result Processing">
          <div className="space-y-3">
            {db.result.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-semibold text-foreground">{item.value.toLocaleString()}</span>
              </div>
            ))}
            <div className="pt-3 border-t border-border">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link to="/admin/results/processing">
                  Process Results <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Quick Action Hub */}
      <SectionCard title="Operational Shortcuts">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {[
            { label: "Academic Years", icon: GraduationCap, to: "/admin/academic/years" },
            { label: "Course Schemes", icon: FileSpreadsheet, to: "/admin/academic/schemes" },
            { label: "Subjects / Courses", icon: GraduationCap, to: "/admin/academic/courses" },
            { label: "Student Master", icon: Users, to: "/admin/master/students" },
            { label: "Faculty Master", icon: Users, to: "/admin/master/faculty" },
            { label: "Admission Control", icon: ClipboardCheck, to: "/admin/admissions/settings" },
            { label: "Fee Structures", icon: IndianRupee, to: "/admin/fees/structures" },
            { label: "Exam Sessions", icon: Clock, to: "/admin/exams/sessions" },
            { label: "Timetable View", icon: CalendarIcon, to: "/admin/exams/timetable" },
            { label: "Result Import", icon: Upload, to: "/admin/results/import" },
            { label: "Result Analytics", icon: BarChart2, to: "/admin/analytics/results" },
            { label: "User Roles", icon: ShieldCheckIcon, to: "/admin/users/roles" },
          ].map((action, i) => {
            const Icon = action.icon;
            return (
              <Link
                key={i}
                to={action.to}
                className="flex flex-col items-center justify-center rounded-lg border border-border bg-panel p-4 text-center transition-all hover:bg-accent hover:border-primary/50"
              >
                <Icon className="h-5 w-5 text-primary mb-2" />
                <span className="text-xs font-medium text-foreground">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return <Clock {...props} />;
}

function ShieldCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return <CheckCircle2 {...props} />;
}
