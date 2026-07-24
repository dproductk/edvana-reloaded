import { Menu, Sun } from "lucide-react";
import { useAuth } from "@/store/auth";
import { APP } from "@/constants/app";
import gpkLogo from "@/assets/gpk-logo.png";
import studentAvatar from "@/assets/student-avatar.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { KeyRound, LogOut } from "lucide-react";
import { authService } from "@/services/auth.service";
import { useNavigate } from "@tanstack/react-router";

interface AppHeaderProps {
  onToggleSidebar?: () => void;
}

export function AppHeader({ onToggleSidebar }: AppHeaderProps) {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
    navigate({ to: "/login" });
  };

  return (
    <header className="relative z-30 flex h-16 items-stretch bg-brand text-brand-foreground shadow-elevated">
      {/* Left: college logo + name */}
      <div className="flex w-72 shrink-0 items-center gap-3 bg-brand pl-4 pr-4">
        <img
          src={gpkLogo}
          alt="Government Polytechnic Kolhapur logo"
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 rounded-full bg-white object-contain p-0.5"
        />
        <span className="text-[13px] font-bold leading-tight tracking-wide">
          {APP.collegeName}
        </span>
      </div>

      {/* Middle: hamburger + college name */}
      <div className="flex flex-1 items-center gap-4 px-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="rounded-md p-2 text-brand-foreground/90 transition-colors hover:bg-white/10"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="text-lg font-semibold">{APP.collegeNameShort}</span>
      </div>

      {/* Right: term + theme + avatar */}
      <div className="flex items-center gap-4 px-6">
        <span className="text-sm">
          <span className="opacity-80">Term:</span>{" "}
          <span className="font-bold tracking-wide">{APP.currentTerm}</span>
        </span>
        <button
          type="button"
          className="rounded-full p-1.5 text-brand-foreground/90 transition-colors hover:bg-white/10"
          aria-label="Toggle theme"
        >
          <Sun className="h-5 w-5" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="h-10 w-10 overflow-hidden rounded-full border-2 border-white/70 bg-white"
              aria-label="Account menu"
            >
              <img
                src={studentAvatar}
                alt={user?.displayName ?? "User"}
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="gap-2 py-2.5">
              <KeyRound className="h-4 w-4" />
              Change Password
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 py-2.5" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
