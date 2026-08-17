import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SectionCard } from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { adminService } from "@/services/admin.service";

export const Route = createFileRoute("/admin/settings/semester")({
  head: () => ({
    meta: [{ title: "Semester Settings — Admin · EDVANA" }],
  }),
  component: SemesterSettingsPage,
});

function SemesterSettingsPage() {
  const queryClient = useQueryClient();
  const { data: settings = {} } = useQuery({
    queryKey: ["admin", "settings", "semester"],
    queryFn: () => adminService.getSettings("semester"),
  });

  const [formData, setFormData] = useState<Record<string, string>>({});

  const saveMutation = useMutation({
    mutationFn: (values: Record<string, string>) => adminService.saveSettings("semester", values),
    onSuccess: () => {
      toast.success("Semester settings saved successfully");
      queryClient.invalidateQueries({ queryKey: ["admin", "settings", "semester"] });
    },
  });

  const getValue = (key: string) => formData[key] ?? settings[key] ?? "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Semester & Term Global Controls</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure active system academic year, active semester term, and semester lock states.
        </p>
      </div>

      <SectionCard title="Global Semester Configuration">
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          <div className="space-y-1.5">
            <Label>Current Academic Year</Label>
            <Input
              value={getValue("currentAcademicYear")}
              onChange={(e) => setFormData((p) => ({ ...p, currentAcademicYear: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Active Semester Term</Label>
            <Input
              value={getValue("activeTerm")}
              onChange={(e) => setFormData((p) => ({ ...p, activeTerm: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Semester Start Date</Label>
            <Input
              type="date"
              value={getValue("semesterStartDate")}
              onChange={(e) => setFormData((p) => ({ ...p, semesterStartDate: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Semester End Date</Label>
            <Input
              type="date"
              value={getValue("semesterEndDate")}
              onChange={(e) => setFormData((p) => ({ ...p, semesterEndDate: e.target.value }))}
            />
          </div>

          <Button type="submit" disabled={saveMutation.isPending}>
            Save Changes
          </Button>
        </form>
      </SectionCard>
    </div>
  );
}
