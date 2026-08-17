import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, User, Phone, Mail, Building, FileText, CheckCircle2, ShieldCheck, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/common/SectionCard";
import { DetailGrid } from "@/components/common/DetailGrid";
import { StatusBadge } from "@/components/common/StatusBadge";
import { DataTable, type Column } from "@/components/common/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { adminService } from "@/services/admin.service";
import type { AcademicHistoryRow, AdminStudent } from "@/types/admin";

export const Route = createFileRoute("/admin/master/students/$id")({
  head: () => ({
    meta: [{ title: "Student Detail Profile — Admin · EDVANA" }],
  }),
  component: StudentDetailPage,
});

function StudentDetailPage() {
  const { id } = Route.useParams();

  const { data: student, isLoading } = useQuery<AdminStudent | undefined>({
    queryKey: ["admin", "students", id],
    queryFn: () => adminService.get<AdminStudent>("students", id),
  });

  const { data: history = [] } = useQuery<AcademicHistoryRow[]>({
    queryKey: ["admin", "academic-history", student?.enrollNo],
    queryFn: () => (student ? adminService.getAcademicHistory(student.enrollNo) : Promise.resolve([])),
    enabled: !!student,
  });

  if (isLoading || !student) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  const historyColumns: Column<AcademicHistoryRow>[] = [
    { header: "Exam Session", cell: (r) => <span className="font-semibold">{r.session}</span> },
    { header: "Semester", cell: (r) => r.semester },
    { header: "Course Code", cell: (r) => <span className="font-mono font-bold">{r.courseCode}</span> },
    { header: "Course Name", cell: (r) => r.courseName },
    { header: "Type", cell: (r) => <span className="text-xs rounded bg-muted px-1.5 py-0.5">{r.attemptType}</span> },
    { header: "Credits", cell: (r) => r.credits },
    { header: "Marks", cell: (r) => (r.marks !== null ? `${r.marks}` : "N/A") },
    { header: "Result", cell: (r) => <StatusBadge status={r.result} /> },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Back button & top toolbar */}
      <div className="flex items-center justify-between">
        <Button asChild variant="outline" size="sm">
          <Link to="/admin/master/students">
            <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to Students List
          </Link>
        </Button>
        <div className="flex gap-2">
          <StatusBadge status={student.admissionStatus} label={`Admission: ${student.admissionStatus}`} />
          <StatusBadge status={student.feeStatus} label={`Fee: ${student.feeStatus}`} />
        </div>
      </div>

      {/* Student Profile Card Header */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold border border-primary/20">
              {student.studentName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">{student.studentName}</h1>
                {student.directSecondYear === "Yes" && (
                  <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    DSE Candidate
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-sm font-mono text-muted-foreground">
                Enrollment No: <span className="font-semibold text-foreground">{student.enrollNo}</span> | Roll No: {student.rollNo}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span>{student.program}</span>
                <span>•</span>
                <span className="font-semibold text-foreground">{student.branch}</span>
                <span>•</span>
                <span>{student.semester}</span>
                <span>•</span>
                <span>Division {student.division} ({student.batch})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="w-full justify-start rounded-lg bg-panel p-1 border border-border">
          <TabsTrigger value="personal">Personal & Contact</TabsTrigger>
          <TabsTrigger value="academic">Academic & Admission</TabsTrigger>
          <TabsTrigger value="guardian">Guardian & Bank</TabsTrigger>
          <TabsTrigger value="history">Academic History Timeline</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Personal & Contact */}
        <TabsContent value="personal" className="mt-4 space-y-6">
          <SectionCard title="Personal Information">
            <DetailGrid
              items={[
                { label: "Full Name", value: String(student.studentName) },
                { label: "Gender", value: String(student.gender || "Male") },
                { label: "Date of Birth", value: String(student.dateOfBirth || "2006-05-14") },
                { label: "Blood Group", value: String(student.bloodGroup || "B+") },
                { label: "Category", value: String(student.category || "OPEN") },
                { label: "Aadhaar Number", value: String(student.aadhaarNumber || "XXXX XXXX 1234") },
              ]}
            />
          </SectionCard>

          <SectionCard title="Contact & Address">
            <DetailGrid
              items={[
                { label: "Mobile Number", value: String(student.mobile || "9822001122") },
                { label: "Alternate Mobile", value: String(student.alternateMobile || "7030112233") },
                { label: "Email Address", value: String(student.email || "student@gpkolhapur.ac.in") },
                { label: "Correspondence Address", value: String(student.correspondenceAddress || "102, Shivaji Peth, Kolhapur") },
                { label: "Permanent Address", value: String(student.permanentAddress || "102, Shivaji Peth, Kolhapur") },
                { label: "City / District / State", value: `${student.city || "Kolhapur"}, ${student.district || "Kolhapur"}, ${student.state || "Maharashtra"} - ${student.pin || "416012"}` },
              ]}
            />
          </SectionCard>
        </TabsContent>

        {/* Academic & Admission */}
        <TabsContent value="academic" className="mt-4 space-y-6">
          <SectionCard title="Academic Assignment">
            <DetailGrid
              items={[
                { label: "Academic Year", value: String(student.academicYear) },
                { label: "Curriculum Scheme", value: String(student.scheme || "K-2024") },
                { label: "Program", value: String(student.program) },
                { label: "Branch", value: String(student.branch) },
                { label: "Semester", value: String(student.semester) },
                { label: "Division / Batch", value: `${student.division} (${student.batch})` },
              ]}
            />
          </SectionCard>

          <SectionCard title="Admission Audit Details">
            <DetailGrid
              items={[
                { label: "DTE Application ID", value: String(student.dteApplicationId || "DTE2026100012") },
                { label: "Admission Category", value: String(student.admissionCategory || "CAP Round 1") },
                { label: "Direct Second Year (DSE)", value: String(student.directSecondYear || "No") },
                { label: "Admission Date", value: String(student.admissionDate || "2026-07-15") },
                { label: "Admission Status", value: String(student.admissionStatus) },
                { label: "Fee Status", value: String(student.feeStatus) },
              ]}
            />
          </SectionCard>
        </TabsContent>

        {/* Guardian & Bank */}
        <TabsContent value="guardian" className="mt-4 space-y-6">
          <SectionCard title="Guardian Information">
            <DetailGrid
              items={[
                { label: "Father's Name", value: String(student.fatherName || "UTTAM PUKALE") },
                { label: "Mother's Name", value: String(student.motherName || "SUNITA PUKALE") },
                { label: "Guardian Contact", value: String(student.guardianMobile || "9922001122") },
                { label: "Occupation", value: String(student.occupation || "Service") },
              ]}
            />
          </SectionCard>

          <SectionCard title="Bank Account Information">
            <DetailGrid
              items={[
                { label: "Account Holder", value: String(student.accountHolder || student.studentName) },
                { label: "Account Number", value: String(student.accountNumber || "351200001234") },
                { label: "IFSC Code", value: String(student.ifsc || "SBIN0000834") },
                { label: "Bank & Branch", value: `${student.bank || "State Bank of India"} (${student.bankBranch || "Kolhapur Main"})` },
              ]}
            />
          </SectionCard>
        </TabsContent>

        {/* Academic History Timeline */}
        <TabsContent value="history" className="mt-4 space-y-6">
          <SectionCard title="Semester-wise Examination History">
            <DataTable
              columns={historyColumns}
              rows={history}
              rowKey={(r, i) => `${r.courseCode}-${i}`}
              empty="No examination records recorded yet."
            />
          </SectionCard>
        </TabsContent>

        {/* Documents */}
        <TabsContent value="documents" className="mt-4 space-y-6">
          <SectionCard title="Uploaded Verification Documents">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {["Passport Photo", "Signature", "Aadhaar Card PDF", "Admission Fee Receipt"].map((doc, i) => (
                <div key={i} className="flex flex-col items-center justify-center rounded-lg border border-border bg-panel p-4 text-center">
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <span className="text-xs font-semibold text-foreground">{doc}</span>
                  <span className="mt-1 text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Verified
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
