import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { SectionCard } from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { studentService } from "@/services/student.service";
import type { ProfileFormData } from "@/types/student-modules";

const ProfileSchema = z.object({
  enrollmentNo: z.string(),
  fullName: z.string().min(3, "Full name is required"),
  motherName: z.string().min(3, "Mother's name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  category: z.string().min(1),
  program: z.string(),
  currentYear: z.string(),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().email("Enter a valid email address"),
  addressLine: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  district: z.string().min(2, "District is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  bankName: z.string().min(2, "Bank name is required"),
  accountNo: z.string().min(6, "Enter a valid account number"),
  ifsc: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Enter a valid IFSC code"),
  aadhaar: z.string().min(4),
});

type Values = z.infer<typeof ProfileSchema>;

export function ProfileForm() {
  const { data } = useQuery({
    queryKey: ["student", "profile-form"],
    queryFn: () => studentService.getProfileForm(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(ProfileSchema) });

  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  const save = useMutation({
    mutationFn: (values: ProfileFormData) => studentService.updateProfileForm(values),
    onSuccess: () => toast.success("Profile updated successfully"),
    onError: () => toast.error("Could not update the profile."),
  });

  if (!data) {
    return (
      <SectionCard title="Student Information">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </SectionCard>
    );
  }

  const field = (name: keyof Values, label: string, props: Record<string, unknown> = {}) => (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} {...register(name)} {...props} />
      {errors[name] && <p className="text-xs text-destructive">{errors[name]?.message as string}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit((v) => save.mutate(v))} className="space-y-6">
      <SectionCard title="Personal Details">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {field("enrollmentNo", "Enrollment No.", { readOnly: true })}
          {field("fullName", "Student Name")}
          {field("motherName", "Mother's Name")}
          {field("dob", "Date of Birth", { type: "date" })}
          {field("gender", "Gender", { readOnly: true })}
          {field("category", "Category")}
          {field("aadhaar", "Aadhaar No.", { readOnly: true })}
        </div>
      </SectionCard>

      <SectionCard title="Academic Details">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {field("program", "Program", { readOnly: true })}
          {field("currentYear", "Current Year", { readOnly: true })}
        </div>
      </SectionCard>

      <SectionCard title="Contact & Address">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {field("mobile", "Mobile No.")}
          {field("email", "Email Address", { type: "email" })}
          {field("addressLine", "Address")}
          {field("city", "City")}
          {field("district", "District")}
          {field("state", "State")}
          {field("pincode", "Pincode")}
        </div>
      </SectionCard>

      <SectionCard title="Bank Details">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {field("bankName", "Bank Name")}
          {field("accountNo", "Account Number")}
          {field("ifsc", "IFSC Code")}
        </div>
      </SectionCard>

      <div className="flex gap-3">
        <Button type="submit" size="lg" disabled={save.isPending}>
          {save.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save changes
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={() => reset(data)}>
          Reset
        </Button>
      </div>
    </form>
  );
}
