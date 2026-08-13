import { ShieldCheck } from "lucide-react";
import type { AdminProfile } from "@/types/admin";

/** Sidebar identity card for the Admin portal (mirrors student/faculty cards). */
export function AdminProfileCard({ profile }: { profile: AdminProfile }) {
  const initials = profile.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="border-b border-border bg-sidebar px-4 py-6 text-center">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-brand text-2xl font-bold text-brand-foreground">
        {initials}
      </div>
      <p className="mt-3 text-sm font-bold text-sidebar-foreground">{profile.name}</p>
      <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5" /> {profile.role}
      </p>

      <dl className="mt-4 grid grid-cols-2 gap-2 text-left">
        {[
          ["Employee ID", profile.employeeId],
          ["Department", profile.department],
          ["Username", profile.username],
          ["Last Login", profile.lastLogin],
        ].map(([label, value]) => (
          <div key={label} className="rounded-md bg-panel px-2.5 py-2">
            <dt className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
              {label}
            </dt>
            <dd className="mt-0.5 truncate text-[11px] font-semibold text-foreground" title={value}>
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
