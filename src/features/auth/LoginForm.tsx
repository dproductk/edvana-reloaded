import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services/auth.service";
import { useAuth } from "@/store/auth";
import type { BaseProfile } from "@/types/auth";

const LoginSchema = z.object({
  username: z.string().min(3, "Enter a valid enrollment number or username"),
  password: z.string().min(4, "Password is required"),
});
type LoginValues = z.infer<typeof LoginSchema>;

const DEFAULT_ROUTE: Record<BaseProfile, string> = {
  student: "/student/dashboard",
  faculty: "/faculty/dashboard",
  administrative: "/admin/dashboard",
  admin: "/admin/dashboard",
};

export function LoginForm() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { username: "student01", password: "password" },
  });

  const mutation = useMutation({
    mutationFn: ({ username, password }: LoginValues) => authService.login(username, password),
    onSuccess: (user) => {
      setUser(user);
      toast.success(`Welcome, ${user.displayName}`);
      const target = DEFAULT_ROUTE[user.baseProfile] ?? "/student/dashboard";
      navigate({ to: target });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return (
    <form onSubmit={handleSubmit((v) => mutation.mutate(v))} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="username">Enrollment No. / Username</Label>
        <div className="relative">
          <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="username" autoComplete="username" className="pl-9" {...register("username")} />
        </div>
        {errors.username && (
          <p className="text-xs text-destructive">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            className="pl-9"
            {...register("password")}
          />
        </div>
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={mutation.isPending}>
        {mutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Sign in
      </Button>

      <div className="rounded-lg border border-dashed border-border bg-panel p-3 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground">Prototype mock accounts</p>
        <p className="mt-1">
          <code>student01</code> · <code>faculty01</code> · <code>staff01</code> · <code>admin01</code>
          {" — password: "}
          <code>password</code>
        </p>
      </div>
    </form>
  );
}
