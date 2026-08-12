import type {
  AcademicHistoryRow,
  AdminDashboard,
  AdminProfile,
  AdminRecord,
  ColumnMapping,
  ExamRegistration,
  ImportValidationIssue,
  RegisteredCourse,
} from "@/types/admin";

/* ------------------------------------------------------------------ */
/* Reference / lookup values                                           */
/* ------------------------------------------------------------------ */

export const ACADEMIC_YEARS = ["2026-27", "2025-26", "2024-25", "2023-24"];
export const PROGRAM_NAMES = ["Diploma in Engineering", "Post Diploma", "Certificate Program"];
export const BRANCH_NAMES = [
  "Information Technology",
  "Computer Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Electronics & Telecommunication",
];
export const BRANCH_CODES: Record<string, string> = {
  "Information Technology": "IT",
  "Computer Engineering": "CO",
  "Mechanical Engineering": "ME",
  "Civil Engineering": "CE",
  "Electrical Engineering": "EE",
  "Electronics & Telecommunication": "EJ",
};
export const SEMESTER_NAMES = [
  "Semester 1",
  "Semester 2",
  "Semester 3",
  "Semester 4",
  "Semester 5",
  "Semester 6",
];
export const DIVISIONS = ["A", "B", "C"];
export const BATCHES = ["C1", "C2", "C3"];
export const SCHEME_CODES = ["K-2024", "K-2021", "I-2018"];
export const COURSE_TYPES = [
  "Theory",
  "Practical",
  "Project",
  "Workshop",
  "Audit",
  "Skill",
  "Elective",
];
export const EXAM_SESSIONS = ["SUMMER 2026", "WINTER 2025", "SUMMER 2025", "WINTER 2024"];
export const REGISTRATION_TYPES = ["R", "R + RR", "RR"] as const;
export const DEPARTMENTS = [...BRANCH_NAMES, "Science & Humanities"];

const FIRST = [
  "NIKHIL",
  "SAYALI",
  "OMKAR",
  "PRAJAKTA",
  "SHRIRAM",
  "ADITYA",
  "RUTUJA",
  "SANKET",
  "VAISHNAVI",
  "PRATIK",
  "SNEHAL",
  "KUNAL",
  "ASHWINI",
  "SIDDHESH",
  "TEJASWINI",
  "ROHAN",
];
const MIDDLE = ["UTTAM", "SANJAY", "RAMESH", "DATTATRAY", "VIJAY", "BALASO", "SHIVAJI", "ANIL"];
const LAST = [
  "PUKALE",
  "PATIL",
  "KUMBHAR",
  "JADHAV",
  "SHINDE",
  "DESAI",
  "KULKARNI",
  "MANE",
  "CHOUGULE",
  "SUTAR",
  "POWAR",
  "GAIKWAD",
];

/** Deterministic pseudo-random so mock data is stable across reloads. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}
const pick = <T,>(arr: T[], r: number) => arr[Math.floor(r * arr.length) % arr.length]!;

export const uid = (prefix: string, n: number) => `${prefix}-${String(n).padStart(4, "0")}`;

/* ------------------------------------------------------------------ */
/* Academic setup                                                      */
/* ------------------------------------------------------------------ */

const ACADEMIC_YEAR_ROWS: AdminRecord[] = ACADEMIC_YEARS.map((y, i) => ({
  id: uid("ay", i + 1),
  academicYear: y,
  displayName: `Academic Year ${y}`,
  startDate: `20${y.slice(0, 2)}-07-01`,
  endDate: `20${y.slice(5)}-06-30`,
  isCurrent: i === 0,
  status: i === 0 ? "Active" : i === 1 ? "Closed" : "Closed",
  description: i === 0 ? "Running academic year" : "Completed academic year",
}));

const SCHEME_ROWS: AdminRecord[] = [
  ["K-2024", "K Scheme 2024", "1.0", "2024-07-01", "", "Active"],
  ["K-2021", "K Scheme 2021", "2.1", "2021-07-01", "2024-06-30", "Inactive"],
  ["I-2018", "I Scheme 2018", "3.0", "2018-07-01", "2021-06-30", "Inactive"],
].flatMap(([code, name, version, from, to, status], i) =>
  BRANCH_NAMES.slice(0, 3).map((branch, j) => ({
    id: uid("sch", i * 10 + j + 1),
    schemeCode: code as string,
    schemeName: `${name} — ${BRANCH_CODES[branch]}`,
    version: version as string,
    effectiveFrom: from as string,
    effectiveTo: to as string,
    program: "Diploma in Engineering",
    branch,
    status: status as string,
    description: "Curriculum scheme approved by the Academic Council.",
  })),
);

const PROGRAM_ROWS: AdminRecord[] = [
  {
    id: uid("prg", 1),
    programCode: "DIP",
    programName: "Diploma in Engineering",
    programType: "Diploma",
    duration: "3 Years",
    totalSemesters: 6,
    department: "All Departments",
    status: "Active",
  },
  {
    id: uid("prg", 2),
    programCode: "PDIP",
    programName: "Post Diploma",
    programType: "Post Diploma",
    duration: "1 Year",
    totalSemesters: 2,
    department: "Information Technology",
    status: "Active",
  },
  {
    id: uid("prg", 3),
    programCode: "CERT",
    programName: "Certificate Program",
    programType: "Certificate",
    duration: "6 Months",
    totalSemesters: 1,
    department: "Science & Humanities",
    status: "Inactive",
  },
];

const BRANCH_ROWS: AdminRecord[] = BRANCH_NAMES.map((b, i) => ({
  id: uid("brn", i + 1),
  branchCode: BRANCH_CODES[b]!,
  branchName: b,
  shortName: BRANCH_CODES[b]!,
  program: "Diploma in Engineering",
  department: b,
  status: "Active",
}));

const SEMESTER_ROWS: AdminRecord[] = SEMESTER_NAMES.map((s, i) => ({
  id: uid("sem", i + 1),
  semesterNumber: i + 1,
  semesterName: s,
  program: "Diploma in Engineering",
  scheme: "K-2024",
  academicYear: "2026-27",
  termType: i % 2 === 0 ? "Odd" : "Even",
  status: i % 2 === 1 ? "Active" : "Inactive",
}));

const DIVISION_ROWS: AdminRecord[] = BRANCH_NAMES.slice(0, 3).flatMap((branch, bi) =>
  DIVISIONS.map((d, di) => ({
    id: uid("div", bi * 10 + di + 1),
    divisionName: d,
    program: "Diploma in Engineering",
    branch,
    semester: SEMESTER_NAMES[di + 1]!,
    academicYear: "2026-27",
    intakeCapacity: 60,
    status: "Active",
  })),
);

