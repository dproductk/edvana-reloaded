import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { SectionCard } from "@/components/common/SectionCard";
import { DataTable, type Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { ListToolbar, FilterSelect } from "@/features/faculty/shared/ListToolbar";
import { facultyService } from "@/services/faculty.service";
import { PROGRAMS, SEMESTERS } from "@/mock/faculty";
import { APP } from "@/constants/app";
import type {
  CourseWiseRow,
  EligibleStudentRow,
  RegisteredStudentRow,
  RegistrationListRow,
} from "@/types/faculty";

function useSearch<T>(rows: T[] | undefined, term: string, entries: number) {
  return useMemo(() => {
    const all = rows ?? [];
    const q = term.trim().toLowerCase();
    const filtered = q
      ? all.filter((r) => JSON.stringify(r).toLowerCase().includes(q))
      : all;
    return filtered.slice(0, entries);
  }, [rows, term, entries]);
}

export function EligibleStudentsTable() {
  const { data } = useQuery({
    queryKey: ["faculty", "students", "eligible"],
    queryFn: () => facultyService.getEligibleStudents(),
  });
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [program, setProgram] = useState("");
  const [term, setTerm] = useState("");
  const base = useMemo(
    () => (data ?? []).filter((r) => (program ? r.program === program : true)),
    [data, program],
  );
  const rows = useSearch(base, search, entries);

  const columns: Column<EligibleStudentRow>[] = [
    { header: "S.N.", cell: (_r, i) => i + 1, className: "w-14" },
    {
      header: "Eligibility Type",
      cell: (r) => <StatusBadge label={r.eligibilityType} tone={r.eligibilityType === "R" ? "success" : "warning"} />,
    },
    { header: "Enroll No", cell: (r) => <span className="font-mono text-xs">{r.enrollNo}</span> },
    { header: "Student Name", cell: (r) => <span className="font-medium">{r.studentName}</span> },
    { header: "Semester", cell: (r) => r.semester, align: "center" },
    { header: "Program", cell: (r) => r.program },
  ];

  if (!data) return <LoadingCard title="Students Eligible for Registration" />;

  return (
    <SectionCard title="Students Eligible for Registration">
      <ListToolbar entries={entries} onEntriesChange={setEntries} search={search} onSearchChange={setSearch}>
        <FilterSelect label="Program" value={program} onChange={setProgram} options={PROGRAMS} />
        <FilterSelect label="Term" value={term} onChange={setTerm} options={[APP.currentTerm, "WINTER 2025", "SUMMER 2025"]} />
      </ListToolbar>
      <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} />
    </SectionCard>
  );
}

export function RegisteredStudentsTable() {
  const { data } = useQuery({
    queryKey: ["faculty", "students", "registered"],
    queryFn: () => facultyService.getRegisteredStudents(),
  });
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const rows = useSearch(data, search, entries);

  const columns: Column<RegisteredStudentRow>[] = [
    { header: "S.N.", cell: (_r, i) => i + 1, className: "w-14" },
    { header: "Student Enroll No", cell: (r) => <span className="font-mono text-xs">{r.enrollNo}</span> },
    { header: "Student Name", cell: (r) => <span className="font-medium">{r.studentName}</span> },
    { header: "Semester", cell: (r) => r.semester, align: "center" },
    { header: "Program", cell: (r) => r.program },
  ];

  if (!data) return <LoadingCard title="Registered Students" />;

  return (
    <SectionCard title="Registered Students">
      <ListToolbar entries={entries} onEntriesChange={setEntries} search={search} onSearchChange={setSearch} />
      <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} />
    </SectionCard>
  );
}

