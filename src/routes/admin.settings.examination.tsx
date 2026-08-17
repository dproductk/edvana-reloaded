import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SectionCard } from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { adminService } from "@/services/admin.service";

export const Route = createFileRoute("/admin/settings/examination")({
  head: () => ({
    meta: [{ title: "Examination Settings — Admin · EDVANA" }],
  }),
  component: ExaminationSettingsPage,
});

function ExaminationSettingsPage() {
  const queryClient = useQueryClient();
  const { data: settings = {} } = useQuery({
    queryKey: ["admin", "settings", "examination"],
    queryFn: () => adminService.getSettings("examination"),
  });

  const [formData, setFormData] = useState<Record<string, string>>({});

  const saveMutation = useMutation({
    mutationFn: (values: Record<string, string>) => adminService.saveSettings("examination", values),
    onSuccess: () => {
      toast.success("Examination settings saved successfully");
      queryClient.invalidateQueries({ queryKey: ["admin", "settings", "examination"] });
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
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Examination System Defaults</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure default exam durations, passing thresholds, and mark lock policies.
        </p>
      </div>

      <SectionCard title="Exam System Configuration">
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          <div className="space-y-1.5">
            <Label>Default Exam Duration</Label>
            <Input
              value={getValue("defaultExamDuration")}
              onChange={(e) => setFormData((p) => ({ ...p, defaultExamDuration: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Default Passing Rule</Label>
            <Input
              value={getValue("defaultPassingRule")}
              onChange={(e) => setFormData((p) => ({ ...p, defaultPassingRule: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Mark Entry Locking Policy</Label>
            <Input
              value={getValue("markEntryLocking")}
              onChange={(e) => setFormData((p) => ({ ...p, markEntryLocking: e.target.value }))}
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
