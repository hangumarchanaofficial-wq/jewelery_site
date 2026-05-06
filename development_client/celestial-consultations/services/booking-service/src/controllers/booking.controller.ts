import { Request, Response } from "express";
import { BookingService } from "../services/booking.service";

export const BookingController = {
  async create(req: Request, res: Response) {
    try {
      const booking = await BookingService.createBooking(req.body);
      res.status(201).json(booking);
    } catch (e: unknown) {
      res.status(400).json({ error: e instanceof Error ? e.message : "Failed" });
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      const booking = await BookingService.getBooking(req.params.id);
      res.json(booking);
    } catch (e: unknown) {
      res.status(404).json({ error: e instanceof Error ? e.message : "Not found" });
    }
  },

  async cancel(req: Request, res: Response) {
    try {
      const booking = await BookingService.cancelBooking(req.params.id);
      res.json(booking);
    } catch (e: unknown) {
      res.status(404).json({ error: e instanceof Error ? e.message : "Not found" });
    }
  },
};
