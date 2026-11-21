
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const next = searchParams.get("next");
  const type = searchParams.get("type");

  const safeNext =
    next?.startsWith("/") && !next.startsWith("//")
      ? next
      : "/dashboard";

  if (code) {
    const supabase = await createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      if (type === "recovery") {
        return NextResponse.redirect(
          new URL("/reset-password", origin)
        );
      }

      return NextResponse.redirect(new URL(safeNext, origin));
    }
  }

  return NextResponse.redirect(
    new URL("/login?error=verification_failed", origin)
  );
}
