import { MOCK_STUDENT_DASHBOARD, MOCK_STUDENT_PROFILE } from "@/mock/student";
import {
  MOCK_ADMISSION_FEES,
  MOCK_EXAM_STATUS,
  MOCK_EXAM_SUBJECTS,
  MOCK_FACILITY_QUESTIONS,
  MOCK_FEEDBACK_FACULTY,
  MOCK_FEEDBACK_QUESTIONS,
  MOCK_ONLINE_EXAMS,
  MOCK_PAYMENTS,
  MOCK_PHOTOCOPY_STATUS,
  MOCK_PROFILE_FORM,
  MOCK_RESULT_CURRENT,
  MOCK_RESULT_FY,
  MOCK_RESULT_SY,
} from "@/mock/student-modules";
import type { StudentDashboardData, StudentProfile } from "@/types/student";
import type {
  ExamFormStatus,
  ExamSubject,
  FeeRow,
  FeedbackFaculty,
  FeedbackQuestion,
  OnlineExamRow,
  PaymentRow,
  ProfileFormData,
  ResultSummary,
} from "@/types/student-modules";

const delay = (ms = 140) => new Promise((r) => setTimeout(r, ms));

export const studentService = {
  async getProfile(): Promise<StudentProfile> {
    await delay(120);
    return MOCK_STUDENT_PROFILE;
  },

  async getDashboard(): Promise<StudentDashboardData> {
    await delay(120);
    return MOCK_STUDENT_DASHBOARD;
  },

  async getProfileForm(): Promise<ProfileFormData> {
    await delay();
    return MOCK_PROFILE_FORM;
  },

  async updateProfileForm(data: ProfileFormData): Promise<ProfileFormData> {
    await delay(400);
    return data;
  },

  async getAdmissionFees(): Promise<FeeRow[]> {
    await delay();
    return MOCK_ADMISSION_FEES;
  },

  async getExamStatus(): Promise<ExamFormStatus> {
    await delay();
    return MOCK_EXAM_STATUS;
  },

  async getExamSubjects(): Promise<ExamSubject[]> {
    await delay();
    return MOCK_EXAM_SUBJECTS;
  },

  async submitExamForm(codes: string[]): Promise<{ applicationNo: string }> {
    await delay(400);
    return { applicationNo: `${MOCK_EXAM_STATUS.applicationNo}/${codes.length}` };
  },

  async payFee(amount: number): Promise<{ transactionId: string; amount: number }> {
    await delay(600);
    return { transactionId: `TXN${Date.now()}`, amount };
  },

  async confirmForm(): Promise<{ confirmedOn: string }> {
    await delay(400);
    return { confirmedOn: new Date().toLocaleDateString("en-IN") };
  },

  async getFeedbackQuestions(): Promise<FeedbackQuestion[]> {
    await delay();
    return MOCK_FEEDBACK_QUESTIONS;
  },

  async getFacilityQuestions(): Promise<FeedbackQuestion[]> {
    await delay();
    return MOCK_FACILITY_QUESTIONS;
  },

  async getFeedbackFaculty(): Promise<FeedbackFaculty[]> {
    await delay();
    return MOCK_FEEDBACK_FACULTY;
  },

  async submitFeedback(): Promise<void> {
    await delay(400);
  },

  async getOnlineExams(): Promise<OnlineExamRow[]> {
    await delay();
    return MOCK_ONLINE_EXAMS;
  },

  async requestDuplicateId(): Promise<{ requestNo: string }> {
    await delay(400);
    return { requestNo: `DUP/2026/${Math.floor(Math.random() * 9000 + 1000)}` };
  },

  async getResult(scope: "current" | "fy" | "sy"): Promise<ResultSummary> {
    await delay();
    if (scope === "fy") return MOCK_RESULT_FY;
    if (scope === "sy") return MOCK_RESULT_SY;
    return MOCK_RESULT_CURRENT;
  },

  async getPhotocopyStatus(): Promise<ExamFormStatus> {
    await delay();
    return MOCK_PHOTOCOPY_STATUS;
  },

  async getPayments(): Promise<PaymentRow[]> {
    await delay();
    return MOCK_PAYMENTS;
  },

  async changePassword(): Promise<void> {
    await delay(400);
  },
};
