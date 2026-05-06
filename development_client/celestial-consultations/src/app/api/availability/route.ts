import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

/**
 * GET /api/availability?from=YYYY-MM-DD&to=YYYY-MM-DD
 * Returns open, unbooked slots grouped by date.
 * Used by the booking page to build the calendar.
 */
export async function GET(req: NextRequest) {
  const supabase = createSupabaseAdmin();
  const { searchParams } = new URL(req.url);

  const today = startOfLocalDay(new Date());
  const windowStart = formatLocalIso(today);
  const windowEnd = formatLocalIso(addDays(today, 6));
  const requestedFrom = searchParams.get("from");
  const requestedTo = searchParams.get("to");
  const from = requestedFrom && requestedFrom > windowStart ? requestedFrom : windowStart;
  const to = requestedTo && requestedTo < windowEnd ? requestedTo : windowEnd;

  if (from > to) {
    return NextResponse.json({ schedule: {} }, { status: 200 });
  }

  // 1. Fetch all open slots in range
  const { data: openSlots, error: slotError } = await supabase
    .from("availability")
    .select("date_iso, slot_time")
    .eq("is_open", true)
    .gte("date_iso", from)
    .lte("date_iso", to)
    .order("date_iso")
    .order("slot_time");

  if (slotError) {
    return NextResponse.json({ error: slotError.message }, { status: 500 });
  }

  // 2. Fetch bookings that already occupy a slot in that range
  const { data: booked } = await supabase
    .from("bookings")
    .select("session_date, session_time")
    .in("status", ["pending", "confirmed"])
    .gte("session_date", from)
    .lte("session_date", to);

  const bookedSet = new Set(
    (booked ?? []).map((b) => `${b.session_date}|${b.session_time}`)
  );

  // 3. Group by date, filtering out booked slots
  const schedule: Record<string, string[]> = {};

  for (const row of openSlots ?? []) {
    const key = `${row.date_iso}|${row.slot_time}`;
    if (bookedSet.has(key)) continue;
    if (!schedule[row.date_iso]) schedule[row.date_iso] = [];
    schedule[row.date_iso].push(row.slot_time);
  }

  return NextResponse.json({ schedule }, { status: 200 });
}

function formatLocalIso(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

function startOfLocalDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(date.getDate() + days);
  return next;
}
