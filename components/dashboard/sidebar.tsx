
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  BookOpen,
  Bot,
  BrainCircuit,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  X,
} from "lucide-react";

const navigation = [
  {
    title: "WORKSPACE",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Markets", href: "/markets", icon: BarChart3 },
      { label: "AI Agents", href: "/agents", icon: Bot },
      { label: "Strategies", href: "/strategies", icon: BrainCircuit },
    ],
  },
  {
    title: "INTELLIGENCE",
    items: [
      { label: "Knowledge Base", href: "/knowledge", icon: BookOpen },
      { label: "Risk Management", href: "/risk", icon: ShieldCheck },
      { label: "Performance", href: "/performance", icon: Activity },
    ],
  },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Close sidebar overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-zinc-800 bg-[#0d0d10] transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-zinc-800 px-6">
          <Link href="/dashboard" className="text-xl font-bold tracking-tight">
            TradeMind <span className="text-yellow-500">AI.</span>
          </Link>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto px-4 py-7">
          {navigation.map((group) => (
            <div key={group.title}>
              <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.18em] text-zinc-500">
                {group.title}
              </p>

              <nav className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                        active
                          ? "border border-yellow-500/20 bg-yellow-500/10 font-medium text-yellow-400"
                          : "text-zinc-400 hover:bg-zinc-800/60 hover:text-white"
                      }`}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                      {active && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-yellow-400" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-800 p-4">
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-400 transition hover:bg-zinc-800/60 hover:text-white"
          >
            <Settings size={18} />
            Settings
          </Link>

          <div className="mt-4 rounded-xl border border-zinc-800 bg-[#141418] p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-zinc-300">
                Demo Environment
              </span>
            </div>
            <p className="mt-2 text-xs leading-5 text-zinc-500">
              Practice safely. Live trading is not enabled.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
