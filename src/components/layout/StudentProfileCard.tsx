import { BookOpen, Smartphone, Mail } from "lucide-react";
import type { StudentProfile } from "@/types/student";

interface StudentProfileCardProps {
  profile: StudentProfile;
}

export function StudentProfileCard({ profile }: StudentProfileCardProps) {
  return (
    <div className="mx-3 mt-3 rounded-xl bg-panel p-4">
      <div className="flex flex-col items-center text-center">
        <div className="h-24 w-24 overflow-hidden rounded-full ring-2 ring-white shadow-card">
          <img
            src={profile.photoUrl}
            alt={profile.fullName}
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-bold tracking-wide text-foreground">
          {profile.fullName}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Enrol. No: {profile.enrollmentNo}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <StatBox label="Total" value={profile.stats.total} tone="neutral" />
        <StatBox label="Passed" value={profile.stats.passed} tone="up" />
        <StatBox label="Failed" value={profile.stats.failed} tone="down" />
      </div>

      <div className="my-4 border-t border-border" />

      <ul className="space-y-3 text-sm text-foreground">
        <li className="flex items-start gap-2.5">
          <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="leading-snug">{profile.program}</span>
        </li>
        <li className="flex items-center gap-2.5">
          <Smartphone className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span>{profile.mobile}</span>
        </li>
        <li className="flex items-center gap-2.5">
          <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="truncate">{profile.email}</span>
        </li>
      </ul>
    </div>
  );
}

function StatBox({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "neutral" | "up" | "down";
}) {
  const arrow =
    tone === "up" ? (
      <span className="ml-1 text-success">↑</span>
    ) : tone === "down" ? (
      <span className="ml-1 text-destructive">↓</span>
    ) : null;
  return (
    <div className="rounded-lg border border-dashed border-border bg-background px-2 py-2 text-center">
      <div className="text-lg font-bold text-foreground">
        {value}
        {arrow}
      </div>
      <div className="text-[11px] font-semibold text-muted-foreground">{label}</div>
    </div>
  );
}
