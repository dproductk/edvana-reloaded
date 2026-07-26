import facultyAvatar from "@/assets/faculty-avatar.jpg";
import type {
  AdmissionEligibleRow,
  AdmittedRow,
  CourseWiseRow,
  DetentionRow,
  EligibleStudentRow,
  ExamHistoryRow,
  FacultyDashboardData,
  FacultyProfile,
  MarksheetRow,
  NilDetentionRow,
  QuestionBankRow,
  RegisteredStudentRow,
  RegistrationListRow,
  ResultAnalysisRow,
  WorkloadRow,
} from "@/types/faculty";

export const PROGRAMS = [
  "01 - CIVIL ENGINEERING",
  "02 - MECHANICAL ENGINEERING",
  "03 - ELECTRICAL ENGINEERING",
  "06 - INFORMATION TECHNOLOGY",
  "07 - METALLURGICAL ENGINEERING",
  "08 - ELECTRONICS & TELECOMMUNICATION ENGINEERING",
];

export const SEMESTERS = [1, 2, 3, 4, 5, 6].map((n) => `Semester ${n}`);
export const DIVISIONS = ["A", "B", "C"];

export const MOCK_FACULTY_PROFILE: FacultyProfile = {
  facultyId: "DTESSBM9001",
  fullName: "Prof. S. S. Bhosale",
  department: "Metallurgical Engineering",
  designation: "Lecturer",
  status: "Active",
  photoUrl: facultyAvatar,
  mobile: "+91 98220 41122",
  email: "ssbhosale@gpkolhapur.ac.in",
};

export const MOCK_FACULTY_DASHBOARD: FacultyDashboardData = {
  welcomeTitle: "Welcome to GP Kolhapur Faculty Panel",
  bullets: [
    { text: "View and update your personal information, address, contact and bank details." },
    { text: "Student profile validation and confirmation." },
    { text: "Update students' attendance and provisional / detention report." },
    { text: "View history of students' marks." },
    { text: "And more." },
  ],
};

export const MOCK_ELIGIBLE_STUDENTS: EligibleStudentRow[] = [
  { id: "es1", eligibilityType: "R", enrollNo: "191227", studentName: "Patil Rohit Anil", semester: 6, program: "01 - CIVIL ENGINEERING" },
  { id: "es2", eligibilityType: "RR", enrollNo: "201045", studentName: "Shinde Aditi Rajendra", semester: 5, program: "02 - MECHANICAL ENGINEERING" },
  { id: "es3", eligibilityType: "R", enrollNo: "205512", studentName: "Kadam Sagar Vilas", semester: 4, program: "03 - ELECTRICAL ENGINEERING" },
  { id: "es4", eligibilityType: "R", enrollNo: "211102", studentName: "Jadhav Pooja Sanjay", semester: 4, program: "01 - CIVIL ENGINEERING" },
];

export const MOCK_REGISTERED_STUDENTS: RegisteredStudentRow[] = [
  { id: "rs1", enrollNo: "247303", studentName: "Kumbhar Sachin Sadashiv", semester: 3, program: "07 - METALLURGICAL ENGINEERING" },
  { id: "rs2", enrollNo: "257301", studentName: "Onkar Namdev Chavan", semester: 3, program: "07 - METALLURGICAL ENGINEERING" },
  { id: "rs3", enrollNo: "257306", studentName: "Powar Megha Shivaji", semester: 3, program: "07 - METALLURGICAL ENGINEERING" },
];

export const MOCK_REGISTRATION_LIST: RegistrationListRow[] = [
  { id: "rl1", enrollNo: "247303", studentName: "Kumbhar Sachin Sadashiv", semester: 3, regType: "R", program: "07 - METALLURGICAL ENGINEERING", course: "MTH310" },
  { id: "rl2", enrollNo: "257301", studentName: "Onkar Namdev Chavan", semester: 3, regType: "R", program: "07 - METALLURGICAL ENGINEERING", course: "MTH312" },
  { id: "rl3", enrollNo: "231204", studentName: "Sawant Mahesh Dattatray", semester: 5, regType: "RR", program: "02 - MECHANICAL ENGINEERING", course: "MEH319" },
];

