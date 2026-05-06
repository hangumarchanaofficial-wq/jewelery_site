import type { Metadata } from "next";

import { AdminShell } from "../AdminShell";
import { settingsGroups } from "../admin-data";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { AdminWorkingHoursCard } from "./AdminWorkingHoursCard";

export const metadata: Metadata = {
  title: "Settings | Star Insight Admin",
  description: "Configure availability, notifications, and privacy controls.",
};

export default async function AdminSettingsPage() {
  const supabase = createSupabaseAdmin();
  const { data } = await supabase
    .from("admin_settings")
    .select("key, value")
    .in("key", ["working_hours_start", "working_hours_end"]);
  const settings = Object.fromEntries((data ?? []).map((row) => [row.key, row.value]));
  const workingHoursStart = settings.working_hours_start ?? "09:00";
  const workingHoursEnd = settings.working_hours_end ?? "20:00";
  const groups = settingsGroups.map((group) => {
    if (group.title !== "Availability rules") return group;
    return {
      ...group,
      items: [
        `Default working hours: ${workingHoursStart} to ${workingHoursEnd}`,
        ...group.items.filter((item) => !item.toLowerCase().includes("default working hours")),
      ],
    };
  });

  return (
    <AdminShell
      description="Set the operational rules that drive availability, reminders, and access to private client data."
      eyebrow="Settings"
      title="Admin settings"
    >
      <section className="grid gap-5 xl:grid-cols-3">
        <AdminWorkingHoursCard initialEnd={workingHoursEnd} initialStart={workingHoursStart} />

        {groups.map((group) => (
          <div
            className="rounded-[1.8rem] border border-white/10 bg-[rgba(10,10,14,0.82)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6"
            key={group.title}
          >
            <div className="border-b border-white/10 pb-4">
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[var(--gold-soft)]">Config</p>
              <h2 className="mt-2 font-display text-3xl text-[var(--ivory)]">{group.title}</h2>
            </div>
            <div className="mt-5 space-y-4">
              {group.items.map((item) => (
                <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-[var(--muted)]" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </AdminShell>
  );
}
