import express from "express";
import cors from "cors";
import helmet from "helmet";
import bookingRoutes from "./routes/booking.routes";
const app = express();
app.use(helmet()); app.use(cors()); app.use(express.json());
app.get("/health", (_req, res) => res.json({ status: "ok", service: "booking-service" }));
app.use("/bookings", bookingRoutes);
export default app;
