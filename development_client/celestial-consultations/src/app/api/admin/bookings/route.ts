import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

/**
 * GET  /api/admin/bookings?status=pending&date=YYYY-MM-DD&page=1&limit=20
 * Returns paginated booking list for the admin panel.
 */
export async function GET(req: NextRequest) {
  const supabase = createSupabaseAdmin();
  const { searchParams } = new URL(req.url);

  const status = searchParams.get("status");
  const date   = searchParams.get("date");
  const page   = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const limit  = Math.min(100, Number(searchParams.get("limit") ?? "20"));
  const offset = (page - 1) * limit;

  let query = supabase
    .from("bookings")
    .select("*", { count: "exact" })
    .order("session_date", { ascending: true })
    .order("session_time", { ascending: true })
    .range(offset, offset + limit - 1);

  if (status) query = query.eq("status", status);
  if (date)   query = query.eq("session_date", date);

  const { data, count, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ bookings: data, total: count, page, limit });
}
