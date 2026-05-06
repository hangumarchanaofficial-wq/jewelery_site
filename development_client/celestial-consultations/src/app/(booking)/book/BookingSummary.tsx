import { CheckCircle2 } from "lucide-react";

import { summaryHighlights } from "./booking-data";
import type { ServiceOption } from "./types";

export function BookingSummary({
  canContinue,
  ctaLabel,
  onContinue,
  service,
  selectedDateLabel,
  selectedTime,
  timezone,
}: {
  canContinue: boolean;
  ctaLabel: string;
  onContinue: () => void;
  service: ServiceOption | null;
  selectedDateLabel?: string;
  selectedTime?: string;
  timezone?: string;
}) {
  return (
    <aside className="booking-summary-shell">
      <div className="booking-summary-card">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--gold-soft)]">
              Session Summary
            </p>
            <h3 className="mt-3 font-display text-[2rem] leading-none text-[var(--ivory)]">
              {service?.name ?? "Select a consultation"}
            </h3>
          </div>
          {service ? (
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(202,167,107,0.26)] bg-[rgba(202,167,107,0.12)] text-[var(--gold-bright)]">
              <CheckCircle2 className="h-5 w-5" strokeWidth={1.8} />
            </span>
          ) : null}
        </div>

        <div className="mt-6 grid gap-3 text-sm">
          <div className="booking-summary-row">
            <span>Duration</span>
            <strong>{service?.duration ?? "Pending"}</strong>
          </div>
          <div className="booking-summary-row">
            <span>Price</span>
            <strong>{service?.price ?? "Pending"}</strong>
          </div>
          <div className="booking-summary-row">
            <span>Date</span>
            <strong>{selectedDateLabel ?? "Choose a day"}</strong>
          </div>
          <div className="booking-summary-row">
            <span>Time</span>
            <strong>{selectedTime ?? "Choose a slot"}</strong>
          </div>
          <div className="booking-summary-row">
            <span>Timezone</span>
            <strong>{timezone ?? "Select timezone"}</strong>
          </div>
        </div>

        <div className="mt-6 border-t border-[var(--line)] pt-6">
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--muted-strong)]">
            What is included
          </p>
          <div className="mt-4 space-y-3">
            {(service?.included ?? summaryHighlights.map((item) => item.label)).map((item) => (
              <div className="flex items-start gap-3 text-sm leading-7 text-[var(--muted)]" key={item}>
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          className="premium-button mt-8 w-full disabled:cursor-not-allowed disabled:opacity-45"
          disabled={!canContinue}
          onClick={onContinue}
          type="button"
        >
          {ctaLabel}
        </button>
      </div>
    </aside>
  );
}
