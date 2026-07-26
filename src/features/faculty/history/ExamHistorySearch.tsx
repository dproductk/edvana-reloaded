import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Search } from "lucide-react";
import { toast } from "sonner";
import { SectionCard } from "@/components/common/SectionCard";
import { DataTable, type Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { facultyService } from "@/services/faculty.service";
import type { ExamHistoryRow } from "@/types/faculty";

export function ExamHistorySearch() {
  const [enrollNo, setEnrollNo] = useState("");
  const [rows, setRows] = useState<ExamHistoryRow[] | null>(null);

  const search = useMutation({
    mutationFn: (value: string) => facultyService.searchExamHistory(value),
    onSuccess: (result) => {
      setRows(result);
      if (result.length === 0) toast.info("No records found for that enrollment number.");
    },
    onError: () => toast.error("Search failed. Please try again."),
  });

  const columns: Column<ExamHistoryRow>[] = [
    { header: "S.N.", cell: (_r, i) => i + 1, className: "w-14" },
    { header: "Term", cell: (r) => r.term },
    { header: "Course Code", cell: (r) => <span className="font-mono text-xs">{r.courseCode}</span> },
    { header: "Course Name", cell: (r) => <span className="font-medium">{r.courseName}</span> },
    { header: "Marks Obtained", cell: (r) => `${r.marksObtained} / ${r.maxMarks}`, align: "center" },
    {
      header: "Result",
      cell: (r) => <StatusBadge label={r.result} tone={r.result === "Pass" ? "success" : "danger"} />,
      align: "center",
    },
  ];

  return (
    <div className="space-y-6">
      <SectionCard title="Search By Enrollment Number" className="max-w-xl">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!enrollNo.trim()) {
              toast.error("Enter an enrollment number.");
              return;
            }
            search.mutate(enrollNo);
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="enrollNo">
              Enrollment Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="enrollNo"
              value={enrollNo}
              onChange={(e) => setEnrollNo(e.target.value)}
              placeholder="e.g. 247303"
            />
          </div>
          <Button type="submit" disabled={search.isPending}>
            {search.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Search className="mr-2 h-4 w-4" />
            )}
            Search
          </Button>
        </form>
      </SectionCard>

      {rows && (
        <SectionCard title="Exam & Result History">
          <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} empty="No records found." />
        </SectionCard>
      )}
    </div>
  );
}
