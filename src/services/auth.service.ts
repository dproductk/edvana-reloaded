import { MOCK_USERS } from "@/mock/users";
import type { AuthUser } from "@/types/auth";

/**
 * Abstraction over the auth API. Pages never call fetch directly;
 * swap this file when the real backend is ready.
 */
export const authService = {
  async login(username: string, password: string): Promise<AuthUser> {
    await new Promise((r) => setTimeout(r, 350));
    const record = MOCK_USERS[username.trim().toLowerCase()];
    if (!record || record.password !== password) {
      throw new Error("Invalid enrollment number / username or password.");
    }
    return record.user;
  },

  async logout(): Promise<void> {
    await new Promise((r) => setTimeout(r, 100));
  },
};
