import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

/**
 * GET /api/admin/stats
 * Live dashboard metrics used by AdminOverview.
 */
export async function GET() {
  const supabase = createSupabaseAdmin();
  const today = new Date().toISOString().split("T")[0];

  const [todayRes, pendingRes, revenueRes, feedbackRes] = await Promise.all([
    // Today bookings
    supabase
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .eq("session_date", today),

    // Pending confirmations
    supabase
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending"),

    // Revenue this month (paid)
    supabase
      .from("bookings")
      .select("price_paid_usd")
      .eq("payment_status", "paid")
      .gte("created_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),

    // Recent feedback average
    supabase
      .from("feedback")
      .select("overall_rating")
      .order("created_at", { ascending: false })
      .limit(20),
  ]);

  const revenue = (revenueRes.data ?? []).reduce(
    (sum, row) => sum + Number(row.price_paid_usd ?? 0),
    0
  );

  const avgRating =
    feedbackRes.data && feedbackRes.data.length > 0
      ? feedbackRes.data.reduce((s, r) => s + r.overall_rating, 0) / feedbackRes.data.length
      : null;

  return NextResponse.json({
    todayBookings:    todayRes.count ?? 0,
    pendingCount:     pendingRes.count ?? 0,
    monthRevenue:     revenue,
    avgFeedbackRating: avgRating ? Number(avgRating.toFixed(1)) : null,
  });
}
