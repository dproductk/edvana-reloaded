import { useState, type ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Filter,
  Loader2,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable, type Column } from "@/components/common/DataTable";
import { SectionCard } from "@/components/common/SectionCard";
import { adminService, type ListResult } from "@/services/admin.service";
import type { AdminRecord } from "@/types/admin";

export interface FieldConfig {
  name: string;
  label: string;
  type?: "text" | "number" | "select" | "date" | "textarea" | "checkbox";
  options?: { label: string; value: string }[];
  required?: boolean;
  placeholder?: string;
  defaultValue?: string | number | boolean;
}

export interface FilterConfig {
  key: string;
  label: string;
  options: { label: string; value: string }[];
}

export interface AdminCrudPageProps {
  title: string;
  description?: string;
  resource: string;
  columns: Column<AdminRecord>[];
  fields: FieldConfig[];
  filters?: FilterConfig[];
  searchPlaceholder?: string;
  allowAdd?: boolean;
  allowEdit?: boolean;
  allowDelete?: boolean;
  statusField?: string;
  customActions?: (row: AdminRecord) => ReactNode;
  headerAction?: ReactNode;
}

export function AdminCrudPage({
  title,
  description,
  resource,
  columns,
  fields,
  filters = [],
  searchPlaceholder = "Search records...",
  allowAdd = true,
  allowEdit = true,
  allowDelete = true,
  statusField = "status",
  customActions,
  headerAction,
}: AdminCrudPageProps) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<AdminRecord | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  const [deleteConfirmRow, setDeleteConfirmRow] = useState<AdminRecord | null>(null);

  const queryKey = ["admin", resource, search, selectedFilters, page];

  const { data, isLoading } = useQuery<ListResult<AdminRecord>>({
    queryKey,
    queryFn: () =>
      adminService.list(resource, {
        search,
        filters: selectedFilters,
        page,
        pageSize,
      }),
  });

  const saveMutation = useMutation({
    mutationFn: (values: Record<string, unknown>) => {
      if (editingRow) {
        return adminService.update(resource, editingRow.id, values);
      }
      return adminService.create(resource, values);
    },
    onSuccess: () => {
      toast.success(editingRow ? "Record updated successfully" : "Record created successfully");
      setDialogOpen(false);
      setEditingRow(null);
      setFormData({});
      queryClient.invalidateQueries({ queryKey: ["admin", resource] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to save record");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminService.remove(resource, id),
    onSuccess: () => {
      toast.success("Record deleted");
      setDeleteConfirmRow(null);
      queryClient.invalidateQueries({ queryKey: ["admin", resource] });
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, value }: { id: string; value: string }) =>
      adminService.setStatus(resource, id, statusField, value),
    onSuccess: () => {
      toast.success("Status updated");
      queryClient.invalidateQueries({ queryKey: ["admin", resource] });
    },
  });

  const handleOpenAdd = () => {
    const defaults: Record<string, unknown> = {};
    fields.forEach((f) => {
      if (f.defaultValue !== undefined) defaults[f.name] = f.defaultValue;
    });
    setEditingRow(null);
    setFormData(defaults);
    setDialogOpen(true);
  };

  const handleOpenEdit = (row: AdminRecord) => {
    setEditingRow(row);
    setFormData({ ...row });
    setDialogOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  const allColumns: Column<AdminRecord>[] = [
    ...columns,
    {
      header: "Actions",
      align: "right",
      cell: (row) => {
        const currentStatus = String(row[statusField] ?? "");
        const isActive = currentStatus === "Active";
        return (
          <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
            {customActions?.(row)}

            {statusField && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                title={isActive ? "Deactivate" : "Activate"}
                onClick={() =>
                  statusMutation.mutate({
                    id: row.id,
                    value: isActive ? "Inactive" : "Active",
                  })
                }
              >
                {isActive ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <XCircle className="h-4 w-4 text-amber-600" />}
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {allowEdit && (
                  <DropdownMenuItem onClick={() => handleOpenEdit(row)}>
                    <Edit2 className="mr-2 h-4 w-4 text-primary" /> Edit
                  </DropdownMenuItem>
                )}
                {allowDelete && (
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => setDeleteConfirmRow(row)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const totalPages = data ? Math.ceil(data.total / pageSize) : 1;

  return (
    <div className="space-y-6 p-6">
      {/* Header toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
        <div className="flex items-center gap-2">
          {headerAction}
          {allowAdd && (
            <Button onClick={handleOpenAdd} className="bg-primary text-primary-foreground shadow">
              <Plus className="mr-1.5 h-4 w-4" /> Add New
            </Button>
          )}
        </div>
      </div>

      <SectionCard>
        {/* Search & Filter Bar */}
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder={searchPlaceholder}
              className="pl-9"
            />
          </div>

          {filters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {filters.map((f) => (
                <Select
                  key={f.key}
                  value={selectedFilters[f.key] ?? "ALL"}
                  onValueChange={(val) => {
                    setSelectedFilters((prev) => ({
                      ...prev,
                      [f.key]: val === "ALL" ? "" : val,
                    }));
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="w-[160px] h-9 text-xs">
                    <SelectValue placeholder={f.label} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All {f.label}s</SelectItem>
                    {f.options.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
            </div>
          )}
        </div>

        {/* Data Table */}
        {isLoading ? (
          <div className="flex h-48 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <DataTable
            columns={allColumns}
            rows={data?.rows ?? []}
            rowKey={(r) => r.id}
            empty="No matching records found."
          />
        )}

        {/* Pagination controls */}
        {data && data.total > pageSize && (
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
            <div>
              Showing {Math.min((page - 1) * pageSize + 1, data.total)} to{" "}
              {Math.min(page * pageSize, data.total)} of {data.total} records
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </Button>
              <span className="font-semibold text-foreground">
                {page} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </SectionCard>

      {/* Add / Edit Form Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md sm:max-w-lg">
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle>{editingRow ? `Edit ${title}` : `Add New ${title}`}</DialogTitle>
              <DialogDescription>
                Fill in the details below. All fields marked with * are required.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto px-1">
              {fields.map((f) => (
                <div key={f.name} className="space-y-1.5">
                  <Label htmlFor={f.name}>
                    {f.label} {f.required && <span className="text-destructive">*</span>}
                  </Label>
                  {f.type === "select" ? (
                    <Select
                      value={String(formData[f.name] ?? "")}
                      onValueChange={(val) => setFormData((p) => ({ ...p, [f.name]: val }))}
                    >
                      <SelectTrigger id={f.name}>
                        <SelectValue placeholder={f.placeholder ?? `Select ${f.label}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {f.options?.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : f.type === "textarea" ? (
                    <textarea
                      id={f.name}
                      rows={3}
                      required={f.required}
                      placeholder={f.placeholder}
                      value={String(formData[f.name] ?? "")}
                      onChange={(e) => setFormData((p) => ({ ...p, [f.name]: e.target.value }))}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  ) : (
                    <Input
                      id={f.name}
                      type={f.type ?? "text"}
                      required={f.required}
                      placeholder={f.placeholder}
                      value={String(formData[f.name] ?? "")}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          [f.name]: f.type === "number" ? Number(e.target.value) : e.target.value,
                        }))
                      }
                    />
                  )}
                </div>
              ))}
            </div>

            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!deleteConfirmRow} onOpenChange={() => setDeleteConfirmRow(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this record? This operation cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDeleteConfirmRow(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={deleteMutation.isPending}
              onClick={() => deleteConfirmRow && deleteMutation.mutate(deleteConfirmRow.id)}
            >
              {deleteMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Delete Record
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
