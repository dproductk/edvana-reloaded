export type BaseProfile = "student" | "faculty" | "administrative" | "admin";

export interface AuthUser {
  id: string;
  username: string;
  baseProfile: BaseProfile;
  displayName: string;
}
