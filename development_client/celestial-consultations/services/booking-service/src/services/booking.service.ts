import axios from "axios";
import { BookingModel } from "../models/booking.model";
import { ENV } from "../config/env";

export const BookingService = {
  async createBooking(data: {
    firstName: string; lastName: string; email: string;
    sessionDate: string; sessionTime: string;
    dob: string; tob?: string; pob: string; focusNotes?: string;
  }) {
    // 1. hold the slot
    await axios.post(`${ENV.AVAILABILITY_SERVICE_URL}/availability/hold`, {
      date: data.sessionDate, time: data.sessionTime,
    });

    // 2. save booking
    const booking = await BookingModel.create({
      first_name: data.firstName, last_name: data.lastName, email: data.email,
      session_date: data.sessionDate, session_time: data.sessionTime,
      dob: data.dob, tob: data.tob, pob: data.pob, focus_notes: data.focusNotes,
    });

    // 3. fire notification (non-blocking)
    axios.post(`${ENV.NOTIFICATION_SERVICE_URL}/notify/booking-confirmed`, { booking }).catch(() => {});

    return booking;
  },

  async getBooking(id: string) {
    const b = await BookingModel.findById(id);
    if (!b) throw new Error("Booking not found");
    return b;
  },

  async cancelBooking(id: string) {
    const b = await BookingModel.cancel(id);
    if (!b) throw new Error("Booking not found");
    axios.post(`${ENV.NOTIFICATION_SERVICE_URL}/notify/booking-cancelled`, { booking: b }).catch(() => {});
    return b;
  },
};
