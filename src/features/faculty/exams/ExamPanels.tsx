import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { SectionCard } from "@/components/common/SectionCard";
import { DataTable, type Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { FilterSelect, ListToolbar } from "@/features/faculty/shared/ListToolbar";
import { LoadingCard } from "@/features/faculty/students/StudentsTables";
import { facultyService } from "@/services/faculty.service";
import { PROGRAMS } from "@/mock/faculty";
import type { MarksheetRow, QuestionBankRow, ResultAnalysisRow } from "@/types/faculty";

export function QuestionBankTable() {
  const { data } = useQuery({
    queryKey: ["faculty", "question-bank"],
    queryFn: () => facultyService.getQuestionBank(),
  });
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Pending");
  const [program, setProgram] = useState("");
  const [course, setCourse] = useState("");

  const courseOptions = useMemo(
    () => Array.from(new Set((data ?? []).map((r) => r.course))),
    [data],
  );

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    const all = (data ?? []).filter(
      (r) =>
        (status ? r.status === status : true) &&
        (program ? r.program === program : true) &&
        (course ? r.course === course : true),
    );
    return (q ? all.filter((r) => JSON.stringify(r).toLowerCase().includes(q)) : all).slice(0, entries);
  }, [data, search, entries, status, program, course]);

  const columns: Column<QuestionBankRow>[] = [
    { header: "S.N.", cell: (_r, i) => i + 1, className: "w-14" },
    {
      header: "Action",
      cell: (r) => <StatusBadge label={r.status} tone={r.status === "Approved" ? "success" : r.status === "Rejected" ? "danger" : "warning"} />,
    },
    { header: "Program", cell: (r) => r.program },
    { header: "Course", cell: (r) => r.course },
    { header: "Question Type", cell: (r) => r.questionType },
    { header: "Unit No", cell: (r) => r.unitNo },
    { header: "Question", cell: (r) => <span className="font-medium">{r.question}</span> },
    { header: "Option A", cell: (r) => r.optionA },
    { header: "Option B", cell: (r) => r.optionB },
    { header: "Option C", cell: (r) => r.optionC },
    { header: "Option D", cell: (r) => r.optionD },
  ];

  if (!data) return <LoadingCard title="Manage Question Bank" />;

  return (
    <SectionCard title="Manage Question Bank">
      <ListToolbar entries={entries} onEntriesChange={setEntries} search={search} onSearchChange={setSearch}>
        <FilterSelect
          label="Choose Approval Status"
          value={status}
          onChange={setStatus}
          options={["Pending", "Approved", "Rejected"]}
        />
        <FilterSelect label="Program" value={program} onChange={setProgram} options={PROGRAMS} />
        <FilterSelect
          label="Choose Course"
          value={course}
          onChange={setCourse}
          options={courseOptions}
          placeholder={program ? "All" : "Select Program First"}
          disabled={!program}
        />
      </ListToolbar>
      <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} />
    </SectionCard>
  );
}

export function AssignedMarksheetsTable() {
  const { data } = useQuery({
    queryKey: ["faculty", "marksheets"],
    queryFn: () => facultyService.getMarksheets(),
  });
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [day, setDay] = useState("");
  const [session, setSession] = useState("");
  const [program, setProgram] = useState("");
  const [courseCode, setCourseCode] = useState("");

  const courseOptions = useMemo(() => Array.from(new Set((data ?? []).map((r) => r.course))), [data]);

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    const all = (data ?? []).filter(
      (r) =>
        (day ? r.day === day : true) &&
        (session ? r.session === session : true) &&
        (program ? r.program === program : true) &&
        (courseCode ? r.course === courseCode : true),
    );
    return (q ? all.filter((r) => JSON.stringify(r).toLowerCase().includes(q)) : all).slice(0, entries);
  }, [data, search, entries, day, session, program, courseCode]);

  const columns: Column<MarksheetRow>[] = [
    { header: "S.N.", cell: (_r, i) => i + 1, className: "w-14" },
    {
      header: "Action",
      cell: () => <StatusBadge label="Assigned" tone="info" />,
    },
    { header: "Marksheet No.", cell: (r) => <span className="font-mono text-xs">{r.marksheetNo}</span> },
    { header: "Section", cell: (r) => r.section, align: "center" },
    { header: "Program", cell: (r) => r.program },
    { header: "Course", cell: (r) => r.course },
    { header: "Day", cell: (r) => r.day },
    { header: "Session", cell: (r) => r.session },
    { header: "Time", cell: (r) => r.time },
  ];

  if (!data) return <LoadingCard title="Assigned Marksheets" />;

  return (
    <SectionCard title="Assigned Marksheets">
      <ListToolbar entries={entries} onEntriesChange={setEntries} search={search} onSearchChange={setSearch}>
        <FilterSelect label="Day" value={day} onChange={setDay} options={["Day 1", "Day 2", "Day 3", "Day 4"]} />
        <FilterSelect label="Session" value={session} onChange={setSession} options={["Morning", "Afternoon"]} />
        <FilterSelect label="Program" value={program} onChange={setProgram} options={PROGRAMS} />
        <FilterSelect
          label="Course Code"
          value={courseCode}
          onChange={setCourseCode}
          options={courseOptions}
          placeholder="Select Day, Session & Program First"
          disabled={!day || !session || !program}
        />
      </ListToolbar>
      <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} />
    </SectionCard>
  );
}

