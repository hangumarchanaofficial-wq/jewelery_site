"use client";

import { useEffect, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";

import { timeSlots } from "@/app/(booking)/book/booking-data";
import { getAdminAvailability, getAdminSettings, saveAdminAvailability } from "@/lib/api";

function formatLocalIso(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

function formatLongDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    weekday: "short",
  });
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

export function AdminAvailabilityManager() {
  const [hydrated, setHydrated] = useState(false);
  const [schedule, setSchedule] = useState<Record<string, string[]>>({});
  const [saving, setSaving] = useState(false);
  const [workingHoursStart, setWorkingHoursStart] = useState("09:00");
  const [workingHoursEnd, setWorkingHoursEnd] = useState("20:00");

  const nextWeekKeys = useMemo(() => {
    const keys: string[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let index = 0; index < 7; index += 1) {
      const date = new Date(today);
      date.setDate(today.getDate() + index);
      keys.push(formatLocalIso(date));
    }
    return keys;
  }, []);

  useEffect(() => {
    const load = async () => {
      const from = nextWeekKeys[0];
      const to = nextWeekKeys[nextWeekKeys.length - 1];
      try {
        const [remote, settings] = await Promise.all([
          getAdminAvailability(from, to),
          getAdminSettings(),
        ]);
        setWorkingHoursStart(settings.workingHoursStart ?? "09:00");
        setWorkingHoursEnd(settings.workingHoursEnd ?? "20:00");
        const normalized: Record<string, string[]> = {};
        const startMinutes = hhmmToMinutes(settings.workingHoursStart ?? "09:00");
        const endMinutes = hhmmToMinutes(settings.workingHoursEnd ?? "20:00");
        nextWeekKeys.forEach((dateKey) => {
          normalized[dateKey] = (remote[dateKey] ?? []).filter((slot) => {
            const minutes = slotToMinutes(slot);
            return minutes >= startMinutes && minutes <= endMinutes;
          });
        });
        setSchedule(normalized);
      } finally {
        setHydrated(true);
      }
    };
    load();
  }, [nextWeekKeys]);

  const persistSchedule = async (nextSchedule: Record<string, string[]>) => {
    setSchedule(nextSchedule);
    setSaving(true);
    try {
      await saveAdminAvailability(nextSchedule);
    } finally {
      setSaving(false);
    }
  };

  const toggleSlot = (dateIso: string, slot: string) => {
    const currentSlots = schedule[dateIso] ?? [];
    const nextSlots = currentSlots.includes(slot)
      ? currentSlots.filter((item) => item !== slot)
      : [...currentSlots, slot].sort((left, right) => timeSlots.indexOf(left) - timeSlots.indexOf(right));
    void persistSchedule({ ...schedule, [dateIso]: nextSlots });
  };

  const replaceDaySlots = (dateIso: string, slots: string[]) => {
    void persistSchedule({
      ...schedule,
      [dateIso]: [...slots].sort((left, right) => timeSlots.indexOf(left) - timeSlots.indexOf(right)),
    });
  };

  const resetSchedule = () => {
    const reset: Record<string, string[]> = {};
    nextWeekKeys.forEach((dateKey) => {
      reset[dateKey] = [];
    });
    void persistSchedule(reset);
  };

  const allowedStart = hhmmToMinutes(workingHoursStart);
  const allowedEnd = hhmmToMinutes(workingHoursEnd);

  if (!hydrated) {
    return (
      <section className="rounded-[1.8rem] border border-white/10 bg-[rgba(10,10,14,0.82)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6">
        <p className="text-sm text-[var(--muted)]">Loading availability controls...</p>
      </section>
    );
  }

  return (
    <section className="rounded-[1.8rem] border border-white/10 bg-[rgba(10,10,14,0.82)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[var(--gold-soft)]">Admin control</p>
          <h2 className="mt-2 font-display text-3xl text-[var(--ivory)]">Next 7 day availability</h2>
        </div>
        <div className="flex gap-3">
          <button
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-[var(--muted)] transition hover:text-[var(--ivory)]"
            disabled={saving}
            onClick={resetSchedule}
            type="button"
          >
            <RotateCcw className="h-4 w-4" strokeWidth={1.8} />
            {saving ? "Saving..." : "Reset week"}
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        {nextWeekKeys.map((dateKey) => {
          const activeSlots = schedule[dateKey] ?? [];
          const isOpen = activeSlots.length > 0;

          return (
            <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.03] p-4" key={dateKey}>
              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-[var(--ivory)]">{formatLongDate(dateKey)}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {isOpen ? `${activeSlots.length} slots open` : "Unavailable to clients"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--muted)]"
                    onClick={() =>
                      replaceDaySlots(
                        dateKey,
                        timeSlots.filter((slot) => {
                          const minute = slotToMinutes(slot);
                          return minute >= allowedStart && minute <= allowedEnd;
                        }),
                      )
                    }
                    type="button"
                  >
                    All
                  </button>
                  <button
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--muted)]"
                    onClick={() => replaceDaySlots(dateKey, [])}
                    type="button"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {timeSlots.map((slot) => {
                  const inWorkingHours = (() => {
                    const minute = slotToMinutes(slot);
                    return minute >= allowedStart && minute <= allowedEnd;
                  })();
                  const active = activeSlots.includes(slot);
                  return (
                    <button
                      className={`rounded-[1rem] border px-4 py-3 text-sm transition ${
                        active
                          ? "border-[rgba(202,167,107,0.42)] bg-[rgba(202,167,107,0.14)] text-[var(--gold-bright)]"
                          : inWorkingHours
                            ? "border-white/10 bg-white/[0.02] text-[var(--muted)] hover:text-[var(--ivory)]"
                            : "border-white/5 bg-white/[0.01] text-[var(--muted-strong)] opacity-45"
                      }`}
                      disabled={!inWorkingHours}
                      key={slot}
                      onClick={() => toggleSlot(dateKey, slot)}
                      type="button"
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
