import {
  LayoutDashboard,
  UserCog,
  History,
  MonitorPlay,
  Briefcase,
  Users,
  GraduationCap,
  ClipboardList,
  BarChart3,
  KeyRound,
} from "lucide-react";
import type { NavSection } from "@/constants/student-nav";

export const FACULTY_NAV: NavSection[] = [
  {
    items: [
      { label: "Dashboard", icon: LayoutDashboard, to: "/faculty/dashboard" },
      { label: "View/Update Profile", icon: UserCog, to: "/faculty/profile" },
      { label: "Exam & Result History", icon: History, to: "/faculty/exam-result-history" },
      {
        label: "Manage Online Exam",
        icon: MonitorPlay,
        children: [{ label: "Question Bank", to: "/faculty/online-exam/question-bank" }],
      },
      {
        label: "Manage Workload",
        icon: Briefcase,
        children: [
          { label: "Add Detention", to: "/faculty/workload/detentions/add" },
          { label: "Provisional Detention List", to: "/faculty/workload/detentions/provisional" },
          { label: "Final Detention List", to: "/faculty/workload/detentions/final" },
          { label: "Add Nil Detention", to: "/faculty/workload/detentions/nil-add" },
          { label: "Nil Detention List", to: "/faculty/workload/detentions/nil-list" },
          { label: "Fill Marks", to: "/faculty/workload/marks-entry/fill" },
        ],
      },
      {
        label: "Students",
        icon: Users,
        children: [
          { label: "Eligible Students", to: "/faculty/students/eligible" },
          { label: "Registered Students", to: "/faculty/students/registered" },
          { label: "Course-Wise Registered", to: "/faculty/students/course-wise" },
          { label: "Course-Wise Registered (SAPR)", to: "/faculty/students/course-wise-sapr" },
          { label: "Registration List", to: "/faculty/students/registration-list" },
        ],
      },
      {
        label: "Admission",
        icon: GraduationCap,
        children: [
          { label: "Eligible (FY)", to: "/faculty/admission/eligible-fy" },
          { label: "Eligible (SY)", to: "/faculty/admission/eligible-sy" },
          { label: "Eligible (TY)", to: "/faculty/admission/eligible-ty" },
          { label: "Admitted (2026-27)", to: "/faculty/admission/admitted-2026-27" },
          { label: "Admitted (2025-26)", to: "/faculty/admission/admitted-2025-26" },
        ],
      },
    ],
  },
  {
    section: "LAC",
    items: [{ label: "Theory Exam", icon: ClipboardList, to: "/faculty/lac/theory-exam" }],
  },
  {
    section: "RESULT ANALYSIS",
    items: [
      {
        label: "Result Analysis",
        icon: BarChart3,
        children: [
          { label: "Result Analysis (SUMMER 2026)", to: "/faculty/result-analysis/summer-2026" },
          { label: "Result Analysis (WINTER 2025)", to: "/faculty/result-analysis/winter-2025" },
          { label: "Result Analysis (SUMMER 2025)", to: "/faculty/result-analysis/summer-2025" },
          { label: "Bitwise Marks Download", to: "/faculty/result-analysis/bitwise-marks" },
        ],
      },
    ],
  },
  {
    section: "SETTINGS",
    items: [{ label: "Change Password", icon: KeyRound, to: "/faculty/change-password" }],
  },
];
