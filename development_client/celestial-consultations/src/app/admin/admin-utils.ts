export function metricToneClasses(tone: string) {
  switch (tone) {
    case "green":
      return "border-emerald-400/20 bg-emerald-400/8 text-emerald-200";
    case "amber":
      return "border-amber-300/20 bg-amber-300/8 text-amber-200";
    case "slate":
      return "border-white/10 bg-white/[0.03] text-[var(--muted)]";
    default:
      return "border-[rgba(202,167,107,0.22)] bg-[rgba(202,167,107,0.08)] text-[var(--gold-bright)]";
  }
}

export function statusClasses(status: string) {
  switch (status) {
    case "Completed":
    case "Paid":
    case "Confirmed":
    case "VIP":
    case "Returning":
      return "bg-emerald-400/10 text-emerald-200 ring-1 ring-emerald-400/20";
    case "Pending":
    case "Awaiting":
    case "Awaiting details":
      return "bg-amber-300/10 text-amber-200 ring-1 ring-amber-300/20";
    case "Rescheduled":
    case "Follow-up due":
      return "bg-sky-300/10 text-sky-200 ring-1 ring-sky-300/20";
    default:
      return "bg-white/6 text-[var(--muted)] ring-1 ring-white/10";
  }
}

export function timelineDot(state: string) {
  switch (state) {
    case "live":
      return "bg-[var(--gold-bright)] shadow-[0_0_20px_rgba(236,211,166,0.45)]";
    case "pending":
      return "bg-amber-300";
    case "confirmed":
      return "bg-emerald-300";
    default:
      return "bg-white/35";
  }
}
