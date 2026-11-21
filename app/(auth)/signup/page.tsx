
import Link from "next/link";
import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#09090b] px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-10 block text-center text-2xl font-bold">
          TradeMind <span className="text-yellow-500">AI.</span>
        </Link>

        <div className="rounded-2xl border border-zinc-800 bg-[#111114] p-8">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Start your AI trading intelligence journey.
          </p>

          <div className="mt-8">
            <SignupForm />
          </div>

          <p className="mt-6 text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Link href="/login" className="text-yellow-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
