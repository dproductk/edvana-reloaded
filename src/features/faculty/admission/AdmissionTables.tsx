import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { SectionCard } from "@/components/common/SectionCard";
import { DataTable, type Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ListToolbar, FilterSelect } from "@/features/faculty/shared/ListToolbar";
import { LoadingCard } from "@/features/faculty/students/StudentsTables";
import { facultyService } from "@/services/faculty.service";
import { DIVISIONS } from "@/mock/faculty";
import type { AdmissionEligibleRow, AdmittedRow } from "@/types/faculty";

const YEAR_LABEL = { fy: "FY", sy: "SY", ty: "TY" } as const;

export function AdmissionEligibleTable({ year }: { year: "fy" | "sy" | "ty" }) {
  const { data } = useQuery({
    queryKey: ["faculty", "admission", "eligible", year],
    queryFn: () => facultyService.getAdmissionEligible(year),
  });
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const title = `Eligible Students for ${YEAR_LABEL[year]} (2026-27)`;

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    const all = data ?? [];
    return (q ? all.filter((r) => JSON.stringify(r).toLowerCase().includes(q)) : all).slice(0, entries);
  }, [data, search, entries]);

  const columns: Column<AdmissionEligibleRow>[] = [
    { header: "S.N.", cell: (_r, i) => i + 1, className: "w-14" },
    { header: "Enroll No.", cell: (r) => <span className="font-mono text-xs">{r.enrollNo}</span> },
    { header: "Name", cell: (r) => <span className="font-medium">{r.name}</span> },
    { header: "Father's Name", cell: (r) => r.fatherName },
    { header: "Mobile", cell: (r) => r.mobile },
    {
      header: "Fee Marked",
      cell: (r) => <StatusBadge label={r.feeMarked ? "Yes" : "No"} tone={r.feeMarked ? "success" : "neutral"} />,
      align: "center",
    },
    {
      header: "Admitted",
      cell: (r) => <StatusBadge label={r.admitted ? "Yes" : "No"} tone={r.admitted ? "success" : "neutral"} />,
      align: "center",
    },
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
      />
      <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} />
    </SectionCard>
  );
}

export function AdmittedTable({ session }: { session: "2026-27" | "2025-26" }) {
  const { data } = useQuery({
    queryKey: ["faculty", "admission", "admitted", session],
    queryFn: () => facultyService.getAdmitted(session),
  });
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [division, setDivision] = useState("");
  const title = `Students Admitted For Session (${session})`;

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    const all = (data ?? []).filter(
      (r) => (year ? r.year === year : true) && (division ? r.division === division : true),
    );
    return (q ? all.filter((r) => JSON.stringify(r).toLowerCase().includes(q)) : all).slice(0, entries);
  }, [data, search, entries, year, division]);

  const columns: Column<AdmittedRow>[] = [
    { header: "S.N.", cell: (_r, i) => i + 1, className: "w-14" },
    { header: "Enroll No.", cell: (r) => <span className="font-mono text-xs">{r.enrollNo}</span> },
    { header: "Name", cell: (r) => <span className="font-medium">{r.name}</span> },
    { header: "Father's Name", cell: (r) => r.fatherName },
    { header: "Mobile", cell: (r) => r.mobile },
    { header: "Year", cell: (r) => r.year },
    { header: "Division", cell: (r) => r.division, align: "center" },
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
        <FilterSelect
          label="Year"
          value={year}
          onChange={setYear}
          options={["First Year", "Second Year", "Third Year"]}
        />
        <FilterSelect label="Division" value={division} onChange={setDivision} options={DIVISIONS} />
      </ListToolbar>
      <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} />
    </SectionCard>
  );
}
