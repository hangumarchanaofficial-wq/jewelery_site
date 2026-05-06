"use client";

import { useState } from "react";

import { saveAdminSettings } from "@/lib/api";

export function AdminWorkingHoursCard({
  initialEnd,
  initialStart,
}: {
  initialEnd: string;
  initialStart: string;
}) {
  const [workingHoursStart, setWorkingHoursStart] = useState(initialStart);
  const [workingHoursEnd, setWorkingHoursEnd] = useState(initialEnd);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const onSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      await saveAdminSettings({ workingHoursEnd, workingHoursStart });
      setMessage("Working hours updated. Calendar availability has been synced.");
    } catch {
      setMessage("Unable to save working hours right now.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-[1.8rem] border border-[rgba(202,167,107,0.18)] bg-[rgba(202,167,107,0.08)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6">
      <div className="border-b border-white/10 pb-4">
        <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[var(--gold-soft)]">Config</p>
        <h2 className="mt-2 font-display text-3xl text-[var(--ivory)]">Working hours</h2>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-[var(--muted)]">
          Start time
          <input
            className="mt-2 w-full rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-[var(--ivory)] outline-none"
            onChange={(event) => setWorkingHoursStart(event.target.value)}
            type="time"
            value={workingHoursStart}
          />
        </label>
        <label className="text-sm text-[var(--muted)]">
          End time
          <input
            className="mt-2 w-full rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-[var(--ivory)] outline-none"
            onChange={(event) => setWorkingHoursEnd(event.target.value)}
            type="time"
            value={workingHoursEnd}
          />
        </label>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--muted)]">
          Saving this updates admin calendar slot availability for today + next 6 days.
        </p>
        <button
          className="rounded-full border border-[rgba(202,167,107,0.35)] bg-[rgba(202,167,107,0.18)] px-5 py-2 text-sm text-[var(--ivory)] transition hover:bg-[rgba(202,167,107,0.24)] disabled:opacity-50"
          disabled={saving}
          onClick={onSave}
          type="button"
        >
          {saving ? "Saving..." : "Save hours"}
        </button>
      </div>

      {message ? <p className="mt-4 text-sm text-[var(--gold-soft)]">{message}</p> : null}
    </div>
  );
}
