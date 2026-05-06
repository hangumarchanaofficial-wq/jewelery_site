import "dotenv/config";
import app from "./app";
import { connectDB } from "./config/db";
import { logger } from "./utils/logger";
import { ENV } from "./config/env";

const start = async () => {
  await connectDB();
  app.listen(ENV.PORT, () => logger.info(`User Service running on port ${ENV.PORT}`));
};

start().catch((e) => { logger.error(e.message); process.exit(1); });
