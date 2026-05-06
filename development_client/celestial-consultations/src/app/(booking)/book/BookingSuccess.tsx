import Link from "next/link";

import { CalendarPlus2, Check, Home, RotateCcw, Star } from "lucide-react";

export function BookingSuccess({
  bookingReference,
  onAddToCalendar,
  onBookAnother,
}: {
  bookingReference: string;
  onAddToCalendar: () => void;
  onBookAnother: () => void;
}) {
  return (
    <section className="mx-auto max-w-4xl">
      <div className="booking-success-panel">
        <span className="booking-success-emblem">
          <Check className="h-7 w-7" strokeWidth={2.4} />
        </span>

        <p className="booking-eyebrow mt-8 justify-center">Session Reserved</p>
        <h1 className="mt-5 text-center font-display text-5xl leading-[0.92] text-[var(--ivory)] sm:text-6xl">
          Your session is reserved
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-8 text-[var(--muted)]">
          A confirmation email with your session details will be sent shortly.
        </p>

        <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3 rounded-full border border-[rgba(202,167,107,0.22)] bg-[rgba(255,255,255,0.03)] px-6 py-4 text-sm text-[var(--gold-soft)]">
          <Star className="h-4 w-4 text-[var(--gold-bright)]" strokeWidth={1.8} />
          Booking reference {bookingReference}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <button className="premium-button w-full" onClick={onAddToCalendar} type="button">
            <CalendarPlus2 className="h-4 w-4" strokeWidth={1.8} />
            Add to Calendar
          </button>
          <button className="booking-secondary-button w-full" onClick={onBookAnother} type="button">
            <RotateCcw className="h-4 w-4" strokeWidth={1.8} />
            Book Another Session
          </button>
          <Link className="booking-secondary-button w-full justify-center" href="/">
            <Home className="h-4 w-4" strokeWidth={1.8} />
            Return Home
          </Link>
        </div>
      </div>
    </section>
  );
}
