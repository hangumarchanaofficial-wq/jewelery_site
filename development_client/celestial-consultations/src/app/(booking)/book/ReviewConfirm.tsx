import type { ReactNode } from "react";

import { ArrowLeft, CalendarDays, Check, Mail, MoonStar, PencilLine, UserRound } from "lucide-react";

import type { BookingDetails, ServiceOption } from "./types";

function ReviewBlock({
  children,
  onEdit,
  title,
}: {
  children: ReactNode;
  onEdit: () => void;
  title: string;
}) {
  return (
    <div className="booking-surface">
      <div className="booking-section-header">
        <h3 className="booking-subtitle">{title}</h3>
        <button className="booking-edit-button" onClick={onEdit} type="button">
          <PencilLine className="h-4 w-4" strokeWidth={1.8} />
          Edit
        </button>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

export function ReviewConfirm({
  details,
  onBack,
  onConfirm,
  onEditStep,
  reviewConfirmed,
  submitting,
  selectedDateLabel,
  selectedService,
  selectedTime,
  setReviewConfirmed,
  timezone,
}: {
  details: BookingDetails;
  onBack: () => void;
  onConfirm: () => void;
  onEditStep: (step: "service" | "schedule" | "details") => void;
  reviewConfirmed: boolean;
  submitting?: boolean;
  selectedDateLabel: string;
  selectedService: ServiceOption | null;
  selectedTime: string;
  setReviewConfirmed: (value: boolean) => void;
  timezone: string;
}) {
  return (
    <section>
      <div className="booking-section-heading max-w-3xl">
        <p className="booking-eyebrow">Step 4</p>
        <h2 className="booking-step-title">Review your session before confirming</h2>
        <p className="booking-step-copy">
          Take one final look at the service, schedule, and personal details before reserving your
          private session.
        </p>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-6">
          <ReviewBlock onEdit={() => onEditStep("service")} title="Selected Service">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="booking-review-row">
                <span>Consultation</span>
                <strong>{selectedService?.name}</strong>
              </div>
              <div className="booking-review-row">
                <span>Price</span>
                <strong>{selectedService?.price}</strong>
              </div>
              <div className="booking-review-row">
                <span>Duration</span>
                <strong>{selectedService?.duration}</strong>
              </div>
              <div className="booking-review-row">
                <span>Session Type</span>
                <strong>Online private consultation</strong>
              </div>
            </div>
          </ReviewBlock>

          <ReviewBlock onEdit={() => onEditStep("schedule")} title="Date & Time">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="booking-review-row">
                <span>Date</span>
                <strong>{selectedDateLabel}</strong>
              </div>
              <div className="booking-review-row">
                <span>Time</span>
                <strong>{selectedTime}</strong>
              </div>
              <div className="booking-review-row sm:col-span-2">
                <span>Timezone</span>
                <strong>{timezone}</strong>
              </div>
            </div>
          </ReviewBlock>

          <ReviewBlock onEdit={() => onEditStep("details")} title="Your Details">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="booking-review-row">
                <span>Client name</span>
                <strong>{details.fullName}</strong>
              </div>
              <div className="booking-review-row">
                <span>Email</span>
                <strong>{details.email}</strong>
              </div>
              <div className="booking-review-row">
                <span>Phone / WhatsApp</span>
                <strong>{details.phone}</strong>
              </div>
              <div className="booking-review-row">
                <span>Location</span>
                <strong>
                  {details.city}, {details.country}
                </strong>
              </div>
              <div className="booking-review-row">
                <span>Date of birth</span>
                <strong>{details.dateOfBirth}</strong>
              </div>
              <div className="booking-review-row">
                <span>Time of birth</span>
                <strong>{details.timeOfBirth}</strong>
              </div>
              <div className="booking-review-row sm:col-span-2">
                <span>Birth place</span>
                <strong>{details.birthPlace}</strong>
              </div>
              <div className="booking-review-row sm:col-span-2">
                <span>Main focus</span>
                <strong>{details.mainQuestion}</strong>
              </div>
              {details.notes ? (
                <div className="booking-review-row sm:col-span-2">
                  <span>Notes</span>
                  <strong>{details.notes}</strong>
                </div>
              ) : null}
            </div>
          </ReviewBlock>
        </div>

        <aside className="booking-summary-shell">
          <div className="booking-summary-card">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--gold-soft)]">
              Confirmation
            </p>
            <h3 className="mt-3 font-display text-[2rem] leading-tight text-[var(--ivory)]">
              Reserve your private session
            </h3>

            <div className="mt-6 space-y-3 text-sm text-[var(--muted)]">
              <div className="flex items-center gap-3">
                <MoonStar className="h-4 w-4 text-[var(--gold-bright)]" strokeWidth={1.8} />
                <span>{selectedService?.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <CalendarDays className="h-4 w-4 text-[var(--gold-bright)]" strokeWidth={1.8} />
                <span>
                  {selectedDateLabel}, {selectedTime}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <UserRound className="h-4 w-4 text-[var(--gold-bright)]" strokeWidth={1.8} />
                <span>{details.fullName}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[var(--gold-bright)]" strokeWidth={1.8} />
                <span>{details.email}</span>
              </div>
            </div>

            <label className="booking-checkbox mt-6">
              <input
                checked={reviewConfirmed}
                onChange={(event) => setReviewConfirmed(event.target.checked)}
                type="checkbox"
              />
              <span>
                I confirm these details are correct and I am ready to reserve this consultation.
              </span>
            </label>

            <div className="mt-8 grid gap-3">
              <button
                className="premium-button w-full disabled:cursor-not-allowed disabled:opacity-45"
                disabled={!reviewConfirmed || submitting}
                onClick={onConfirm}
                type="button"
              >
                {submitting ? "Confirming..." : "Confirm Booking"}
              </button>
              <button className="booking-secondary-button w-full" onClick={onBack} type="button">
                <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
                Back
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
