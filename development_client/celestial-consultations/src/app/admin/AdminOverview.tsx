import { Clock3, Sparkles } from "lucide-react";

import { metricToneClasses, statusClasses } from "./admin-utils";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

function formatLocalIso(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

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

export async function AdminOverview() {
  const supabase = createSupabaseAdmin();
  const todayIso = formatLocalIso(new Date());
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [bookingsRes, todayCountRes, pendingCountRes] = await Promise.all([
    supabase.from("bookings").select("*").order("session_date", { ascending: true }).order("session_time", { ascending: true }).limit(100),
    supabase.from("bookings").select("id", { count: "exact", head: true }).eq("session_date", todayIso),
    supabase.from("bookings").select("id", { count: "exact", head: true }).eq("status", "pending"),
  ]);

  const rows = (bookingsRes.data ?? []) as Record<string, unknown>[];
  const bookedToday = rows.filter((row) => String(row.session_date ?? "") === todayIso);
  const monthRevenue = rows
    .filter((row) => {
      const created = String(row.created_at ?? "");
      return created ? new Date(created) >= startOfMonth : false;
    })
    .filter((row) => String(row.payment_status ?? "").toLowerCase() === "paid")
    .reduce((sum, row) => sum + Number(row.price_paid_usd ?? 0), 0);

  const uniqueByService = new Map<string, { name: string; duration: string; price: string; count: number }>();
  rows.forEach((row) => {
    const name = String(row.service_name ?? "Consultation");
    const key = name.toLowerCase();
    const entry = uniqueByService.get(key) ?? {
      count: 0,
      duration: String(row.service_duration ?? "—"),
      name,
      price: `USD ${Number(row.price_paid_usd ?? 0) || 0}`,
    };
    entry.count += 1;
    uniqueByService.set(key, entry);
  });

  const services = Array.from(uniqueByService.values()).slice(0, 3).map((service) => ({
    ...service,
    load: `${service.count} bookings this week`,
  }));

  const uniqueClients = new Map<string, { name: string; city: string; note: string; tag: string }>();
  rows.forEach((row) => {
    const name = displayName(row) || "Client";
    const key = String(row.email ?? name).toLowerCase();
    if (uniqueClients.has(key)) return;
    uniqueClients.set(key, {
      city: String(row.city ?? row.pob ?? "Unknown"),
      name,
      note: String(row.main_question ?? row.focus_notes ?? row.notes ?? "No note available."),
      tag: String(row.status ?? "").toLowerCase() === "pending" ? "Pending info" : "Returning",
    });
  });
  const clients = Array.from(uniqueClients.values()).slice(0, 3);

  const overviewMetrics = [
    { label: "Today bookings", value: String(todayCountRes.count ?? 0), delta: "Live count for today", tone: "gold" },
    { label: "Pending confirmations", value: String(pendingCountRes.count ?? 0), delta: "Needs admin confirmation", tone: "amber" },
    { label: "Monthly revenue", value: `USD ${monthRevenue.toLocaleString()}`, delta: "Paid bookings this month", tone: "green" },
    { label: "Repeat clients", value: `${Math.max(0, uniqueClients.size - 1)}`, delta: "Distinct clients returning", tone: "slate" },
  ];

  const bookings = bookedToday.slice(0, 8).map((row) => ({
    client: displayName(row) || "Client",
    payment: titleCase(String(row.payment_status ?? "awaiting")),
    service: String(row.service_name ?? "Consultation"),
    status: titleCase(String(row.status ?? "pending")),
    time: String(row.session_time ?? "--"),
  }));

  return (
    <>
      <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {overviewMetrics.map((metric, index) => (
          <article className="rounded-[1.6rem] border border-white/10 bg-[rgba(10,10,14,0.82)] p-5 shadow-[0_18px_48px_rgba(0,0,0,0.24)] backdrop-blur-xl" key={metric.label}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-[var(--muted)]">{metric.label}</p>
                <p className="mt-3 font-display text-[3.5rem] leading-[0.95] text-[var(--ivory)]">{metric.value}</p>
              </div>
              <span
                className={`rounded-full border px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] ${metricToneClasses(metric.tone)}`}
              >
                live
              </span>
            </div>
            <p className="mt-4 text-base leading-7 text-[var(--muted)]">{metric.delta}</p>
          </article>
        ))}
      </section>

      <section className="w-full">
        <section className="w-full rounded-[2rem] border border-white/10 bg-[rgba(10,10,14,0.82)] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-7">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[var(--gold-soft)]">Booking queue</p>
              <h2 className="mt-2 font-display text-[2.35rem] leading-tight text-[var(--ivory)] sm:text-[2.7rem]">
                Today schedule
              </h2>
            </div>
            <p className="max-w-[42rem] text-base leading-8 text-[var(--muted)] xl:text-right">
              Confirm, review, and follow up before each reading window opens.
            </p>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-4 text-left">
              <thead>
                <tr className="text-[0.72rem] uppercase tracking-[0.28em] text-[var(--muted-strong)]">
                  <th className="px-5 py-2 font-medium">Client</th>
                  <th className="px-5 py-2 font-medium">Service</th>
                  <th className="px-5 py-2 font-medium">Time</th>
                  <th className="px-5 py-2 font-medium">Status</th>
                  <th className="px-5 py-2 font-medium">Payment</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-5 py-6 text-sm text-[var(--muted)]" colSpan={5}>
                      No data available yet for today schedule.
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr className="rounded-[1.35rem] bg-white/[0.03]" key={`${booking.client}-${booking.time}`}>
                      <td className="rounded-l-[1.35rem] px-5 py-5 text-[1.02rem] text-[var(--ivory)]">{booking.client}</td>
                      <td className="px-5 py-5 text-[1.02rem] text-[var(--muted)]">{booking.service}</td>
                      <td className="px-5 py-5 text-[1.02rem] text-[var(--muted)]">{booking.time}</td>
                      <td className="px-5 py-5">
                        <span className={`rounded-full px-4 py-1.5 text-[0.8rem] ${statusClasses(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="rounded-r-[1.35rem] px-5 py-5">
                        <span className={`rounded-full px-4 py-1.5 text-[0.8rem] ${statusClasses(booking.payment)}`}>
                          {booking.payment}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(300px,0.95fr)_minmax(0,1.1fr)]">
        <section className="rounded-[1.8rem] border border-white/10 bg-[rgba(10,10,14,0.82)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6">
          <div className="border-b border-white/10 pb-4">
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[var(--gold-soft)]">Services</p>
            <h2 className="mt-2 font-display text-3xl text-[var(--ivory)]">Current offers</h2>
          </div>

          <div className="mt-5 space-y-4">
            {services.length === 0 ? (
              <div className="rounded-[1.45rem] border border-[rgba(202,167,107,0.18)] bg-[rgba(202,167,107,0.08)] p-4 text-sm text-[var(--muted)]">
                No data available for services yet.
              </div>
            ) : (
              services.map((service) => (
                <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.03] p-4" key={service.name}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-[var(--ivory)]">{service.name}</p>
                      <p className="mt-1 text-sm text-[var(--muted)]">{service.load}</p>
                    </div>
                    <Sparkles className="h-4 w-4 text-[var(--gold-soft)]" strokeWidth={1.7} />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--muted-strong)]">
                    <span>{service.duration}</span>
                    <span>{service.price}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="rounded-[1.8rem] border border-white/10 bg-[rgba(10,10,14,0.82)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6">
          <div className="border-b border-white/10 pb-4">
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[var(--gold-soft)]">Clients</p>
            <h2 className="mt-2 font-display text-3xl text-[var(--ivory)]">Readiness notes</h2>
          </div>

          <div className="mt-5 space-y-4">
            {clients.length === 0 ? (
              <div className="rounded-[1.45rem] border border-[rgba(202,167,107,0.18)] bg-[rgba(202,167,107,0.08)] p-4 text-sm text-[var(--muted)]">
                No data available for client readiness notes.
              </div>
            ) : (
              clients.map((client) => (
                <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.03] p-4" key={client.name}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm text-[var(--ivory)]">{client.name}</p>
                      <p className="mt-1 text-sm text-[var(--muted)]">{client.city}</p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-[var(--gold-soft)]">
                      {client.tag}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{client.note}</p>
                </div>
              ))
            )}
          </div>
        </section>

      </section>

      <footer className="rounded-[1.8rem] border border-white/10 bg-[rgba(10,10,14,0.82)] px-5 py-4 text-sm text-[var(--muted)] shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:px-6">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-3">
            <Clock3 className="h-4 w-4 text-[var(--gold-soft)]" strokeWidth={1.7} />
            Live from database. Refresh to fetch latest admin activity.
          </div>
          <div className="flex items-center gap-4 text-[var(--muted-strong)]">
            <span>Version 1.0</span>
            <span>Admin access only</span>
          </div>
        </div>
      </footer>
    </>
  );
}
