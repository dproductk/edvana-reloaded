import { APP } from "@/constants/app";

export function AppFooter() {
  return (
    <footer className="flex items-center justify-between border-t border-border bg-page px-8 py-4 text-xs text-muted-foreground">
      <span>{APP.footerLeft}</span>
      <span>{APP.footerRight}</span>
    </footer>
  );
}
