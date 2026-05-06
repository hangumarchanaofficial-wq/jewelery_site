import { Router } from "express";
import { BookingController } from "../controllers/booking.controller";
const router = Router();
router.post("/",             BookingController.create);
router.get("/:id",           BookingController.getOne);
router.delete("/:id/cancel", BookingController.cancel);
export default router;
