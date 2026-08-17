import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SectionCard } from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { adminService } from "@/services/admin.service";

export const Route = createFileRoute("/admin/settings/")({
  head: () => ({
    meta: [{ title: "General Settings — Admin · EDVANA" }],
  }),
  component: GeneralSettingsPage,
});

function GeneralSettingsPage() {
  const queryClient = useQueryClient();
  const { data: settings = {} } = useQuery({
    queryKey: ["admin", "settings", "general"],
    queryFn: () => adminService.getSettings("general"),
  });

  const [formData, setFormData] = useState<Record<string, string>>({});

  const saveMutation = useMutation({
    mutationFn: (values: Record<string, string>) => adminService.saveSettings("general", values),
    onSuccess: () => {
      toast.success("General settings saved successfully");
      queryClient.invalidateQueries({ queryKey: ["admin", "settings", "general"] });
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
        <h1 className="text-2xl font-bold tracking-tight text-foreground">General Institution Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure institution name, address, contact details, and default timezone.
        </p>
      </div>

      <SectionCard title="Institution Profile">
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          <div className="space-y-1.5">
            <Label>Institution Name</Label>
            <Input
              value={getValue("institutionName")}
              onChange={(e) => setFormData((p) => ({ ...p, institutionName: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Short Name / Abbreviation</Label>
            <Input
              value={getValue("shortName")}
              onChange={(e) => setFormData((p) => ({ ...p, shortName: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Campus Address</Label>
            <Input
              value={getValue("address")}
              onChange={(e) => setFormData((p) => ({ ...p, address: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Contact Number</Label>
            <Input
              value={getValue("contact")}
              onChange={(e) => setFormData((p) => ({ ...p, contact: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Official Email</Label>
            <Input
              value={getValue("email")}
              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Timezone</Label>
            <Input
              value={getValue("timezone")}
              onChange={(e) => setFormData((p) => ({ ...p, timezone: e.target.value }))}
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
