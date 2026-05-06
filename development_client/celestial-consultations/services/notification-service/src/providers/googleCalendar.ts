import { google } from "googleapis";

type BookingPayload = {
  service?: string;
  email?: string;
  client_email?: string;
  date?: string;
  time?: string;
  start_time?: string;
  end_time?: string;
};

function hasCalendarConfig() {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_REFRESH_TOKEN &&
      !process.env.GOOGLE_CLIENT_ID.includes("your_google_client_id"),
  );
}

function buildIsoDate(date?: string, time?: string) {
  if (!date || !time) {
    return undefined;
  }

  return new Date(`${date}T${time}:00`).toISOString();
}

export async function createCalendarEvent(booking: BookingPayload) {
  if (!hasCalendarConfig()) {
    return { meetLink: null };
  }

  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );

  auth.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  const calendar = google.calendar({ version: "v3", auth });
  const start = booking.start_time || buildIsoDate(booking.date, booking.time);
  const end =
    booking.end_time ||
    (start ? new Date(new Date(start).getTime() + 60 * 60 * 1000).toISOString() : undefined);

  const response = await calendar.events.insert({
    calendarId: process.env.CALENDAR_ID || "primary",
    conferenceDataVersion: 1,
    requestBody: {
      summary: booking.service || "Consultation",
      start: start ? { dateTime: start } : undefined,
      end: end ? { dateTime: end } : undefined,
      attendees: [{ email: booking.client_email || booking.email }].filter((attendee) => attendee.email),
      conferenceData: {
        createRequest: {
          requestId: `booking-${Date.now()}`,
        },
      },
    },
  });

  const meetLink = response.data.conferenceData?.entryPoints?.find((entry) => entry.entryPointType === "video")?.uri;
  return { meetLink: meetLink || null };
}
