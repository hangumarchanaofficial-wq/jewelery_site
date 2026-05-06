import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { BookingSchema } from "@/lib/schemas";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function generateReference() {
  return `SIA-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function resolveServiceId(serviceId: string, serviceName: string) {
  if (isUuid(serviceId)) return serviceId;

  const normalized = `${serviceId} ${serviceName}`.toLowerCase();
  if (normalized.includes("birth-chart") || normalized.includes("birth chart")) {
    return "11111111-1111-4111-8111-111111111111";
  }
  if (normalized.includes("detailed-chart") || normalized.includes("detailed chart")) {
    return "22222222-2222-4222-8222-222222222222";
  }

  return "99999999-9999-4999-8999-999999999999";
}

/**
 * POST /api/bookings
 * Body: BookingSchema payload
 * Creates a booking row, marks the slot as taken, sends confirmation email.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = BookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const data = parsed.data;
  const supabase = createSupabaseAdmin();
  const normalizedServiceId = resolveServiceId(String(data.serviceId), String(data.serviceName));

  // --- Guard: check slot is still open & unbooked ---
  const { data: slot } = await supabase
    .from("availability")
    .select("id, is_open")
    .eq("date_iso", data.sessionDate)
    .eq("slot_time", data.sessionTime)
    .single();

  if (!slot || !slot.is_open) {
    return NextResponse.json(
      { error: "This slot is no longer available. Please choose another time." },
      { status: 409 }
    );
  }

  const { data: existing } = await supabase
    .from("bookings")
    .select("id")
    .eq("session_date", data.sessionDate)
    .eq("session_time", data.sessionTime)
    .in("status", ["pending", "confirmed"])
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      { error: "This slot was just taken. Please choose another time." },
      { status: 409 }
    );
  }

  // --- Create booking ---
  const reference = generateReference();

  const { data: booking, error: insertError } = await supabase
    .from("bookings")
    .insert({
      service_id: normalizedServiceId,
      service_name:  data.serviceName,
      session_date:  data.sessionDate,
      session_time:  data.sessionTime,
      timezone:      data.timezone,
      full_name:     data.fullName,
      email:         data.email,
      phone:         data.phone,
      country:       data.country,
      city:          data.city,
      date_of_birth: data.dateOfBirth,
      time_of_birth: data.timeOfBirth ?? null,
      birth_place:   data.birthPlace,
      main_question: data.mainQuestion,
      notes:         data.notes ?? null,
      price_paid_usd: data.pricePaidUsd,
      reference,
      status:         "pending",
      payment_status: "awaiting",
    })
    .select()
    .single();

  if (insertError) {
    console.error("Booking insert error:", insertError);
    return NextResponse.json({ error: "Failed to save booking." }, { status: 500 });
  }

  // --- Send confirmation email (fire & forget — do not block response) ---
  sendConfirmationEmail(booking).catch(console.error);

  return NextResponse.json(
    { booking: { id: booking.id, reference: booking.reference } },
    { status: 201 }
  );
}

async function sendConfirmationEmail(booking: Record<string, unknown>) {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM) return;

  const dateLabel = new Date(
    String(booking.session_date) + "T00:00:00"
  ).toLocaleDateString("en-US", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  await resend.emails.send({
    from: process.env.RESEND_FROM!,
    to:   String(booking.email),
    subject: `Your Star Insight session is reserved — ${booking.reference}`,
    html: `
      <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#1a1a1a;">
        <h1 style="font-size:28px;font-weight:400;border-bottom:1px solid #ddd;padding-bottom:16px;">
          Star Insight Astrology
        </h1>
        <p style="font-size:16px;line-height:1.8;">Dear ${booking.full_name},</p>
        <p style="font-size:16px;line-height:1.8;">
          Your private astrology consultation has been received and is pending confirmation.
          You will hear from us within a few hours with a Google Meet link.
        </p>
        <table style="width:100%;border-collapse:collapse;margin:24px 0;font-size:15px;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#555;">Reference</td>
              <td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:bold;">${booking.reference}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#555;">Service</td>
              <td style="padding:10px 0;border-bottom:1px solid #eee;">${booking.service_name}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#555;">Date</td>
              <td style="padding:10px 0;border-bottom:1px solid #eee;">${dateLabel}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#555;">Time</td>
              <td style="padding:10px 0;border-bottom:1px solid #eee;">${booking.session_time} (${booking.timezone})</td></tr>
        </table>
        <p style="font-size:14px;color:#777;line-height:1.8;">
          Please keep this email for your records. If you need to reschedule, 
          reply with your reference number and preferred alternative.
        </p>
        <p style="font-size:14px;color:#555;">With care,<br/><strong>Star Insight Astrology</strong></p>
      </div>
    `,
  });
}
