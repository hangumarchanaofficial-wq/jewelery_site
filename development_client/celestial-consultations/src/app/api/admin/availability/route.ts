import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { AvailabilityWriteSchema } from "@/lib/schemas";
import { timeSlots } from "@/app/(booking)/book/booking-data";

/**
 * GET  /api/admin/availability?from=YYYY-MM-DD&to=YYYY-MM-DD
 * POST /api/admin/availability  body: { schedule: { "YYYY-MM-DD": ["09:00 AM", ...] } }
 *
 * The POST replaces the entire schedule for the dates sent.
 * This syncs the Zustand availabilityStore to the database.
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
    return NextResponse.json({ schedule: {} });
  }

  const { data, error } = await supabase
    .from("availability")
    .select("date_iso, slot_time, is_open")
    .gte("date_iso", from)
    .lte("date_iso", to)
    .order("date_iso")
    .order("slot_time");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Group into schedule object
  const schedule: Record<string, string[]> = {};
  for (const row of data ?? []) {
    if (!row.is_open) continue;
    if (!schedule[row.date_iso]) schedule[row.date_iso] = [];
    schedule[row.date_iso].push(row.slot_time);
  }

  return NextResponse.json({ schedule });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = AvailabilityWriteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { schedule } = parsed.data;
  const supabase = createSupabaseAdmin();
  const { data: settingsRows } = await supabase
    .from("admin_settings")
    .select("key, value")
    .in("key", ["working_hours_start", "working_hours_end"]);
  const settings = Object.fromEntries((settingsRows ?? []).map((row) => [row.key, row.value]));
  const startMinutes = hhmmToMinutes(settings.working_hours_start ?? "09:00");
  const endMinutes = hhmmToMinutes(settings.working_hours_end ?? "20:00");
  const today = startOfLocalDay(new Date());
  const allowedDates = new Set(
    Array.from({ length: 7 }, (_, index) => formatLocalIso(addDays(today, index))),
  );

  const ALL_SLOTS = timeSlots;

  // Build upsert rows
  const rows: { date_iso: string; slot_time: string; is_open: boolean }[] = [];

  for (const [dateIso, openSlots] of Object.entries(schedule)) {
    if (!allowedDates.has(dateIso)) continue;
    for (const slot of ALL_SLOTS) {
      rows.push({
        date_iso:  dateIso,
        slot_time: slot,
        is_open:   openSlots.includes(slot) && isSlotWithinWorkingHours(slot, startMinutes, endMinutes),
      });
    }
  }

  const { error } = await supabase
    .from("availability")
    .upsert(rows, { onConflict: "date_iso,slot_time" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, saved: rows.length });
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

function slotToMinutes(slot: string) {
  const [time, meridiem] = slot.split(" ");
  const [hourText, minuteText] = time.split(":");
  let hour = Number(hourText);
  const minute = Number(minuteText);
  if (meridiem === "PM" && hour !== 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;
  return hour * 60 + minute;
}

function hhmmToMinutes(value: string) {
  const [hourText, minuteText] = value.split(":");
  return Number(hourText) * 60 + Number(minuteText);
}

function isSlotWithinWorkingHours(slot: string, startMinutes: number, endMinutes: number) {
  const slotMinute = slotToMinutes(slot);
  return slotMinute >= startMinutes && slotMinute <= endMinutes;
}
