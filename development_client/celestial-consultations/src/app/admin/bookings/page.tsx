import type { Metadata } from "next";
import Link from "next/link";

import { AdminShell } from "../AdminShell";
import { statusClasses } from "../admin-utils";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

export const metadata: Metadata = {
  title: "Bookings | Star Insight Admin",
  description: "Manage consultation bookings, status, and client readiness.",
};

function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function displayName(row: Record<string, unknown>) {
  const fullName = String(row.full_name ?? "").trim();
  if (fullName) return fullName;
  return [row.first_name, row.last_name]
    .filter(Boolean)
    .map((part) => String(part).trim())
    .join(" ");
}

export default async function AdminBookingsPage() {
  const supabase = createSupabaseAdmin();
  const { data } = await supabase
    .from("bookings")
    .select("*")
    .order("session_date", { ascending: true })
    .order("session_time", { ascending: true })
    .limit(50);

  const bookings = (data ?? []).map((row: Record<string, unknown>) => ({
    id: String(row.id ?? ""),
    client: displayName(row) || "Client",
    payment: titleCase(String(row.payment_status ?? "awaiting")),
    service: String(row.service_name ?? "Consultation"),
    status: titleCase(String(row.status ?? "pending")),
    time: String(row.session_time ?? "--"),
  }));

  const pipelineMap = {
    completed: bookings.filter((item) => item.status === "Completed").length,
    confirmed: bookings.filter((item) => item.status === "Confirmed").length,
    pending: bookings.filter((item) => item.status === "Pending").length,
    rescheduled: bookings.filter((item) => item.status === "Rescheduled").length,
  };
  const bookingPipeline = [
    { label: "Pending", value: pipelineMap.pending },
    { label: "Confirmed", value: pipelineMap.confirmed },
    { label: "Completed", value: pipelineMap.completed },
    { label: "Rescheduled", value: pipelineMap.rescheduled },
  ];

  return (
    <AdminShell
      description="Review incoming requests, confirm sessions, and keep payment and schedule state aligned."
      eyebrow="Bookings"
      title="Booking management"
    >
      <section className="grid gap-4 lg:grid-cols-4">
        {bookingPipeline.map((item) => (
          <div
            className="rounded-[1.6rem] border border-white/10 bg-[rgba(10,10,14,0.82)] p-5 shadow-[0_18px_48px_rgba(0,0,0,0.24)] backdrop-blur-xl"
            key={item.label}
          >
            <p className="text-sm text-[var(--muted)]">{item.label}</p>
            <p className="mt-3 font-display text-[3.2rem] leading-none text-[var(--ivory)]">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[1.8rem] border border-white/10 bg-[rgba(10,10,14,0.82)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6">
        <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[var(--gold-soft)]">Queue</p>
            <h2 className="mt-2 font-display text-3xl text-[var(--ivory)]">All active bookings</h2>
          </div>
          <p className="text-sm leading-7 text-[var(--muted)]">
            Use this view to confirm, reschedule, or close each consultation thread.
          </p>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3 text-left">
            <thead>
              <tr className="text-xs uppercase tracking-[0.22em] text-[var(--muted-strong)]">
                <th className="px-4 py-2 font-medium">Client</th>
                <th className="px-4 py-2 font-medium">Service</th>
                <th className="px-4 py-2 font-medium">Time</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">Payment</th>
                <th className="px-4 py-2 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-4 py-6 text-sm text-[var(--muted)]" colSpan={6}>
                    No data available yet for bookings.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr className="rounded-[1.2rem] bg-white/[0.03]" key={`${booking.client}-${booking.time}`}>
                    <td className="rounded-l-[1.2rem] px-4 py-4 text-sm text-[var(--ivory)]">{booking.client}</td>
                    <td className="px-4 py-4 text-sm text-[var(--muted)]">{booking.service}</td>
                    <td className="px-4 py-4 text-sm text-[var(--muted)]">{booking.time}</td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs ${statusClasses(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs ${statusClasses(booking.payment)}`}>
                        {booking.payment}
                      </span>
                    </td>
                    <td className="rounded-r-[1.2rem] px-4 py-4 text-sm text-[var(--gold-soft)]">
                      <Link className="underline decoration-[rgba(202,167,107,0.3)] underline-offset-4" href={`/admin/bookings/${booking.id}`}>
                        Review
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  );
}
