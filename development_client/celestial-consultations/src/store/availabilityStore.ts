import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { timeSlots } from "@/app/(booking)/book/booking-data";

export type AvailabilitySchedule = Record<string, string[]>;

function formatLocalIso(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

function addDays(baseDate: Date, offset: number) {
  const nextDate = new Date(baseDate);
  nextDate.setDate(baseDate.getDate() + offset);
  return nextDate;
}

export function buildNextWeekSchedule() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const schedule: AvailabilitySchedule = {};
  for (let index = 0; index < 7; index += 1) {
    const date = addDays(today, index);
    const iso = formatLocalIso(date);
    const day = date.getDay();
    if (day === 0) { schedule[iso] = []; continue; }
    schedule[iso] = timeSlots.filter((_, slotIndex) => (slotIndex + index) % 3 !== 0);
  }
  return schedule;
}

function pruneSchedule(schedule: AvailabilitySchedule) {
  const freshSchedule = buildNextWeekSchedule();
  const nextKeys = Object.keys(freshSchedule);
  const allowedSlots = new Set(timeSlots);
  const pruned: AvailabilitySchedule = {};
  nextKeys.forEach((dateKey) => {
    const existing = schedule[dateKey];
    if (!existing) { pruned[dateKey] = freshSchedule[dateKey]; return; }
    pruned[dateKey] = existing.filter((slot) => allowedSlots.has(slot));
  });
  return pruned;
}

export interface AvailabilityState {
  hydrated: boolean;
  schedule: AvailabilitySchedule;
  setHydrated: () => void;
  toggleSlot: (dateIso: string, slot: string) => void;
  replaceDaySlots: (dateIso: string, slots: string[]) => void;
  resetSchedule: () => void;
}

export const useAvailabilityStore = create<AvailabilityState>()(
  persist(
    (set) => ({
      hydrated: false,
      schedule: buildNextWeekSchedule(),
      setHydrated: () =>
        set((state) => ({
          hydrated: true,
          schedule: pruneSchedule(state.schedule),
        })),
      toggleSlot: (dateIso, slot) =>
        set((state) => {
          const currentSlots = state.schedule[dateIso] ?? [];
          const nextSlots = currentSlots.includes(slot)
            ? currentSlots.filter((item) => item !== slot)
            : [...currentSlots, slot].sort((left, right) => timeSlots.indexOf(left) - timeSlots.indexOf(right));
          return { schedule: { ...state.schedule, [dateIso]: nextSlots } };
        }),
      replaceDaySlots: (dateIso, slots) =>
        set((state) => ({
          schedule: {
            ...state.schedule,
            [dateIso]: [...slots].sort((left, right) => timeSlots.indexOf(left) - timeSlots.indexOf(right)),
          },
        })),
      resetSchedule: () => set({ schedule: buildNextWeekSchedule() }),
    }),
    {
      name: "star-insight-availability",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => { state?.setHydrated(); },
    },
  ),
);
