"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, BellRing, ChevronRight, MoonStar, Search, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

import { adminNavigation } from "./admin-data";

interface AdminShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function AdminShell({ eyebrow, title, description, children }: AdminShellProps) {
  const pathname = usePathname();
  const [pendingConfirmations, setPendingConfirmations] = useState<number | null>(null);
  const [privacyRecordCount, setPrivacyRecordCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loadSidebarData = async () => {
      try {
        const response = await fetch("/api/admin/sidebar", { cache: "no-store" });
        const data = await response.json();
        if (!response.ok || cancelled) return;
        setPendingConfirmations(
          typeof data.pendingConfirmations === "number" ? data.pendingConfirmations : 0,
        );
        setPrivacyRecordCount(
          typeof data.privacyRecordCount === "number" ? data.privacyRecordCount : 0,
        );
      } catch {
        if (cancelled) return;
        setPendingConfirmations(0);
        setPrivacyRecordCount(0);
      }
    };

    void loadSidebarData();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="lux-shell min-h-screen">
      <div className="lux-noise" />
      <div className="hero-aurora" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-none flex-col gap-5 px-4 py-4 lg:flex-row lg:px-6 lg:py-5">
        <motion.aside
          animate={{ opacity: 1, x: 0 }}
          className="w-full shrink-0 overflow-hidden rounded-[1.8rem] border border-white/10 bg-[rgba(10,10,14,0.88)] p-4 shadow-[0_28px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:w-[340px]"
          initial={false}
          transition={{ duration: 0.45 }}
        >
          <div className="flex items-center gap-3 border-b border-white/10 pb-5">
            <div className="brand-emblem">
              <MoonStar className="h-4 w-4" strokeWidth={1.7} />
            </div>
            <div>
              <p className="font-display text-[2rem] leading-none text-[var(--gold-bright)]">Star Insight</p>
              <p className="text-[0.68rem] uppercase tracking-[0.32em] text-[var(--muted-strong)]">
                Admin Console
              </p>
            </div>
          </div>

          <nav className="mt-5 space-y-2">
            {adminNavigation.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  className={`flex items-center justify-between rounded-[1.2rem] px-4 py-3.5 text-[1rem] transition ${
                    active
                      ? "border border-[rgba(202,167,107,0.22)] bg-[rgba(202,167,107,0.1)] text-[var(--ivory)]"
                      : "border border-transparent text-[var(--muted)] hover:border-white/10 hover:bg-white/[0.03] hover:text-[var(--ivory)]"
                  }`}
                  href={item.href}
                  key={item.href}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" strokeWidth={1.7} />
                    {item.label}
                  </span>
                  <ChevronRight className="h-4 w-4 opacity-60" strokeWidth={1.7} />
                </Link>
              );
            })}
          </nav>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-2 text-[var(--gold-soft)]">
                <BellRing className="h-4 w-4" strokeWidth={1.7} />
                <span className="text-xs uppercase tracking-[0.22em]">Alerts</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                {pendingConfirmations === null
                  ? "Loading booking alerts..."
                  : pendingConfirmations > 0
                    ? `${pendingConfirmations} booking${pendingConfirmations === 1 ? "" : "s"} awaiting confirmation.`
                    : "No pending booking confirmations right now."}
              </p>
            </div>

            <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-2 text-[var(--gold-soft)]">
                <ShieldCheck className="h-4 w-4" strokeWidth={1.7} />
                <span className="text-xs uppercase tracking-[0.22em]">Privacy</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                {privacyRecordCount === null
                  ? "Loading privacy status..."
                  : `Birth details are stored for ${privacyRecordCount} client record${
                      privacyRecordCount === 1 ? "" : "s"
                    }, visible only to admin users with schedule access.`}
              </p>
            </div>
          </div>
        </motion.aside>

        <div className="min-w-0 flex-1 space-y-5">
          <motion.header
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[1.8rem] border border-white/10 bg-[rgba(10,10,14,0.82)] px-5 py-5 shadow-[0_24px_70px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:px-6"
            initial={false}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            <div className="min-w-0 max-w-[72rem]">
              <p className="text-[0.72rem] uppercase tracking-[0.35em] text-[var(--gold-soft)]">{eyebrow}</p>
              <h1 className="mt-3 font-display text-[3.2rem] leading-[0.95] text-[var(--ivory)] sm:text-[4.2rem]">
                {title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted)]">{description}</p>
            </div>
          </motion.header>

          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_260px]"
            initial={false}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <div className="rounded-[1.6rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-3 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl">
              <label className="flex min-h-[3.7rem] w-full min-w-0 items-center gap-3 rounded-full border border-white/10 bg-[rgba(20,20,24,0.9)] px-5 text-sm text-[var(--muted)]">
                <Search className="h-4 w-4 text-[var(--gold-soft)]" strokeWidth={1.8} />
                <input
                  className="w-full bg-transparent outline-none placeholder:text-[var(--muted-strong)]"
                  placeholder="Search client, booking, or reference"
                />
              </label>
            </div>

            <div className="rounded-[1.6rem] border border-[rgba(202,167,107,0.18)] bg-[rgba(202,167,107,0.08)] p-3 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl">
              <button className="premium-button w-full min-w-0">
                Add booking
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
              </button>
            </div>
          </motion.section>

          {children}
        </div>
      </div>
    </main>
  );
}
