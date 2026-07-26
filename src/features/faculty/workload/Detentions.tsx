import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";
import { SectionCard } from "@/components/common/SectionCard";
import { DataTable, type Column } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FilterSelect, ListToolbar } from "@/features/faculty/shared/ListToolbar";
import { LoadingCard } from "@/features/faculty/students/StudentsTables";
import { facultyService } from "@/services/faculty.service";
import { DIVISIONS, PROGRAMS, SEMESTERS } from "@/mock/faculty";
import type { DetentionRow, NilDetentionRow } from "@/types/faculty";

const COURSES = ["MTH310", "MTH312", "MEH319", "CCH104"];
const STUDENTS = ["247303 - Kumbhar Sachin Sadashiv", "257301 - Onkar Namdev Chavan", "257306 - Powar Megha Shivaji"];

const detentionColumns: Column<DetentionRow>[] = [
  { header: "S.N.", cell: (_r, i) => i + 1, className: "w-14" },
  { header: "Enroll No", cell: (r) => <span className="font-mono text-xs">{r.enrollNo}</span> },
  { header: "Student Name", cell: (r) => <span className="font-medium">{r.studentName}</span> },
  { header: "Semester", cell: (r) => r.semester, align: "center" },
  { header: "Reg Type", cell: (r) => r.regType, align: "center" },
  { header: "Program", cell: (r) => r.program },
  { header: "Course", cell: (r) => r.course },
  { header: "Faculty", cell: (r) => <span className="font-mono text-xs">{r.faculty}</span> },
  { header: "Faculty Remarks", cell: (r) => r.remarks },
  { header: "Entered At", cell: (r) => r.enteredAt },
];

export function AddDetentionForm() {
  const [program, setProgram] = useState("");
  const [semester, setSemester] = useState("");
  const [course, setCourse] = useState("");
  const [student, setStudent] = useState("");
  const [remarks, setRemarks] = useState("");

  const { data } = useQuery({
    queryKey: ["faculty", "detentions", "unconfirmed"],
    queryFn: () => facultyService.getDetentions("unconfirmed"),
  });

  const add = useMutation({
    mutationFn: () => facultyService.addDetention(),
    onSuccess: () => {
      toast.success("Detention added — pending confirmation.");
      setStudent("");
      setRemarks("");
    },
    onError: () => toast.error("Could not add the detention."),
  });

  const canSubmit = program && semester && course && student && remarks.trim().length > 0;

  return (
    <div className="space-y-6">
      <SectionCard title="Add Detention" description="Detain a single student for a course.">
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (!canSubmit) {
              toast.error("Please complete all required fields.");
              return;
            }
            add.mutate();
          }}
        >
          <div className="flex flex-wrap gap-4">
            <FilterSelect label="Program" value={program} onChange={setProgram} options={PROGRAMS} placeholder="Select Program" />
            <FilterSelect label="Semester" value={semester} onChange={setSemester} options={SEMESTERS} placeholder="Select Semester" />
            <FilterSelect
              label="Course"
              value={course}
              onChange={setCourse}
              options={COURSES}
              placeholder="Select Program and Semester"
              disabled={!program || !semester}
            />
            <FilterSelect
              label="Student"
              value={student}
              onChange={setStudent}
              options={STUDENTS}
              placeholder="Select Course First"
              disabled={!course}
            />
          </div>
          <div className="max-w-xl space-y-1.5">
            <Label htmlFor="remarks">
              Remarks <span className="text-destructive">*</span>
            </Label>
            <Input
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Reason for Detention"
            />
          </div>
          <Button type="submit" size="lg" disabled={add.isPending}>
            {add.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
            Add Detention
          </Button>
        </form>
      </SectionCard>

      <SectionCard title="Unconfirmed Detention List">
        <DataTable
          columns={detentionColumns}
          rows={data ?? []}
          rowKey={(r) => r.id}
          empty="No unconfirmed detentions."
        />
      </SectionCard>
    </div>
  );
}

