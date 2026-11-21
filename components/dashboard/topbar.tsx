
"use client";

import { Bell, Menu, Search } from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";

interface TopbarProps {
  onMenuClick: () => void;
  email: string;
}

export function Topbar({ onMenuClick, email }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-zinc-800 bg-[#09090b]/90 px-4 backdrop-blur-xl md:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white lg:hidden"
        >
          <Menu size={21} />
        </button>

        <div>
          <p className="text-sm font-semibold text-white">Overview</p>
          <p className="hidden text-xs text-zinc-500 sm:block">
            Your trading intelligence at a glance
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-xl border border-zinc-800 bg-[#111114] px-3 py-2 md:flex">
          <Search size={16} className="text-zinc-500" />
          <input
            placeholder="Search..."
            className="w-32 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
          />
          <kbd className="rounded border border-zinc-700 px-1.5 py-0.5 text-[10px] text-zinc-500">
            Ctrl K
          </kbd>
        </div>

        <button
          aria-label="Notifications"
          className="relative rounded-xl border border-zinc-800 p-2.5 text-zinc-400 hover:bg-zinc-800 hover:text-white"
        >
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-yellow-400" />
        </button>

        <div className="hidden h-8 w-px bg-zinc-800 sm:block" />

        <div className="hidden text-right sm:block">
          <p className="max-w-36 truncate text-xs font-medium text-white">
            {email}
          </p>
          <p className="mt-1 text-[10px] text-zinc-500">Demo Trader</p>
        </div>

        <LogoutButton />
      </div>
    </header>
  );
}
