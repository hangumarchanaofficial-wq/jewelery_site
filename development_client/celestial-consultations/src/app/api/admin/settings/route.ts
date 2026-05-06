import { NextRequest, NextResponse } from "next/server";

import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { timeSlots } from "@/app/(booking)/book/booking-data";

const DEFAULT_START = "09:00";
const DEFAULT_END = "20:00";

function isMissingTableError(error: { code?: string; message?: string } | null) {
  if (!error) return false;
  return (
    error.code === "42P01" ||
    error.code === "PGRST205" ||
    (String(error.message ?? "").toLowerCase().includes("relation") &&
      String(error.message ?? "").toLowerCase().includes("admin_settings")) ||
    String(error.message ?? "").toLowerCase().includes("could not find the table")
  );
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

export async function GET() {
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("admin_settings")
    .select("key, value")
    .in("key", ["working_hours_start", "working_hours_end"]);

  if (error) {
    return NextResponse.json({
      fallback: true,
      workingHoursEnd: DEFAULT_END,
      workingHoursStart: DEFAULT_START,
    });
  }

  const settings = Object.fromEntries((data ?? []).map((row) => [row.key, row.value]));
  return NextResponse.json({
    workingHoursEnd: settings.working_hours_end ?? DEFAULT_END,
    workingHoursStart: settings.working_hours_start ?? DEFAULT_START,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const workingHoursStart = String(body?.workingHoursStart ?? "");
  const workingHoursEnd = String(body?.workingHoursEnd ?? "");

  if (!/^\d{2}:\d{2}$/.test(workingHoursStart) || !/^\d{2}:\d{2}$/.test(workingHoursEnd)) {
    return NextResponse.json({ error: "Invalid working hours." }, { status: 422 });
  }

  if (hhmmToMinutes(workingHoursStart) >= hhmmToMinutes(workingHoursEnd)) {
    return NextResponse.json({ error: "Start time must be before end time." }, { status: 422 });
  }

  const supabase = createSupabaseAdmin();
  const { error: upsertError } = await supabase.from("admin_settings").upsert(
    [
      { key: "working_hours_start", value: workingHoursStart },
      { key: "working_hours_end", value: workingHoursEnd },
    ],
    { onConflict: "key" },
  );

  if (upsertError && !isMissingTableError(upsertError)) {
    return NextResponse.json({ error: upsertError.message }, { status: 500 });
  }

  const today = startOfLocalDay(new Date());
  const from = formatLocalIso(today);
  const to = formatLocalIso(addDays(today, 6));
  const { data: availabilityRows } = await supabase
    .from("availability")
    .select("date_iso, slot_time, is_open")
    .gte("date_iso", from)
    .lte("date_iso", to);

  const currentMap = new Map<string, boolean>();
  (availabilityRows ?? []).forEach((row) => {
    currentMap.set(`${row.date_iso}|${row.slot_time}`, Boolean(row.is_open));
  });

  const startMinutes = hhmmToMinutes(workingHoursStart);
  const endMinutes = hhmmToMinutes(workingHoursEnd);

  const rowsToUpsert: { date_iso: string; slot_time: string; is_open: boolean }[] = [];
  for (let day = 0; day < 7; day += 1) {
    const dateIso = formatLocalIso(addDays(today, day));
    for (const slot of timeSlots) {
      const minute = slotToMinutes(slot);
      const insideHours = minute >= startMinutes && minute <= endMinutes;
      const key = `${dateIso}|${slot}`;
      const currentOpen = currentMap.get(key) ?? false;
      rowsToUpsert.push({
        date_iso: dateIso,
        is_open: insideHours ? currentOpen : false,
        slot_time: slot,
      });
    }
  }

  const { error: availabilityError } = await supabase
    .from("availability")
    .upsert(rowsToUpsert, { onConflict: "date_iso,slot_time" });

  if (availabilityError) {
    return NextResponse.json({ error: availabilityError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
