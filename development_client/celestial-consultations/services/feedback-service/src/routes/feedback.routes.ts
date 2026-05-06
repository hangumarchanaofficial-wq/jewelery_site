import { Router } from "express";
import { FeedbackController } from "../controllers/feedback.controller";
const router = Router();
router.post("/",           FeedbackController.submit);
router.get("/aggregate",   FeedbackController.aggregate);
router.get("/testimonials",FeedbackController.testimonials);
export default router;
