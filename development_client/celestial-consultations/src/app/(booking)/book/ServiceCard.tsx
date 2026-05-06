import { Check } from "lucide-react";

import type { ServiceOption } from "./types";

export function ServiceCard({
  onSelect,
  selected,
  service,
}: {
  onSelect: () => void;
  selected: boolean;
  service: ServiceOption;
}) {
  const Icon = service.icon;

  return (
    <button
      aria-pressed={selected}
      className={`booking-option-card text-left ${
        selected ? "booking-option-card-selected" : ""
      }`}
      onClick={onSelect}
      type="button"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="booking-option-icon">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </div>

        <span
          className={`inline-flex h-8 w-8 items-center justify-center rounded-full border transition ${
            selected
              ? "border-[rgba(236,211,166,0.52)] bg-[rgba(202,167,107,0.16)] text-[var(--gold-bright)]"
              : "border-[rgba(255,255,255,0.08)] text-[var(--muted-strong)]"
          }`}
        >
          <Check className="h-4 w-4" strokeWidth={2} />
        </span>
      </div>

      <div className="mt-6">
        <p className="font-display text-[1.9rem] leading-tight text-[var(--ivory)]">
          {service.name}
        </p>
        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{service.description}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--gold-soft)]">
        <span className="booking-chip">{service.duration}</span>
        <span className="booking-chip">{service.price}</span>
      </div>

      <div className="mt-6 border-t border-[var(--line)] pt-5">
        <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--muted-strong)]">
          Best for
        </p>
        <p className="mt-2 text-sm leading-7 text-[var(--ivory)]">{service.bestFor}</p>
      </div>
    </button>
  );
}
