import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";
const router = Router();
router.post("/booking-confirmed",  NotificationController.bookingConfirmed);
router.post("/booking-cancelled",  NotificationController.bookingCancelled);
export default router;
