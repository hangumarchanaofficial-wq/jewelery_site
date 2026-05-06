import type { Metadata } from "next";

import { AdminOverview } from "./AdminOverview";
import { AdminShell } from "./AdminShell";

export const metadata: Metadata = {
  title: "Admin Dashboard | Star Insight Astrology",
  description: "Operational dashboard for bookings, clients, availability, and payment status.",
};

export default function AdminPage() {
  return (
    <AdminShell
      description="Track bookings, client readiness, payment state, and daily availability from one working surface."
      eyebrow="Operations"
      title="Admin dashboard"
    >
      <AdminOverview />
    </AdminShell>
  );
}
