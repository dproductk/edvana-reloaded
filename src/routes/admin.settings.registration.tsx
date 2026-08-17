import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SectionCard } from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { adminService } from "@/services/admin.service";

export const Route = createFileRoute("/admin/settings/registration")({
  head: () => ({
    meta: [{ title: "Registration Settings — Admin · EDVANA" }],
  }),
  component: RegistrationGlobalSettingsPage,
});

function RegistrationGlobalSettingsPage() {
  const queryClient = useQueryClient();
  const { data: settings = {} } = useQuery({
    queryKey: ["admin", "settings", "registration"],
    queryFn: () => adminService.getSettings("registration"),
  });

  const [formData, setFormData] = useState<Record<string, string>>({});

  const saveMutation = useMutation({
    mutationFn: (values: Record<string, string>) => adminService.saveSettings("registration", values),
    onSuccess: () => {
      toast.success("Registration global settings saved successfully");
      queryClient.invalidateQueries({ queryKey: ["admin", "settings", "registration"] });
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
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Registration System Defaults</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure default backlog thresholds, minimum credit rules, and manual override permissions.
        </p>
      </div>

      <SectionCard title="Registration System Defaults">
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          <div className="space-y-1.5">
            <Label>Default Registration Type</Label>
            <Input
              value={getValue("defaultRegistrationType")}
              onChange={(e) => setFormData((p) => ({ ...p, defaultRegistrationType: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Default Maximum Backlogs Allowed</Label>
            <Input
              value={getValue("defaultMaximumBacklogs")}
              onChange={(e) => setFormData((p) => ({ ...p, defaultMaximumBacklogs: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Feedback Mandatory Gate</Label>
            <Input
              value={getValue("feedbackMandatory")}
              onChange={(e) => setFormData((p) => ({ ...p, feedbackMandatory: e.target.value }))}
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
