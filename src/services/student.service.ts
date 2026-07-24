import { MOCK_STUDENT_DASHBOARD, MOCK_STUDENT_PROFILE } from "@/mock/student";
import type { StudentDashboardData, StudentProfile } from "@/types/student";

export const studentService = {
  async getProfile(): Promise<StudentProfile> {
    await new Promise((r) => setTimeout(r, 120));
    return MOCK_STUDENT_PROFILE;
  },

  async getDashboard(): Promise<StudentDashboardData> {
    await new Promise((r) => setTimeout(r, 120));
    return MOCK_STUDENT_DASHBOARD;
  },
};
