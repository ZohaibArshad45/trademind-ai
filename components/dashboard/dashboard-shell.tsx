
"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { TradingChart } from "./trading-chart";

interface DashboardShellProps {
  email: string;
}

export function DashboardShell({ email }: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="min-h-screen lg:pl-64">
        <Topbar
          email={email}
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="p-4 md:p-8">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-8">
              <p className="text-sm text-zinc-500">Trading workspace</p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
                Dashboard Overview
              </h1>
              <p className="mt-2 text-sm text-zinc-400">
                Monitor your markets, AI agents and trading performance.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Account Balance", value: "$10,000.00", detail: "Demo starting balance" },
                { label: "Today's P&L", value: "$0.00", detail: "No trades recorded" },
                { label: "Open Positions", value: "0", detail: "Currently active" },
                { label: "Active AI Agents", value: "0 / 5", detail: "Agents not connected yet" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-zinc-800 bg-[#111114] p-5"
                >
                  <p className="text-sm text-zinc-400">{item.label}</p>
                  <p className="mt-4 text-2xl font-bold tracking-tight">
                    {item.value}
                  </p>
                  <p className="mt-2 text-xs text-zinc-500">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-3">
              <section className="rounded-2xl border border-zinc-800 bg-[#111114] p-6 xl:col-span-2">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-semibold">Market Overview</h2>
                    <p className="mt-1 text-xs text-zinc-500">
                      Watchlist preview
                    </p>
                  </div>
                  <span className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-400">
                    DEMO DATA
                  </span>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    { symbol: "XAUUSD", name: "Gold / US Dollar", price: "Not connected" },
                    { symbol: "EURUSD", name: "Euro / US Dollar", price: "Not connected" },
                    { symbol: "GBPUSD", name: "Pound / US Dollar", price: "Not connected" },
                  ].map((market) => (
                    <div
                      key={market.symbol}
                      className="rounded-xl border border-zinc-800 bg-[#0d0d10] p-4"
                    >
                      <p className="text-sm font-semibold">{market.symbol}</p>
                      <p className="mt-1 text-xs text-zinc-500">{market.name}</p>
                      <p className="mt-5 text-sm font-medium text-zinc-300">
                        {market.price}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-zinc-800 bg-[#111114] p-6">
                <h2 className="font-semibold">AI Agent Status</h2>
                <p className="mt-1 text-xs text-zinc-500">
                  Your five intelligence agents
                </p>

                <div className="mt-5 space-y-4">
                  {["News Agent", "ICT / SMC Agent", "Technical Agent", "Risk Agent", "Sentiment Agent"].map((agent) => (
                    <div key={agent} className="flex items-center justify-between">
                      <span className="text-sm text-zinc-300">{agent}</span>
                      <span className="rounded-md bg-zinc-800 px-2 py-1 text-[10px] text-zinc-400">
                        Not connected
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            <div className="mt-6">
  <TradingChart />
</div>

            <section className="mt-6 rounded-2xl border border-zinc-800 bg-[#111114] p-6">
              <h2 className="font-semibold">Recent Trading Activity</h2>
              <p className="mt-1 text-xs text-zinc-500">
                Your latest demo trading activity will appear here.
              </p>

              <div className="flex min-h-40 flex-col items-center justify-center text-center">
                <p className="text-sm font-medium text-zinc-300">
                  No trading activity yet
                </p>
                <p className="mt-2 text-xs text-zinc-500">
                  Trading history will appear after your first demo trade.
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