const BATCH_ROWS: AdminRecord[] = BATCHES.flatMap((b, bi) =>
  DIVISIONS.map((d, di) => ({
    id: uid("bat", bi * 10 + di + 1),
    batchCode: b,
    batchName: `Batch ${b}`,
    division: d,
    semester: SEMESTER_NAMES[di + 1]!,
    academicYear: "2026-27",
    capacity: 20,
    status: "Active",
  })),
);

/** Realistic diploma course catalogue (IT / common). */
const COURSE_SEED: [string, string, string, string, number][] = [
  ["CCH101", "Basic Mathematics", "BMS", "Semester 1", 4],
  ["CCH102", "Communication Skills (English)", "CSE", "Semester 1", 3],
  ["CCH105", "Engineering Graphics", "EGR", "Semester 1", 3],
  ["ITH101", "Fundamentals of Information Technology", "FIT", "Semester 1", 4],
  ["CCH201", "Applied Mathematics", "AMS", "Semester 2", 4],
  ["CCH205", "Basic Electronics", "BEL", "Semester 2", 3],
  ["ITH201", "Programming in C", "PIC", "Semester 2", 4],
  ["ITH205", "Web Page Designing", "WPD", "Semester 2", 3],
  ["ITH301", "Data Structures Using C", "DSU", "Semester 3", 4],
  ["ITH302", "Database Management System", "DBM", "Semester 3", 4],
  ["ITH305", "Computer Networks", "CNW", "Semester 3", 3],
  ["ITH401", "Object Oriented Programming", "OOP", "Semester 4", 4],
  ["ITH402", "Java Programming", "JPR", "Semester 4", 4],
  ["ITH405", "Operating Systems", "OSY", "Semester 4", 3],
  ["ITH501", "Software Engineering", "SEN", "Semester 5", 4],
  ["ITH502", "Advanced Java Programming", "AJP", "Semester 5", 4],
  ["ITH505", "Network Security", "NIS", "Semester 5", 3],
  ["ITH601", "Capstone Project", "CPP", "Semester 6", 6],
  ["ITH602", "Emerging Trends in IT", "ETI", "Semester 6", 3],
  ["ITH605", "Cloud Computing", "CLC", "Semester 6", 3],
];

const COURSE_ROWS: AdminRecord[] = COURSE_SEED.map(([code, name, short, sem, credits], i) => {
  const type = code.endsWith("01") && sem === "Semester 6" ? "Project" : i % 4 === 1 ? "Practical" : "Theory";
  const theory = type === "Practical" ? 0 : 70;
  const practical = type === "Theory" ? 0 : 50;
  return {
    id: uid("crs", i + 1),
    courseCode: code,
    courseName: name,
    shortName: short,
    courseType: type,
    semester: sem,
    credits,
    theoryMarks: theory,
    practicalMarks: practical,
    internalMarks: 30,
    externalMarks: theory || practical,
    totalMarks: theory + practical + 30,
    passingMarks: Math.round((theory + practical + 30) * 0.4),
    weeklyTheoryHours: type === "Practical" ? 0 : 3,
    weeklyPracticalHours: type === "Theory" ? 0 : 2,
    selfLearningHours: 2,
    status: "Active",
    description: `${name} as per K-2024 scheme.`,
  };
});

const COURSE_TYPE_ROWS: AdminRecord[] = COURSE_TYPES.map((t, i) => ({
  id: uid("ctp", i + 1),
  courseTypeCode: t.slice(0, 3).toUpperCase(),
  courseTypeName: t,
  category: t === "Elective" || t === "Audit" ? "Optional" : "Core",
  creditsAllowed: t === "Project" ? 6 : 4,
  assessmentType: t === "Practical" ? "Internal + External Practical" : "Internal + Theory",
  status: "Active",
}));

const COURSE_MAPPING_ROWS: AdminRecord[] = COURSE_SEED.map(([code, name, , sem, credits], i) => ({
  id: uid("csm", i + 1),
  scheme: i % 5 === 0 ? "K-2021" : "K-2024",
  program: "Diploma in Engineering",
  branch: "Information Technology",
  semester: sem,
  courseCode: code,
  courseName: name,
  courseType: COURSE_ROWS[i]!.courseType as string,
  credits,
  effectiveFrom: i % 5 === 0 ? "2021-07-01" : "2024-07-01",
  effectiveTo: i % 5 === 0 ? "2024-06-30" : "",
  status: i % 5 === 0 ? "Inactive" : "Active",
}));

/* ------------------------------------------------------------------ */
/* People                                                              */
/* ------------------------------------------------------------------ */

const STUDENT_COUNT = 48;
const STUDENT_ROWS: AdminRecord[] = Array.from({ length: STUDENT_COUNT }, (_, i) => {
  const r = rng(i + 7);
  const branch = pick(BRANCH_NAMES.slice(0, 3), r());
  const semIndex = Math.floor(r() * 6);
  const admission = pick(
    ["Admitted", "Admitted", "Admitted", "Fee Paid", "Fee Pending", "Eligible", "Cancelled"],
    r(),
  );
  const fee = admission === "Admitted" || admission === "Fee Paid" ? "Paid" : "Pending";
  const reg = admission === "Admitted" ? pick(["Finalized", "Approved", "Submitted", "Draft"], r()) : "Not Eligible";
  const name = `${pick(LAST, r())} ${pick(FIRST, r())} ${pick(MIDDLE, r())}`;
  return {
    id: uid("stu", i + 1),
    enrollNo: `2${BRANCH_CODES[branch]}${String(24000 + i * 7).padStart(5, "0")}`,
    studentName: name,
    rollNo: String(i + 1).padStart(3, "0"),
    program: "Diploma in Engineering",
    branch,
    semester: SEMESTER_NAMES[semIndex]!,
    division: pick(DIVISIONS, r()),
    batch: pick(BATCHES, r()),
    academicYear: "2026-27",
    scheme: "K-2024",
    admissionStatus: admission,
    feeStatus: fee,
    registrationStatus: reg,
    status: admission === "Cancelled" ? "Inactive" : "Active",
    gender: i % 3 === 0 ? "Female" : "Male",
    dateOfBirth: `200${5 + (i % 4)}-0${1 + (i % 9)}-1${i % 9}`,
    bloodGroup: pick(["A+", "B+", "O+", "AB+"], r()),
    category: pick(["OPEN", "OBC", "SC", "ST", "VJNT", "EWS"], r()),
    admissionCategory: pick(["CAP Round 1", "CAP Round 2", "Institute Level"], r()),
    dteApplicationId: `DTE2026${String(100000 + i * 13)}`,
    directSecondYear: semIndex >= 2 && i % 5 === 0 ? "Yes" : "No",
    admissionDate: "2026-07-15",
    admissionType: "Regular",
    mobile: `98${String(20000000 + i * 137).slice(0, 8)}`,
    alternateMobile: `70${String(30000000 + i * 91).slice(0, 8)}`,
    email: `${name.split(" ")[1]?.toLowerCase()}.${i}@gpkolhapur.ac.in`,
    correspondenceAddress: `${100 + i}, Shivaji Peth`,
    permanentAddress: `${100 + i}, Shivaji Peth`,
    city: pick(["Kolhapur", "Ichalkaranji", "Sangli", "Karad"], r()),
    district: "Kolhapur",
    state: "Maharashtra",
    pin: "416012",
    country: "India",
    fatherName: `${name.split(" ")[0]} ${pick(MIDDLE, r())}`,
    motherName: `${name.split(" ")[0]} ${pick(FIRST, r())}`,
    guardianName: `${name.split(" ")[0]} ${pick(MIDDLE, r())}`,
    guardianMobile: `99${String(10000000 + i * 173).slice(0, 8)}`,
    guardianEmail: `guardian${i}@example.com`,
    occupation: pick(["Farmer", "Service", "Business", "Self Employed"], r()),
    aadhaarNumber: `XXXX XXXX ${String(1000 + i)}`,
    accountHolder: name,
    accountNumber: `3512${String(100000000 + i * 977)}`,
    ifsc: "SBIN0000834",
    bank: "State Bank of India",
    bankBranch: "Kolhapur Main",
  };
});

