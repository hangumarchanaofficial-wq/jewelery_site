import type { Metadata } from "next";

import { AdminShell } from "../AdminShell";
import { statusClasses } from "../admin-utils";
import { AlertTriangle, CreditCard } from "lucide-react";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

export const metadata: Metadata = {
  title: "Payments | Star Insight Admin",
  description: "Track collection state, outstanding balances, and payment methods.",
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

function toUsd(amount: number) {
  return `USD ${amount.toLocaleString()}`;
}

export default async function AdminPaymentsPage() {
  const supabase = createSupabaseAdmin();
  const { data } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  const paymentRows = (data ?? []).map((row: Record<string, unknown>) => {
    const amount = Number(row.price_paid_usd ?? 0);
    return {
      amount: `USD ${amount}`,
      client: displayName(row) || "Client",
      method: String(row.payment_method ?? "—"),
      service: String(row.service_name ?? "Consultation"),
      status: titleCase(String(row.payment_status ?? "awaiting")),
    };
  });

  const collected = paymentRows
    .filter((row) => row.status === "Paid")
    .reduce((sum, row) => sum + Number(row.amount.replace("USD ", "")), 0);
  const awaiting = paymentRows
    .filter((row) => row.status === "Awaiting")
    .reduce((sum, row) => sum + Number(row.amount.replace("USD ", "")), 0);

  const paymentSummary = [
    { label: "Collected this week", value: toUsd(collected), icon: CreditCard, tone: "gold" },
    { label: "Awaiting payment", value: toUsd(awaiting), icon: AlertTriangle, tone: "amber" },
  ];

  return (
    <AdminShell
      description="Monitor what has been collected, what is outstanding, and where follow-up is needed before sessions begin."
      eyebrow="Payments"
      title="Payment tracking"
    >
      <section className="grid gap-4 lg:grid-cols-2">
        {paymentSummary.map((item) => {
          const Icon = item.icon;
          return (
            <div
              className={`rounded-[1.8rem] border p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl ${
                item.tone === "gold"
                  ? "border-[rgba(202,167,107,0.18)] bg-[rgba(202,167,107,0.08)]"
                  : "border-white/10 bg-[rgba(10,10,14,0.82)]"
              }`}
              key={item.label}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-[var(--ivory)]">{item.label}</p>
                <Icon className="h-4 w-4 text-[var(--gold-soft)]" strokeWidth={1.7} />
              </div>
              <p className="mt-3 font-display text-4xl text-[var(--ivory)]">
                {paymentRows.length === 0 ? "No data" : item.value}
              </p>
            </div>
          );
        })}
      </section>

      <section className="rounded-[1.8rem] border border-white/10 bg-[rgba(10,10,14,0.82)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6">
        <div className="border-b border-white/10 pb-4">
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[var(--gold-soft)]">Transactions</p>
          <h2 className="mt-2 font-display text-3xl text-[var(--ivory)]">Recent payment activity</h2>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3 text-left">
            <thead>
              <tr className="text-xs uppercase tracking-[0.22em] text-[var(--muted-strong)]">
                <th className="px-4 py-2 font-medium">Client</th>
                <th className="px-4 py-2 font-medium">Service</th>
                <th className="px-4 py-2 font-medium">Amount</th>
                <th className="px-4 py-2 font-medium">Method</th>
                <th className="px-4 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentRows.length === 0 ? (
                <tr>
                  <td className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-4 py-6 text-sm text-[var(--muted)]" colSpan={5}>
                    No data available yet for payment activity.
                  </td>
                </tr>
              ) : (
                paymentRows.map((payment) => (
                  <tr className="rounded-[1.2rem] bg-white/[0.03]" key={`${payment.client}-${payment.amount}`}>
                    <td className="rounded-l-[1.2rem] px-4 py-4 text-sm text-[var(--ivory)]">{payment.client}</td>
                    <td className="px-4 py-4 text-sm text-[var(--muted)]">{payment.service}</td>
                    <td className="px-4 py-4 text-sm text-[var(--muted)]">{payment.amount}</td>
                    <td className="px-4 py-4 text-sm text-[var(--muted)]">{payment.method}</td>
                    <td className="rounded-r-[1.2rem] px-4 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs ${statusClasses(payment.status)}`}>{payment.status}</span>
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
