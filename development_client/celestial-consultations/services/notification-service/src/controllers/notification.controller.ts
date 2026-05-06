import { Request, Response } from "express";
import { sendBookingConfirmation, sendCancellationEmail } from "../providers/sendgrid";
import { createCalendarEvent } from "../providers/googleCalendar";

export const NotificationController = {
  async bookingConfirmed(req: Request, res: Response) {
    try {
      const { booking } = req.body;
      const { meetLink } = await createCalendarEvent(booking);
      await sendBookingConfirmation({ ...booking, meet_link: meetLink || undefined });
      res.json({ sent: true, meetLink });
    } catch (e: unknown) {
      console.error(e);
      res.status(500).json({ error: e instanceof Error ? e.message : "Failed" });
    }
  },

  async bookingCancelled(req: Request, res: Response) {
    try {
      const { booking } = req.body;
      await sendCancellationEmail(booking);
      res.json({ sent: true });
    } catch (e: unknown) {
      res.status(500).json({ error: e instanceof Error ? e.message : "Failed" });
    }
  },
};