const FACULTY_ROWS: AdminRecord[] = Array.from({ length: 18 }, (_, i) => {
  const r = rng(i + 31);
  const name = `Prof. ${pick(FIRST, r()).charAt(0)}. ${pick(MIDDLE, r()).charAt(0)}. ${pick(LAST, r())}`;
  const dept = pick(DEPARTMENTS, r());
  return {
    id: uid("fac", i + 1),
    facultyId: `DTE${BRANCH_CODES[dept] ?? "SH"}M${9000 + i}`,
    employeeId: `EMP${String(1200 + i)}`,
    facultyName: name,
    department: dept,
    designation: pick(["Lecturer", "Senior Lecturer", "HOD", "Workshop Superintendent"], r()),
    mobile: `94${String(20000000 + i * 311).slice(0, 8)}`,
    email: `faculty${i}@gpkolhapur.ac.in`,
    joiningDate: `20${10 + (i % 12)}-06-15`,
    qualification: pick(["M.E. (Computer)", "M.Tech (IT)", "M.E. (Mech)", "Ph.D."], r()),
    experience: `${5 + (i % 20)} years`,
    status: i % 9 === 0 ? "Inactive" : "Active",
    publications: "IEEE / IJERT conference papers (prototype free-text)",
    research: "Applied ML in academic analytics",
    memberships: "ISTE Life Member",
    awards: "Best Teacher Award 2023",
    projects: "AICTE MODROB grant — Networking Lab",
    consultancy: "Industry training programmes",
  };
});

/* ------------------------------------------------------------------ */
/* Admissions                                                          */
/* ------------------------------------------------------------------ */

const ADMISSION_SETTINGS_ROWS: AdminRecord[] = ACADEMIC_YEARS.slice(0, 2).map((y, i) => ({
  id: uid("ads", i + 1),
  academicYear: y,
  admissionStartDate: `20${y.slice(0, 2)}-07-01`,
  admissionEndDate: `20${y.slice(0, 2)}-08-15`,
  lateAdmissionStartDate: `20${y.slice(0, 2)}-08-16`,
  lateAdmissionEndDate: `20${y.slice(0, 2)}-08-31`,
  applicablePrograms: "Diploma in Engineering",
  applicableBranches: "All Branches",
  admissionType: "Regular",
  eligibilityRule: "Standard Promotion Rule",
  feeRequired: "Yes",
  autoAdmissionAfterPayment: i === 0 ? "Yes" : "No",
  status: i === 0 ? "Active" : "Inactive",
}));

const ADMISSION_ELIGIBILITY_ROWS: AdminRecord[] = [
  {
    id: uid("aer", 1),
    ruleName: "Standard Promotion Rule",
    academicYear: "2026-27",
    program: "Diploma in Engineering",
    branch: "All Branches",
    semester: "Semester 3",
    requiredCredits: 40,
    requiredSubjects: "All Semester 1 courses",
    backlogLimit: 4,
    previousSemesterRequirement: "Semester 2 result declared",
    admissionType: "Regular",
    status: "Active",
  },
  {
    id: uid("aer", 2),
    ruleName: "Direct Second Year (DSE)",
    academicYear: "2026-27",
    program: "Diploma in Engineering",
    branch: "All Branches",
    semester: "Semester 3",
    requiredCredits: 0,
    requiredSubjects: "HSC / ITI qualification",
    backlogLimit: 0,
    previousSemesterRequirement: "Not applicable",
    admissionType: "Direct Second Year",
    status: "Active",
  },
  {
    id: uid("aer", 3),
    ruleName: "Final Year Promotion",
    academicYear: "2026-27",
    program: "Diploma in Engineering",
    branch: "All Branches",
    semester: "Semester 5",
    requiredCredits: 80,
    requiredSubjects: "All Semester 1-3 courses",
    backlogLimit: 6,
    previousSemesterRequirement: "Semester 4 result declared",
    admissionType: "Regular",
    status: "Draft",
  },
];

const ELIGIBLE_STUDENT_ROWS: AdminRecord[] = STUDENT_ROWS.slice(0, 24).map((s, i) => ({
  id: uid("elg", i + 1),
  enrollNo: s.enrollNo,
  studentName: s.studentName,
  program: s.program,
  branch: s.branch,
  semester: s.semester,
  eligibilityStatus: i % 7 === 0 ? "Not Eligible" : "Eligible",
  eligibilityReason: i % 7 === 0 ? "Backlog limit exceeded (6 > 4)" : "All conditions satisfied",
  feeStatus: s.feeStatus,
  admissionStatus: s.admissionStatus,
  dateEvaluated: "2026-07-05",
}));

const ADMISSION_FEE_ROWS: AdminRecord[] = STUDENT_ROWS.slice(0, 24).map((s, i) => {
  const applicable = 9850;
  const paid = s.feeStatus === "Paid" ? applicable : i % 3 === 0 ? 5000 : 0;
  return {
    id: uid("afe", i + 1),
    enrollNo: s.enrollNo,
    studentName: s.studentName,
    applicableFee: applicable,
    feeMarked: "Yes",
    amountPaid: paid,
    amountPending: applicable - paid,
    paymentStatus: paid === applicable ? "Successful" : paid > 0 ? "Pending" : "Pending",
    lastPaymentDate: paid ? "2026-07-12" : "",
    paymentReference: paid ? `PAY${String(78000 + i)}` : "",
    admissionStatus: s.admissionStatus,
  };
});

