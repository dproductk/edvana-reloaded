import {
  LayoutDashboard,
  GraduationCap,
  Users,
  ClipboardCheck,
  IndianRupee,
  FileSpreadsheet,
  Activity,
  Award,
  BarChart3,
  ShieldCheck,
  DatabaseZap,
  Settings,
} from "lucide-react";
import type { NavSection } from "@/constants/student-nav";

/**
 * Practical merged Admin sidebar — configuration, control, monitoring,
 * approval, reporting and analysis. Mirrors the workflow chain:
 * master data → admission → fees → registration → timetable → result.
 */
export const ADMIN_NAV: NavSection[] = [
  {
    items: [
      { label: "Dashboard", icon: LayoutDashboard, to: "/admin/dashboard" },
      {
        label: "Academic Setup",
        icon: GraduationCap,
        children: [
          { label: "Academic Years", to: "/admin/academic/years" },
          { label: "Schemes", to: "/admin/academic/schemes" },
          { label: "Programs", to: "/admin/academic/programs" },
          { label: "Branches", to: "/admin/academic/branches" },
          { label: "Semesters", to: "/admin/academic/semesters" },
          { label: "Divisions", to: "/admin/academic/divisions" },
          { label: "Batches", to: "/admin/academic/batches" },
          { label: "Subjects / Courses", to: "/admin/academic/courses" },
          { label: "Course Types", to: "/admin/academic/course-types" },
          { label: "Course-Scheme Mapping", to: "/admin/academic/course-mappings" },
        ],
      },
      {
        label: "People & Master Data",
        icon: Users,
        children: [
          { label: "Students", to: "/admin/master/students" },
          { label: "Faculty", to: "/admin/master/faculty" },
        ],
      },
      {
        label: "Admissions",
        icon: ClipboardCheck,
        children: [
          { label: "Admission Settings", to: "/admin/admissions/settings" },
          { label: "Eligibility Rules", to: "/admin/admissions/eligibility" },
          { label: "Eligible Students", to: "/admin/admissions/eligible" },
          { label: "Fee Status", to: "/admin/admissions/fees" },
          { label: "Admitted Students", to: "/admin/admissions/admitted" },
          { label: "Admission Summary", to: "/admin/admissions/summary" },
        ],
      },
      {
        label: "Fees & Payments",
        icon: IndianRupee,
        children: [
          { label: "Fee Heads", to: "/admin/fees/heads" },
          { label: "Fee Structures", to: "/admin/fees/structures" },
          { label: "Payment Monitoring", to: "/admin/fees/payments" },
          { label: "Reconciliation", to: "/admin/fees/reconciliation" },
        ],
      },
      {
        label: "Examinations",
        icon: FileSpreadsheet,
        children: [
          { label: "Exam Sessions", to: "/admin/exams/sessions" },
          { label: "Registration Settings", to: "/admin/exams/settings" },
          { label: "Eligibility Rules", to: "/admin/exams/eligibility" },
          { label: "R Students", to: "/admin/exams/r" },
          { label: "R + RR Students", to: "/admin/exams/r-rr" },
          { label: "RR Students", to: "/admin/exams/rr" },
          { label: "Course Registration", to: "/admin/exams/course-registration" },
          { label: "Registration Review", to: "/admin/exams/registration-review" },
          { label: "Final Registration", to: "/admin/exams/final-registration" },
          { label: "Exam Courses", to: "/admin/exams/courses" },
          { label: "Timetable", to: "/admin/exams/timetable" },
          { label: "Timetable Settings", to: "/admin/exams/timetable-settings" },
        ],
      },
      {
        label: "Academic Operations",
        icon: Activity,
        children: [
          { label: "Internal Assessment", to: "/admin/operations/internal-assessment" },
          { label: "Marks Monitoring", to: "/admin/operations/marks-monitoring" },
          { label: "Detention Monitoring", to: "/admin/operations/detention" },
        ],
      },
      {
        label: "Results",
        icon: Award,
        children: [
          { label: "Result Settings", to: "/admin/results/settings" },
          { label: "Result Import", to: "/admin/results/import" },
          { label: "Result Processing", to: "/admin/results/processing" },
          { label: "Verification", to: "/admin/results/verification" },
          { label: "Finalization", to: "/admin/results/finalization" },
          { label: "Backlogs", to: "/admin/results/backlogs" },
          { label: "Marksheets", to: "/admin/results/marksheets" },
        ],
      },
      {
        label: "Reports & Analytics",
        icon: BarChart3,
        children: [
          { label: "All Reports", to: "/admin/reports" },
          { label: "Admission Reports", to: "/admin/reports/admission" },
          { label: "Fee Reports", to: "/admin/reports/fees" },
          { label: "Examination Reports", to: "/admin/reports/examination" },
          { label: "Academic Reports", to: "/admin/reports/academic" },
          { label: "Result Reports", to: "/admin/reports/results" },
          { label: "Result Analysis", to: "/admin/analytics/results" },
        ],
      },
      {
        label: "Users & Access",
        icon: ShieldCheck,
        children: [
          { label: "Users", to: "/admin/users" },
          { label: "Roles", to: "/admin/users/roles" },
          { label: "Permissions", to: "/admin/users/permissions" },
          { label: "Role Assignments", to: "/admin/users/assignments" },
        ],
      },
      {
        label: "Data Management",
        icon: DatabaseZap,
        children: [
          { label: "Import Data", to: "/admin/data/import" },
          { label: "Migration", to: "/admin/data/migration" },
          { label: "Validation & Reconciliation", to: "/admin/data/reconciliation" },
        ],
      },
      {
        label: "System Settings",
        icon: Settings,
        children: [
          { label: "General Settings", to: "/admin/settings" },
          { label: "Semester Settings", to: "/admin/settings/semester" },
          { label: "Examination Settings", to: "/admin/settings/examination" },
          { label: "Admission Settings", to: "/admin/settings/admission" },
          { label: "Registration Settings", to: "/admin/settings/registration" },
        ],
      },
    ],
  },
];
