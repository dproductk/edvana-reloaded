import {
  ADMIN_DASHBOARD,
  ADMIN_PROFILE,
  ADMIN_SEED,
  IMPORT_COLUMN_MAPPING,
  IMPORT_VALIDATION_ISSUES,
  RESULT_ANALYSIS,
  SYSTEM_SETTINGS,
  academicHistoryFor,
} from "@/mock/admin";
import type { AdminRecord, ExamRegistration, ID } from "@/types/admin";

const delay = <T,>(value: T, ms = 220): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

/**
 * In-memory repository standing in for the Django REST API.
 *
 * Every screen talks to `adminService`, never to the mock arrays, so swapping
 * these method bodies for `fetch("/api/admin/<resource>/")` later requires no
 * component changes.
 */
const store: Record<string, AdminRecord[]> = Object.fromEntries(
  Object.entries(ADMIN_SEED).map(([k, v]) => [k, v.map((r) => ({ ...r }))]),
);

let sequence = 9000;
const nextId = (resource: string) => `${resource}-new-${++sequence}`;

export interface ListParams {
  search?: string;
  filters?: Record<string, string | undefined>;
  sortBy?: string;
  sortDir?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}

export interface ListResult<T> {
  rows: T[];
  total: number;
  page: number;
  pageSize: number;
}

function matches(row: AdminRecord, params: ListParams) {
  const q = params.search?.trim().toLowerCase();
  if (q && !JSON.stringify(row).toLowerCase().includes(q)) return false;
  for (const [key, value] of Object.entries(params.filters ?? {})) {
    if (!value) continue;
    if (String(row[key] ?? "") !== value) return false;
  }
  return true;
}

export const adminService = {
  /* ---------------- generic resource CRUD ---------------- */

  async list<T extends AdminRecord = AdminRecord>(
    resource: string,
    params: ListParams = {},
  ): Promise<ListResult<T>> {
    const all = (store[resource] ?? []).filter((r) => matches(r, params));
    if (params.sortBy) {
      const dir = params.sortDir === "desc" ? -1 : 1;
      all.sort((a, b) => {
        const av = a[params.sortBy!];
        const bv = b[params.sortBy!];
        if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
        return String(av ?? "").localeCompare(String(bv ?? "")) * dir;
      });
    }
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 10;
    const rows = all.slice((page - 1) * pageSize, page * pageSize) as T[];
    return delay({ rows, total: all.length, page, pageSize });
  },

  async all<T extends AdminRecord = AdminRecord>(resource: string): Promise<T[]> {
    return delay((store[resource] ?? []) as T[]);
  },

  async get<T extends AdminRecord = AdminRecord>(resource: string, id: ID): Promise<T | undefined> {
    return delay((store[resource] ?? []).find((r) => r.id === id) as T | undefined);
  },

  async create<T extends AdminRecord = AdminRecord>(resource: string, data: Partial<T>): Promise<T> {
    const record = { ...(data as AdminRecord), id: nextId(resource) };
    store[resource] = [record, ...(store[resource] ?? [])];
    return delay(record as T);
  },

  async update<T extends AdminRecord = AdminRecord>(
    resource: string,
    id: ID,
    data: Partial<T>,
  ): Promise<T> {
    const rows = store[resource] ?? [];
    const index = rows.findIndex((r) => r.id === id);
    if (index === -1) throw new Error(`${resource} record not found`);
    const updated = { ...rows[index]!, ...(data as AdminRecord), id };
    rows[index] = updated;
    return delay(updated as T);
  },

  async remove(resource: string, id: ID): Promise<void> {
    store[resource] = (store[resource] ?? []).filter((r) => r.id !== id);
    return delay(undefined);
  },

  /** Status transition used by activate / deactivate / approve / finalize actions. */
  async setStatus(resource: string, id: ID, field: string, value: string): Promise<AdminRecord> {
    return adminService.update(resource, id, { [field]: value } as Partial<AdminRecord>);
  },

  async bulkSetStatus(resource: string, ids: ID[], field: string, value: string): Promise<number> {
    for (const id of ids) {
      const rows = store[resource] ?? [];
      const index = rows.findIndex((r) => r.id === id);
      if (index !== -1) rows[index] = { ...rows[index]!, [field]: value };
    }
    return delay(ids.length);
  },

  /* ---------------- dedicated endpoints ---------------- */

  getProfile: () => delay(ADMIN_PROFILE),
  getDashboard: () => delay(ADMIN_DASHBOARD),
  getResultAnalysis: () => delay(RESULT_ANALYSIS),
  getAcademicHistory: (enrollNo: string) => delay(academicHistoryFor(enrollNo)),
  getImportMapping: () => delay(IMPORT_COLUMN_MAPPING),
  getImportIssues: () => delay(IMPORT_VALIDATION_ISSUES),

  getRegistrations: (type?: "R" | "R + RR" | "RR") =>
    delay(
      ((store["registrations"] ?? []) as unknown as ExamRegistration[]).filter((r) =>
        type ? r.registrationType === type : true,
      ),
    ),
  getRegistration: (id: ID) =>
    delay(((store["registrations"] ?? []) as unknown as ExamRegistration[]).find((r) => r.id === id)),

  getSettings: (group: string) => delay(SYSTEM_SETTINGS[group] ?? {}),
  saveSettings: (group: string, values: Record<string, string>) => {
    SYSTEM_SETTINGS[group] = { ...(SYSTEM_SETTINGS[group] ?? {}), ...values };
    return delay(SYSTEM_SETTINGS[group]!);
  },

  getReconciliation: (params: { academicYear: string; paymentType: string; from: string; to: string }) =>
    delay({
      ...params,
      expected: 1462500,
      received: 1418900,
      variance: 43600,
      unmatched: 7,
      matched: 1281,
    }),
};