const ADMITTED_ROWS: AdminRecord[] = STUDENT_ROWS.filter((s) => s.admissionStatus === "Admitted").map(
  (s, i) => ({
    id: uid("adm", i + 1),
    enrollNo: s.enrollNo,
    studentName: s.studentName,
    program: s.program,
    branch: s.branch,
    semester: s.semester,
    admissionDate: "2026-07-15",
    admissionType: "Regular",
    feeStatus: s.feeStatus,
    admissionStatus: "Admitted",
  }),
);

/* ------------------------------------------------------------------ */
/* Fees                                                                */
/* ------------------------------------------------------------------ */

const FEE_HEAD_ROWS: AdminRecord[] = [
  ["FH-ADM", "Admission Fee", "Admission", "4001"],
  ["FH-EXM", "Examination Fee", "Examination", "4002"],
  ["FH-LTE", "Late Fee", "Penalty", "4003"],
  ["FH-PRC", "Processing Fee", "Service", "4004"],
  ["FH-SRV", "Service Fee", "Service", "4005"],
  ["FH-IDC", "Duplicate ID Card Fee", "Service", "4006"],
  ["FH-PHC", "Photocopy / Verification Fee", "Examination", "4007"],
].map(([code, name, category, acc], i) => ({
  id: uid("fhd", i + 1),
  feeHeadCode: code,
  feeHeadName: name,
  category,
  accountingCode: acc,
  description: `${name} collected through the EDVANA payment gateway.`,
  status: "Active",
}));

const FEE_STRUCTURE_ROWS: AdminRecord[] = SEMESTER_NAMES.flatMap((sem, si) =>
  ["Admission Fee", "Examination Fee"].map((head, hi) => ({
    id: uid("fst", si * 10 + hi + 1),
    academicYear: "2026-27",
    scheme: "K-2024",
    program: "Diploma in Engineering",
    branch: "Information Technology",
    semester: sem,
    feeHead: head,
    amount: head === "Admission Fee" ? 9850 : 1450,
    effectiveFrom: "2026-07-01",
    effectiveTo: "",
    mandatory: "Yes",
    status: "Active",
  })),
);

const PAYMENT_ROWS: AdminRecord[] = STUDENT_ROWS.slice(0, 30).map((s, i) => {
  const r = rng(i + 101);
  return {
    id: uid("pay", i + 1),
    transactionId: `TXN${String(90000000 + i * 371)}`,
    enrollNo: s.enrollNo,
    studentName: s.studentName,
    paymentType: pick(["Admission Fee", "Examination Fee", "Duplicate ID Card Fee"], r()),
    feeHead: pick(["Admission Fee", "Examination Fee", "Late Fee"], r()),
    amount: pick([9850, 1450, 300, 150], r()),
    paymentMethod: pick(["UPI", "Net Banking", "Debit Card", "Credit Card"], r()),
    paymentDate: `2026-07-${String(5 + (i % 20)).padStart(2, "0")}`,
    referenceId: `REF${String(4400000 + i * 53)}`,
    status: pick(
      ["Successful", "Successful", "Successful", "Pending", "Failed", "Verification Pending", "Refunded"],
      r(),
    ),
  };
});

/* ------------------------------------------------------------------ */
/* Examinations                                                        */
/* ------------------------------------------------------------------ */

const EXAM_SESSION_ROWS: AdminRecord[] = EXAM_SESSIONS.map((name, i) => ({
  id: uid("exs", i + 1),
  examSessionName: name,
  academicYear: i < 2 ? "2026-27" : "2025-26",
  semester: i % 2 === 0 ? "Semester 4" : "Semester 3",
  examType: pick(["Regular", "Regular + Backlog", "Backlog", "Repeater"], rng(i + 5)()),
  startDate: i === 0 ? "2026-04-20" : "2025-11-18",
  endDate: i === 0 ? "2026-05-12" : "2025-12-08",
  registrationStartDate: i === 0 ? "2026-02-01" : "2025-09-01",
  registrationEndDate: i === 0 ? "2026-02-20" : "2025-09-20",
  lateRegistrationStartDate: i === 0 ? "2026-02-21" : "2025-09-21",
  lateRegistrationEndDate: i === 0 ? "2026-02-28" : "2025-09-28",
  status: i === 0 ? "Open" : i === 1 ? "Completed" : "Closed",
}));

const REGISTRATION_SETTING_ROWS: AdminRecord[] = [
  {
    id: uid("rgs", 1),
    examSession: "SUMMER 2026",
    academicYear: "2026-27",
    semester: "Semester 4",
    registrationStart: "2026-02-01",
    registrationEnd: "2026-02-20",
    lateRegistrationStart: "2026-02-21",
    lateRegistrationEnd: "2026-02-28",
    regularCourseAllowed: "Yes",
    backlogAllowed: "Yes",
    rAllowed: "Yes",
    rRrAllowed: "Yes",
    rrAllowed: "Yes",
    maximumBacklogs: 6,
    minimumCredits: 20,
    feeRequired: "Yes",
    feedbackRequired: "Yes",
    autoEligibility: "Yes",
    manualOverrideAllowed: "Yes",
    status: "Active",
  },
];

const EXAM_ELIGIBILITY_ROWS: AdminRecord[] = [
  {
    id: uid("eer", 1),
    ruleName: "R — Regular Registration",
    examSession: "SUMMER 2026",
    conditions: "Admission Status = Admitted AND Fee Status = Paid AND Detention = No",
    registrationType: "R",
    backlogLimit: 0,
    minimumCredits: 20,
    manualOverride: "Allowed",
    status: "Active",
  },
  {
    id: uid("eer", 2),
    ruleName: "R + RR — Regular with Backlog",
    examSession: "SUMMER 2026",
    conditions: "Admission Status = Admitted AND Fee Status = Paid AND Backlog Count <= 5",
    registrationType: "R + RR",
    backlogLimit: 5,
    minimumCredits: 20,
    manualOverride: "Allowed",
    status: "Active",
  },
  {
    id: uid("eer", 3),
    ruleName: "RR — Backlog Only",
    examSession: "SUMMER 2026",
    conditions: "Academic Status = Detained/Backlog AND Fee Status = Paid",
    registrationType: "RR",
    backlogLimit: 10,
    minimumCredits: 0,
    manualOverride: "Not Allowed",
    status: "Active",
  },
];

function buildCourses(sem: string, backlogCount: number, r: () => number): RegisteredCourse[] {
  const regular = COURSE_ROWS.filter((c) => c.semester === sem).slice(0, 5);
  const backlogPool = COURSE_ROWS.filter((c) => c.semester !== sem).slice(0, backlogCount);
  return [
    ...regular.map((c) => ({
      courseCode: c.courseCode as string,
      courseName: c.courseName as string,
      courseType: c.courseType as string,
      semester: c.semester as string,
      credits: c.credits as number,
      category: "Regular" as const,
      eligible: true,
      selected: true,
      feeApplicable: true,
      status: "Eligible",
    })),
    ...backlogPool.map((c) => ({
      courseCode: c.courseCode as string,
      courseName: c.courseName as string,
      courseType: c.courseType as string,
      semester: c.semester as string,
      credits: c.credits as number,
      category: "Backlog" as const,
      eligible: r() > 0.15,
      selected: true,
      feeApplicable: true,
      status: "Backlog Attempt",
    })),
  ];
}

