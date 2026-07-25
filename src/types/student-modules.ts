/** Types for the remaining student-panel modules (mock-backed). */

export interface ProfileFormData {
  enrollmentNo: string;
  fullName: string;
  motherName: string;
  dob: string;
  gender: "Male" | "Female" | "Other";
  category: string;
  program: string;
  currentYear: string;
  mobile: string;
  email: string;
  addressLine: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  bankName: string;
  accountNo: string;
  ifsc: string;
  aadhaar: string;
}

export interface FeeRow {
  id: string;
  particulars: string;
  academicYear: string;
  amount: number;
  paidOn: string | null;
  receiptNo: string | null;
  status: "Paid" | "Pending";
}

export interface ExamSubject {
  code: string;
  name: string;
  credits: number;
  type: "Theory" | "Practical";
  selected: boolean;
}

export interface ExamFormStatus {
  term: string;
  program: string;
  semester: string;
  feeAmount: number;
  paid: boolean;
  confirmed: boolean;
  applicationNo: string;
}

export interface FeedbackQuestion {
  id: string;
  text: string;
}

export interface FeedbackFaculty {
  id: string;
  facultyName: string;
  subject: string;
}

export interface OnlineExamRow {
  id: string;
  subject: string;
  date: string;
  time: string;
  durationMin: number;
  status: "Upcoming" | "Live" | "Completed";
}

export interface ResultSubject {
  code: string;
  name: string;
  credits: number;
  theoryMarks: number | null;
  practicalMarks: number | null;
  total: number;
  grade: string;
  result: "Pass" | "Fail";
}

export interface ResultSummary {
  term: string;
  semester: string;
  sgpa: number;
  cgpa: number;
  totalCredits: number;
  status: "Pass" | "Fail";
  subjects: ResultSubject[];
}

export interface PaymentRow {
  id: string;
  purpose: string;
  transactionId: string;
  date: string;
  amount: number;
  mode: string;
  status: "Success" | "Failed" | "Pending";
}
