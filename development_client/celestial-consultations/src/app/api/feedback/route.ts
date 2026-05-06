import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { FeedbackSchema } from "@/lib/schemas";

/**
 * POST /api/feedback
 * Body: FeedbackSchema payload
 */
export async function GET() {
  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = FeedbackSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const data = parsed.data;
  const supabase = createSupabaseAdmin();

  const { error } = await supabase.from("feedback").insert({
    booking_id:     data.bookingId ?? null,
    client_name:    data.clientName,
    session_date:   data.sessionDate,
    overall_rating: data.overallRating,
    accuracy:       data.accuracy ?? null,
    clarity:        data.clarity ?? null,
    insights:       data.insights ?? null,
    warmth:         data.warmth ?? null,
    resonated:      data.resonated ?? null,
    improve:        data.improve ?? null,
    testimonial_ok: data.testimonialOk,
  });

  if (error) {
    console.error("Feedback insert error:", error);
    return NextResponse.json({ error: "Failed to save feedback." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
