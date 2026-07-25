import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { KeyRound, Loader2 } from "lucide-react";
import { SectionCard } from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { studentService } from "@/services/student.service";

const Schema = z
  .object({
    currentPassword: z.string().min(4, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Include at least one uppercase letter")
      .regex(/[0-9]/, "Include at least one number"),
    confirmPassword: z.string(),
  })
  .refine((v) => v.newPassword === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type Values = z.infer<typeof Schema>;

export function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(Schema) });

  const save = useMutation({
    mutationFn: () => studentService.changePassword(),
    onSuccess: () => {
      toast.success("Password changed successfully");
      reset();
    },
    onError: () => toast.error("Could not change the password."),
  });

  return (
    <SectionCard
      title="Change Password"
      description="Use a strong password with at least 8 characters, one uppercase letter and one number."
      className="max-w-xl"
    >
      <form onSubmit={handleSubmit(() => save.mutate())} className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="currentPassword">Current password</Label>
          <Input id="currentPassword" type="password" autoComplete="current-password" {...register("currentPassword")} />
          {errors.currentPassword && (
            <p className="text-xs text-destructive">{errors.currentPassword.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="newPassword">New password</Label>
          <Input id="newPassword" type="password" autoComplete="new-password" {...register("newPassword")} />
          {errors.newPassword && (
            <p className="text-xs text-destructive">{errors.newPassword.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirm new password</Label>
          <Input id="confirmPassword" type="password" autoComplete="new-password" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>
        <Button type="submit" size="lg" disabled={save.isPending}>
          {save.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <KeyRound className="mr-2 h-4 w-4" />
          )}
          Change password
        </Button>
      </form>
    </SectionCard>
  );
}
