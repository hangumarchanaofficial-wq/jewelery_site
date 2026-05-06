import type { Metadata } from "next";

import { AdminShell } from "../AdminShell";
import { AdminAvailabilityManager } from "./AdminAvailabilityManager";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

export const metadata: Metadata = {
  title: "Calendar | Star Insight Admin",
  description: "Monitor availability, session flow, and blocked slots.",
};

function dayTone(tone: string) {
  switch (tone) {
    case "busy":
      return "bg-amber-300/10 text-amber-200 ring-1 ring-amber-300/20";
    case "warn":
      return "bg-sky-300/10 text-sky-200 ring-1 ring-sky-300/20";
    case "off":
      return "bg-white/6 text-[var(--muted)] ring-1 ring-white/10";
    default:
      return "bg-emerald-400/10 text-emerald-200 ring-1 ring-emerald-400/20";
  }
}

function formatLocalIso(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(date.getDate() + days);
  return next;
}

function formatShortDay(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", { weekday: "short" });
}

export default async function AdminCalendarPage() {
  const supabase = createSupabaseAdmin();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const from = formatLocalIso(today);
  const to = formatLocalIso(addDays(today, 6));

  const [availabilityRes, bookingsRes, timelineRes] = await Promise.all([
    supabase
      .from("availability")
      .select("date_iso, slot_time")
      .eq("is_open", true)
      .gte("date_iso", from)
      .lte("date_iso", to),
    supabase
      .from("bookings")
      .select("session_date, session_time")
      .in("status", ["pending", "confirmed"])
      .gte("session_date", from)
      .lte("session_date", to),
    supabase
      .from("bookings")
      .select("id, session_time, service_name, full_name")
      .eq("session_date", from)
      .neq("status", "cancelled")
      .order("session_time", { ascending: true }),
  ]);

  const bookedSet = new Set(
    (bookingsRes.data ?? []).map((row) => `${row.session_date}|${row.session_time}`),
  );
  const openCountByDate: Record<string, number> = {};
  (availabilityRes.data ?? []).forEach((row) => {
    const key = `${row.date_iso}|${row.slot_time}`;
    if (bookedSet.has(key)) return;
    openCountByDate[row.date_iso] = (openCountByDate[row.date_iso] ?? 0) + 1;
  });

  const days = Array.from({ length: 7 }, (_, index) => {
    const iso = formatLocalIso(addDays(today, index));
    const openCount = openCountByDate[iso] ?? 0;
    return {
      day: formatShortDay(iso),
      openCount,
      slotsLabel: openCount === 0 ? "Blocked" : openCount >= 7 ? "Full" : `${openCount} open`,
      tone: openCount === 0 ? "off" : openCount >= 7 ? "busy" : openCount <= 2 ? "warn" : "good",
    };
  });

  const timeline = (timelineRes.data ?? []).map((row) => ({
    client: row.full_name ?? "Client",
    time: row.session_time ?? "--",
    title: row.service_name ?? "Consultation",
  }));

  return (
    <AdminShell
      description="Control open slots, blocked time, and the day-by-day schedule rhythm for client sessions."
      eyebrow="Calendar"
      title="Availability calendar"
    >
      <AdminAvailabilityManager />

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.9fr)]">
        <div className="rounded-[1.8rem] border border-white/10 bg-[rgba(10,10,14,0.82)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6">
          <div className="border-b border-white/10 pb-4">
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[var(--gold-soft)]">Week status</p>
            <h2 className="mt-2 font-display text-3xl text-[var(--ivory)]">Open slot coverage</h2>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {days.map((day) => (
              <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.03] p-4" key={day.day}>
                <p className="text-sm text-[var(--muted)]">{day.day}</p>
                <div className="mt-4">
                  <span className={`rounded-full px-3 py-1 text-xs ${dayTone(day.tone)}`}>
                    {day.slotsLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-white/10 bg-[rgba(10,10,14,0.82)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6">
          <div className="border-b border-white/10 pb-4">
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[var(--gold-soft)]">Rules</p>
            <h2 className="mt-2 font-display text-3xl text-[var(--ivory)]">Current constraints</h2>
          </div>
          <div className="mt-5 space-y-3 text-sm leading-7 text-[var(--muted)]">
            <p>Working hours: 09:00 to 20:00</p>
            <p>15 minute buffer enforced between consultations</p>
            <p>Sunday evening and public holiday blocks enabled</p>
            <p>Manual override available for urgent client requests</p>
          </div>
        </div>
      </section>

      <section className="rounded-[1.8rem] border border-white/10 bg-[rgba(10,10,14,0.82)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6">
        <div className="border-b border-white/10 pb-4">
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[var(--gold-soft)]">Timeline</p>
          <h2 className="mt-2 font-display text-3xl text-[var(--ivory)]">Today timeline</h2>
        </div>
        <div className="mt-5 space-y-4">
          {timeline.length === 0 ? (
            <div className="rounded-[1.35rem] border border-[rgba(202,167,107,0.18)] bg-[rgba(202,167,107,0.08)] px-4 py-4 text-sm text-[var(--muted)]">
              No data available for today timeline.
            </div>
          ) : (
            timeline.map((item) => (
              <div className="flex items-start gap-4 rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-4" key={`${item.time}-${item.title}-${item.client}`}>
                <div className="w-20 shrink-0 text-sm text-[var(--muted)]">{item.time}</div>
                <div className="min-w-0">
                  <p className="text-sm text-[var(--ivory)]">{item.title}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{item.client}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </AdminShell>
  );
}