export function ResultAnalysisTable({ term }: { term: string }) {
  const { data } = useQuery({
    queryKey: ["faculty", "result-analysis", term],
    queryFn: () => facultyService.getResultAnalysis(term),
  });
  const [program, setProgram] = useState(PROGRAMS[0]);
  const [semester, setSemester] = useState("Semester 1");

  const columns: Column<ResultAnalysisRow>[] = [
    { header: "Course Code and Name", cell: (r) => <span className="font-medium">{r.course}</span> },
    { header: "Total Students Appeared (A)", cell: (r) => r.appeared, align: "center" },
    { header: "Total Passed (P)", cell: (r) => r.passed, align: "center" },
    { header: "Total Failed", cell: (r) => r.failed, align: "center" },
    { header: "% of Passing (P/A)*100", cell: (r) => `${r.passPercent.toFixed(2)}%`, align: "center" },
    { header: "> 75%", cell: (r) => r.above75, align: "center" },
    { header: "60-75%", cell: (r) => r.band60to75, align: "center" },
    { header: "50-60%", cell: (r) => r.band50to60, align: "center" },
    { header: "40-50%", cell: (r) => r.band40to50, align: "center" },
  ];

  if (!data) return <LoadingCard title={`Result Analysis (${term})`} />;

  return (
    <SectionCard
      title={`Result Analysis (${term})`}
      description="Table 1 — course-wise pass / fail statistics."
      actions={
        <button
          type="button"
          onClick={() => toast.success("Export queued — the file will download shortly.")}
          className="rounded-md border border-border px-3 py-1.5 text-sm font-medium hover:bg-panel"
        >
          Export to Excel
        </button>
      }
    >
      <div className="mb-4 flex flex-wrap gap-4">
        <FilterSelect label="Program" value={program} onChange={setProgram} options={PROGRAMS} />
        <FilterSelect
          label="Semester"
          value={semester}
          onChange={setSemester}
          options={[1, 2, 3, 4, 5, 6].map((n) => `Semester ${n}`)}
        />
      </div>
      <DataTable columns={columns} rows={data} rowKey={(r) => r.id} />
    </SectionCard>
  );
}

export function BitwiseMarksPanel() {
  const [program, setProgram] = useState("");
  const [term, setTerm] = useState("");

  return (
    <SectionCard
      title="Bitwise Marks Download"
      description="Download the raw component-wise (bitwise) marks export for a program and term."
    >
      <div className="flex flex-wrap items-end gap-4">
        <FilterSelect label="Program" value={program} onChange={setProgram} options={PROGRAMS} placeholder="Select Program" />
        <FilterSelect
          label="Term"
          value={term}
          onChange={setTerm}
          options={["SUMMER 2026", "WINTER 2025", "SUMMER 2025"]}
          placeholder="Select Term"
        />
        <button
          type="button"
          disabled={!program || !term}
          onClick={() => toast.success("Bitwise marks export queued.")}
          className="h-9 rounded-md bg-brand px-4 text-sm font-medium text-brand-foreground disabled:opacity-50"
        >
          Download
        </button>
      </div>
    </SectionCard>
  );
}
