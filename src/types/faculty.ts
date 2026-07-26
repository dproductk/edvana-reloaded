export interface FacultyProfile {
  facultyId: string;
  fullName: string;
  department: string;
  designation: string;
  status: "Active" | "Inactive";
  photoUrl: string;
  mobile: string;
  email: string;
}

export interface FacultyDashboardData {
  welcomeTitle: string;
  bullets: { text: string }[];
}

export interface EligibleStudentRow {
  id: string;
  eligibilityType: "R" | "RR";
  enrollNo: string;
  studentName: string;
  semester: number;
  program: string;
}

export interface RegisteredStudentRow {
  id: string;
  enrollNo: string;
  studentName: string;
  semester: number;
  program: string;
}

export interface RegistrationListRow {
  id: string;
  enrollNo: string;
  studentName: string;
  semester: number;
  regType: string;
  program: string;
  course: string;
}

export interface CourseWiseRow {
  id: string;
  courseCode: string;
  courseName: string;
  program: string;
  semester: number;
  registered: number;
}

export interface AdmissionEligibleRow {
  id: string;
  enrollNo: string;
  name: string;
  fatherName: string;
  mobile: string;
  feeMarked: boolean;
  admitted: boolean;
}

export interface AdmittedRow {
  id: string;
  enrollNo: string;
  name: string;
  fatherName: string;
  mobile: string;
  year: string;
  division: string;
}

export interface WorkloadRow {
  id: string;
  programCode: string;
  division: string;
  courseCode: string;
  semester: number;
  ut1: number;
  ut2: number;
  faPr: number;
  saPr: number;
  sla: number;
}

export interface DetentionRow {
  id: string;
  enrollNo: string;
  studentName: string;
  semester: number;
  regType: string;
  program: string;
  course: string;
  faculty: string;
  remarks: string;
  enteredAt: string;
}

export interface NilDetentionRow {
  id: string;
  semester: number;
  division: string;
  program: string;
  faculty: string;
  remarks: string;
  createdAt: string;
}

export interface QuestionBankRow {
  id: string;
  program: string;
  course: string;
  questionType: string;
  unitNo: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  status: "Pending" | "Approved" | "Rejected";
}

export interface MarksheetRow {
  id: string;
  marksheetNo: string;
  section: string;
  program: string;
  course: string;
  day: string;
  session: "Morning" | "Afternoon";
  time: string;
}

export interface ResultAnalysisRow {
  id: string;
  course: string;
  appeared: number;
  passed: number;
  failed: number;
  passPercent: number;
  above75: number;
  band60to75: number;
  band50to60: number;
  band40to50: number;
}

export interface ExamHistoryRow {
  id: string;
  term: string;
  courseCode: string;
  courseName: string;
  marksObtained: number;
  maxMarks: number;
  result: "Pass" | "Fail";
}
