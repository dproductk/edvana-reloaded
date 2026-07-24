import { createFileRoute, Navigate } from "@tanstack/react-router";
import { LoginForm } from "@/features/auth/LoginForm";
import { useAuth } from "@/store/auth";
import { APP } from "@/constants/app";
import gpkLogo from "@/assets/gpk-logo.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — EDVANA · GP Kolhapur" },
      {
        name: "description",
        content: "Sign in to the Government Polytechnic Kolhapur student & faculty portal.",
      },
      { property: "og:title", content: "Sign in — EDVANA · GP Kolhapur" },
      {
        property: "og:description",
        content: "Sign in to the Government Polytechnic Kolhapur student & faculty portal.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { user } = useAuth();
  if (user) {
    const target =
      user.baseProfile === "student"
        ? "/student/dashboard"
        : user.baseProfile === "faculty"
          ? "/faculty/dashboard"
          : "/admin/dashboard";
    return <Navigate to={target} />;
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left: brand panel */}
      <div className="relative hidden overflow-hidden bg-brand text-brand-foreground lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="flex items-center gap-3">
          <img
            src={gpkLogo}
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 rounded-full bg-white object-contain p-0.5"
          />
          <span className="text-sm font-bold tracking-wide">{APP.collegeName}</span>
        </div>

        <div>
          <h1 className="text-4xl font-bold leading-tight">
            EDVANA
            <br />
            <span className="text-2xl font-medium text-brand-foreground/85">
              Student Management Information System
            </span>
          </h1>
          <p className="mt-4 max-w-md text-sm text-brand-foreground/85">
            First Autonomous Institute of Government of Maharashtra. Manage admissions,
            exams, results, fees and more from a single portal.
          </p>
        </div>

        <p className="text-xs text-brand-foreground/70">{APP.footerLeft}</p>

        {/* Decorative rings */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full border border-white/10" />
      </div>

      {/* Right: form panel */}
      <div className="flex flex-col justify-center bg-page px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <img
              src={gpkLogo}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full bg-brand object-contain p-0.5"
            />
            <span className="text-sm font-bold tracking-wide text-foreground">
              {APP.collegeName}
            </span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-foreground">Sign in</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Access your student, faculty or admin panel.
          </p>

          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
