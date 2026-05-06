import { Router } from "express";
import { AvailabilityController } from "../controllers/availability.controller";
const router = Router();
router.get("/",    AvailabilityController.getSlots);
router.post("/hold", AvailabilityController.holdSlot);
export default router;
