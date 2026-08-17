import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SectionCard } from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { adminService } from "@/services/admin.service";

export const Route = createFileRoute("/admin/settings/admission")({
  head: () => ({
    meta: [{ title: "Admission Global Settings — Admin · EDVANA" }],
  }),
  component: AdmissionGlobalSettingsPage,
});

function AdmissionGlobalSettingsPage() {
  const queryClient = useQueryClient();
  const { data: settings = {} } = useQuery({
    queryKey: ["admin", "settings", "admission"],
    queryFn: () => adminService.getSettings("admission"),
  });

  const [formData, setFormData] = useState<Record<string, string>>({});

  const saveMutation = useMutation({
    mutationFn: (values: Record<string, string>) => adminService.saveSettings("admission", values),
    onSuccess: () => {
      toast.success("Admission global settings saved successfully");
      queryClient.invalidateQueries({ queryKey: ["admin", "settings", "admission"] });
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
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Admission Institution Defaults</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure admission authority details, quota allocations, and payment trigger behaviors.
        </p>
      </div>

      <SectionCard title="Admission Defaults">
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          <div className="space-y-1.5">
            <Label>Admission Authority</Label>
            <Input
              value={getValue("admissionAuthority")}
              onChange={(e) => setFormData((p) => ({ ...p, admissionAuthority: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Institute Level Quota</Label>
            <Input
              value={getValue("institutionLevelQuota")}
              onChange={(e) => setFormData((p) => ({ ...p, institutionLevelQuota: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Default Admission Type</Label>
            <Input
              value={getValue("defaultAdmissionType")}
              onChange={(e) => setFormData((p) => ({ ...p, defaultAdmissionType: e.target.value }))}
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