export const REGISTRATION_ROWS: ExamRegistration[] = STUDENT_ROWS.slice(0, 36).map((s, i) => {
  const r = rng(i + 211);
  const backlogCount = i % 4 === 0 ? 0 : i % 5 === 0 ? 4 : i % 3;
  const type = backlogCount === 0 ? "R" : i % 6 === 0 ? "RR" : "R + RR";
  const courses = type === "RR" ? buildCourses(s.semester as string, 3, r).filter((c) => c.category === "Backlog") : buildCourses(s.semester as string, backlogCount, r);
  const regStatus = pick(["Draft", "Submitted", "Under Review", "Approved", "Finalized"], r());
  return {
    id: uid("reg", i + 1),
    enrollNo: s.enrollNo as string,
    studentName: s.studentName as string,
    program: s.program as string,
    branch: s.branch as string,
    semester: s.semester as string,
    division: s.division as string,
    registrationType: type as ExamRegistration["registrationType"],
    regularCount: courses.filter((c) => c.category === "Regular").length,
    backlogCount: courses.filter((c) => c.category === "Backlog").length,
    totalCredits: courses.reduce((a, c) => a + c.credits, 0),
    feeStatus: s.feeStatus as string,
    registrationStatus: regStatus,
    finalizationStatus: regStatus === "Finalized" ? "Finalized" : "Pending",
    finalRegistrationNo: regStatus === "Finalized" ? `FR/SU26/${String(1000 + i)}` : "",
    finalizedOn: regStatus === "Finalized" ? "2026-02-22" : "",
    finalizedBy: regStatus === "Finalized" ? "admin01" : "",
    courses,
  };
});

const EXAM_COURSE_ROWS: AdminRecord[] = COURSE_ROWS.slice(0, 14).map((c, i) => ({
  id: uid("exc", i + 1),
  examSession: "SUMMER 2026",
  courseCode: c.courseCode,
  courseName: c.courseName,
  courseType: c.courseType,
  semester: c.semester,
  scheme: "K-2024",
  maximumMarks: c.externalMarks,
  passingMarks: Math.round((c.externalMarks as number) * 0.4),
  examMode: c.courseType === "Practical" ? "Practical" : "Theory",
  examDuration: c.courseType === "Practical" ? "180 min" : "150 min",
  examApplicable: "Yes",
  status: "Active",
}));

const TIMETABLE_ROWS: AdminRecord[] = COURSE_ROWS.slice(0, 12).map((c, i) => {
  const day = 20 + i * 2;
  const date = new Date(Date.UTC(2026, 3, day));
  return {
    id: uid("ttb", i + 1),
    examSession: "SUMMER 2026",
    examDate: date.toISOString().slice(0, 10),
    day: date.toLocaleDateString("en-IN", { weekday: "long", timeZone: "UTC" }),
    courseCode: c.courseCode,
    courseName: c.courseName,
    startTime: i % 2 === 0 ? "10:00" : "14:00",
    endTime: i % 2 === 0 ? "12:30" : "16:30",
    duration: "150 min",
    semester: c.semester,
    program: "Diploma in Engineering",
    branch: "Information Technology",
    examType: "Regular + Backlog",
    venue: `Block A — Room ${101 + i}`,
    registered: 40 + ((i * 7) % 25),
    rCount: 30 + (i % 10),
    rRrCount: 6 + (i % 5),
    rrCount: 2 + (i % 4),
    status: i < 8 ? "Published" : "Draft",
  };
});

const TIMETABLE_SETTINGS_ROWS: AdminRecord[] = [
  {
    id: uid("tts", 1),
    examSession: "SUMMER 2026",
    academicYear: "2026-27",
    semester: "Semester 4",
    startDate: "2026-04-20",
    endDate: "2026-05-12",
    defaultStartTime: "10:00",
    defaultEndTime: "12:30",
    breakRules: "Minimum 1 day gap between theory papers",
    status: "Active",
  },
];

/* ------------------------------------------------------------------ */
/* Academic operations                                                 */
/* ------------------------------------------------------------------ */

const INTERNAL_ASSESSMENT_ROWS: AdminRecord[] = COURSE_ROWS.slice(0, 10).map((c, i) => ({
  id: uid("ias", i + 1),
  academicYear: "2026-27",
  semester: c.semester,
  program: "Diploma in Engineering",
  branch: "Information Technology",
  course: `${c.courseCode} — ${c.courseName}`,
  pattern: "UT1 + UT2 + FA-PR + SA-PR + SLA",
  maximumMarks: 30,
  passingMarks: 12,
  submissionDeadline: "2026-03-25",
  finalizationDate: "2026-03-31",
  status: i % 3 === 0 ? "Locked" : "Active",
}));

const MARKS_MONITORING_ROWS: AdminRecord[] = COURSE_ROWS.slice(0, 12).map((c, i) => {
  const total = 55 + (i % 10);
  const entered = i % 4 === 0 ? total : Math.round(total * (0.4 + (i % 5) * 0.1));
  return {
    id: uid("mkm", i + 1),
    course: `${c.courseCode} — ${c.courseName}`,
    faculty: FACULTY_ROWS[i % FACULTY_ROWS.length]!.facultyName,
    program: "Diploma in Engineering",
    branch: "Information Technology",
    semester: c.semester,
    studentCount: total,
    entered,
    pending: total - entered,
    finalized: entered === total ? "Yes" : "No",
    submissionDeadline: "2026-03-25",
    status: entered === total ? "Finalized" : entered === 0 ? "Not Started" : "In Progress",
  };
});

const DETENTION_ROWS: AdminRecord[] = STUDENT_ROWS.slice(0, 14).map((s, i) => ({
  id: uid("det", i + 1),
  enrollNo: s.enrollNo,
  studentName: s.studentName,
  program: s.program,
  branch: s.branch,
  semester: s.semester,
  course: `${COURSE_ROWS[i % COURSE_ROWS.length]!.courseCode} — ${COURSE_ROWS[i % COURSE_ROWS.length]!.courseName}`,
  attendance: `${52 + ((i * 3) % 30)}%`,
  reason: i % 3 === 0 ? "Attendance below 75%" : "Internal marks not secured",
  detentionStatus: pick(["Provisional", "Confirmed", "Nil Detention", "Final"], rng(i + 3)()),
  finalStatus: i % 4 === 0 ? "Final" : "Provisional",
  status: "Active",
}));

/* ------------------------------------------------------------------ */
/* Results                                                             */
/* ------------------------------------------------------------------ */

