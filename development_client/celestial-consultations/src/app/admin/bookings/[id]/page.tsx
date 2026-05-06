import type { Metadata } from "next";
import Link from "next/link";

import { AdminShell } from "../../AdminShell";
import { BookingReviewCard } from "../BookingReviewCard";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

export const metadata: Metadata = {
  title: "Booking Review | Star Insight Admin",
  description: "Review client details and update booking/payment status.",
};

function value(row: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    if (row[key] != null && String(row[key]).trim() !== "") return String(row[key]);
  }
  return "—";
}

export default async function AdminBookingReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createSupabaseAdmin();
  const { data } = await supabase.from("bookings").select("*").eq("id", id).single();

  if (!data) {
    return (
      <AdminShell description="Booking detail was not found." eyebrow="Bookings" title="Booking review">
        <section className="rounded-[1.8rem] border border-white/10 bg-[rgba(10,10,14,0.82)] p-6 text-sm text-[var(--muted)]">
          No booking found for this record.
        </section>
      </AdminShell>
    );
  }

  const row = data as Record<string, unknown>;
  const clientName = value(row, ["full_name", "first_name"]);
  const lastName = value(row, ["last_name"]);
  const displayName = clientName !== "—" && lastName !== "—" ? `${clientName} ${lastName}` : clientName;

  return (
    <AdminShell
      description="View full intake details and update booking + payment state."
      eyebrow="Bookings"
      title="Booking review"
    >
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)]">
        <section className="rounded-[1.8rem] border border-white/10 bg-[rgba(10,10,14,0.82)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[var(--gold-soft)]">Client</p>
              <h2 className="mt-2 font-display text-3xl text-[var(--ivory)]">{displayName}</h2>
            </div>
            <Link className="booking-secondary-button" href="/admin/bookings">
              Back to bookings
            </Link>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4 text-sm text-[var(--muted)]">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-strong)]">Email</p>
              <p className="mt-2 text-[var(--ivory)]">{value(row, ["email"])}</p>
            </div>
            <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4 text-sm text-[var(--muted)]">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-strong)]">Phone</p>
              <p className="mt-2 text-[var(--ivory)]">{value(row, ["phone"])}</p>
            </div>
            <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4 text-sm text-[var(--muted)]">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-strong)]">Session date</p>
              <p className="mt-2 text-[var(--ivory)]">{value(row, ["session_date"])}</p>
            </div>
            <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4 text-sm text-[var(--muted)]">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-strong)]">Session time</p>
              <p className="mt-2 text-[var(--ivory)]">{value(row, ["session_time"])}</p>
            </div>
            <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4 text-sm text-[var(--muted)]">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-strong)]">Birth date</p>
              <p className="mt-2 text-[var(--ivory)]">{value(row, ["date_of_birth", "dob"])}</p>
            </div>
            <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4 text-sm text-[var(--muted)]">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-strong)]">Birth time</p>
              <p className="mt-2 text-[var(--ivory)]">{value(row, ["time_of_birth", "tob"])}</p>
            </div>
            <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4 text-sm text-[var(--muted)] sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-strong)]">Birth place</p>
              <p className="mt-2 text-[var(--ivory)]">{value(row, ["birth_place", "pob"])}</p>
            </div>
            <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4 text-sm text-[var(--muted)] sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-strong)]">Focus / notes</p>
              <p className="mt-2 text-[var(--ivory)]">
                {value(row, ["main_question", "focus_notes", "notes"])}
              </p>
            </div>
          </div>
        </section>

        <BookingReviewCard
          bookingId={id}
          initialPaymentStatus={value(row, ["payment_status"]).toLowerCase() === "—" ? "awaiting" : value(row, ["payment_status"]).toLowerCase()}
          initialStatus={value(row, ["status"]).toLowerCase() === "—" ? "pending" : value(row, ["status"]).toLowerCase()}
        />
      </section>
    </AdminShell>
  );
}