export const MOCK_COURSE_WISE: CourseWiseRow[] = [
  { id: "cw1", courseCode: "MTH310", courseName: "Metallurgical Thermodynamics", program: "07 - METALLURGICAL ENGINEERING", semester: 3, registered: 42 },
  { id: "cw2", courseCode: "MTH312", courseName: "Physical Metallurgy", program: "07 - METALLURGICAL ENGINEERING", semester: 3, registered: 38 },
  { id: "cw3", courseCode: "MEH319", courseName: "Thermal Engineering", program: "02 - MECHANICAL ENGINEERING", semester: 5, registered: 56 },
];

export const MOCK_COURSE_WISE_SAPR: CourseWiseRow[] = [
  { id: "cs1", courseCode: "CCH104", courseName: "Engineering Chemistry", program: "01 - CIVIL ENGINEERING", semester: 1, registered: 27 },
  { id: "cs2", courseCode: "CEH101", courseName: "Civil Workshop Practice", program: "01 - CIVIL ENGINEERING", semester: 1, registered: 31 },
];

export const MOCK_ADMISSION_ELIGIBLE: Record<"fy" | "sy" | "ty", AdmissionEligibleRow[]> = {
  fy: [
    { id: "af1", enrollNo: "267301", name: "Deshmukh Anuja Prakash", fatherName: "Prakash Deshmukh", mobile: "9822011223", feeMarked: true, admitted: false },
    { id: "af2", enrollNo: "267302", name: "Gaikwad Omkar Sunil", fatherName: "Sunil Gaikwad", mobile: "9765533221", feeMarked: false, admitted: false },
  ],
  sy: [
    { id: "as1", enrollNo: "257301", name: "Onkar Namdev Chavan", fatherName: "Namdev Chavan", mobile: "9922114455", feeMarked: true, admitted: true },
  ],
  ty: [
    { id: "at1", enrollNo: "247303", name: "Kumbhar Sachin Sadashiv", fatherName: "Sadashiv Kumbhar", mobile: "9011223344", feeMarked: true, admitted: true },
  ],
};

export const MOCK_ADMITTED: Record<"2026-27" | "2025-26", AdmittedRow[]> = {
  "2026-27": [
    { id: "ad1", enrollNo: "267301", name: "Deshmukh Anuja Prakash", fatherName: "Prakash Deshmukh", mobile: "9822011223", year: "First Year", division: "A" },
    { id: "ad2", enrollNo: "267302", name: "Gaikwad Omkar Sunil", fatherName: "Sunil Gaikwad", mobile: "9765533221", year: "First Year", division: "B" },
  ],
  "2025-26": [
    { id: "ae1", enrollNo: "257301", name: "Onkar Namdev Chavan", fatherName: "Namdev Chavan", mobile: "9922114455", year: "Second Year", division: "A" },
    { id: "ae2", enrollNo: "257306", name: "Powar Megha Shivaji", fatherName: "Shivaji Powar", mobile: "9834455667", year: "Second Year", division: "A" },
  ],
};

export const MOCK_WORKLOAD: WorkloadRow[] = [
  { id: "wl1", programCode: "07", division: "A", courseCode: "MTH310", semester: 3, ut1: 20, ut2: 20, faPr: 25, saPr: 25, sla: 10 },
  { id: "wl2", programCode: "07", division: "A", courseCode: "MTH312", semester: 3, ut1: 20, ut2: 20, faPr: 25, saPr: 25, sla: 10 },
  { id: "wl3", programCode: "02", division: "B", courseCode: "MEH319", semester: 5, ut1: 20, ut2: 20, faPr: 25, saPr: 25, sla: 10 },
];

export const MOCK_UNCONFIRMED_DETENTIONS: DetentionRow[] = [];

export const MOCK_PROVISIONAL_DETENTIONS: DetentionRow[] = [
  { id: "pd1", enrollNo: "257306", studentName: "Powar Megha Shivaji", semester: 3, regType: "R", program: "07 - METALLURGICAL ENGINEERING", course: "MTH312", faculty: "DTESSBM9001", remarks: "Attendance below 75%", enteredAt: "12-06-2026 11:20" },
];

