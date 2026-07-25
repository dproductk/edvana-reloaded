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

export const MOCK_PROFILE_FORM: ProfileFormData = {
  enrollmentNo: "243059",
  fullName: "PUKALE NIKHIL UTTAM",
  motherName: "PUKALE SUNITA UTTAM",
  dob: "2005-03-14",
  gender: "Male",
  category: "OPEN",
  program: "ELECTRICAL ENGINEERING",
  currentYear: "Second Year",
  mobile: "8855045810",
  email: "nikhilpukale5@gmail.com",
  addressLine: "At Post Kasaba Bawada, Shivaji Nagar",
  city: "Kolhapur",
  district: "Kolhapur",
  state: "Maharashtra",
  pincode: "416006",
  bankName: "Bank of Maharashtra",
  accountNo: "60298374512",
  ifsc: "MAHB0000512",
  aadhaar: "XXXX XXXX 4821",
};

export const MOCK_ADMISSION_FEES: FeeRow[] = [
  {
    id: "af-1",
    particulars: "Admission Fee (First Year)",
    academicYear: "2024-25",
    amount: 8450,
    paidOn: "12 Aug 2024",
    receiptNo: "GPK/AF/2024/10231",
    status: "Paid",
  },
  {
    id: "af-2",
    particulars: "Tuition Fee (Second Year)",
    academicYear: "2025-26",
    amount: 9200,
    paidOn: "04 Aug 2025",
    receiptNo: "GPK/AF/2025/11894",
    status: "Paid",
  },
  {
    id: "af-3",
    particulars: "Development & Library Fee",
    academicYear: "2025-26",
    amount: 1500,
    paidOn: null,
    receiptNo: null,
    status: "Pending",
  },
];

export const MOCK_EXAM_STATUS: ExamFormStatus = {
  term: "SUMMER 2026",
  program: "ELECTRICAL ENGINEERING",
  semester: "Semester IV",
  feeAmount: 1250,
  paid: true,
  confirmed: false,
  applicationNo: "EXM/SUM26/243059",
};

export const MOCK_EXAM_SUBJECTS: ExamSubject[] = [
  { code: "EE401", name: "Electrical Machines II", credits: 4, type: "Theory", selected: true },
  { code: "EE402", name: "Power Electronics", credits: 4, type: "Theory", selected: true },
  { code: "EE403", name: "Microcontroller Applications", credits: 3, type: "Theory", selected: true },
  { code: "EE404", name: "Electrical Estimation & Costing", credits: 3, type: "Theory", selected: true },
  { code: "EE405", name: "Power Electronics Lab", credits: 2, type: "Practical", selected: true },
  { code: "EE406", name: "Machines Lab", credits: 2, type: "Practical", selected: true },
];

export const MOCK_FEEDBACK_QUESTIONS: FeedbackQuestion[] = [
  { id: "q1", text: "Subject knowledge and clarity of the faculty" },
  { id: "q2", text: "Punctuality and regularity of lectures" },
  { id: "q3", text: "Coverage of syllabus within the schedule" },
  { id: "q4", text: "Use of teaching aids and practical demonstrations" },
  { id: "q5", text: "Encouragement for doubt solving and interaction" },
];

export const MOCK_FEEDBACK_FACULTY: FeedbackFaculty[] = [
  { id: "f1", facultyName: "Prof. S. S. Bhosale", subject: "Electrical Machines II" },
  { id: "f2", facultyName: "Prof. A. R. Patil", subject: "Power Electronics" },
  { id: "f3", facultyName: "Prof. M. V. Jadhav", subject: "Microcontroller Applications" },
];

export const MOCK_FACILITY_QUESTIONS: FeedbackQuestion[] = [
  { id: "fq1", text: "Classroom infrastructure and seating" },
  { id: "fq2", text: "Laboratory equipment and availability" },
  { id: "fq3", text: "Library resources and reading facility" },
  { id: "fq4", text: "Drinking water, washrooms and cleanliness" },
  { id: "fq5", text: "Sports, canteen and campus amenities" },
];

export const MOCK_ONLINE_EXAMS: OnlineExamRow[] = [
  {
    id: "oe-1",
    subject: "Electrical Machines II",
    date: "18 Aug 2026",
    time: "10:00 AM",
    durationMin: 90,
    status: "Upcoming",
  },
  {
    id: "oe-2",
    subject: "Power Electronics",
    date: "20 Aug 2026",
    time: "10:00 AM",
    durationMin: 90,
    status: "Upcoming",
  },
  {
    id: "oe-3",
    subject: "Microcontroller Applications",
    date: "12 Jul 2026",
    time: "02:00 PM",
    durationMin: 60,
    status: "Completed",
  },
];

