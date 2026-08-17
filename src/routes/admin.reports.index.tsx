import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionCard } from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, IndianRupee, FileSpreadsheet, GraduationCap, Award, Download, Printer } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/reports/")({
  head: () => ({
    meta: [{ title: "All Reports & Summaries — Admin · EDVANA" }],
  }),
  component: AllReportsPage,
});

const reportCategories = [
  {
    title: "Admission Reports",
    icon: ClipboardCheck,
    to: "/admin/reports/admission",
    items: [
      "Eligible Candidates Report",
      "Admitted Students List",
      "Fee Pending List",
      "Program & Branch-wise Admission Summary",
    ],
  },
  {
    title: "Fee & Collection Reports",
    icon: IndianRupee,
    to: "/admin/reports/fees",
    items: [
      "Daily Fee Collection Report",
      "Fee Pending Ledger",
      "Fee Head Breakdown",
      "Gateway Reconciliation Report",
    ],
  },
  {
    title: "Examination Reports",
    icon: FileSpreadsheet,
    to: "/admin/reports/examination",
    items: [
      "R / R+RR / RR Candidate Registers",
      "Course-wise Exam Registration Summary",
      "Timetable & Seating Layout",
      "Hall Ticket Eligibility Gate Report",
    ],
  },
  {
    title: "Academic & Operations Reports",
    icon: GraduationCap,
    to: "/admin/reports/academic",
    items: [
      "Student Academic History Register",
      "Faculty Internal Marks Entry Register",
      "Provisional & Confirmed Detention List",
      "Course-wise Student Master Register",
    ],
  },
  {
    title: "Result Reports",
    icon: Award,
    to: "/admin/reports/results",
    items: [
      "Session-wise Result Ledger",
      "Pass / Fail Summary Report",
      "Active Backlog Master Report",
      "Grade Distribution Matrix",
    ],
  },
];

function AllReportsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Institutional Reports Hub</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Generate, view, and export official MIS reports across all modules.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Exporting combined report batch to CSV...")}>
            <Download className="mr-1.5 h-4 w-4" /> Export All (CSV)
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="mr-1.5 h-4 w-4" /> Print Reports
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reportCategories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <SectionCard key={i} title={cat.title}>
              <div className="space-y-4">
                <ul className="space-y-2 text-xs text-muted-foreground">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" size="sm" className="w-full mt-2">
                  <Link to={cat.to}>
                    Open {cat.title}
                  </Link>
                </Button>
              </div>
            </SectionCard>
          );
        })}
      </div>
    </div>
  );
}