export const MOCK_FINAL_DETENTIONS: DetentionRow[] = [
  { id: "fd1", enrollNo: "247303", studentName: "Kumbhar Sachin Sadashiv", semester: 3, regType: "R", program: "07 - METALLURGICAL ENGINEERING", course: "MTH310", faculty: "DTENSKF6901", remarks: "Attendance shortage", enteredAt: "02-06-2026 10:05" },
  { id: "fd2", enrollNo: "257301", studentName: "Onkar Namdev Chavan", semester: 3, regType: "R", program: "07 - METALLURGICAL ENGINEERING", course: "MTH312", faculty: "DTENSKF6901", remarks: "Attendance shortage", enteredAt: "02-06-2026 10:07" },
  { id: "fd3", enrollNo: "231204", studentName: "Sawant Mahesh Dattatray", semester: 5, regType: "R", program: "02 - MECHANICAL ENGINEERING", course: "MEH319", faculty: "DTESSBM9001", remarks: "Term work not completed", enteredAt: "03-06-2026 09:41" },
];

export const MOCK_NIL_DETENTIONS: NilDetentionRow[] = [
  { id: "nd1", semester: 3, division: "A", program: "07 - METALLURGICAL ENGINEERING", faculty: "DTESSBM9001", remarks: "No detention in this division", createdAt: "05-06-2026 15:12" },
];

export const MOCK_QUESTION_BANK: QuestionBankRow[] = [
  { id: "qb1", program: "07 - METALLURGICAL ENGINEERING", course: "MTH310", questionType: "MCQ", unitNo: "Unit 1", question: "The first law of thermodynamics is a statement of?", optionA: "Conservation of mass", optionB: "Conservation of energy", optionC: "Entropy increase", optionD: "Heat transfer", status: "Pending" },
  { id: "qb2", program: "07 - METALLURGICAL ENGINEERING", course: "MTH312", questionType: "MCQ", unitNo: "Unit 2", question: "BCC unit cell contains how many atoms?", optionA: "1", optionB: "2", optionC: "4", optionD: "6", status: "Pending" },
];

export const MOCK_MARKSHEETS: MarksheetRow[] = [
  { id: "ms1", marksheetNo: "MS-2026-0114", section: "A", program: "07 - METALLURGICAL ENGINEERING", course: "MTH310", day: "Day 1", session: "Morning", time: "10:00 AM - 01:00 PM" },
  { id: "ms2", marksheetNo: "MS-2026-0119", section: "B", program: "02 - MECHANICAL ENGINEERING", course: "MEH319", day: "Day 2", session: "Afternoon", time: "02:00 PM - 05:00 PM" },
];

export const MOCK_RESULT_ANALYSIS: Record<string, ResultAnalysisRow[]> = {
  "SUMMER 2026": [
    { id: "ra1", course: "CCH104 - Engineering Chemistry", appeared: 27, passed: 19, failed: 8, passPercent: 70.37, above75: 4, band60to75: 6, band50to60: 2, band40to50: 7 },
    { id: "ra2", course: "CEH101 - Civil Workshop Practice", appeared: 0, passed: 0, failed: 0, passPercent: 0, above75: 0, band60to75: 0, band50to60: 0, band40to50: 0 },
    { id: "ra3", course: "CCH203 - Yoga & Meditation", appeared: 0, passed: 0, failed: 0, passPercent: 0, above75: 0, band60to75: 0, band50to60: 0, band40to50: 0 },
  ],
  "WINTER 2025": [
    { id: "rb1", course: "CCH104 - Engineering Chemistry", appeared: 31, passed: 25, failed: 6, passPercent: 80.65, above75: 7, band60to75: 9, band50to60: 5, band40to50: 4 },
  ],
  "SUMMER 2025": [
    { id: "rc1", course: "CCH104 - Engineering Chemistry", appeared: 29, passed: 21, failed: 8, passPercent: 72.41, above75: 5, band60to75: 8, band50to60: 4, band40to50: 4 },
  ],
};

export const MOCK_EXAM_HISTORY: Record<string, ExamHistoryRow[]> = {
  "247303": [
    { id: "eh1", term: "WINTER 2025", courseCode: "MTH310", courseName: "Metallurgical Thermodynamics", marksObtained: 58, maxMarks: 100, result: "Pass" },
    { id: "eh2", term: "WINTER 2025", courseCode: "MTH312", courseName: "Physical Metallurgy", marksObtained: 31, maxMarks: 100, result: "Fail" },
    { id: "eh3", term: "SUMMER 2026", courseCode: "MTH312", courseName: "Physical Metallurgy", marksObtained: 47, maxMarks: 100, result: "Pass" },
  ],
};
