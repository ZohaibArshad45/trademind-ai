
import Link from "next/link";
import { ArrowRight, BrainCircuit, ChartCandlestick } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-500/20 bg-yellow-500/10">
          <BrainCircuit className="h-8 w-8 text-yellow-500" />
        </div>

        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-yellow-500">
          AI Trading Intelligence
        </p>

        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          Trade smarter with{" "}
          <span className="text-yellow-500">AI.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-zinc-400">
          Analyze markets, understand trading strategies,
          and manage your trading intelligence from one platform.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>

          <div className="flex items-center gap-2 rounded-xl border border-zinc-800 px-6 py-3 text-zinc-300">
            <ChartCandlestick size={18} />
            Demo Trading
          </div>
        </div>
      </div>
    </main>
  );
}
