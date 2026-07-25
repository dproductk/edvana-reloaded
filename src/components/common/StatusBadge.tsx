import { cn } from "@/lib/utils";

type Tone = "success" | "warning" | "danger" | "neutral" | "info";

const TONE_CLASS: Record<Tone, string> = {
  success: "bg-success/10 text-success border-success/30",
  warning: "bg-warning/15 text-warning-foreground border-warning/40",
  danger: "bg-destructive/10 text-destructive border-destructive/30",
  info: "bg-brand-soft text-accent-foreground border-brand/30",
  neutral: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({ label, tone = "neutral" }: { label: string; tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
        TONE_CLASS[tone],
      )}
    >
      {label}
    </span>
  );
}

export function toneForStatus(status: string): Tone {
  const s = status.toLowerCase();
  if (["paid", "success", "pass", "completed", "confirmed"].includes(s)) return "success";
  if (["pending", "upcoming", "live"].includes(s)) return "warning";
  if (["failed", "fail", "rejected"].includes(s)) return "danger";
  return "neutral";
}