export function DetentionListTable({ scope }: { scope: "provisional" | "final" }) {
  const { data } = useQuery({
    queryKey: ["faculty", "detentions", scope],
    queryFn: () => facultyService.getDetentions(scope),
  });
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const title = scope === "final" ? "Final Detention List" : "Provisional Detention List";

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    const all = data ?? [];
    return (q ? all.filter((r) => JSON.stringify(r).toLowerCase().includes(q)) : all).slice(0, entries);
  }, [data, search, entries]);

  if (!data) return <LoadingCard title={title} />;

  return (
    <SectionCard title={title}>
      <ListToolbar
        entries={entries}
        onEntriesChange={setEntries}
        search={search}
        onSearchChange={setSearch}
        onExport={scope === "final" ? () => toast.success("Export queued — the file will download shortly.") : undefined}
      />
      <DataTable columns={detentionColumns} rows={rows} rowKey={(r) => r.id} />
    </SectionCard>
  );
}

export function AddNilDetentionForm() {
  const [program, setProgram] = useState("");
  const [semester, setSemester] = useState("");
  const [course, setCourse] = useState("");
  const [division, setDivision] = useState("");
  const [remarks, setRemarks] = useState("");

  const add = useMutation({
    mutationFn: () => facultyService.addNilDetention(),
    onSuccess: () => {
      toast.success("Nil detention recorded for the division.");
      setRemarks("");
    },
    onError: () => toast.error("Could not record the nil detention."),
  });

  return (
    <SectionCard
      title="Add Nil Detention"
      description="Declare that no student in this division / course is detained."
    >
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (!program || !semester || !course || !division) {
            toast.error("Please complete all required fields.");
            return;
          }
          add.mutate();
        }}
      >
        <div className="flex flex-wrap gap-4">
          <FilterSelect label="Program" value={program} onChange={setProgram} options={PROGRAMS} placeholder="Select Program" />
          <FilterSelect label="Semester" value={semester} onChange={setSemester} options={SEMESTERS} placeholder="Select Semester" />
          <FilterSelect
            label="Course"
            value={course}
            onChange={setCourse}
            options={COURSES}
            placeholder="Select Program and Semester"
            disabled={!program || !semester}
          />
          <FilterSelect
            label="Division"
            value={division}
            onChange={setDivision}
            options={DIVISIONS}
            placeholder="Select Course First"
            disabled={!course}
          />
        </div>
        <div className="max-w-xl space-y-1.5">
          <Label htmlFor="nil-remarks">Remarks</Label>
          <Input
            id="nil-remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Remarks"
          />
        </div>
        <Button type="submit" size="lg" disabled={add.isPending}>
          {add.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
          Add Nil Detention
        </Button>
      </form>
    </SectionCard>
  );
}

export function NilDetentionListTable() {
  const { data } = useQuery({
    queryKey: ["faculty", "nil-detentions"],
    queryFn: () => facultyService.getNilDetentions(),
  });
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    const all = data ?? [];
    return (q ? all.filter((r) => JSON.stringify(r).toLowerCase().includes(q)) : all).slice(0, entries);
  }, [data, search, entries]);

  const columns: Column<NilDetentionRow>[] = [
    { header: "S.N.", cell: (_r, i) => i + 1, className: "w-14" },
    { header: "Semester", cell: (r) => r.semester, align: "center" },
    { header: "Division", cell: (r) => r.division, align: "center" },
    { header: "Program", cell: (r) => r.program },
    { header: "Faculty", cell: (r) => <span className="font-mono text-xs">{r.faculty}</span> },
    { header: "Faculty Remarks", cell: (r) => r.remarks },
    { header: "Created At", cell: (r) => r.createdAt },
  ];

  if (!data) return <LoadingCard title="Nil Detention List" />;

  return (
    <SectionCard title="Nil Detention List">
      <ListToolbar entries={entries} onEntriesChange={setEntries} search={search} onSearchChange={setSearch} />
      <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} />
    </SectionCard>
  );
}
