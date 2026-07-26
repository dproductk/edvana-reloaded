import { Smartphone, Mail } from "lucide-react";
import type { FacultyProfile } from "@/types/faculty";

interface FacultyProfileCardProps {
  profile: FacultyProfile;
}

export function FacultyProfileCard({ profile }: FacultyProfileCardProps) {
  return (
    <div className="mx-3 mt-3 rounded-xl bg-panel p-4">
      <div className="flex flex-col items-center text-center">
        <div className="h-24 w-24 overflow-hidden rounded-full ring-2 ring-white shadow-card">
          <img
            src={profile.photoUrl}
            alt={profile.fullName}
            width={96}
            height={96}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-bold text-foreground">{profile.fullName}</p>
        <p className="text-xs text-muted-foreground">ID: {profile.facultyId}</p>
        <span className="mt-2 inline-flex items-center rounded-full border border-success/30 bg-success/10 px-2.5 py-0.5 text-[11px] font-semibold text-success">
          {profile.status}
        </span>
      </div>

      <div className="mt-4 space-y-2 border-t border-border pt-3 text-xs text-muted-foreground">
        <p className="font-medium text-foreground">{profile.department}</p>
        <p className="flex items-center gap-2">
          <Smartphone className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{profile.mobile}</span>
        </p>
        <p className="flex items-center gap-2">
          <Mail className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{profile.email}</span>
        </p>
      </div>
    </div>
  );
}
