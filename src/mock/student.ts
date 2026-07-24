import studentAvatar from "@/assets/student-avatar.jpg";
import type { StudentProfile, StudentDashboardData } from "@/types/student";

export const MOCK_STUDENT_PROFILE: StudentProfile = {
  enrollmentNo: "243059",
  fullName: "PUKALE NIKHIL UTTAM",
  program: "ELECTRICAL ENGINEERING",
  photoUrl: studentAvatar,
  mobile: "8855045810",
  email: "nikhilpukale5@gmail.com",
  stats: { total: 26, passed: 26, failed: 0 },
};

export const MOCK_STUDENT_DASHBOARD: StudentDashboardData = {
  welcomeTitle: "Welcome to GP Kolhapur Student Panel",
  bullets: [
    { text: "View and update you registration information, address, contact details, and bank details" },
    { text: "Register for your exams" },
    { text: "Download hall ticket" },
    { text: "Print your fee receipts" },
    { text: "And more" },
  ],
};
