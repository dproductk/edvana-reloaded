/**
 * Admin-portal domain types.
 *
 * Every record is persisted through the mock repository layer
 * (`src/services/admin.service.ts`) which mirrors the shape a Django REST
 * resource will return later: `{ id, ...fields }` with ISO date strings.
 */

export type ID = string;

/** Generic record shape handled by the reusable admin CRUD screens. */
export type AdminRecord = { id: ID } & Record<string, unknown>;

export type GeneralStatus = "Active" | "Inactive" | "Draft" | "Archived";

export const ADMISSION_STATUSES = [
  "Eligible",
  "Fee Pending",
  "Fee Paid",
  "Admission Pending",
  "Admitted",
  "Rejected",
  "Cancelled",
] as const;
export type AdmissionStatus = (typeof ADMISSION_STATUSES)[number];

export const REGISTRATION_STATUSES = [
  "Not Eligible",
  "Eligible",
  "Draft",
  "Submitted",
  "Under Review",
  "Approved",
  "Finalized",
  "Rejected",
] as const;
export type RegistrationStatus = (typeof REGISTRATION_STATUSES)[number];

export const RESULT_STATUSES = [
  "Imported",
  "Processing",
  "Verification Pending",
  "Approved",
  "Finalized",
] as const;
export type ResultStatus = (typeof RESULT_STATUSES)[number];

export const PAYMENT_STATUSES = [
  "Pending",
  "Successful",
  "Failed",
  "Refunded",
  "Verification Pending",
] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export type RegistrationType = "R" | "R + RR" | "RR";

export interface AcademicYear extends AdminRecord {
  academicYear: string;
  displayName: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  status: string;
  description?: string;
}

export interface Scheme extends AdminRecord {
  schemeCode: string;
  schemeName: string;
  version: string;
  effectiveFrom: string;
  effectiveTo?: string;
  program: string;
  branch: string;
  status: string;
}

export interface Course extends AdminRecord {
  courseCode: string;
  courseName: string;
  shortName: string;
  courseType: string;
  semester: string;
  credits: number;
  theoryMarks: number;
  practicalMarks: number;
  internalMarks: number;
  externalMarks: number;
  totalMarks: number;
  passingMarks: number;
  status: string;
}

export interface AdminStudent extends AdminRecord {
  enrollNo: string;
  studentName: string;
  rollNo: string;
  program: string;
  branch: string;
  semester: string;
  division: string;
  batch: string;
  academicYear: string;
  admissionStatus: string;
  feeStatus: string;
  registrationStatus: string;
  status: string;
}

export interface AdminFaculty extends AdminRecord {
  facultyId: string;
  employeeId: string;
  facultyName: string;
  department: string;
  designation: string;
  mobile: string;
  email: string;
  joiningDate: string;
  qualification: string;
  experience: string;
  status: string;
}

export interface AcademicHistoryRow {
  session: string;
  semester: string;
  courseCode: string;
  courseName: string;
  attemptType: RegistrationType | "R" | "RR";
  credits: number;
  marks: number | null;
  result: "Pass" | "Fail" | "Absent";
  backlog: boolean;
}

export interface RegisteredCourse {
  courseCode: string;
  courseName: string;
  courseType: string;
  semester: string;
  credits: number;
  category: "Regular" | "Backlog";
  eligible: boolean;
  selected: boolean;
  feeApplicable: boolean;
  status: string;
}

export interface ExamRegistration extends AdminRecord {
  enrollNo: string;
  studentName: string;
  program: string;
  branch: string;
  semester: string;
  division: string;
  registrationType: RegistrationType;
  regularCount: number;
  backlogCount: number;
  totalCredits: number;
  feeStatus: string;
  registrationStatus: string;
  finalizationStatus: string;
  finalRegistrationNo?: string;
  finalizedOn?: string;
  finalizedBy?: string;
  courses: RegisteredCourse[];
}

export interface RuleCheck {
  label: string;
  passed: boolean;
  detail: string;
}

export interface DashboardKpi {
  label: string;
  value: number;
  hint?: string;
}

export interface AdminDashboard {
  academicYear: string;
  term: string;
  examSession: string;
  kpis: DashboardKpi[];
  admission: { label: string; value: number }[];
  registration: { label: string; value: number }[];
  result: { label: string; value: number }[];
}

export interface ImportValidationIssue {
  row: number;
  field: string;
  message: string;
  severity: "Error" | "Warning";
}

export interface ColumnMapping {
  sourceColumn: string;
  destinationField: string;
  required: boolean;
  sampleValue: string;
  status: "Mapped" | "Unmapped" | "Ignored";
}

export interface AdminProfile {
  name: string;
  username: string;
  role: string;
  employeeId: string;
  department: string;
  email: string;
  mobile: string;
  lastLogin: string;
}
