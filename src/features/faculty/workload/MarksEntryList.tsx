import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { SectionCard } from "@/components/common/SectionCard";
import { DataTable, type Column } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterSelect, ListToolbar } from "@/features/faculty/shared/ListToolbar";
import { LoadingCard } from "@/features/faculty/students/StudentsTables";
import { facultyService } from "@/services/faculty.service";
import { PROGRAMS, SEMESTERS } from "@/mock/faculty";
import type { WorkloadRow } from "@/types/faculty";

export function MarksEntryList() {
  const { data } = useQuery({
    queryKey: ["faculty", "workload"],
    queryFn: () => facultyService.getWorkload(),
  });
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [program, setProgram] = useState("");
  const [semester, setSemester] = useState("");
  const [openRow, setOpenRow] = useState<WorkloadRow | null>(null);

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    const all = (data ?? []).filter(
      (r) =>
        (program ? program.startsWith(r.programCode) : true) &&
        (semester ? `Semester ${r.semester}` === semester : true),
    );
    return (q ? all.filter((r) => JSON.stringify(r).toLowerCase().includes(q)) : all).slice(0, entries);
  }, [data, search, entries, program, semester]);

  const columns: Column<WorkloadRow>[] = [
    { header: "S.N.", cell: (_r, i) => i + 1, className: "w-14" },
    { header: "Program Code", cell: (r) => r.programCode, align: "center" },
    { header: "Division", cell: (r) => r.division, align: "center" },
    { header: "Course Code", cell: (r) => <span className="font-mono text-xs">{r.courseCode}</span> },
    { header: "Semester", cell: (r) => r.semester, align: "center" },
    { header: "UT1", cell: (r) => r.ut1, align: "center" },
    { header: "UT2", cell: (r) => r.ut2, align: "center" },
    { header: "FA-PR", cell: (r) => r.faPr, align: "center" },
    { header: "SA-PR", cell: (r) => r.saPr, align: "center" },
    { header: "SLA", cell: (r) => r.sla, align: "center" },
    {
      header: "Action",
      cell: (r) => (
        <Button size="sm" variant="outline" onClick={() => setOpenRow(r)}>
          Fill marks
        </Button>
      ),
      align: "right",
    },
  ];

  if (!data) return <LoadingCard title="Internal Marks Entry" />;

  return (
    <div className="space-y-6">
      <SectionCard title="Internal Marks Entry">
        <ListToolbar entries={entries} onEntriesChange={setEntries} search={search} onSearchChange={setSearch}>
          <FilterSelect label="Program" value={program} onChange={setProgram} options={PROGRAMS} />
          <FilterSelect label="Semester" value={semester} onChange={setSemester} options={SEMESTERS} />
        </ListToolbar>
        <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} />
      </SectionCard>

      {openRow && <MarksEntryGrid row={openRow} onClose={() => setOpenRow(null)} />}
    </div>
  );
}

const GRID_STUDENTS = [
  { enrollNo: "247303", name: "Kumbhar Sachin Sadashiv" },
  { enrollNo: "257301", name: "Onkar Namdev Chavan" },
  { enrollNo: "257306", name: "Powar Megha Shivaji" },
];

function MarksEntryGrid({ row, onClose }: { row: WorkloadRow; onClose: () => void }) {
  return (
    <SectionCard
      title={`Marks Entry — ${row.courseCode} · Division ${row.division}`}
      description="Enter component-wise internal marks for each student."
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button
            size="sm"
            onClick={() => {
              void facultyService.saveMarks();
              toast.success("Marks saved successfully");
            }}
          >
            Save marks
          </Button>
        </div>
      }
    >
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-panel">
              {["S.N.", "Enroll No", "Student Name", `UT1 (${row.ut1})`, `UT2 (${row.ut2})`, `FA-PR (${row.faPr})`, `SA-PR (${row.saPr})`, `SLA (${row.sla})`].map((h) => (
                <th
                  key={h}
                  className="border-b border-border px-4 py-3 text-left text-[12px] font-bold uppercase tracking-wide text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GRID_STUDENTS.map((s, i) => (
              <tr key={s.enrollNo} className="odd:bg-background even:bg-panel/40">
                <td className="border-b border-border px-4 py-2">{i + 1}</td>
                <td className="border-b border-border px-4 py-2 font-mono text-xs">{s.enrollNo}</td>
                <td className="border-b border-border px-4 py-2 font-medium">{s.name}</td>
                {(["ut1", "ut2", "faPr", "saPr", "sla"] as const).map((c) => (
                  <td key={c} className="border-b border-border px-4 py-2">
                    <Input
                      type="number"
                      min={0}
                      max={row[c]}
                      aria-label={`${c} for ${s.name}`}
                      className="h-9 w-20"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
