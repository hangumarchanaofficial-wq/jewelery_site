import type { Metadata } from "next";
import { MapPin, NotebookText, Repeat, Users } from "lucide-react";

import { AdminShell } from "../AdminShell";
import { statusClasses } from "../admin-utils";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

export const metadata: Metadata = {
  title: "Clients | Star Insight Admin",
  description: "Client records, readiness, and follow-up state.",
};

function formatShortDate(value?: string | null) {
  if (!value) return "New";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "New";
  return date.toLocaleDateString("en-US", { day: "2-digit", month: "short" });
}

export default async function AdminClientsPage() {
  const supabase = createSupabaseAdmin();
  const { data: bookingRows } = await supabase
    .from("bookings")
    .select("*")
    .neq("status", "cancelled");

  type ClientAggregate = {
    bookings: number;
    key: string;
    lastSessionDate: string | null;
    location: string;
    name: string;
    pending: boolean;
    readinessNote: string;
    status: string;
  };

  const aggregates = new Map<string, ClientAggregate>();

  (bookingRows ?? []).forEach((row: Record<string, unknown>) => {
    const email = String(row.email ?? "").trim().toLowerCase();
    const fullName = String(
      row.full_name ??
        [row.first_name, row.last_name].filter(Boolean).join(" ") ??
        "Client",
    ).trim();
    const key = email || fullName.toLowerCase() || String(row.id);
    const location =
      [row.city, row.country].filter(Boolean).join(", ") ||
      String(row.pob ?? row.birth_place ?? "Unknown");
    const sessionDate = String(row.session_date ?? "");
    const note = String(row.main_question ?? row.focus_notes ?? row.notes ?? "").trim();
    const pending = String(row.status ?? "").toLowerCase() === "pending";

    const existing = aggregates.get(key);
    if (!existing) {
      aggregates.set(key, {
        bookings: 1,
        key,
        lastSessionDate: sessionDate || null,
        location,
        name: fullName || "Client",
        pending,
        readinessNote: note || "No additional note provided.",
        status: pending ? "Awaiting details" : "New",
      });
      return;
    }

    existing.bookings += 1;
    existing.pending = existing.pending || pending;
    if (sessionDate && (!existing.lastSessionDate || sessionDate > existing.lastSessionDate)) {
      existing.lastSessionDate = sessionDate;
      existing.readinessNote = note || existing.readinessNote;
    }
  });

  const clients = Array.from(aggregates.values()).map((client) => {
    const status = client.pending
      ? "Awaiting details"
      : client.bookings > 1
        ? "Returning"
        : "New";
    return { ...client, status };
  });

  clients.sort((left, right) => (right.lastSessionDate ?? "").localeCompare(left.lastSessionDate ?? ""));

  const activeClients = clients.length;
  const returningClients = clients.filter((client) => client.bookings > 1).length;
  const openFollowUps = clients.filter((client) => client.pending).length;
  const tableRows = clients.slice(0, 12);
  const readinessCards = clients
    .filter((client) => client.pending || client.bookings > 1)
    .slice(0, 3);

  return (
    <AdminShell
      description="Keep a clean view of repeat clients, follow-up notes, and missing intake details before each session."
      eyebrow="Clients"
      title="Client records"
    >
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.6rem] border border-white/10 bg-[rgba(10,10,14,0.82)] p-5 shadow-[0_18px_48px_rgba(0,0,0,0.24)] backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--muted)]">Active clients</p>
            <Users className="h-4 w-4 text-[var(--gold-soft)]" strokeWidth={1.8} />
          </div>
          <p className="mt-3 font-display text-[3.2rem] leading-none text-[var(--ivory)]">
            {activeClients === 0 ? "No data" : activeClients}
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">Across local and overseas consultations.</p>
        </div>

        <div className="rounded-[1.6rem] border border-white/10 bg-[rgba(10,10,14,0.82)] p-5 shadow-[0_18px_48px_rgba(0,0,0,0.24)] backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--muted)]">Returning clients</p>
            <Repeat className="h-4 w-4 text-emerald-200" strokeWidth={1.8} />
          </div>
          <p className="mt-3 font-display text-[3.2rem] leading-none text-[var(--ivory)]">
            {activeClients === 0 ? "No data" : returningClients}
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">Repeat consultations make up the strongest segment.</p>
        </div>

        <div className="rounded-[1.6rem] border border-white/10 bg-[rgba(10,10,14,0.82)] p-5 shadow-[0_18px_48px_rgba(0,0,0,0.24)] backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--muted)]">Open follow-ups</p>
            <NotebookText className="h-4 w-4 text-sky-200" strokeWidth={1.8} />
          </div>
          <p className="mt-3 font-display text-[3.2rem] leading-none text-[var(--ivory)]">
            {activeClients === 0 ? "No data" : openFollowUps}
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">Clients needing timing updates or missing intake data.</p>
        </div>
      </section>

      <section className="space-y-5">
        <div className="rounded-[1.8rem] border border-white/10 bg-[rgba(10,10,14,0.82)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[var(--gold-soft)]">Directory</p>
              <h2 className="mt-2 font-display text-3xl text-[var(--ivory)]">Active client list</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[var(--muted)]">
              A condensed operator view of location, session history, and client state before the next booking.
            </p>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-3 text-left">
              <thead>
                <tr className="text-xs uppercase tracking-[0.22em] text-[var(--muted-strong)]">
                  <th className="px-4 py-2 font-medium">Client</th>
                  <th className="px-4 py-2 font-medium">Location</th>
                  <th className="px-4 py-2 font-medium">Bookings</th>
                  <th className="px-4 py-2 font-medium">Last session</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.length === 0 ? (
                  <tr>
                    <td className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-4 py-6 text-sm text-[var(--muted)]" colSpan={5}>
                      No data available yet for clients.
                    </td>
                  </tr>
                ) : (
                  tableRows.map((client) => (
                    <tr className="rounded-[1.2rem] bg-white/[0.03]" key={client.name}>
                    <td className="rounded-l-[1.2rem] px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(202,167,107,0.18)] bg-[rgba(202,167,107,0.08)] text-sm font-semibold text-[var(--gold-soft)]">
                          {client.name
                            .split(" ")
                            .slice(0, 2)
                            .map((part) => part[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="text-base text-[var(--ivory)]">{client.name}</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                            Client record
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-[var(--muted)]">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[var(--gold-soft)]" strokeWidth={1.7} />
                        {client.location}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-[var(--muted)]">{client.bookings}</td>
                    <td className="px-4 py-4 text-sm text-[var(--muted)]">{formatShortDate(client.lastSessionDate)}</td>
                    <td className="rounded-r-[1.2rem] px-4 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs ${statusClasses(client.status)}`}>
                        {client.status}
                      </span>
                    </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-white/10 bg-[rgba(10,10,14,0.82)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6">
          <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[var(--gold-soft)]">Readiness</p>
              <h2 className="mt-2 font-display text-3xl text-[var(--ivory)]">Key notes</h2>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              Priority view
            </span>
          </div>
          <div className="mt-5 grid gap-4 xl:grid-cols-3">
            {(readinessCards.length > 0 ? readinessCards : tableRows.slice(0, 3)).length === 0 ? (
              <div className="rounded-[1.45rem] border border-[rgba(202,167,107,0.18)] bg-[rgba(202,167,107,0.08)] p-5 text-sm text-[var(--muted)] xl:col-span-3">
                No data available for readiness notes.
              </div>
            ) : (
              (readinessCards.length > 0 ? readinessCards : tableRows.slice(0, 3)).map((client) => (
                <div
                  className="rounded-[1.45rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.025))] p-5"
                  key={client.key}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-base text-[var(--ivory)]">{client.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                        Session readiness note
                      </p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-[var(--gold-soft)]">
                      {client.status}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{client.readinessNote}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </AdminShell>
  );
}
