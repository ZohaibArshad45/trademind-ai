
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/auth/logout-button";

export default async function DashboardPage() {
  // Request-time execution enable karega
  await connection();

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/login");
  }

  const email = data.claims.email;

  return (
    <main className="min-h-screen bg-[#09090b] p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold">
              TradeMind <span className="text-yellow-500">AI.</span>
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              AI Trading Intelligence Platform
            </p>
          </div>

          <LogoutButton />
        </header>

        <section className="mt-10">
          <p className="text-sm text-zinc-400">Welcome back</p>
          <h2 className="mt-2 text-3xl font-bold">
            {typeof email === "string" ? email : "Trader"}
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Trading Mode", "DEMO"],
              ["AI Agents", "Coming soon"],
              ["Market", "Gold + Forex"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-zinc-800 bg-[#111114] p-6"
              >
                <p className="text-sm text-zinc-400">{label}</p>
                <p className="mt-3 text-xl font-semibold text-yellow-500">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
