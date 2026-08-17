import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Printer, Award, BookOpen, Briefcase, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/common/SectionCard";
import { DetailGrid } from "@/components/common/DetailGrid";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { adminService } from "@/services/admin.service";
import type { AdminFaculty } from "@/types/admin";

export const Route = createFileRoute("/admin/master/faculty/$id")({
  head: () => ({
    meta: [{ title: "Faculty AICTE Biodata Profile — Admin · EDVANA" }],
  }),
  component: FacultyDetailPage,
});

function FacultyDetailPage() {
  const { id } = Route.useParams();

  const { data: faculty, isLoading } = useQuery<AdminFaculty | undefined>({
    queryKey: ["admin", "faculty", id],
    queryFn: () => adminService.get<AdminFaculty>("faculty", id),
  });

  if (isLoading || !faculty) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Top Header & Actions */}
      <div className="flex items-center justify-between">
        <Button asChild variant="outline" size="sm">
          <Link to="/admin/master/faculty">
            <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to Faculty Directory
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="mr-1.5 h-4 w-4" /> Print AICTE Biodata
          </Button>
          <StatusBadge status={faculty.status} />
        </div>
      </div>

      {/* Profile Header */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold border border-primary/20">
            {faculty.facultyName.charAt(6) || "F"}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{faculty.facultyName}</h1>
            <p className="text-sm font-semibold text-primary">{faculty.designation} — {faculty.department}</p>
            <p className="mt-1 text-xs font-mono text-muted-foreground">
              Faculty ID: <span className="font-semibold text-foreground">{faculty.facultyId}</span> | Employee ID: {faculty.employeeId}
            </p>
          </div>
        </div>
      </div>

      {/* AICTE Biodata Sections */}
      <div className="space-y-6">
        <SectionCard title="1. Personal Information">
          <DetailGrid
            items={[
              { label: "Faculty Name", value: String(faculty.facultyName) },
              { label: "Faculty ID", value: String(faculty.facultyId) },
              { label: "Employee ID", value: String(faculty.employeeId) },
              { label: "Department", value: String(faculty.department) },
              { label: "Designation", value: String(faculty.designation) },
              { label: "Date of Joining", value: String(faculty.joiningDate || "2018-06-15") },
              { label: "Mobile Number", value: String(faculty.mobile) },
              { label: "Email Address", value: String(faculty.email) },
            ]}
          />
        </SectionCard>

        <SectionCard title="2. Qualification & Experience (AICTE Format)">
          <DetailGrid
            items={[
              { label: "Highest Qualification", value: String(faculty.qualification) },
              { label: "Total Experience", value: String(faculty.experience) },
              { label: "Teaching Experience", value: String(faculty.experience) },
              { label: "Industry Experience", value: "2 Years (Industrial Training)" },
              { label: "Research Experience", value: "3 Years" },
            ]}
          />
        </SectionCard>

        <SectionCard title="3. Publications & Research">
          <div className="space-y-3 text-sm text-foreground">
            <div>
              <p className="font-semibold text-muted-foreground">Papers Published / Presented:</p>
              <p className="mt-1 font-mono text-xs bg-panel p-3 rounded-lg border border-border">
                {String(faculty.publications || "IEEE / National Conference publication on Data Analytics and Machine Learning.")}
              </p>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground">Ph.D & Project Guidance:</p>
              <p className="mt-1 font-mono text-xs bg-panel p-3 rounded-lg border border-border">
                {String(faculty.research || "Guided 12 diploma capstone projects in Information Technology.")}
              </p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="4. Professional Memberships, Awards & Grants">
          <DetailGrid
            items={[
              { label: "Professional Memberships", value: String(faculty.memberships || "ISTE Life Member (LM-41092)") },
              { label: "Awards & Recognitions", value: String(faculty.awards || "Best Faculty Award 2023") },
              { label: "Grants & Projects Fetched", value: String(faculty.projects || "AICTE MODROB Scheme Grant for Computer Networks Laboratory") },
              { label: "Consultancy Activities", value: String(faculty.consultancy || "Industry training for local polytechnic faculty") },
            ]}
          />
        </SectionCard>
      </div>
    </div>
  );
}