export function RegistrationListTable() {
  const { data } = useQuery({
    queryKey: ["faculty", "students", "registration-list"],
    queryFn: () => facultyService.getRegistrationList(),
  });
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [program, setProgram] = useState("");
  const [semester, setSemester] = useState("");
  const [course, setCourse] = useState("");
  const [regType, setRegType] = useState("");

  const courseOptions = useMemo(
    () =>
      Array.from(
        new Set(
          (data ?? [])
            .filter((r) => (program ? r.program === program : true))
            .map((r) => r.course),
        ),
      ),
    [data, program],
  );

  const base = useMemo(
    () =>
      (data ?? []).filter(
        (r) =>
          (program ? r.program === program : true) &&
          (semester ? `Semester ${r.semester}` === semester : true) &&
          (course ? r.course === course : true) &&
          (regType ? r.regType === regType : true),
      ),
    [data, program, semester, course, regType],
  );
  const rows = useSearch(base, search, entries);

  const columns: Column<RegistrationListRow>[] = [
    { header: "S.N.", cell: (_r, i) => i + 1, className: "w-14" },
    { header: "Student Enroll No", cell: (r) => <span className="font-mono text-xs">{r.enrollNo}</span> },
    { header: "Student Name", cell: (r) => <span className="font-medium">{r.studentName}</span> },
    { header: "Semester", cell: (r) => r.semester, align: "center" },
    { header: "Reg Type", cell: (r) => r.regType, align: "center" },
    { header: "Program", cell: (r) => r.program },
    { header: "Course", cell: (r) => r.course },
  ];

  if (!data) return <LoadingCard title="Registration List" />;

  return (
    <SectionCard title="Registration List">
      <ListToolbar entries={entries} onEntriesChange={setEntries} search={search} onSearchChange={setSearch}>
        <FilterSelect label="Program" value={program} onChange={setProgram} options={PROGRAMS} />
        <FilterSelect label="Semester" value={semester} onChange={setSemester} options={SEMESTERS} />
        <FilterSelect
          label="Course"
          value={course}
          onChange={setCourse}
          options={courseOptions}
          placeholder={program && semester ? "All" : "Select Program and Semester"}
          disabled={!program || !semester}
        />
        <FilterSelect
          label="Registration Type"
          value={regType}
          onChange={setRegType}
          options={["R", "RR"]}
          placeholder="Select Registration Type"
        />
      </ListToolbar>
      <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} />
    </SectionCard>
  );
}

export function CourseWiseRegisteredTable({ sapr = false }: { sapr?: boolean }) {
  const { data } = useQuery({
    queryKey: ["faculty", "students", "course-wise", sapr],
    queryFn: () => facultyService.getCourseWise(sapr),
  });
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [program, setProgram] = useState("");
  const [semester, setSemester] = useState("");

  const base = useMemo(
    () =>
      (data ?? []).filter(
        (r) =>
          (program ? r.program === program : true) &&
          (semester ? `Semester ${r.semester}` === semester : true),
      ),
    [data, program, semester],
  );
  const rows = useSearch(base, search, entries);
  const title = sapr ? "Course-Wise Registered (SAPR)" : "Course-Wise Registered";

  const columns: Column<CourseWiseRow>[] = [
    { header: "S.N.", cell: (_r, i) => i + 1, className: "w-14" },
    { header: "Course Code", cell: (r) => <span className="font-mono text-xs">{r.courseCode}</span> },
    { header: "Course Name", cell: (r) => <span className="font-medium">{r.courseName}</span> },
    { header: "Program", cell: (r) => r.program },
    { header: "Semester", cell: (r) => r.semester, align: "center" },
    { header: "Registered Students", cell: (r) => r.registered, align: "center" },
  ];

  if (!data) return <LoadingCard title={title} />;

  return (
    <SectionCard title={title}>
      <ListToolbar
        entries={entries}
        onEntriesChange={setEntries}
        search={search}
        onSearchChange={setSearch}
        onExport={() => toast.success("Export queued — the file will download shortly.")}
      >
        <FilterSelect label="Program" value={program} onChange={setProgram} options={PROGRAMS} />
        <FilterSelect label="Semester" value={semester} onChange={setSemester} options={SEMESTERS} />
      </ListToolbar>
      <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} />
    </SectionCard>
  );
}

export function LoadingCard({ title }: { title: string }) {
  return (
    <SectionCard title={title}>
      <Skeleton className="h-48 w-full" />
    </SectionCard>
  );
}
