import type { ReactNode } from "react";

import { LockKeyhole, Sparkles } from "lucide-react";

import { BookingSummary } from "./BookingSummary";
import type { BookingDetails, BookingErrors, ServiceOption } from "./types";

function Field({
  children,
  error,
  label,
  required,
}: {
  children: ReactNode;
  error?: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label className="booking-label">
      <span className="flex items-center gap-2">
        {label}
        {required ? <span className="text-[var(--gold-soft)]">*</span> : null}
      </span>
      <div className="mt-3">{children}</div>
      {error ? <p className="booking-field-error">{error}</p> : null}
    </label>
  );
}

export function ClientDetailsForm({
  details,
  errors,
  onChange,
  onContinue,
  selectedDateLabel,
  selectedTime,
  selectedService,
  timezone,
}: {
  details: BookingDetails;
  errors: BookingErrors;
  onChange: <K extends keyof BookingDetails>(field: K, value: BookingDetails[K]) => void;
  onContinue: () => void;
  selectedDateLabel: string;
  selectedTime: string;
  selectedService: ServiceOption | null;
  timezone: string;
}) {
  const canContinue =
    Boolean(details.fullName && details.email && details.phone && details.country && details.city) &&
    Boolean(details.dateOfBirth && details.timeOfBirth && details.birthPlace) &&
    Boolean(details.mainQuestion && details.consent);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <section>
        <div className="booking-section-heading">
          <p className="booking-eyebrow">Step 3</p>
          <h2 className="booking-step-title">Share the details we need for your chart</h2>
          <p className="booking-step-copy">
            Your information stays private. These details help prepare the session properly and keep
            the consultation focused from the first minute.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="booking-surface">
            <div className="booking-section-header">
              <div>
                <p className="booking-eyebrow">Contact Details</p>
                <h3 className="booking-subtitle">How we will reach you</h3>
              </div>
              <Sparkles className="h-5 w-5 text-[var(--gold-bright)]" strokeWidth={1.8} />
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Field error={errors.fullName} label="Full Name" required>
                <input
                  className="booking-input"
                  onChange={(event) => onChange("fullName", event.target.value)}
                  value={details.fullName}
                />
              </Field>
              <Field error={errors.email} label="Email Address" required>
                <input
                  className="booking-input"
                  onChange={(event) => onChange("email", event.target.value)}
                  type="email"
                  value={details.email}
                />
              </Field>
              <Field error={errors.phone} label="Phone / WhatsApp Number" required>
                <input
                  className="booking-input"
                  onChange={(event) => onChange("phone", event.target.value)}
                  value={details.phone}
                />
              </Field>
              <Field error={errors.country} label="Country" required>
                <input
                  className="booking-input"
                  onChange={(event) => onChange("country", event.target.value)}
                  value={details.country}
                />
              </Field>
              <Field error={errors.city} label="Current City" required>
                <input
                  className="booking-input"
                  onChange={(event) => onChange("city", event.target.value)}
                  value={details.city}
                />
              </Field>
            </div>
          </div>

          <div className="booking-surface">
            <div className="booking-section-header">
              <div>
                <p className="booking-eyebrow">Birth Details</p>
                <h3 className="booking-subtitle">The foundation of the reading</h3>
              </div>
              <LockKeyhole className="h-5 w-5 text-[var(--gold-bright)]" strokeWidth={1.8} />
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Field error={errors.dateOfBirth} label="Date of Birth" required>
                <input
                  className="booking-input"
                  onChange={(event) => onChange("dateOfBirth", event.target.value)}
                  type="date"
                  value={details.dateOfBirth}
                />
              </Field>
              <Field error={errors.timeOfBirth} label="Time of Birth" required>
                <input
                  className="booking-input"
                  onChange={(event) => onChange("timeOfBirth", event.target.value)}
                  type="time"
                  value={details.timeOfBirth}
                />
              </Field>
              <Field error={errors.birthPlace} label="Birth Place" required>
                <input
                  className="booking-input md:col-span-2"
                  onChange={(event) => onChange("birthPlace", event.target.value)}
                  value={details.birthPlace}
                />
              </Field>
            </div>
          </div>

          <div className="booking-surface">
            <div className="booking-section-header">
              <div>
                <p className="booking-eyebrow">Consultation Focus</p>
                <h3 className="booking-subtitle">What you want the session to hold</h3>
              </div>
            </div>

            <div className="mt-6 grid gap-5">
              <Field error={errors.mainQuestion} label="Main Question / Focus Area" required>
                <textarea
                  className="booking-input min-h-36 resize-y"
                  onChange={(event) => onChange("mainQuestion", event.target.value)}
                  value={details.mainQuestion}
                />
              </Field>

              <Field error={errors.notes} label="Optional Notes">
                <textarea
                  className="booking-input min-h-28 resize-y"
                  onChange={(event) => onChange("notes", event.target.value)}
                  value={details.notes}
                />
              </Field>

              <label className="booking-checkbox">
                <input
                  checked={details.consent}
                  onChange={(event) => onChange("consent", event.target.checked)}
                  type="checkbox"
                />
                <span>
                  I agree to share my birth details for the purpose of this astrology consultation.
                </span>
              </label>
              {errors.consent ? <p className="booking-field-error">{errors.consent}</p> : null}

              <p className="rounded-[1.2rem] border border-[rgba(202,167,107,0.14)] bg-[rgba(255,255,255,0.02)] px-4 py-4 text-sm leading-7 text-[var(--muted)]">
                Your information is private and will never be shared.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 xl:hidden">
          <BookingSummary
            canContinue={canContinue}
            ctaLabel="Continue to Review"
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
          ctaLabel="Continue to Review"
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
