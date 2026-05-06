import express from "express";
import cors from "cors";
import helmet from "helmet";
import feedbackRoutes from "./routes/feedback.routes";
const app = express();
app.use(helmet()); app.use(cors()); app.use(express.json());
app.get("/health", (_req, res) => res.json({ status: "ok", service: "feedback-service" }));
app.use("/feedback", feedbackRoutes);
export default app;
