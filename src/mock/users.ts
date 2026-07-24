import type { AuthUser } from "@/types/auth";

/**
 * Mock accounts for the prototype. Prefix determines base profile:
 *   student01 / faculty01 / admin01 / staff01  (password: "password")
 */
export const MOCK_USERS: Record<string, { password: string; user: AuthUser }> = {
  student01: {
    password: "password",
    user: {
      id: "u-stu-01",
      username: "student01",
      baseProfile: "student",
      displayName: "PUKALE NIKHIL UTTAM",
    },
  },
  faculty01: {
    password: "password",
    user: {
      id: "u-fac-01",
      username: "faculty01",
      baseProfile: "faculty",
      displayName: "Prof. S. S. Bhosale",
    },
  },
  staff01: {
    password: "password",
    user: {
      id: "u-adm-01",
      username: "staff01",
      baseProfile: "administrative",
      displayName: "Administrative Staff",
    },
  },
  admin01: {
    password: "password",
    user: {
      id: "u-adm-99",
      username: "admin01",
      baseProfile: "admin",
      displayName: "System Admin",
    },
  },
};
