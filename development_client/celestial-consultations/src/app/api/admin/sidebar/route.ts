import { NextResponse } from "next/server";

import { createSupabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const supabase = createSupabaseAdmin();

  const { data: rows, error } = await supabase
    .from("bookings")
    .select("*")
    .neq("status", "cancelled")
    .limit(500);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const pendingConfirmations = (rows ?? []).filter(
    (row) => String(row.status ?? "").toLowerCase() === "pending",
  ).length;

  const privacySet = new Set<string>();
  (rows ?? []).forEach((row) => {
    const hasBirthData =
      row.dob != null ||
      row.date_of_birth != null ||
      row.tob != null ||
      row.time_of_birth != null ||
      row.pob != null ||
      row.birth_place != null;
    if (!hasBirthData) return;
    const key = String(row.email ?? row.id ?? "").toLowerCase();
    if (!key) return;
    privacySet.add(key);
  });

  return NextResponse.json({
    pendingConfirmations,
    privacyRecordCount: privacySet.size,
  });
}
