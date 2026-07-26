import {
  MOCK_ADMISSION_ELIGIBLE,
  MOCK_ADMITTED,
  MOCK_COURSE_WISE,
  MOCK_COURSE_WISE_SAPR,
  MOCK_ELIGIBLE_STUDENTS,
  MOCK_EXAM_HISTORY,
  MOCK_FACULTY_DASHBOARD,
  MOCK_FACULTY_PROFILE,
  MOCK_FINAL_DETENTIONS,
  MOCK_MARKSHEETS,
  MOCK_NIL_DETENTIONS,
  MOCK_PROVISIONAL_DETENTIONS,
  MOCK_QUESTION_BANK,
  MOCK_REGISTERED_STUDENTS,
  MOCK_REGISTRATION_LIST,
  MOCK_RESULT_ANALYSIS,
  MOCK_UNCONFIRMED_DETENTIONS,
  MOCK_WORKLOAD,
} from "@/mock/faculty";
import type { ExamHistoryRow } from "@/types/faculty";

const delay = <T,>(value: T, ms = 250): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

/** Mock-backed abstraction over the faculty API. */
export const facultyService = {
  getProfile: () => delay(MOCK_FACULTY_PROFILE),
  getDashboard: () => delay(MOCK_FACULTY_DASHBOARD),

  getEligibleStudents: () => delay(MOCK_ELIGIBLE_STUDENTS),
  getRegisteredStudents: () => delay(MOCK_REGISTERED_STUDENTS),
  getRegistrationList: () => delay(MOCK_REGISTRATION_LIST),
  getCourseWise: (sapr = false) => delay(sapr ? MOCK_COURSE_WISE_SAPR : MOCK_COURSE_WISE),

  getAdmissionEligible: (year: "fy" | "sy" | "ty") => delay(MOCK_ADMISSION_ELIGIBLE[year]),
  getAdmitted: (session: "2026-27" | "2025-26") => delay(MOCK_ADMITTED[session]),

  getWorkload: () => delay(MOCK_WORKLOAD),
  getDetentions: (scope: "unconfirmed" | "provisional" | "final") =>
    delay(
      scope === "final"
        ? MOCK_FINAL_DETENTIONS
        : scope === "provisional"
          ? MOCK_PROVISIONAL_DETENTIONS
          : MOCK_UNCONFIRMED_DETENTIONS,
    ),
  getNilDetentions: () => delay(MOCK_NIL_DETENTIONS),
  addDetention: () => delay({ ok: true } as const, 500),
  addNilDetention: () => delay({ ok: true } as const, 500),
  saveMarks: () => delay({ ok: true } as const, 500),

  getQuestionBank: () => delay(MOCK_QUESTION_BANK),
  getMarksheets: () => delay(MOCK_MARKSHEETS),
  getResultAnalysis: (term: string) => delay(MOCK_RESULT_ANALYSIS[term] ?? []),

  searchExamHistory: (enrollNo: string): Promise<ExamHistoryRow[]> =>
    delay(MOCK_EXAM_HISTORY[enrollNo.trim()] ?? [], 450),

  updateProfile: () => delay({ ok: true } as const, 500),
  changePassword: () => delay({ ok: true } as const, 500),
};
