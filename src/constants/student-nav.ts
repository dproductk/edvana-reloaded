import {
  LayoutDashboard,
  UserCog,
  Receipt,
  FileText,
  MessageSquare,
  Laptop,
  IdCard,
  Building2,
  FileCheck2,
  History,
  BadgeCheck,
  KeyRound,
  type LucideIcon,
} from "lucide-react";

export interface NavLeaf {
  label: string;
  to: string;
  icon?: LucideIcon;
}

export interface NavGroup {
  label: string;
  icon: LucideIcon;
  to?: string;
  children?: NavLeaf[];
}

export interface NavSection {
  section?: string;
  items: NavGroup[];
}

export const STUDENT_NAV: NavSection[] = [
  {
    items: [
      { label: "Dashboard", icon: LayoutDashboard, to: "/student/dashboard" },
      { label: "View/Update Profile", icon: UserCog, to: "/student/profile" },
      { label: "Admission Fee", icon: Receipt, to: "/student/admission-fee" },
    ],
  },
  {
    section: "EXAMINATION FORM",
    items: [
      {
        label: "Exam Registration",
        icon: FileText,
        children: [
          { label: "Fill Exam Form", to: "/student/exam-registration/fill" },
          { label: "Online Payment", to: "/student/exam-registration/payment" },
          { label: "Confirm Exam Form", to: "/student/exam-registration/confirm" },
          { label: "Print Exam Form", to: "/student/exam-registration/print" },
          {
            label: "Print Exam Form Receipt Cum Acknowledgement",
            to: "/student/exam-registration/receipt",
          },
        ],
      },
      {
        label: "Faculty Feedback Form",
        icon: MessageSquare,
        children: [
          { label: "Midterm Feedback", to: "/student/feedback/midterm" },
          { label: "Endterm Feedback", to: "/student/feedback/endterm" },
        ],
      },
      { label: "Online Exam", icon: Laptop, to: "/student/online-exam" },
      { label: "Duplicate ID Card", icon: IdCard, to: "/student/duplicate-id" },
      { label: "Facility Feedback Form", icon: Building2, to: "/student/facility-feedback" },
    ],
  },
  {
    section: "RESULT",
    items: [{ label: "Result SUMMER 2026", icon: BadgeCheck, to: "/student/result" }],
  },
  {
    section: "YEAR-WISE RESULT",
    items: [
      {
        label: "Year-Wise Result",
        icon: History,
        children: [
          { label: "FY Result", to: "/student/year-wise-result/fy" },
          { label: "SY Result", to: "/student/year-wise-result/sy" },
        ],
      },
    ],
  },
  {
    section: "PHOTOCOPY & VERIFICATION FORM",
    items: [
      {
        label: "Photocopy & Verification Form",
        icon: FileCheck2,
        children: [
          { label: "Fill Form", to: "/student/photocopy/fill" },
          { label: "Online Payment", to: "/student/photocopy/payment" },
          { label: "Confirm Form", to: "/student/photocopy/confirm" },
          { label: "Print Photocopy & Verification Form", to: "/student/photocopy/print" },
          {
            label: "Print Photocopy & Verification Form Receipt Cum Acknowledgement",
            to: "/student/photocopy/receipt",
          },
        ],
      },
      { label: "Payment History", icon: Receipt, to: "/student/payment-history" },
    ],
  },
  {
    items: [{ label: "Change Password", icon: KeyRound, to: "/student/change-password" }],
  },
];
