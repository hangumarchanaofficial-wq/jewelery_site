import express from "express";
import cors from "cors";
import helmet from "helmet";
import availabilityRoutes from "./routes/availability.routes";
const app = express();
app.use(helmet()); app.use(cors()); app.use(express.json());
app.get("/health", (_req, res) => res.json({ status: "ok", service: "availability-service" }));
app.use("/availability", availabilityRoutes);
export default app;
