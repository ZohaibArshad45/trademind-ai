
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#09090b] px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-10 block text-center text-2xl font-bold">
          TradeMind <span className="text-yellow-500">AI.</span>
        </Link>

        <div className="rounded-2xl border border-zinc-800 bg-[#111114] p-8">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Sign in to your trading intelligence workspace.
          </p>

          <div className="mt-8">
            <LoginForm />
          </div>

          <p className="mt-6 text-center text-sm text-zinc-400">
            New to TradeMind?{" "}
            <Link href="/signup" className="text-yellow-500 hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