const SEM_III: ResultSummary = {
  term: "WINTER 2025",
  semester: "Semester III",
  sgpa: 8.42,
  cgpa: 8.36,
  totalCredits: 22,
  status: "Pass",
  subjects: [
    { code: "EE301", name: "Electrical Machines I", credits: 4, theoryMarks: 68, practicalMarks: null, total: 68, grade: "A", result: "Pass" },
    { code: "EE302", name: "Electrical Circuits", credits: 4, theoryMarks: 72, practicalMarks: null, total: 72, grade: "A", result: "Pass" },
    { code: "EE303", name: "Digital Electronics", credits: 3, theoryMarks: 65, practicalMarks: null, total: 65, grade: "B+", result: "Pass" },
    { code: "EE304", name: "Electrical Workshop", credits: 2, theoryMarks: null, practicalMarks: 84, total: 84, grade: "A+", result: "Pass" },
  ],
};

export const MOCK_RESULT_CURRENT: ResultSummary = {
  term: "SUMMER 2026",
  semester: "Semester IV",
  sgpa: 8.68,
  cgpa: 8.51,
  totalCredits: 24,
  status: "Pass",
  subjects: [
    { code: "EE401", name: "Electrical Machines II", credits: 4, theoryMarks: 74, practicalMarks: null, total: 74, grade: "A", result: "Pass" },
    { code: "EE402", name: "Power Electronics", credits: 4, theoryMarks: 71, practicalMarks: null, total: 71, grade: "A", result: "Pass" },
    { code: "EE403", name: "Microcontroller Applications", credits: 3, theoryMarks: 69, practicalMarks: null, total: 69, grade: "B+", result: "Pass" },
    { code: "EE404", name: "Electrical Estimation & Costing", credits: 3, theoryMarks: 66, practicalMarks: null, total: 66, grade: "B+", result: "Pass" },
    { code: "EE405", name: "Power Electronics Lab", credits: 2, theoryMarks: null, practicalMarks: 88, total: 88, grade: "A+", result: "Pass" },
    { code: "EE406", name: "Machines Lab", credits: 2, theoryMarks: null, practicalMarks: 85, total: 85, grade: "A+", result: "Pass" },
  ],
};

export const MOCK_RESULT_FY: ResultSummary = {
  term: "FIRST YEAR",
  semester: "Semester I & II",
  sgpa: 8.18,
  cgpa: 8.18,
  totalCredits: 44,
  status: "Pass",
  subjects: [
    { code: "SC101", name: "Applied Mathematics", credits: 4, theoryMarks: 64, practicalMarks: null, total: 64, grade: "B+", result: "Pass" },
    { code: "SC102", name: "Applied Physics", credits: 4, theoryMarks: 70, practicalMarks: null, total: 70, grade: "A", result: "Pass" },
    { code: "EE101", name: "Basic Electrical Engineering", credits: 4, theoryMarks: 76, practicalMarks: null, total: 76, grade: "A", result: "Pass" },
    { code: "EN101", name: "Communication Skills", credits: 3, theoryMarks: 73, practicalMarks: null, total: 73, grade: "A", result: "Pass" },
  ],
};

export const MOCK_RESULT_SY: ResultSummary = SEM_III;

export const MOCK_PAYMENTS: PaymentRow[] = [
  {
    id: "p-1",
    purpose: "Exam Form Fee — SUMMER 2026",
    transactionId: "TXN2026071845210",
    date: "18 Jul 2026",
    amount: 1250,
    mode: "UPI",
    status: "Success",
  },
  {
    id: "p-2",
    purpose: "Photocopy & Verification Fee",
    transactionId: "TXN2026062211784",
    date: "22 Jun 2026",
    amount: 400,
    mode: "Net Banking",
    status: "Success",
  },
  {
    id: "p-3",
    purpose: "Duplicate ID Card",
    transactionId: "TXN2026051930022",
    date: "19 May 2026",
    amount: 150,
    mode: "Debit Card",
    status: "Failed",
  },
  {
    id: "p-4",
    purpose: "Tuition Fee 2025-26",
    transactionId: "TXN2025080409911",
    date: "04 Aug 2025",
    amount: 9200,
    mode: "Net Banking",
    status: "Success",
  },
];

export const MOCK_PHOTOCOPY_STATUS: ExamFormStatus = {
  term: "SUMMER 2026",
  program: "ELECTRICAL ENGINEERING",
  semester: "Semester IV",
  feeAmount: 400,
  paid: true,
  confirmed: false,
  applicationNo: "PCV/SUM26/243059",
};
