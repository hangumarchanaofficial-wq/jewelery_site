import { CalendarDays, Clock3, Dot } from "lucide-react";

import { timezones } from "./booking-data";
import { BookingSummary } from "./BookingSummary";
import { TimeSlotButton } from "./TimeSlotButton";
import type { ServiceOption } from "./types";

type CalendarDay = {
  dayNumber: number;
  disabled: boolean;
  iso: string;
  isToday: boolean;
  inMonth: boolean;
};

function formatMonthLabel(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function DateTimeSelection({
  availableSlots,
  calendarDays,
  hasAvailableDates,
  currentMonth,
  onContinue,
  onMonthChange,
  onSelectDate,
  onSelectSlot,
  onTimezoneChange,
  selectedDate,
  selectedDateLabel,
  selectedService,
  selectedTime,
  timezone,
}: {
  availableSlots: { disabled: boolean; label: string }[];
  calendarDays: CalendarDay[];
  hasAvailableDates?: boolean;
  currentMonth: Date;
  onContinue: () => void;
  onMonthChange: (direction: -1 | 1) => void;
  onSelectDate: (iso: string) => void;
  onSelectSlot: (slot: string) => void;
  onTimezoneChange: (timezone: string) => void;
  selectedDate: string;
  selectedDateLabel: string;
  selectedService: ServiceOption | null;
  selectedTime: string;
  timezone: string;
}) {
  const canContinue = Boolean(selectedService && selectedDate && selectedTime && timezone);
  const showNoDatesMessage = !hasAvailableDates;

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <section>
        <div className="booking-section-heading">
          <p className="booking-eyebrow">Step 2</p>
          <h2 className="booking-step-title">Select a time that feels aligned</h2>
          <p className="booking-step-copy">
            Choose your timezone, select an available date, and reserve the online session window
            that best fits your schedule.
          </p>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(19rem,0.95fr)]">
          <div className="booking-surface">
            <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] pb-5">
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.24em] text-[var(--gold-soft)]">
                  Calendar
                </p>
                <h3 className="mt-2 font-display text-[2rem] text-[var(--ivory)]">
                  {formatMonthLabel(currentMonth)}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button className="booking-icon-button" onClick={() => onMonthChange(-1)} type="button">
                  <span aria-hidden="true">←</span>
                </button>
                <button className="booking-icon-button" onClick={() => onMonthChange(1)} type="button">
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-7 gap-2 text-center text-[0.66rem] uppercase tracking-[0.2em] text-[var(--muted-strong)]">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <span className="py-2" key={day}>
                  {day}
                </span>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-7 gap-2">
              {calendarDays.map((day) => {
                const active = selectedDate === day.iso;
                return (
                  <button
                    className={`booking-calendar-day ${
                      active ? "booking-calendar-day-active" : ""
                    } ${!day.inMonth ? "booking-calendar-day-outside" : ""} ${
                      !day.disabled ? "booking-calendar-day-available" : ""
                    }`}
                    disabled={day.disabled}
                    key={day.iso}
                    onClick={() => onSelectDate(day.iso)}
                    type="button"
                  >
                    <span>{day.dayNumber}</span>
                    {day.isToday ? <Dot className="h-4 w-4" strokeWidth={2.4} /> : null}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-4 border-t border-[var(--line)] pt-5 text-xs text-[var(--muted)]">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/75" />
                Available
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />
                Selected
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[rgba(255,255,255,0.12)]" />
                Booked
              </div>
            </div>
          </div>

          <div className="booking-surface">
            <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] pb-5">
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.24em] text-[var(--gold-soft)]">
                  Availability
                </p>
                <h3 className="mt-2 font-display text-[2rem] text-[var(--ivory)]">
                  {selectedDateLabel || "Choose a date"}
                </h3>
              </div>
              <CalendarDays className="h-5 w-5 text-[var(--gold-bright)]" strokeWidth={1.8} />
            </div>

            <label className="booking-label mt-6 block">
              Timezone
              <select
                className="booking-input mt-3"
                onChange={(event) => onTimezoneChange(event.target.value)}
                value={timezone}
              >
                {timezones.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <div className="mt-6 rounded-[1.3rem] border border-[rgba(202,167,107,0.16)] bg-[rgba(255,255,255,0.02)] px-4 py-4 text-sm text-[var(--muted)]">
              <div className="flex items-center gap-3 text-[var(--ivory)]">
                <Clock3 className="h-4 w-4 text-[var(--gold-bright)]" strokeWidth={1.8} />
                <span>All sessions are online and confirmed by email.</span>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {availableSlots.map((slot) => (
                <TimeSlotButton
                  active={selectedTime === slot.label}
                  disabled={slot.disabled}
                  key={slot.label}
                  label={slot.label}
                  onSelect={() => onSelectSlot(slot.label)}
                />
              ))}
            </div>

            {showNoDatesMessage ? (
              <div className="mt-6 rounded-[1.3rem] border border-[rgba(202,167,107,0.2)] bg-[rgba(202,167,107,0.08)] px-4 py-4 text-sm leading-7 text-[var(--muted)]">
                No dates are available right now. Please check back later or contact admin to open new consultation slots.
              </div>
            ) : null}

            <div className="mt-6 border-t border-[var(--line)] pt-5">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--muted-strong)]">
                Selected consultation
              </p>
              <div className="mt-3 flex items-center justify-between gap-4 text-sm">
                <span className="text-[var(--muted)]">{selectedService?.name ?? "Pending selection"}</span>
                <span className="text-[var(--gold-soft)]">{selectedService?.duration ?? "—"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 xl:hidden">
          <BookingSummary
            canContinue={canContinue}
            ctaLabel="Continue to Your Details"
            onContinue={onContinue}
            selectedDateLabel={selectedDateLabel}
            selectedTime={selectedTime}
            service={selectedService}
            timezone={timezone}
          />
        </div>
      </section>

      <div className="hidden xl:block">
        <BookingSummary
          canContinue={canContinue}
          ctaLabel="Continue to Your Details"
          onContinue={onContinue}
          selectedDateLabel={selectedDateLabel}
          selectedTime={selectedTime}
          service={selectedService}
          timezone={timezone}
        />
      </div>
    </div>
  );
}
