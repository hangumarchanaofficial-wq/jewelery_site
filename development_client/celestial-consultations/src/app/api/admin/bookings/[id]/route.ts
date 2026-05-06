import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { createSupabaseAdmin } from "@/lib/supabase-admin";

const PatchSchema = z.object({
  payment_status: z.enum(["awaiting", "paid", "refunded"]).optional(),
  status: z.enum(["pending", "confirmed", "completed", "cancelled", "rescheduled"]).optional(),
});

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase.from("bookings").select("*").eq("id", id).single();

  if (error || !data) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }
  return NextResponse.json({ booking: data });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = PatchSchema.safeParse(body ?? {});

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", details: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase.from("bookings").update(parsed.data).eq("id", id).select().single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ booking: data });
}
