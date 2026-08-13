import { useMemo } from "react";
import { useAuth } from "@/store/auth";
import type { BaseProfile } from "@/types/auth";

export type PermissionAction =
  | "view"
  | "create"
  | "edit"
  | "delete"
  | "approve"
  | "finalize"
  | "import"
  | "export"
  | "configure";

/**
 * Permission matrix per base profile. The Admin screens are built once and
 * gated by these codes so administrative roles (Student Section, Accounts,
 * Exam Clerk…) can later be granted the same screens without any rewrite.
 * Replace `PROFILE_PERMISSIONS` with the API's permission payload later.
 */
const ALL = "*";

const PROFILE_PERMISSIONS: Record<BaseProfile, string[]> = {
  admin: [ALL],
  administrative: [
    "student.view",
    "student.edit",
    "admission.view",
    "admission.edit",
    "admission.approve",
    "fee.view",
    "fee.edit",
    "registration.view",
    "registration.approve",
    "report.view",
    "report.export",
  ],
  faculty: ["student.view", "registration.view", "report.view"],
  student: [],
};

export function usePermissions() {
  const { user } = useAuth();

  return useMemo(() => {
    const granted = user ? PROFILE_PERMISSIONS[user.baseProfile] : [];
    const can = (module: string, action: PermissionAction) =>
      granted.includes(ALL) || granted.includes(`${module}.${action}`);

    return {
      can,
      canView: (m: string) => can(m, "view"),
      canCreate: (m: string) => can(m, "create"),
      canEdit: (m: string) => can(m, "edit"),
      canDelete: (m: string) => can(m, "delete"),
      canApprove: (m: string) => can(m, "approve"),
      canFinalize: (m: string) => can(m, "finalize"),
      canImport: (m: string) => can(m, "import"),
      canExport: (m: string) => can(m, "export"),
      canConfigure: (m: string) => can(m, "configure"),
    };
  }, [user]);
}
