import { Check } from "lucide-react";

import type { BookingStep } from "./types";

export function BookingStepper({
  currentStep,
  steps,
}: {
  currentStep: BookingStep;
  steps: { id: BookingStep; label: string; shortLabel: string }[];
}) {
  const currentIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className="booking-stepper-shell">
      <div className="hidden items-center gap-4 lg:flex">
        {steps.map((step, index) => {
          const completed = index < currentIndex;
          const active = step.id === currentStep;

          return (
            <div className="flex min-w-0 flex-1 items-center gap-4" key={step.id}>
              <div className="flex items-center gap-4">
                <span
                  className={`booking-step-badge ${
                    active ? "booking-step-badge-active" : completed ? "booking-step-badge-done" : ""
                  }`}
                >
                  {completed ? <Check className="h-4 w-4" strokeWidth={2.2} /> : index + 1}
                </span>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--muted-strong)]">
                    Step {index + 1}
                  </p>
                  <p
                    className={`mt-1 text-sm ${
                      active || completed ? "text-[var(--ivory)]" : "text-[var(--muted)]"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              </div>

              {index < steps.length - 1 ? <div className="booking-step-line" /> : null}
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1 lg:hidden">
        {steps.map((step, index) => {
          const completed = index < currentIndex;
          const active = step.id === currentStep;

          return (
            <div
              className={`booking-step-chip ${
                active ? "booking-step-chip-active" : completed ? "booking-step-chip-done" : ""
              }`}
              key={step.id}
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-current/20">
                {completed ? <Check className="h-4 w-4" strokeWidth={2.2} /> : index + 1}
              </span>
              <span>{step.shortLabel}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
