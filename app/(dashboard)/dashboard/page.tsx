
import { Suspense } from "react";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

function DashboardLoading() {
  return (
    <main className="min-h-screen bg-[#09090b] p-10 text-zinc-400">
      Loading TradeMind AI dashboard...
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  );
}