const RESULT_SETTINGS_ROWS: AdminRecord[] = [
  {
    id: uid("rst", 1),
    academicYear: "2026-27",
    examSession: "SUMMER 2026",
    semester: "Semester 4",
    scheme: "K-2024",
    resultRuleVersion: "v3.0",
    passingRule: "40% External + 40% Internal, 40% Aggregate",
    condonationRule: "Up to 2 marks in one course",
    graceRule: "Maximum 1% of total marks",
    gradeRule: "Absolute grading (O/A+/A/B+/B/C/F)",
    backlogRule: "Failed course carried to next attempt",
    status: "Active",
  },
  {
    id: uid("rst", 2),
    academicYear: "2025-26",
    examSession: "WINTER 2025",
    semester: "Semester 3",
    scheme: "K-2024",
    resultRuleVersion: "v2.4",
    passingRule: "40% External, 40% Aggregate",
    condonationRule: "Not applicable",
    graceRule: "Maximum 1% of total marks",
    gradeRule: "Absolute grading",
    backlogRule: "Failed course carried to next attempt",
    status: "Archived",
  },
];

const RESULT_PROCESSING_ROWS: AdminRecord[] = STUDENT_ROWS.slice(0, 30).flatMap((s, i) =>
  COURSE_ROWS.slice(i % 4, (i % 4) + 2).map((c, j) => {
    const internal = 15 + ((i + j * 3) % 15);
    const external = 20 + ((i * 5 + j) % 50);
    const total = internal + external;
    const pass = total >= 40;
    return {
      id: uid("rsp", i * 10 + j + 1),
      enrollNo: s.enrollNo,
      studentName: s.studentName,
      courseCode: c.courseCode,
      courseName: c.courseName,
      internal,
      external,
      total,
      credits: c.credits,
      result: pass ? "Pass" : "Fail",
      attempt: (i % 3) + 1,
      backlog: pass ? "No" : "Yes",
      status: pick(["Imported", "Processing", "Verification Pending", "Approved", "Finalized"], rng(i + j + 17)()),
    };
  }),
);

const VERIFICATION_ROWS: AdminRecord[] = [
  ["Missing external marks", "Error", "ITH302", "2IT24021"],
  ["Invalid total (internal + external mismatch)", "Error", "ITH301", "2IT24035"],
  ["Course not mapped to scheme K-2024", "Error", "CCH205", "2IT24042"],
  ["Duplicate result record", "Error", "ITH205", "2IT24007"],
  ["Passing-rule violation — grace applied", "Warning", "ITH401", "2CO24014"],
  ["Credit mismatch with course master", "Warning", "ITH402", "2CO24028"],
  ["Student mapping not found in master", "Error", "ITH505", "2ME24003"],
  ["Missing internal marks", "Warning", "ITH601", "2IT24019"],
].map(([message, severity, course, enroll], i) => ({
  id: uid("vfy", i + 1),
  message,
  severity,
  courseCode: course,
  enrollNo: enroll,
  branch: "Information Technology",
  semester: SEMESTER_NAMES[i % 6]!,
  status: i % 3 === 0 ? "Open" : "Reviewed",
}));

const BACKLOG_ROWS: AdminRecord[] = STUDENT_ROWS.slice(0, 20).map((s, i) => {
  const c = COURSE_ROWS[(i * 3) % COURSE_ROWS.length]!;
  return {
    id: uid("bkl", i + 1),
    enrollNo: s.enrollNo,
    studentName: s.studentName,
    courseCode: c.courseCode,
    courseName: c.courseName,
    originalSemester: c.semester,
    attemptNumber: (i % 3) + 1,
    latestAttempt: i % 2 === 0 ? "SUMMER 2026" : "WINTER 2025",
    result: i % 4 === 0 ? "Pass" : "Fail",
    credits: c.credits,
    status: i % 4 === 0 ? "Cleared" : "Active Backlog",
  };
});

const MARKSHEET_ROWS: AdminRecord[] = STUDENT_ROWS.slice(0, 18).map((s, i) => ({
  id: uid("mks", i + 1),
  enrollNo: s.enrollNo,
  studentName: s.studentName,
  program: s.program,
  branch: s.branch,
  scheme: "K-2024",
  semester: s.semester,
  examSession: i % 2 === 0 ? "SUMMER 2026" : "WINTER 2025",
  totalCredits: 22,
  earnedCredits: i % 5 === 0 ? 18 : 22,
  semesterResult: i % 5 === 0 ? "Fail" : "Pass",
  backlogStatus: i % 5 === 0 ? "1 Backlog" : "Nil",
  status: i % 3 === 0 ? "Finalized" : "Verification Pending",
}));

/* ------------------------------------------------------------------ */
/* Users & access                                                      */
/* ------------------------------------------------------------------ */

const USER_ROWS: AdminRecord[] = [
  ["admin01", "System Admin", "Admin", "EMP1001"],
  ["staff01", "Student Section Clerk", "Administrative", "EMP1002"],
  ["accounts01", "Accounts Officer", "Administrative", "EMP1003"],
  ["examclerk01", "Exam Clerk", "Administrative", "EMP1004"],
  ["faculty01", "Prof. S. S. Bhosale", "Faculty", "EMP1005"],
  ["faculty02", "Prof. A. R. Patil", "Faculty", "EMP1006"],
  ["student01", "PUKALE NIKHIL UTTAM", "Student", "2IT24000"],
].map(([username, name, profile, empId], i) => ({
  id: uid("usr", i + 1),
  username,
  employeeId: empId,
  name,
  email: `${username}@gpkolhapur.ac.in`,
  mobile: `98${String(23000000 + i * 517).slice(0, 8)}`,
  baseProfile: profile,
  lastLogin: `2026-08-1${i % 3} 09:${10 + i}`,
  firstLogin: i > 4 ? "Yes" : "No",
  passwordStatus: i > 4 ? "Change Required" : "Set",
  status: "Active",
}));

const ROLE_ROWS: AdminRecord[] = [
  ["Teacher", "TCH", "Faculty"],
  ["Class Teacher", "CLT", "Faculty"],
  ["HOD", "HOD", "Faculty"],
  ["Principal", "PRN", "Faculty"],
  ["Academic Coordinator", "ACC", "Faculty"],
  ["Theory Exam Coordinator", "TEC", "Faculty"],
  ["Online Exam Coordinator", "OEC", "Faculty"],
  ["Detention Incharge", "DTI", "Faculty"],
  ["Student Section", "STS", "Administrative"],
  ["Accounts", "ACT", "Administrative"],
  ["Library", "LIB", "Administrative"],
  ["Hostel", "HST", "Administrative"],
  ["Gymkhana", "GYM", "Administrative"],
  ["Exam Clerk", "EXC", "Administrative"],
  ["System Administrator", "SYS", "Admin"],
].map(([roleName, roleCode, baseProfile], i) => ({
  id: uid("rol", i + 1),
  roleName,
  roleCode,
  baseProfile,
  description: `${roleName} responsibilities within EDVANA.`,
  status: "Active",
}));

