import { cn } from "@/lib/utils";

type Tone = "success" | "warning" | "danger" | "neutral" | "info";

const TONE_CLASS: Record<Tone, string> = {
  success: "bg-success/10 text-success border-success/30",
  warning: "bg-warning/15 text-warning-foreground border-warning/40",
  danger: "bg-destructive/10 text-destructive border-destructive/30",
  info: "bg-brand-soft text-accent-foreground border-brand/30",
  neutral: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({
  status,
  label,
  tone,
}: {
  status?: string;
  label?: string;
  tone?: Tone;
}) {
  const displayLabel = label ?? status ?? "";
  const displayTone = tone ?? (status ? toneForStatus(status) : "neutral");
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
        TONE_CLASS[displayTone],
      )}
    >
      {displayLabel}
    </span>
  );
}

export function toneForStatus(status: string): Tone {
  const s = status.toLowerCase();
  if (
    [
      "active",
      "paid",
      "successful",
      "success",
      "pass",
      "completed",
      "confirmed",
      "finalized",
      "approved",
      "published",
      "eligible",
    ].includes(s)
  )
    return "success";
  if (
    [
      "pending",
      "draft",
      "upcoming",
      "live",
      "in progress",
      "verification pending",
      "under review",
      "fee pending",
    ].includes(s)
  )
    return "warning";
  if (
    [
      "inactive",
      "failed",
      "fail",
      "rejected",
      "cancelled",
      "closed",
      "not eligible",
      "error",
    ].includes(s)
  )
    return "danger";
  return "neutral";
}

