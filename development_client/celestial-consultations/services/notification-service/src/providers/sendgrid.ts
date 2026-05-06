import sgMail from "@sendgrid/mail";

type BookingPayload = {
  email?: string;
  client_email?: string;
  first_name?: string;
  last_name?: string;
  service?: string;
  date?: string;
  time?: string;
  meet_link?: string;
};

const apiKey = process.env.SENDGRID_API_KEY;
const fromEmail = process.env.FROM_EMAIL || "hello@celestialconsultations.com";

function hasConfiguredApiKey() {
  return Boolean(apiKey && !apiKey.includes("your_sendgrid_api_key"));
}

if (hasConfiguredApiKey()) {
  sgMail.setApiKey(apiKey as string);
}

function getRecipient(booking: BookingPayload) {
  return booking.client_email || booking.email;
}

export async function sendBookingConfirmation(booking: BookingPayload) {
  const to = getRecipient(booking);
  if (!to || !hasConfiguredApiKey()) {
    return { queued: false, reason: "email provider not configured" };
  }

  await sgMail.send({
    to,
    from: fromEmail,
    subject: "Your consultation is confirmed",
    text: [
      `Hello ${booking.first_name || "there"},`,
      `Your booking for ${booking.service || "your consultation"} is confirmed.`,
      booking.date ? `Date: ${booking.date}` : "",
      booking.time ? `Time: ${booking.time}` : "",
      booking.meet_link ? `Meeting link: ${booking.meet_link}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  });

  return { queued: true };
}

export async function sendCancellationEmail(booking: BookingPayload) {
  const to = getRecipient(booking);
  if (!to || !hasConfiguredApiKey()) {
    return { queued: false, reason: "email provider not configured" };
  }

  await sgMail.send({
    to,
    from: fromEmail,
    subject: "Your consultation was cancelled",
    text: [
      `Hello ${booking.first_name || "there"},`,
      `Your booking for ${booking.service || "your consultation"} has been cancelled.`,
      booking.date ? `Date: ${booking.date}` : "",
      booking.time ? `Time: ${booking.time}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  });

  return { queued: true };
}
