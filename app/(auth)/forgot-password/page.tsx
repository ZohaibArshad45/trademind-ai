
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage(
      "If an account exists for this email, a password reset link will be sent."
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#09090b] px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#111114] p-8">
        <h1 className="text-2xl font-bold">Forgot password?</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-yellow-500"
          />

          {error && <p className="text-sm text-red-400">{error}</p>}
          {message && <p role="status" className="text-sm text-green-400">{message}</p>}

          <button
            disabled={loading}
            className="w-full rounded-xl bg-yellow-500 py-3 font-semibold text-black disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>

        <Link href="/login" className="mt-6 block text-center text-sm text-yellow-500">
          Back to login
        </Link>
      </div>
    </main>
  );
}