const MODULES = [
  "student",
  "faculty",
  "admission",
  "fee",
  "registration",
  "timetable",
  "result",
  "report",
  "settings",
];
const ACTIONS = ["view", "create", "edit", "delete", "approve", "finalize", "import", "export", "configure"];

const PERMISSION_ROWS: AdminRecord[] = MODULES.flatMap((m, mi) =>
  ACTIONS.map((a, ai) => ({
    id: uid("prm", mi * 20 + ai + 1),
    permissionCode: `${m}.${a}`,
    permissionName: `${a[0]!.toUpperCase()}${a.slice(1)} ${m}`,
    module: m,
    action: a,
    description: `Allows the holder to ${a} ${m} records.`,
    status: "Active",
  })),
);

const ROLE_ASSIGNMENT_ROWS: AdminRecord[] = [
  ["admin01", "System Administrator", "Administration", "2026-27"],
  ["staff01", "Student Section", "Administration", "2026-27"],
  ["accounts01", "Accounts", "Administration", "2026-27"],
  ["examclerk01", "Exam Clerk", "Examination", "2026-27"],
  ["faculty01", "HOD", "Information Technology", "2026-27"],
  ["faculty01", "Teacher", "Information Technology", "2025-26"],
  ["faculty02", "Class Teacher", "Computer Engineering", "2026-27"],
].map(([user, role, department, year], i) => ({
  id: uid("ura", i + 1),
  user,
  role,
  department,
  academicYear: year,
  effectiveFrom: `20${(year as string).slice(0, 2)}-07-01`,
  effectiveTo: `20${(year as string).slice(5)}-06-30`,
  status: year === "2026-27" ? "Active" : "Inactive",
}));

/* ------------------------------------------------------------------ */
/* Data management                                                     */
/* ------------------------------------------------------------------ */

const IMPORT_JOB_ROWS: AdminRecord[] = [
  ["DTE_Admission_2026.xlsx", "Students", 412, 398, 8, 6, "Completed"],
  ["Academic_History_IT.csv", "Academic History", 1280, 1274, 4, 2, "Completed"],
  ["Result_Winter2025.xlsx", "Results", 964, 940, 12, 12, "Completed with Errors"],
  ["Backlog_Master.csv", "Backlogs", 220, 220, 0, 0, "Completed"],
  ["Registration_Summer2026.xlsx", "Registration Data", 540, 0, 0, 0, "Pending"],
].map(([filename, importType, total, imported, skipped, errors, status], i) => ({
  id: uid("imp", i + 1),
  filename,
  importType,
  totalRows: total,
  imported,
  skipped,
  errors,
  warnings: (errors as number) + 3,
  duplicates: i,
  uploadedBy: "admin01",
  timestamp: `2026-07-${String(10 + i).padStart(2, "0")} 11:${20 + i}`,
  status,
}));

export const IMPORT_COLUMN_MAPPING: ColumnMapping[] = [
  { sourceColumn: "APPLICATION_ID", destinationField: "dteApplicationId", required: true, sampleValue: "DTE2026100013", status: "Mapped" },
  { sourceColumn: "CANDIDATE_NAME", destinationField: "studentName", required: true, sampleValue: "PATIL SAYALI SANJAY", status: "Mapped" },
  { sourceColumn: "GENDER", destinationField: "gender", required: true, sampleValue: "Female", status: "Mapped" },
  { sourceColumn: "DOB", destinationField: "dateOfBirth", required: true, sampleValue: "12/03/2007", status: "Mapped" },
  { sourceColumn: "CATEGORY", destinationField: "category", required: false, sampleValue: "OBC", status: "Mapped" },
  { sourceColumn: "BRANCH_ALLOTTED", destinationField: "branch", required: true, sampleValue: "Information Technology", status: "Mapped" },
  { sourceColumn: "MOBILE", destinationField: "mobile", required: true, sampleValue: "9822000011", status: "Mapped" },
  { sourceColumn: "SEAT_TYPE", destinationField: "admissionCategory", required: false, sampleValue: "CAP Round 1", status: "Unmapped" },
  { sourceColumn: "REMARK", destinationField: "", required: false, sampleValue: "-", status: "Ignored" },
];

export const IMPORT_VALIDATION_ISSUES: ImportValidationIssue[] = [
  { row: 14, field: "dateOfBirth", message: "Invalid date format (expected DD/MM/YYYY)", severity: "Error" },
  { row: 27, field: "branch", message: "Branch 'INFO TECH' not found in master data", severity: "Error" },
  { row: 39, field: "enrollNo", message: "Duplicate enrollment number in file", severity: "Error" },
  { row: 52, field: "scheme", message: "Scheme not resolved — will default to K-2024", severity: "Warning" },
  { row: 66, field: "email", message: "Optional field missing", severity: "Warning" },
  { row: 81, field: "studentName", message: "Student already exists — record will be updated", severity: "Warning" },
];

/* ------------------------------------------------------------------ */
/* Settings (singleton forms)                                          */
/* ------------------------------------------------------------------ */

export const SYSTEM_SETTINGS: Record<string, Record<string, string>> = {
  general: {
    institutionName: "Government Polytechnic Kolhapur",
    shortName: "GPK",
    address: "Vidyanagar, Kolhapur, Maharashtra 416004",
    contact: "0231-2650525",
    email: "principal@gpkolhapur.ac.in",
    website: "https://gpkolhapur.ac.in",
    timezone: "Asia/Kolkata (UTC+05:30)",
    defaultLanguage: "English",
  },
  semester: {
    currentAcademicYear: "2026-27",
    currentSemester: "Semester 4",
    activeTerm: "SUMMER 2026",
    semesterStartDate: "2026-01-05",
    semesterEndDate: "2026-05-20",
    promotionStatus: "Not Started",
    previousSemesterLocked: "Yes",
  },
  examination: {
    defaultExamDuration: "150 min",
    defaultRegistrationWindow: "20 days",
    lateRegistrationRule: "Late fee ₹300 after registration end date",
    defaultPassingRule: "40% External + 40% Aggregate",
    markEntryLocking: "Auto lock on deadline",
    resultLocking: "Locked after finalization",
    timetableFinalization: "Requires Exam Coordinator approval",
  },
  admission: {
    admissionAuthority: "DTE Maharashtra (CAP)",
    institutionLevelQuota: "20%",
    defaultAdmissionType: "Regular",
    feeRequiredForAdmission: "Yes",
    autoAdmissionAfterPayment: "Yes",
  },
  registration: {
    defaultRegistrationType: "R + RR",
    defaultMaximumBacklogs: "6",
    defaultMinimumCredits: "20",
    feedbackMandatory: "Yes",
    manualOverrideAllowed: "Yes",
  },
};

