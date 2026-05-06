import { Request, Response } from "express";
import { AvailabilityService } from "../services/availability.service";

export const AvailabilityController = {
  async getSlots(req: Request, res: Response) {
    try {
      const { date } = req.query;
      if (!date) { res.status(400).json({ error: "date query param required" }); return; }
      const slots = await AvailabilityService.getSlots(date as string);
      res.json(slots);
    } catch (e: unknown) {
      res.status(500).json({ error: e instanceof Error ? e.message : "Failed" });
    }
  },

  async holdSlot(req: Request, res: Response) {
    try {
      const { date, time } = req.body;
      const held = await AvailabilityService.holdSlot(date, time);
      if (!held) { res.status(409).json({ error: "Slot already held" }); return; }
      res.json({ held: true });
    } catch (e: unknown) {
      res.status(500).json({ error: e instanceof Error ? e.message : "Failed" });
    }
  },
};
