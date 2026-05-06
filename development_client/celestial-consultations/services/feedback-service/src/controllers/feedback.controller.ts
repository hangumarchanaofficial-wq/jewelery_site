import { Request, Response } from "express";
import { FeedbackService } from "../services/feedback.service";

export const FeedbackController = {
  async submit(req: Request, res: Response) {
    try {
      const fb = await FeedbackService.submit(req.body);
      res.status(201).json(fb);
    } catch (e: unknown) {
      res.status(400).json({ error: e instanceof Error ? e.message : "Failed" });
    }
  },
  async aggregate(_req: Request, res: Response) {
    try { res.json(await FeedbackService.getAggregate()); }
    catch (e: unknown) { res.status(500).json({ error: e instanceof Error ? e.message : "Failed" }); }
  },
  async testimonials(_req: Request, res: Response) {
    try { res.json(await FeedbackService.getTestimonials()); }
    catch (e: unknown) { res.status(500).json({ error: e instanceof Error ? e.message : "Failed" }); }
  },
};