/* ------------------------------------------------------------------ */
/* Dashboard, profile, academic history                                */
/* ------------------------------------------------------------------ */

export const ADMIN_PROFILE: AdminProfile = {
  name: "System Admin",
  username: "admin01",
  role: "System Administrator",
  employeeId: "EMP1001",
  department: "Administration",
  email: "admin@gpkolhapur.ac.in",
  mobile: "9822001001",
  lastLogin: "2026-08-12 09:05",
};

export const ADMIN_DASHBOARD: AdminDashboard = {
  academicYear: "2026-27",
  term: "Semester 4",
  examSession: "SUMMER 2026",
  kpis: [
    { label: "Total Students", value: 1482, hint: "All programs" },
    { label: "Active Students", value: 1394 },
    { label: "Eligible Students", value: 1268 },
    { label: "Admitted Students", value: 1187 },
    { label: "Fee Pending", value: 214 },
    { label: "Fee Paid", value: 1268 },
    { label: "Exam Registered", value: 1104 },
    { label: "Backlog Students", value: 236 },
    { label: "R Registrations", value: 812 },
    { label: "R + RR Registrations", value: 241 },
    { label: "RR Registrations", value: 51 },
    { label: "Result Pending", value: 318 },
  ],
  admission: [
    { label: "Eligible", value: 1268 },
    { label: "Fee Marked", value: 1240 },
    { label: "Fee Paid", value: 1187 },
    { label: "Admitted", value: 1187 },
    { label: "Pending", value: 81 },
  ],
  registration: [
    { label: "R", value: 812 },
    { label: "R + RR", value: 241 },
    { label: "RR", value: 51 },
    { label: "Pending", value: 128 },
    { label: "Finalized", value: 976 },
  ],
  result: [
    { label: "Passed", value: 864 },
    { label: "Failed", value: 172 },
    { label: "Result Pending", value: 318 },
    { label: "Backlogs Generated", value: 236 },
  ],
};

export function academicHistoryFor(enrollNo: string): AcademicHistoryRow[] {
  const r = rng(enrollNo.length * 13 + 5);
  return SEMESTER_NAMES.slice(0, 4).flatMap((sem, si) =>
    COURSE_ROWS.filter((c) => c.semester === sem)
      .slice(0, 4)
      .map((c, ci) => {
        const fail = r() < 0.12;
        return {
          session: si % 2 === 0 ? "WINTER 2025" : "SUMMER 2026",
          semester: sem,
          courseCode: c.courseCode as string,
          courseName: c.courseName as string,
          attemptType: (ci === 0 && si === 1 ? "RR" : "R") as "R" | "RR",
          credits: c.credits as number,
          marks: fail ? 28 + ci : 55 + ((si * 7 + ci * 5) % 40),
          result: fail ? "Fail" : "Pass",
          backlog: fail,
        };
      }),
  );
}

export const RESULT_ANALYSIS = {
  kpis: [
    { label: "Total Students", value: 1104 },
    { label: "Appeared", value: 1082 },
    { label: "Passed", value: 864 },
    { label: "Failed", value: 218 },
    { label: "Pass %", value: 79.9 },
    { label: "Backlog %", value: 20.1 },
    { label: "Average Marks", value: 62.4 },
    { label: "Highest Marks", value: 96 },
  ],
  courseWise: COURSE_ROWS.slice(0, 10).map((c, i) => ({
    id: uid("ran", i + 1),
    courseCode: c.courseCode,
    courseName: c.courseName,
    appeared: 90 + ((i * 7) % 30),
    passed: 70 + ((i * 5) % 25),
    failed: 8 + (i % 12),
    passPercent: Number((70 + ((i * 3) % 25)).toFixed(1)),
    average: 55 + ((i * 4) % 18),
    highest: 88 + (i % 10),
  })),
  branchWise: BRANCH_NAMES.map((b, i) => ({
    id: uid("rbr", i + 1),
    branch: b,
    appeared: 150 + i * 12,
    passed: 120 + i * 9,
    failed: 30 + i * 3,
    passPercent: Number((75 + i).toFixed(1)),
  })),
  gradeDistribution: ["O", "A+", "A", "B+", "B", "C", "F"].map((g, i) => ({
    id: uid("rgd", i + 1),
    grade: g,
    students: [64, 142, 218, 246, 168, 96, 148][i]!,
  })),
};

/* ------------------------------------------------------------------ */
/* Seed registry consumed by the mock repository                       */
/* ------------------------------------------------------------------ */

export const ADMIN_SEED: Record<string, AdminRecord[]> = {
  "academic-years": ACADEMIC_YEAR_ROWS,
  schemes: SCHEME_ROWS,
  programs: PROGRAM_ROWS,
  branches: BRANCH_ROWS,
  semesters: SEMESTER_ROWS,
  divisions: DIVISION_ROWS,
  batches: BATCH_ROWS,
  courses: COURSE_ROWS,
  "course-types": COURSE_TYPE_ROWS,
  "course-mappings": COURSE_MAPPING_ROWS,
  students: STUDENT_ROWS,
  faculty: FACULTY_ROWS,
  "admission-settings": ADMISSION_SETTINGS_ROWS,
  "admission-eligibility": ADMISSION_ELIGIBILITY_ROWS,
  "eligible-students": ELIGIBLE_STUDENT_ROWS,
  "admission-fees": ADMISSION_FEE_ROWS,
  "admitted-students": ADMITTED_ROWS,
  "fee-heads": FEE_HEAD_ROWS,
  "fee-structures": FEE_STRUCTURE_ROWS,
  payments: PAYMENT_ROWS,
  "exam-sessions": EXAM_SESSION_ROWS,
  "registration-settings": REGISTRATION_SETTING_ROWS,
  "exam-eligibility": EXAM_ELIGIBILITY_ROWS,
  registrations: REGISTRATION_ROWS as unknown as AdminRecord[],
  "exam-courses": EXAM_COURSE_ROWS,
  timetable: TIMETABLE_ROWS,
  "timetable-settings": TIMETABLE_SETTINGS_ROWS,
  "internal-assessment": INTERNAL_ASSESSMENT_ROWS,
  "marks-monitoring": MARKS_MONITORING_ROWS,
  detentions: DETENTION_ROWS,
  "result-settings": RESULT_SETTINGS_ROWS,
  "result-processing": RESULT_PROCESSING_ROWS,
  "result-verification": VERIFICATION_ROWS,
  backlogs: BACKLOG_ROWS,
  marksheets: MARKSHEET_ROWS,
  users: USER_ROWS,
  roles: ROLE_ROWS,
  permissions: PERMISSION_ROWS,
  "role-assignments": ROLE_ASSIGNMENT_ROWS,
  "import-jobs": IMPORT_JOB_ROWS,
};
