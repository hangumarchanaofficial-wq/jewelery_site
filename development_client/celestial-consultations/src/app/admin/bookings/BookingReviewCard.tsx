"use client";

import { useState } from "react";

export function BookingReviewCard({
  bookingId,
  initialPaymentStatus,
  initialStatus,
}: {
  bookingId: string;
  initialPaymentStatus: string;
  initialStatus: string;
}) {
  const [status, setStatus] = useState(initialStatus.toLowerCase());
  const [paymentStatus, setPaymentStatus] = useState(initialPaymentStatus.toLowerCase());
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const save = async () => {
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        body: JSON.stringify({
          payment_status: paymentStatus,
          status,
        }),
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error ?? "Failed to update booking.");
      setMessage("Booking updated.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to update booking.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="rounded-[1.8rem] border border-[rgba(202,167,107,0.18)] bg-[rgba(202,167,107,0.08)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6">
      <div className="border-b border-white/10 pb-4">
        <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[var(--gold-soft)]">Action</p>
        <h2 className="mt-2 font-display text-3xl text-[var(--ivory)]">Review booking</h2>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-[var(--muted)]">
          Session status
          <select
            className="mt-2 w-full rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-[var(--ivory)] outline-none"
            onChange={(event) => setStatus(event.target.value)}
            value={status}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed (Done)</option>
            <option value="rescheduled">Rescheduled</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>

        <label className="text-sm text-[var(--muted)]">
          Payment status
          <select
            className="mt-2 w-full rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-[var(--ivory)] outline-none"
            onChange={(event) => setPaymentStatus(event.target.value)}
            value={paymentStatus}
          >
            <option value="awaiting">Awaiting</option>
            <option value="paid">Paid (Done)</option>
            <option value="refunded">Refunded</option>
          </select>
        </label>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-sm text-[var(--muted)]">Apply updates to this booking record.</p>
        <button
          className="rounded-full border border-[rgba(202,167,107,0.35)] bg-[rgba(202,167,107,0.18)] px-5 py-2 text-sm text-[var(--ivory)] transition hover:bg-[rgba(202,167,107,0.24)] disabled:opacity-50"
          disabled={saving}
          onClick={save}
          type="button"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>

      {message ? <p className="mt-4 text-sm text-[var(--gold-soft)]">{message}</p> : null}
    </section>
  );
}
